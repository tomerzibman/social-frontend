import {
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CommentList = ({ comments }) => {
  const displayDate = (date) => {
    return dayjs(date).fromNow();
  };

  return (
    <CardContent>
      <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={comment.user.username}
                  src={
                    comment.user.photo ||
                    "http://localhost:3000/images/default.jpg"
                  }
                  sx={{ width: 30, height: 30, marginTop: 1 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Paper
                    elevation={2}
                    sx={{
                      padding: 1,
                      borderRadius: 2,
                      backgroundColor: "grey.200",
                    }}
                  >
                    <Typography variant="subtitle2" color="textPrimary">
                      {comment.user.username}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      display="block"
                    >
                      {comment.content}
                    </Typography>
                  </Paper>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="caption"
                      color="textSecondary"
                    >
                      {displayDate(comment.createdAt)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </CardContent>
  );
};

export default CommentList;
