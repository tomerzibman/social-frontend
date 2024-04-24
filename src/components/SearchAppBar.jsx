import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchAppBar({ loggedIn, photo, curUserId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const goToProfile = () => {
    handleMenuClose();
    if (curUserId !== null) {
      navigate(`/user/${curUserId}`);
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    handleMenuClose();
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const goToConversations = () => {
    handleMenuClose();
    if (loggedIn) {
      navigate("/conversations");
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchSubmit = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    navigate(`/users/?search=${searchQuery}`);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToProfile}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={goToConversations}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <ChatIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={goToProfile}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton size="large" aria-haspopup="true" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Home">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              component={Link}
              to="/"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Button
              component={Link}
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Home
            </Button>
          </Typography> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for users..."
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {loggedIn && (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Messages">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={goToConversations}
                  >
                    <ChatIcon />
                  </IconButton>
                </Tooltip>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {photo && (
                    <Avatar
                      src={photo || "http://localhost:3000/images/default.jpg"}
                      sx={{ width: 30, height: 30 }}
                    />
                  )}
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          )}
          {!loggedIn && (
            <Tooltip title="login">
              <IconButton color="inherit" component={Link} to="/login">
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
