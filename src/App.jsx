import { useState, useEffect } from "react";

import Feed from "./components/Feed";
import PostForm from "./components/PostForm";

import postsService from "./services/posts";
import loginService from "./services/login";
import LoginOrSignUp from "./components/LoginOrSignUp";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const loggedIn = user != null;

  useEffect(() => {
    postsService.getAll().then((firstPosts) => {
      setPosts(firstPosts);
    });
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      postsService.setToken(userData.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const userData = await loginService.login(credentials);
      setUser(userData);
      postsService.setToken(userData.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const incrementLikeOf = async (postId) => {
    const post = posts.find((post) => post.id == postId);
    const updatedPost = { ...post, likes: post.likes + 1 };

    try {
      const likedPost = await postsService.update(updatedPost, postId);
      const updatedPosts = posts.map((post) =>
        post.id == postId ? likedPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (postToAdd) => {
    try {
      const newPost = await postsService.create(postToAdd);
      setPosts(posts.concat(newPost));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!loggedIn && <LoginOrSignUp handleLogin={handleLogin} />}
      {loggedIn && (
        <>
          <PostForm createPost={createPost} />
          <Feed posts={posts} incrementLikeOf={incrementLikeOf} />
        </>
      )}
    </>
  );
}

export default App;
