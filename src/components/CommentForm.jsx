import { useState } from "react";
import { Button, CardActions, TextField } from "@mui/material";

const CommentForm = ({ createComment, postId }) => {
  const [comment, setComment] = useState("");

  const addComment = async (event) => {
    event.preventDefault();
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
    </CardActions>
  );
};

export default CommentForm;
