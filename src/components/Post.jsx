import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const Post = ({
  id,
  title,
  username,
  content,
  likes,
  createdAt,
  comments,
  incrementLike,
  createComment,
  photo,
}) => {
  return (
    <div className="postCard mt-2">
      <div className="card">
        <PostHeader username={username} createdAt={createdAt} photo={photo} />
        <div className="card-body">
          <PostContent
            title={title}
            content={content}
            likes={likes}
            incrementLike={incrementLike}
          />
          <Comments comments={comments} />
          <CommentForm postId={id} createComment={createComment} />
        </div>
      </div>
    </div>
  );
};

export default Post;
