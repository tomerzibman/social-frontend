import { useState, useEffect, useRef } from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from "./components/Feed";
import PostForm from "./components/PostForm";
import LoginOrSignUp from "./components/LoginOrSignUp";
import SearchAppBar from "./components/SearchAppBar";
import Loading from "./components/Loading";
import Conversations from "./components/Conversations";
import UserProfile from "./components/UserProfile";
import UserSearchResults from "./components/UserSearchResults";

import postsService from "./services/posts";
import loginService from "./services/login";
import userService from "./services/user";
import conversationService from "./services/conversations";
import commentService from "./services/comments";
import messageService from "./services/messages";
import unreadCountService from "./services/unreadCounts";

import { socket } from "./socket";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState([]);
  const [connected, setConnected] = useState(false);

  const messagesEndRef = useRef(null);

  const loggedIn = user != null;

  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
      console.log("socket connected");
    };
    const onDisconnect = () => {
      setConnected(false);
      console.log("socket disconnected");
    };
    const onNewMessage = (message) => {
      console.log("on newMessage: ", message.content);
      socket.emit("markAsRead", {
        conversation: message.conversation,
        participant: user.id,
      });
      setMessages((prevMessages) => [...prevMessages, message]);
      setTimeout(messagesEndRef.current.scrollToBottom, 50);
    };
    const onUpdateUnreadCount = (updatedUnreadCount) => {
      console.log("on updateUnreadCount");
      console.log(updatedUnreadCount);
      setUnreadCounts(
        unreadCounts.map((uc) =>
          uc.participant.toString() ===
            updatedUnreadCount.participant.toString() &&
          uc.conversation.toString() ===
            updatedUnreadCount.conversation.toString()
            ? updatedUnreadCount
            : uc
        )
      );
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newMessage", onNewMessage);
    socket.on("updateUnreadCount", onUpdateUnreadCount);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newMessage", onNewMessage);
      socket.off("updateUnreadCount", onUpdateUnreadCount);
    };
  }, [user, unreadCounts]);

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
      userService.setToken(userData.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      conversationService.getConversationsForUser(user.id).then((convos) => {
        setConversations(convos);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      unreadCountService.getUnreadCounts(user.id).then((userUnreadCounts) => {
        setUnreadCounts(userUnreadCounts);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("joinReceiver", user.id);

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  const handleConversationClick = async (conversation) => {
    setSelectedConversation(conversation);
    socket.emit("joinConversation", conversation.id);
    socket.emit("markAsRead", {
      conversation: conversation.id,
      participant: user.id,
    });

    try {
      const curMessages = await messageService.getMessagesForConversation(
        conversation.id
      );
      setMessages(curMessages);
      setTimeout(messagesEndRef.current.scrollToBottom, 50);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (credentials) => {
    const userData = await loginService.login(credentials);
    setUser(userData);
    postsService.setToken(userData.token);
    commentService.setToken(userData.token);
    userService.setToken(userData.token);
    window.localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const likePost = async (postId) => {
    const likedPost = await postsService.like(postId);
    const updatedPosts = posts.map((post) =>
      post.id === postId ? likedPost : post
    );
    setPosts(updatedPosts);
    return likedPost;
  };

  const unlikePost = async (postId) => {
    const likedPost = await postsService.unlike(postId);
    const updatedPosts = posts.map((post) =>
      post.id === postId ? likedPost : post
    );
    setPosts(updatedPosts);
    return likedPost;
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

  const updateUser = async (userObject) => {
    const updatedUserData = await userService.updateUser(userObject, user.id);
    const updatedLoggedInUser = {
      ...user,
      username: updatedUserData.username,
      name: updatedUserData.name,
      photo: updatedUserData.photo,
    };
    setUser(updatedLoggedInUser);
    window.localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedLoggedInUser)
    );
    return updatedUserData;
  };

  const createConversation = async (convoObj) => {
    const newConvo = await conversationService.createConversation(convoObj);
    setConversations((prevConvos) => [...prevConvos, newConvo]);
    return newConvo;
  };

  return (
    <Container>
      <Router>
        <SearchAppBar
          loggedIn={loggedIn}
          photo={user && user.photo ? user.photo : null}
          curUserId={user !== null ? user.id : null}
          unreadCount={unreadCounts.reduce((total, unreadCount) => {
            return total + unreadCount.count;
          }, 0)}
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
                {loggedIn && posts.length > 0 && (
                  <PostForm
                    createPost={createPost}
                    name={user !== null ? user.name.split(" ")[0] : null}
                  />
                )}{" "}
                {posts.length > 0 ? (
                  <Feed
                    posts={posts}
                    likePost={likePost}
                    unlikePost={unlikePost}
                    createComment={createComment}
                    loggedIn={loggedIn}
                    userId={user !== null ? user.id : null}
                  />
                ) : (
                  <Loading />
                )}
              </>
            }
          />
          <Route path="/users" element={<UserSearchResults />} />
          <Route
            path="/user/:id"
            element={
              <UserProfile
                likePost={likePost}
                unlikePost={unlikePost}
                createComment={createComment}
                loggedIn={loggedIn}
                curUserId={user !== null ? user.id : null}
                updateUser={updateUser}
                conversations={conversations}
                createConversation={createConversation}
              />
            }
          />
          <Route
            path="/conversations/:convoId"
            element={
              <Conversations
                userId={user !== null ? user.id : null}
                conversations={conversations}
                messages={messages}
                selectedConversation={selectedConversation}
                handleConversationClick={handleConversationClick}
                connected={connected}
                unreadCounts={unreadCounts}
                ref={messagesEndRef}
              />
            }
          />
          <Route
            path="/conversations"
            element={
              <Conversations
                userId={user !== null ? user.id : null}
                conversations={conversations}
                messages={messages}
                selectedConversation={selectedConversation}
                connected={connected}
                unreadCounts={unreadCounts}
                ref={messagesEndRef}
              />
            }
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
