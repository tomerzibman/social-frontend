import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from "./components/Feed";
import PostForm from "./components/PostForm";
import LoginOrSignUp from "./components/LoginOrSignUp";
import SearchAppBar from "./components/SearchAppBar";

import postsService from "./services/posts";
import loginService from "./services/login";
import commentService from "./services/comments";
import UserProfile from "./components/UserProfile";
import UserSearchResults from "./components/UserSearchResults";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const loggedIn = user != null;

  useEffect(() => {
    postsService
      .getAll()
      .then((firstPosts) => {
        setPosts(firstPosts);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      postsService.setToken(userData.token);
      commentService.setToken(userData.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    const userData = await loginService.login(credentials);
    setUser(userData);
    postsService.setToken(userData.token);
    commentService.setToken(userData.token);
    window.localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const incrementLikeOf = async (postId) => {
    const post = posts.find((post) => post.id == postId);
    const updatedPost = { ...post, likes: post.likes + 1 };

    const likedPost = await postsService.update(updatedPost, postId);
    const updatedPosts = posts.map((post) =>
      post.id == postId ? likedPost : post
    );
    setPosts(updatedPosts);

    // try {
    //   const likedPost = await postsService.update(updatedPost, postId);
    //   const updatedPosts = posts.map((post) =>
    //     post.id == postId ? likedPost : post
    //   );
    //   setPosts(updatedPosts);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const createPost = async (postToAdd) => {
    const newPost = await postsService.create(postToAdd);
    setPosts(posts.concat(newPost));
  };

  const createComment = async (commentToAdd) => {
    try {
      const newComment = await commentService.create(commentToAdd);
      const postToEdit = posts.find((post) => post.id === commentToAdd.postId);
      const updatedPost = {
        ...postToEdit,
        comments: postToEdit.comments.concat(newComment),
      };
      const newPosts = posts.map((post) =>
        post.id === commentToAdd.postId ? updatedPost : post
      );
      setPosts(newPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Router>
        <SearchAppBar
          loggedIn={loggedIn}
          photo={user && user.photo ? user.photo : null}
        />
        <Routes>
          <Route
            path="/login"
            element={<LoginOrSignUp handleLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              <>
                {loggedIn && <PostForm createPost={createPost} />}{" "}
                <Feed
                  posts={posts}
                  incrementLikeOf={incrementLikeOf}
                  createComment={createComment}
                  loggedIn={loggedIn}
                />
              </>
            }
          />
          <Route path="/users" element={<UserSearchResults />} />
          <Route
            path="/user/:id"
            element={
              <UserProfile
                incrementLikeOf={incrementLikeOf}
                createComment={createComment}
                loggedIn={loggedIn}
                curUserId={user !== null ? user.id : null}
              />
            }
          />
        </Routes>
        {/* {!loggedIn ? (
          <LoginOrSignUp handleLogin={handleLogin} />
        ) : (
          <>
            <PostForm createPost={createPost} />
            <Feed
              posts={posts}
              incrementLikeOf={incrementLikeOf}
              createComment={createComment}
            />
          </>
        )} */}
      </Router>
    </Container>
  );
}

export default App;
