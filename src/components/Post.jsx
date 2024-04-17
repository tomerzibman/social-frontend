import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const Post = ({
  title,
  username,
  content,
  likes,
  createdAt,
  incrementLike,
}) => {
  const comments = [
    {
      user: {
        username: "swgger",
      },
      content: "this is a comment",
    },
    {
      user: {
        username: "peppermint",
      },
      content: "i like elmo cuz hes red",
    },
  ];

  return (
    <div className="postCard">
      <div className="card">
        <PostHeader username={username} createdAt={createdAt} />
        <div className="card-body">
          <PostContent
            title={title}
            content={content}
            likes={likes}
            incrementLike={incrementLike}
          />
          <CommentForm />
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default Post;
