const CommentForm = () => {
  return (
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
  );
};

export default CommentForm;
