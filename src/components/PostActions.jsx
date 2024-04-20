import { useState } from "react";
import { CardActions, Divider, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

import Notification from "./Notification";

const PostActions = ({ likes, commentsCount, onLike, loggedIn }) => {
  const [warnUser, setWarnUser] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarnUser(false);
  };

  const likePost = async () => {
    if (!loggedIn) {
      setWarnUser(true);
      return;
    }
    try {
      await onLike();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likePost}>
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likes} Likes
        </Typography>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {commentsCount} Comments
        </Typography>
      </CardActions>
      <Notification
        varient={"error"}
        message={"Must be logged in to like"}
        open={warnUser}
        handleClose={handleClose}
      />
      <Divider />
    </>
  );
};

export default PostActions;
