import { useState } from "react";
import { Button, CardActions, TextField } from "@mui/material";

import Notification from "./Notification";

const CommentForm = ({ createComment, postId, loggedIn }) => {
  const [comment, setComment] = useState("");
  const [warnUser, setWarnUser] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarnUser(false);
  };

  const addComment = async (event) => {
    event.preventDefault();
    if (!loggedIn) {
      setWarnUser(true);
      return;
    }

    const commentObj = {
      content: comment,
      postId,
    };
    await createComment(commentObj);
    setComment("");
  };

  return (
    <CardActions>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add a comment..."
        value={comment}
        onChange={({ target }) => {
          setComment(target.value);
        }}
      />
      <Button variant="contained" color="primary" onClick={addComment}>
        Comment
      </Button>
      <Notification
        varient={"error"}
        message={"Must be logged in to comment"}
        open={warnUser}
        handleClose={handleClose}
      />
    </CardActions>
  );
};

export default CommentForm;
