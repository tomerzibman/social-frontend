const Comment = ({ username, content, createdAt }) => {
  return (
    <div className="comment mt-2">
      <strong>{username}</strong>
      <p className="mb-0">{content}</p>
      <small className="text-muted">
        {new Date(createdAt).toLocaleString()}
      </small>
    </div>
  );
};

const Comments = ({ comments }) => {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  return (
    <>
      {comments.length > 0 && (
        <div className="comments">
          <h2 className="mt-4">Comments</h2>
          <div
            className="comments-list"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {sortedComments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.user.username}
                content={comment.content}
                createdAt={comment.createdAt}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
