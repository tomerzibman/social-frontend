const Comment = ({ username, content }) => {
  return (
    <div className="comment">
      <strong>{username}</strong>
      <p>{content}</p>
      <small>{new Date().toLocaleString()}</small>
    </div>
  );
};

const Comments = ({ comments }) => {
  return (
    <div className="comments">
      <h2>Comments</h2>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            username={comment.user.username}
            content={comment.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
