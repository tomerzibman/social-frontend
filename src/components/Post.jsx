const postStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "300px",
  boxSizing: "border-box",
};

const Post = ({ title, author, content, likes, incrementLike }) => {
  return (
    <div style={postStyle}>
      <div>
        <h3>{title}</h3>
        <p>By: {author}</p>
      </div>
      <p>{content}</p>
      <div>
        <p>Likes: {likes}</p>
        <button onClick={incrementLike}>Like Post</button>
      </div>
    </div>
  );
};

export default Post;
