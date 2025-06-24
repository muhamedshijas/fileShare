import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
  Stack,
  Avatar,
  Card,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Profile() {
  const [uploads, setUploads] = useState([]);
  const [likedFiles, setLikedFiles] = useState([]);
  const user = useSelector((state) => state.user.details);
  const id = user?._id;

  useEffect(() => {
    if (id) {
      axios.get(`/getmyfiles/${id}`).then((res) => {
        if (res.data.success) setUploads(res.data.notes);
      });

      axios.get(`/getmylikedfiles/${id}`).then((res) => {
        if (res.data.success) setLikedFiles(res.data.notes);
      });
    }
  }, [id]);

  const handleDelete = async (fileId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(`/deletenote/${fileId}`);
      if (res.data.success) {
        alert("Deleted successfully");
        setUploads((prev) => prev.filter((file) => file._id !== fileId));
      }
    } catch (err) {
      alert("Failed to delete");
      console.error(err);
    }
  };

  const totalLikes = uploads.reduce(
    (acc, note) => acc + note.likes?.length || 0,
    0
  );

  return (
    <Box px={3} py={4}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{ width: 72, height: 72, bgcolor: "black", color: "white" }}
          >
            {user?.userName?.[0] || "U"}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {user?.userName}
            </Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Documents Uploaded
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {uploads.length}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Total Likes on Uploads
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {totalLikes}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Liked Files
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {likedFiles.length}
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
        <Grid container spacing={2} mt={1}>
          {uploads.length === 0 ? (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              You haven't uploaded any files yet.
            </Typography>
          ) : (
            uploads.map((file) => (
              <Grid item key={file._id} width="600px">
                <Card
                  sx={{
                    p: 2,
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tooltip title="Delete File">
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        color: "red",
                      }}
                      onClick={() => handleDelete(file._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Typography fontWeight={600}>{file.title}</Typography>
                  <Typography fontSize={13} color="text.secondary">
                    Subject: {file.subject}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Likes: {file.likes?.length || 0}
                  </Typography>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Liked Files */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={1}>
          Liked Files
        </Typography>
        <Divider />
        <Grid container spacing={2} mt={1}>
          {likedFiles.length === 0 ? (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              You haven't liked any files yet.
            </Typography>
          ) : (
            likedFiles.map((file) => (
              <Grid item xs={12} sm={6} md={3} key={file._id}>
                <Card sx={{ p: 2, height: "100%" }}>
                  <Typography fontWeight={600}>{file.title}</Typography>
                  <Typography fontSize={13} color="text.secondary">
                    Subject: {file.subject}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Uploaded by: {file.uploadedBy?.userName || "Unknown"}
                  </Typography>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile;
