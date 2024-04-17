import { useState } from "react";
// const postStyle = {
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   padding: "16px",
//   marginBottom: "16px",
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   width: "300px",
//   boxSizing: "border-box",
// };

const Post = ({
  title,
  username,
  content,
  likes,
  createdAt,
  incrementLike,
}) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };
  return (
    <div className="postCard">
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="rounded-circle mr-3"
          />
          <div>
            <h5 className="mb-0">{username}</h5>
            <small>Posted on: {new Date(createdAt).toLocaleDateString()}</small>
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-text">{content}</p>
          <div className="d-flex justify-content-between">
            <p>Likes: {likes}</p>
            <button className="btn btn-primary" onClick={incrementLike}>
              Like Post
            </button>
          </div>
          <hr />
          <form>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Add a comment..."
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Add Comment
            </button>
          </form>
          <button className="commentToggle mt-3" onClick={toggleComments}>
            View Comments
          </button>
          <ul className={`commentsList mt-3 ${showComments ? "visible" : ""}`}>
            <li>Comment 1</li>
            <li>Comment 2</li>
            <li>Comment 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Post;
