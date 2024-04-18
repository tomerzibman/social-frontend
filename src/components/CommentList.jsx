import { CardContent, List, ListItem, ListItemText } from "@mui/material";

const CommentList = ({ comments }) => (
  <CardContent>
    <List>
      {comments.map((comment, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={comment.content}
            secondary={`${comment.user.username}`}
          />
        </ListItem>
      ))}
    </List>
  </CardContent>
);

export default CommentList;
