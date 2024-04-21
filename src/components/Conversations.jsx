import { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";
import conversationService from "../services/conversations";
import messageService from "../services/messages";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

const Conversations = ({ userId }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userId) {
      conversationService.getConversationsForUser(userId).then((convos) => {
        setConversations(convos);
      });

      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setTimeout(scrollToBottom, 0);
      });

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userId]);

  const handleConversationClick = async (conversation) => {
    setSelectedConversation(conversation);
    socket.emit("joinConversation", conversation.id);

    try {
      const curMessages = await messageService.getMessagesForConversation(
        conversation.id
      );
      setMessages(curMessages);
      setTimeout(scrollToBottom, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSubmit = () => {
    if (!selectedConversation) {
      return;
    }
    const messageData = {
      conversation: selectedConversation.id,
      sender: userId,
      content: messageInput,
    };

    socket.emit("sendMessage", messageData);
    setMessageInput("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: "calc(100vh - 64px)" }}>
      {" "}
      {/* 64px is the height of the AppBar */}
      {/* Conversations List */}
      <Grid item xs={3}>
        <Paper elevation={3} sx={{ height: "100%", overflow: "auto" }}>
          <List>
            {conversations.map((conversation) => (
              <ListItem
                button
                key={conversation.id}
                onClick={() => handleConversationClick(conversation)}
              >
                <Avatar
                  src={
                    conversation.participants.find((p) => p.id !== userId).photo
                  }
                  sx={{ marginRight: 1 }}
                />
                <ListItemText
                  primary={
                    conversation.participants.find((p) => p.id !== userId)
                      .username
                  }
                />
                <Divider />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      {/* Selected Conversation */}
      <Grid item xs={9}>
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" sx={{ p: 2 }}>
            {selectedConversation && (
              <Avatar
                src={
                  selectedConversation.participants.find((p) => p.id !== userId)
                    .photo
                }
                sx={{ marginRight: 1 }}
              />
            )}
            <Typography variant="h6">
              {selectedConversation
                ? selectedConversation.participants.find((p) => p.id !== userId)
                    .username
                : "Select a conversation"}
            </Typography>
          </Stack>
          <Divider sx={{ marginBottom: 2 }} />
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: "0 16px",
              maxHeight: 600,
              display: "flex",
              flexDirection: "column",
              scrollBehavior: "smooth",
            }}
          >
            {messages.map((message) => {
              if (message.sender.id === userId) {
                return (
                  <MyMessage
                    key={message.id}
                    username={"You"}
                    content={message.content}
                  />
                );
              } else {
                return (
                  <OtherMessage
                    key={message.id}
                    username={message.sender.username}
                    content={message.content}
                  />
                );
              }
            })}
            <div ref={messagesEndRef} />
          </Box>
          {selectedConversation !== null && (
            <Box sx={{ padding: "16px", borderTop: "1px solid #e0e0e0" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message"
                    value={messageInput}
                    onChange={handleMessageChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleMessageSubmit}
                    disabled={messageInput.length == 0}
                  >
                    <SendIcon sx={{ marginRight: 0.5 }} /> Send
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Conversations;
