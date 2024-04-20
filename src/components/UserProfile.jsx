import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import Feed from "./Feed";
import userService from "../services/user";

const UserProfile = ({ incrementLikeOf, createComment, loggedIn }) => {
  const [user, setUser] = useState(null);
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    userService
      .getUserById(id)
      .then((foundUser) => {
        setUser(foundUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!user) {
    return <CircularProgress disableShrink />;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Avatar
        alt={user.name}
        src={user.photo}
        sx={{ width: 100, height: 100, margin: "0 auto" }}
      />
      <Typography variant="h4" align="center" gutterBottom>
        {user.name}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        @{user.username}
      </Typography>

      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />

      <Typography variant="h5" align="center" gutterBottom>
        {`${user.name}'s Posts`}
      </Typography>

      <Feed
        posts={user.posts}
        incrementLikeOf={incrementLikeOf}
        createComment={createComment}
        loggedIn={loggedIn}
      />
    </Container>
  );
};

export default UserProfile;
