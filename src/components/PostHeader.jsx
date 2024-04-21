import { Avatar, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PostHeader = ({ username, date, photo, posterId }) => {
  const displayDate = dayjs(date).fromNow();
  return (
    <CardHeader
      avatar={
        <Avatar
          alt={username}
          src={photo || "http://localhost:3000/images/default.jpg"}
          component={Link}
          to={`/user/${posterId}`}
        />
      }
      title={
        <Typography
          variant="subtitle2"
          color="textPrimary"
          component={Link}
          to={`/user/${posterId}`}
        >
          {username}
        </Typography>
      }
      subheader={displayDate}
    />
  );
};

export default PostHeader;
