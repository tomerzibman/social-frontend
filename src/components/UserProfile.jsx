import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Avatar,
  Divider,
  IconButton,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import Feed from "./Feed";
import Notification from "./Notification";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import userService from "../services/user";

const UserProfile = ({
  incrementLikeOf,
  createComment,
  loggedIn,
  curUserId,
  updateUser,
}) => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [photoEdit, setPhotoEdit] = useState("");
  const [preview, setPreview] = useState(null);
  const [notify, setNotify] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    if (!allowedToEdit) {
      return;
    }
    fileInputRef.current.click();
  };

  const id = useParams().id;
  const allowedToEdit = loggedIn && curUserId !== null && curUserId == id;

  useEffect(() => {
    userService
      .getUserById(id)
      .then((foundUser) => {
        setUser(foundUser);
        setNameEdit(foundUser.name);
        setUsernameEdit(foundUser.username);
        setPhotoEdit(foundUser.photo);
        setUserPosts(foundUser.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEditName = () => {
    setIsEditName(!isEditName);
    setNameEdit(user.name);
  };

  const handleEditUsername = () => {
    setIsEditUsername(!isEditUsername);
    setUsernameEdit(user.username);
  };

  const handleDiscardPhoto = () => {
    setPreview(null);
    setPhotoEdit(user.photo);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhotoEdit(file);
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify(false);
  };

  const handleLikePost = async (postId) => {
    const likedPost = await incrementLikeOf(postId);
    const updatedUserPosts = userPosts.map((up) =>
      up.id === likedPost.id ? likedPost : up
    );
    setUserPosts(updatedUserPosts);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    if (usernameEdit !== user.username) {
      formData.append("username", usernameEdit);
    }
    if (nameEdit !== user.name) {
      formData.append("name", nameEdit);
    }
    if (photoEdit !== null) {
      formData.append("photo", photoEdit);
    }

    try {
      const updatedUser = await updateUser(formData);
      setIsEditName(false);
      setIsEditUsername(false);
      setPhotoEdit("");
      setPreview(null);
      setUser(updatedUser);
      setUserPosts(updatedUser.posts);
      setNotificationData({
        varient: "success",
        message: "Successfully updated your information!",
      });
      setNotify(true);
    } catch (error) {
      setNotificationData({
        varient: "error",
        message: "An error occured while updating your information.",
      });
      setNotify(true);
      console.log(error);
    }
  };

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Stack direction="row" sx={{ justifyContent: "center" }}>
        <input
          accept="image/*"
          id="avatar-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={!allowedToEdit}
        />
        <label htmlFor="avatar-upload">
          <IconButton
            sx={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            disabled={!allowedToEdit}
            onClick={handleAvatarClick}
          >
            <Avatar
              src={preview || user.photo}
              alt={preview !== null ? "Avatar Preview" : user.name}
              sx={{ width: 100, height: 100 }}
            />
          </IconButton>
        </label>
        {preview && (
          <IconButton
            onClick={handleDiscardPhoto}
            sx={{ marginTop: "auto", marginBottom: "auto" }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Stack>

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
          <Stack direction="row">
            <TextField
              size="small"
              variant="outlined"
              value={nameEdit}
              onChange={({ target }) => setNameEdit(target.value)}
              autoFocus
              style={{ marginBottom: "10px" }}
            />
            <IconButton onClick={handleEditName} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
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
          <Stack direction="row">
            <TextField
              size="small"
              variant="outlined"
              value={usernameEdit}
              onChange={({ target }) => setUsernameEdit(target.value)}
              autoFocus
            />
            <IconButton onClick={handleEditUsername} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        )}
        {(isEditName || isEditUsername || preview !== null) && (
          <Button onClick={handleSaveChanges}>
            <SaveIcon /> Save Changes
          </Button>
        )}
      </Box>

      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />

      <Typography variant="h5" align="center" gutterBottom>
        {allowedToEdit ? "Your Posts" : `${user.name}'s Posts`}
      </Typography>

      <Feed
        posts={userPosts}
        incrementLikeOf={handleLikePost}
        createComment={createComment}
        loggedIn={loggedIn}
      />
      <Notification
        varient={notificationData.varient}
        message={notificationData.message}
        open={notify}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default UserProfile;
