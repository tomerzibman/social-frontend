import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Avatar,
  Divider,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import Feed from "./Feed";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
// import SaveIcon from "@mui/icons-material/Save";
import userService from "../services/user";

const UserProfile = ({
  incrementLikeOf,
  createComment,
  loggedIn,
  curUserId,
}) => {
  const [user, setUser] = useState(null);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");

  const id = useParams().id;
  const allowedToEdit = loggedIn && curUserId !== null && curUserId == id;

  useEffect(() => {
    userService
      .getUserById(id)
      .then((foundUser) => {
        setUser(foundUser);
        setNameEdit(foundUser.name);
        setUsernameEdit(foundUser.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEditName = () => {
    setIsEditName(!isEditName);
  };

  const handleEditUsername = () => {
    setIsEditUsername(!isEditUsername);
  };

  // const handleSaveName = () => {
  //   // Call API to update the name
  //   userService.updateUserName(id, name).then(() => {
  //     setIsEditName(false);
  //   });
  // };

  // const handleSaveUsername = () => {
  //   // Call API to update the username
  //   userService.updateUserUsername(id, usernameEdit).then(() => {
  //     setIsEditUsername(false);
  //   });
  // };

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        {!isEditName ? (
          <Typography variant="h4" gutterBottom>
            {user.name}
            {allowedToEdit && (
              <IconButton onClick={handleEditName} size="small">
                <EditIcon />
              </IconButton>
            )}
          </Typography>
        ) : (
          <>
            <TextField
              size="small"
              variant="outlined"
              value={nameEdit}
              onChange={({ target }) => setNameEdit(target.value)}
              //onBlur={handleSaveName}
              autoFocus
              style={{ marginBottom: "10px" }}
            />
            <IconButton onClick={handleEditName} size="small">
              <CloseIcon />
            </IconButton>
          </>
        )}
        {!isEditUsername ? (
          <Typography variant="h6" color="textSecondary" gutterBottom>
            @{user.username}
            {allowedToEdit && (
              <IconButton onClick={handleEditUsername} size="small">
                <EditIcon />
              </IconButton>
            )}
          </Typography>
        ) : (
          <>
            <TextField
              size="small"
              variant="outlined"
              value={usernameEdit}
              onChange={({ target }) => setUsernameEdit(target.value)}
              //onBlur={handleSaveUsername}
              autoFocus
            />
            <IconButton onClick={handleEditUsername} size="small">
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Box>

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
