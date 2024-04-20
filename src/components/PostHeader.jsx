import { Avatar, CardHeader, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PostHeader = ({ username, date, photo }) => {
  const displayDate = dayjs(date).fromNow();
  return (
    <CardHeader
      avatar={
        <Avatar
          alt={username}
          src={photo || "http://localhost:3000/images/default.jpg"}
        />
      }
      title={
        <Typography variant="subtitle2" color="textPrimary">
          {username}
        </Typography>
      }
      subheader={displayDate}
    />
  );
};

export default PostHeader;
