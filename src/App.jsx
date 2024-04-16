import { useState, useEffect } from "react";

import Feed from "./components/Feed";
import PostForm from "./components/PostForm";

import postsService from "./services/posts";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postsService.getAll().then((firstPosts) => {
      setPosts(firstPosts);
    });
  }, []);

  const incrementLikeOf = (postId) => {
    const post = posts.find((post) => post.id == postId);
    const updatedPost = { ...post, likes: post.likes + 1 };

    postsService.update(updatedPost, postId).then((likedPost) => {
      const updatedPosts = posts.map((post) =>
        post.id == postId ? likedPost : post
      );
      setPosts(updatedPosts);
    });
  };

  const createPost = (postToAdd) => {
    postsService.create(postToAdd).then((newPost) => {
      setPosts(posts.concat(newPost));
    });
  };

  return (
    <>
      <PostForm createPost={createPost} />
      <Feed posts={posts} incrementLikeOf={incrementLikeOf} />
    </>
  );
}

export default App;
