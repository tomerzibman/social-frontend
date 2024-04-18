import { Avatar, CardHeader } from "@mui/material";

const PostHeader = ({ username, date, photo }) => (
  <CardHeader
    avatar={<Avatar alt={username} src={photo} />}
    title={username}
    subheader={new Date(date).toLocaleDateString()}
  />
);

export default PostHeader;
