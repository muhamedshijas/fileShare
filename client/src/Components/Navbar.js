import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      px={3}
      py={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={isMobile ? "column" : "row"}
      bgcolor="white"
    >
      {/* Logo */}
      <Typography variant="h6" fontWeight="bold">
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
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ bgcolor: "black", color: "White" }}
        >
          Upload
        </Button>
        <Button variant="outlined" color="black">
          <AccountCircleIcon />
        </Button>
      </Stack>
    </Box>
  );
}

export default Navbar;
