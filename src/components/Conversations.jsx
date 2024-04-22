import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useParams, Link } from "react-router-dom";
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

import Messages from "./Messages";
import { socket } from "../socket";

const Conversations = forwardRef((props, ref) => {
  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToBottom() {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        },
      };
    },
    []
  );

  const { convoId } = useParams();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (props.conversations.length > 0 && convoId) {
      props.handleConversationClick(
        props.conversations.find((convo) => convo.id == convoId)
      );
    }
  }, [convoId, props.conversations]);

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSubmit = () => {
    if (!props.selectedConversation) {
      return;
    }
    const messageData = {
      conversation: props.selectedConversation.id,
      sender: props.userId,
      content: messageInput,
    };

    console.log("emit sendMessage: ", messageData.content);
    socket.emit("sendMessage", messageData);
    setTimeout(scrollToBottom, 50);
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
            {props.conversations.map((conversation) => (
              <Box key={conversation.id}>
                <ListItem
                  button
                  key={conversation.id}
                  component={Link}
                  to={`/conversations/${conversation.id}`}
                >
                  <Avatar
                    src={
                      conversation.participants.find(
                        (p) => p.id !== props.userId
                      ).photo
                    }
                    sx={{ marginRight: 1 }}
                  />
                  <ListItemText
                    primary={
                      conversation.participants.find(
                        (p) => p.id !== props.userId
                      ).username
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
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
            {props.selectedConversation && (
              <Avatar
                src={
                  props.selectedConversation.participants.find(
                    (p) => p.id !== props.userId
                  ).photo
                }
                sx={{ marginRight: 1 }}
              />
            )}
            <Typography variant="h6">
              {props.selectedConversation
                ? props.selectedConversation.participants.find(
                    (p) => p.id !== props.userId
                  ).username
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
            <Messages messages={props.messages} userId={props.userId} />
            <div ref={messagesEndRef} />
          </Box>
          {props.selectedConversation !== null && (
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
});

Conversations.displayName = "Conversations";

export default Conversations;
