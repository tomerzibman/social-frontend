const PostContent = ({ title, content, likes, incrementLike }) => {
  return (
    <div>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{content}</p>
      <div className="d-flex justify-content-between">
        <p>Likes: {likes}</p>
        <button className="btn btn-primary" onClick={incrementLike}>
          Like Post
        </button>
      </div>
      <hr />
    </div>
  );
};

export default PostContent;
