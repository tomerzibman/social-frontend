import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";

import Messages from "./Messages";
import ConversationList from "./ConversationList";
import { socket } from "../socket";

const Conversations = forwardRef((props, ref) => {
  const [messageInput, setMessageInput] = useState("");
  const [maxHeight, setMaxHeight] = useState(0);
  const [isCompactView, setIsCompactView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const paperRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToBottom() {
          setDrawerOpen(false);
          messagesEndRef.current.scrollIntoView({ behavior: "auto" });
        },
      };
    },
    []
  );

  const { convoId } = useParams();

  useEffect(() => {
    // if (!props.connected) {
    //   socket.connect();
    // }
    if (convoId) {
      console.log(`emit joinConversation : ${convoId}`);
      socket.emit("joinConversation", convoId);
    }
    // if (props.userId) {
    //   console.log(`emit joinReceiver : ${props.userId}`);
    //   socket.emit("joinReceiver", props.userId);
    // }

    return () => {
      if (props.connected && convoId) {
        console.log("emit leaveConversation");
        socket.emit("leaveConversation", convoId);
      }
      props.deselectConversation();
    };
  }, [convoId, props.connected]);

  useEffect(() => {
    if (props.conversations.length > 0 && convoId) {
      props.handleConversationClick(
        props.conversations.find((convo) => convo.id == convoId)
      );
    }
  }, [convoId, props.conversations]);

  useEffect(() => {
    const calculateMaxHeight = () => {
      const isOverflowActive = (event) => {
        if (!event) {
          return false;
        }
        return event.offsetWidth < event.scrollWidth;
      };

      const heightOffset = 230;
      const windowHeight = window.innerHeight;
      const newMaxHeight = windowHeight - heightOffset;
      setMaxHeight(newMaxHeight);
      setIsCompactView(window.innerWidth < 800);
      if (window.innerWidth < 800) {
        setIsCompactView(true);
      } else if (
        window.innerWidth >= 800 &&
        isOverflowActive(paperRef.current)
      ) {
        setIsCompactView(true);
      } else {
        setIsCompactView(false);
      }
    };

    calculateMaxHeight();
    window.addEventListener("resize", calculateMaxHeight);

    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, []);

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

  const handleKeyMessageSubmit = (event) => {
    if (event.key === "Enter") {
      handleMessageSubmit();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Grid container spacing={1} sx={{ height: "calc(100vh - 64px)" }}>
      {/* Conversations List */}
      {!isCompactView && (
        <Grid item xs={2.5}>
          <Paper
            elevation={3}
            sx={{ height: "100%", overflow: "auto" }}
            ref={paperRef}
          >
            <ConversationList
              conversations={props.conversations}
              userId={props.userId}
              unreadCounts={props.unreadCounts}
            />
          </Paper>
        </Grid>
      )}
      {isCompactView && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <ConversationList
            conversations={props.conversations}
            userId={props.userId}
            unreadCounts={props.unreadCounts}
          />
        </Drawer>
      )}
      {/* Selected Conversation */}
      <Grid item xs={!isCompactView ? 9.5 : 12}>
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" sx={{ p: 2, paddingBottom: 1 }}>
            {isCompactView && (
              <Tooltip title="Conversations">
                <IconButton
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  sx={{ marginRight: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
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
            <Typography variant="h6" sx={{ marginTop: 0.5 }}>
              {props.selectedConversation
                ? props.selectedConversation.participants.find(
                    (p) => p.id !== props.userId
                  ).username
                : "Select a conversation"}
            </Typography>
          </Stack>
          {props.selectedConversation && (
            <Divider sx={{ borderBottomWidth: 1 }} />
          )}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2,
              maxHeight: `${maxHeight}px`,
            }}
          >
            {props.selectedConversation && (
              <Messages messages={props.messages} userId={props.userId} />
            )}
            <div ref={messagesEndRef} />
          </Box>
          {props.selectedConversation !== null && (
            <Box p={2} borderTop="1px solid #e0e0e0">
              <Stack direction="row">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  value={messageInput}
                  onKeyDown={handleKeyMessageSubmit}
                  onChange={handleMessageChange}
                />

                <Button
                  onClick={handleMessageSubmit}
                  disabled={messageInput.length == 0}
                >
                  <SendIcon />
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
});

Conversations.displayName = "Conversations";

export default Conversations;
