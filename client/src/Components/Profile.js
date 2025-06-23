import React from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
  Stack,
  Avatar,
} from "@mui/material";

function Profile() {
  // Placeholder user data – replace with actual props or Redux store values
  const user = {
    name: "Muhamed Shijas",
    email: "shijas@example.com",
    uploads: 12,
    likes: 124,
    downloads: 56,
  };

  return (
    <Box px={3} py={4}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{ width: 72, height: 72, bgcolor: "black", color: "white" }}
          >
            {user.name[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Documents Uploaded
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {user.uploads}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Total Likes
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {user.likes}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Downloads
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {user.downloads}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* My Uploads */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight={600} mb={1}>
          My Uploads
        </Typography>
        <Divider />
        {/* Add list/map of uploaded files here */}
        <Typography color="text.secondary" mt={2}>
          You haven't uploaded any files yet.
        </Typography>
      </Box>

      {/* Liked Files */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={1}>
          Liked Files
        </Typography>
        <Divider />
        {/* Add list/map of liked files here */}
        <Typography color="text.secondary" mt={2}>
          You haven't liked any files yet.
        </Typography>
      </Box>
    </Box>
  );
}

export default Profile;
