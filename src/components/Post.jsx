import { Card, Divider } from "@mui/material";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const Post = ({
  id,
  title,
  username,
  content,
  likes,
  createdAt,
  comments,
  onLike,
  onUnlike,
  createComment,
  photo,
  loggedIn,
  posterId,
  userId,
}) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", marginBottom: 2 }}>
      <PostHeader
        username={username}
        date={createdAt}
        photo={photo}
        posterId={posterId}
      />
      <PostContent title={title} content={content} />
      <PostActions
        likes={likes}
        commentsCount={comments.length}
        onLike={onLike}
        onUnlike={onUnlike}
        loggedIn={loggedIn}
        userId={userId}
      />
      <Divider />
      {comments.length > 0 && (
        <>
          <CommentList comments={comments} />
          <Divider />
        </>
      )}
      <CommentForm
        createComment={createComment}
        postId={id}
        loggedIn={loggedIn}
      />
    </Card>
  );
};

export default Post;
