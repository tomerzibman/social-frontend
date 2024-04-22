import { Fragment } from "react";
import { Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";

dayjs.extend(LocalizedFormat);

const Messages = ({ messages, userId }) => {
  let prevDateStr = null;

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
