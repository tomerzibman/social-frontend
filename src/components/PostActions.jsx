import { useState } from "react";
import { CardActions, Divider, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";

import Notification from "./Notification";

const PostActions = ({
  likes,
  commentsCount,
  onLike,
  onUnlike,
  loggedIn,
  userId,
}) => {
  const [warnUser, setWarnUser] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarnUser(false);
  };

  const interactLike = async () => {
    if (!loggedIn) {
      setWarnUser(true);
      return;
    }
    try {
      if (likes.includes(userId)) {
        await onUnlike();
      } else {
        await onLike();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={interactLike}>
          {likes.includes(userId) ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likes.length} Likes
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
