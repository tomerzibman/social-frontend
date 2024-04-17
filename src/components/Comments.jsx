const Comment = ({ username, content }) => {
  return (
    <div className="comment mt-2">
      <strong>{username}</strong>
      <p className="mb-0">{content}</p>
      <small className="text-muted">{new Date().toLocaleString()}</small>
    </div>
  );
};

const Comments = ({ comments }) => {
  return (
    <>
      {comments.length > 0 && (
        <div className="comments">
          <h2 className="mt-4">Comments</h2>
          <div
            className="comments-list"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.user.username}
                content={comment.content}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
