import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = ({ username, content, createdAt }) => {
  dayjs.extend(relativeTime);
  const displayDate = dayjs(createdAt).fromNow();
  return (
    <div className="comment mt-0 mb-2">
      <strong>{username}</strong>
      <p className="mb-0">{content}</p>
      <small className="text-muted">{displayDate}</small>
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
          <h3 className="mt-2">Comments</h3>
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
