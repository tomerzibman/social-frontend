import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const ConversationList = ({ conversations, userId }) => {
  return (
    <List>
      {conversations.map((conversation) => {
        const other = conversation.participants.find((p) => p.id !== userId);
        return (
          <Box key={conversation.id}>
            <ListItem
              disablePadding
              sx={{ paddingBottom: 0.5, paddingTop: 0.5 }}
            >
              <ListItemButton
                component={Link}
                to={`/conversations/${conversation.id}`}
              >
                <Avatar src={other.photo} />
                <ListItemText
                  sx={{ marginLeft: 2 }}
                  primary={
                    <Typography variant="subtitle1">
                      {other.username}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        );
      })}
    </List>
  );
};

export default ConversationList;
