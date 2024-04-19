import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

const PostFormMUI = ({ createPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
    setHasError(false);
  };

  const handleContentChange = ({ target }) => {
    setContent(target.value);
    setHasError(false);
  };

  const addPost = async (event) => {
    event.preventDefault();

    if (!title || !content) {
      setHasError(true);
      return;
    }

    const postObject = {
      title,
      content,
    };
    try {
      await createPost(postObject);
      setTitle("");
      setContent("");
      setOpen(false);
    } catch (error) {
      setHasError(true);
      console.log(error);
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" my={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Create Post
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={handleContentChange}
          />
          {hasError && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              gutterBottom
            >
              title and content are required
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={addPost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostFormMUI;