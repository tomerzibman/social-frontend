import { CardContent, Typography } from "@mui/material";

const PostContent = ({ title, content }) => (
  <CardContent>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {content}
    </Typography>
  </CardContent>
);

export default PostContent;
