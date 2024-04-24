import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const ConversationList = ({ conversations, userId, unreadCounts }) => {
  return (
    <List>
      {conversations.map((conversation) => {
        const other = conversation.participants.find((p) => p.id !== userId);
        const unreadCount = unreadCounts.find(
          (uc) => uc.conversation === conversation.id
        ).count;
        return (
          <Box key={conversation.id}>
            <ListItem
              disablePadding
              sx={{ paddingBottom: 0.5, paddingTop: 0.5 }}
            >
              <Badge
                badgeContent={unreadCount}
                invisible={unreadCount <= 0}
                color="error"
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
              </Badge>
            </ListItem>
            <Divider />
          </Box>
        );
      })}
    </List>
  );
};

export default ConversationList;
