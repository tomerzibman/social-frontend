import { CardActions, Divider, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const PostActions = ({ likes, commentsCount, onLike }) => (
  <>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={onLike}>
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
    <Divider />
  </>
);

export default PostActions;
