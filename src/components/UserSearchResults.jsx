import { useState, useEffect } from "react";
import userService from "../services/user";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const UserSearchResults = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    console.log(search);
    userService
      .getUsersByUsername(search)
      .then((foundUsers) => {
        setUsers(foundUsers);
      })
      .catch((error) => console.log(error));
  }, [search]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Showing results for: {`"${search}"`}
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            button
            component={Link}
            to={`/user/${user.id}`}
          >
            <ListItemAvatar>
              <Avatar alt={user.username} src={user.photo} />
            </ListItemAvatar>
            <ListItemText primary={user.username} secondary={user.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UserSearchResults;
