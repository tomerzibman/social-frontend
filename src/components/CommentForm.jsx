import { useState } from "react";

const CommentForm = ({ postId, createComment }) => {
  const [comment, setComment] = useState("");

  const addComment = async (event) => {
    event.preventDefault();
    const commentObj = {
      content: comment,
      postId,
    };
    await createComment(commentObj);
    setComment("");
  };

  return (
    <form onSubmit={addComment}>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Add a comment..."
          rows="3"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary float-right mt-2">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
