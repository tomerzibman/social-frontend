import { useState } from "react";

const PostForm = ({ createPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const buttonLabel = showForm ? "Hide form" : "Show form";

  const toggleVisibility = () => {
    setShowForm(!showForm);
  };

  const addPost = async (event) => {
    event.preventDefault();
    const postObject = {
      title,
      content,
      likes: 0,
    };
    await createPost(postObject);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div>
      {showForm && (
        <div>
          <form onSubmit={addPost}>
            <div>
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                placeholder="Title"
              />
            </div>
            <div>
              <textarea
                value={content}
                onChange={({ target }) => setContent(target.value)}
                placeholder="Content"
              />
            </div>
            <button type="submit">Create Post</button>
          </form>
        </div>
      )}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
    </div>
  );
};

export default PostForm;
