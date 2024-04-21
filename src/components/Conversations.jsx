import { useState } from "react";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

const MyMessage = ({ name, content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "8px",
      }}
    >
      <Paper
        elevation={3}
        square={false}
        sx={{
          maxWidth: "70%",
          padding: "8px 12px",
          backgroundColor: "#2196f3",
          marginRight: "8px",
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ textAlign: "right", marginBottom: "4px", color: "white" }}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          style={{ textAlign: "right", color: "white" }}
        >
          {content}
        </Typography>
      </Paper>
    </div>
  );
};

const OtherMessage = ({ name, content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "8px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: "70%",
          padding: "8px 12px",
          backgroundColor: "#ffffff",
          marginLeft: "8px",
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ textAlign: "left", marginBottom: "4px" }}
        >
          {name}
        </Typography>
        <Typography variant="body1" style={{ textAlign: "left" }}>
          {content}
        </Typography>
      </Paper>
    </div>
  );
};

export { MyMessage, OtherMessage };

const Conversations = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Alice",
      messages: [
        { name: "Alice", content: "Hi" },
        { name: "You", content: "Hello" },
      ],
    },
    {
      id: 2,
      name: "Bob",
      messages: [
        { name: "Bob", content: "Hey" },
        { name: "You", content: "How are you?" },
      ],
    },
    {
      id: 3,
      name: "Claire",
      messages: [
        { name: "Claire", content: "Good morning" },
        { name: "You", content: "Morning!" },
      ],
    },
  ];

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSubmit = () => {
    if (selectedConversation) {
      const updatedConversation = {
        ...selectedConversation,
        messages: [
          ...selectedConversation.messages,
          { name: "You", content: messageInput },
        ],
      };
      setSelectedConversation(updatedConversation);
      setMessageInput("");
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
              <>
                <ListItem
                  button
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                >
                  <ListItemText primary={conversation.name} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Paper>
      </Grid>
      {/* Selected Conversation */}
      <Grid item xs={9}>
        <Paper
          elevation={3}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            {selectedConversation
              ? selectedConversation.name
              : "Select a conversation"}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <div style={{ flex: 1, overflow: "auto", padding: "0 16px" }}>
            {selectedConversation?.messages.map((message, index) => {
              if (message.name === "You") {
                return (
                  <MyMessage
                    key={index}
                    name={message.name}
                    content={message.content}
                  />
                );
              } else {
                return (
                  <OtherMessage
                    key={index}
                    name={message.name}
                    content={message.content}
                  />
                );
              }
            })}
          </div>
          <div style={{ padding: "16px", borderTop: "1px solid #e0e0e0" }}>
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
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Conversations;
