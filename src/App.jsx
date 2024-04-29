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
  const [connected, setConnected] = useState(socket.connected);

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

      console.log("emit resetUnreadCount");
      socket.emit("resetUnreadCount", {
        conversation: message.conversation,
        participant: user.id,
      });

      // const updatedMessages = [...messages, message];
      // setMessages(updatedMessages);
      setMessages((prevMessages) => [...prevMessages, message]);

      if (message.sender.id.toString() !== user.id.toString()) {
        console.log("emit markAsRead:", message.content);
        const dateiso = new Date().toISOString();
        socket.emit("markAsRead", {
          id: message.id,
          sender: message.sender.id,
          readAt: dateiso,
        });
      }

      messagesEndRef.current.scrollToBottom;
      // console.log(message.sender.id.toString());
      // console.log(user.id.toString());
      // if (message.sender.id.toString() !== user.id.toString()) {
      //   const dateiso = new Date().toISOString();
      //   const readMessage = { ...message, readAt: dateiso };
      //   setMessages((prevMessages) => [...prevMessages, readMessage]);
      //   console.log("emit markAsRead");
      //   socket.emit("markAsRead", { ...message, readAt: dateiso });
      // } else {
      //   setMessages((prevMessages) => [...prevMessages, message]);
      // }
      // setTimeout(messagesEndRef.current.scrollToBottom, 50);
    };

    const onUpdateUnreadCount = (updatedUnreadCount) => {
      console.log("on updateUnreadCount");
      setUnreadCounts((prevUnreadCounts) =>
        prevUnreadCounts.map((uc) =>
          uc.participant.toString() ===
            updatedUnreadCount.participant.toString() &&
          uc.conversation.toString() ===
            updatedUnreadCount.conversation.toString()
            ? updatedUnreadCount
            : uc
        )
      );
    };

    const onMessageRead = (messageData) => {
      console.log("on messageRead");
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageData.id
            ? { ...message, readAt: messageData.readAt }
            : message
        )
      );
      // const updatedMessages = messages.map((message) => {
      //   if (message.id.toString() === messageData.id.toString()) {
      //     console.log("attaching read reciept");
      //     return { ...message, readAt: messageData.readAt };
      //   }
      //   return message;
      // });
      // setMessages(updatedMessages);
    };

    // when clicking into a convo, send an event to read all unread messages in unread count.
    // Then send them back to here and update the messages
    const onReadMessages = (data) => {
      console.log("on readMessages");
      console.log(data);
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          data.messagesIds.includes(message.id)
            ? { ...message, readAt: data.readAt }
            : message
        )
      );
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newMessage", onNewMessage);
    socket.on("updateUnreadCount", onUpdateUnreadCount);
    socket.on("messageRead", onMessageRead);
    socket.on("readMessages", onReadMessages);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newMessage", onNewMessage);
      socket.off("updateUnreadCount", onUpdateUnreadCount);
      socket.off("messageRead", onMessageRead);
      socket.off("readMessages", onReadMessages);
    };
  }, [user, unreadCounts, messages]);

  useEffect(() => {
    if (user && connected) {
      console.log("emit joinReceiver");
      socket.emit("joinReceiver", user.id);
    }
  }, [user, connected]);

  useEffect(() => {
    // no-op if the socket is already connected
    console.log("calling socket.connect()");
    socket.connect();

    return () => {
      console.log("calling socket.disconnect()");
      socket.disconnect();
    };
  }, []);

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
      setUser(() => userData);
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

  const handleConversationClick = async (conversation) => {
    setSelectedConversation(conversation);
    console.log("emit joinConversation");
    socket.emit("joinConversation", conversation.id);
    // socket.emit("resetUnreadCount", {
    //   conversation: conversation.id,
    //   participant: user.id,
    // });
    // console.log("emit readUnreadMessages");
    // socket.emit("readUnreadMessages", {
    //   conversation: conversation.id,
    //   sender: user.id,
    //   reciver: conversation.participants.find((p) => p.id !== user.id).id,
    // });

    try {
      const curMessages = await messageService.getMessagesForConversation(
        conversation.id
      );
      setMessages(() => curMessages);
      setTimeout(messagesEndRef.current.scrollToBottom, 50);

      console.log("emit readUnreadMessages");
      socket.emit("readUnreadMessages", {
        conversation: conversation.id,
        sender: user.id,
        reciver: conversation.participants.find((p) => p.id !== user.id).id,
        dateiso: new Date().toISOString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deselectConversation = () => {
    setSelectedConversation(() => null);
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
                deselectConversation={deselectConversation}
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
                handleConversationClick={handleConversationClick}
                connected={connected}
                unreadCounts={unreadCounts}
                deselectConversation={deselectConversation}
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
