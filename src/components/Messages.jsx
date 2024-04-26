import { useState, useEffect, Fragment } from "react";
import { Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";

dayjs.extend(LocalizedFormat);

const Messages = ({ messages, userId }) => {
  let prevDateStr = null;
  const [lastReadAt, setLastReadAt] = useState(null);
  const [lastMessageId, setlastMessageId] = useState(null);

  useEffect(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender.id === userId && messages[i].readAt) {
        console.log(messages[i]);
        setlastMessageId(messages[i].id);
        setLastReadAt(messages[i].readAt);
        break;
      }
    }
  }, [messages, userId]);

  return messages.map((message) => {
    const curDate = new Date(message.createdAt);
    const prevDate = prevDateStr !== null ? new Date(prevDateStr) : null;

    let showDivider = true;
    if (prevDate) {
      const timeDifference = (curDate - prevDate) / (1000 * 60 * 60);
      showDivider = timeDifference >= 1;
    }
    prevDateStr = message.createdAt;
    return (
      <Fragment key={message.id}>
        {showDivider && (
          <Divider variant="middle" sx={{ marginTop: 5, marginBottom: 5 }}>
            <Typography variant="caption" color="grey">
              {dayjs(curDate).format("LLL")}
            </Typography>
          </Divider>
        )}
        {message.sender.id === userId ? (
          <MyMessage
            key={message.id}
            username={"You"}
            content={message.content}
            readAt={lastMessageId === message.id ? lastReadAt : null}
          />
        ) : (
          <OtherMessage
            key={message.id}
            username={message.sender.username}
            content={message.content}
          />
        )}
      </Fragment>
    );
  });
};

export default Messages;
