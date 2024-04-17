import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
          <Form onSubmit={addPost}>
            <Form.Group controlId="postTitle">
              <Form.Control
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                placeholder="Title"
                className="mt-5 mb-2"
              />
            </Form.Group>
            <Form.Group controlId="postContent">
              <Form.Control
                as="textarea"
                value={content}
                onChange={({ target }) => setContent(target.value)}
                placeholder="What's on your mind?"
                className="mb-2"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form>
        </div>
      )}
      <Button onClick={toggleVisibility} className="mt-2">
        {buttonLabel}
      </Button>
    </div>
  );
};

export default PostForm;
