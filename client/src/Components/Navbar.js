import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Fade,
  ClickAwayListener,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useDispatch } from "react-redux";
import UploadModal from "../Modal/UploadModal";

function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(!show);
  };
  const handleToggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleCloseDropdown = () => setShowDropdown(false);
  async function handleLogout() {
    const data = await axios.get("/logout");
    dispatch({ type: "refresh" });
  }

  return (
    <ClickAwayListener onClickAway={handleCloseDropdown}>
      <Box
        px={3}
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={isMobile ? "column" : "row"}
        bgcolor="white"
        position="relative"
      >
        {/* Logo */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          MyLogo
        </Typography>

        {/* Search Box */}
        <Box my={isMobile ? 2 : 0} flex={1} maxWidth={400} mx={2}>
          <TextField
            fullWidth
            placeholder="Search..."
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Buttons */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          position="relative"
        >
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            sx={{ bgcolor: "black", color: "White" }}
            onClick={handleModal}
          >
            Upload
          </Button>

          <IconButton
            onClick={handleToggleDropdown}
            sx={{ bgcolor: "black", color: "White" }}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* Dropdown */}
          <Fade in={showDropdown}>
            <Paper
              elevation={4}
              sx={{
                position: "absolute",
                top: "60px",
                right: 0,
                zIndex: 10,
                minWidth: 150,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                px={2}
                py={1}
                bgcolor="white"
              >
                <Button
                  fullWidth
                  sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  onClick={() => {
                    navigate("/profile");
                    handleCloseDropdown();
                  }}
                >
                  Profile
                </Button>
                <Button
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "red",
                  }}
                  onClick={() => {
                    handleLogout();
                    handleCloseDropdown();
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Stack>
        {show && <UploadModal setShow={setShow} />}
      </Box>
    </ClickAwayListener>
  );
}

export default Navbar;
