import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Paper,
} from "@mui/material";

function CommentsModal({ onClose }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { user: "Alice", text: "Great notes!" },
    { user: "John", text: "Thanks for sharing." },
  ]);

  const handlePost = () => {
    if (comment.trim() === "") return;
    setComments((prev) => [...prev, { user: "You", text: comment }]);
    setComment("");
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor="rgba(0, 0, 0, 0.3)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={999}
      px={2}
    >
      <Box
        bgcolor="white"
        borderRadius={3}
        boxShadow={4}
        p={4}
        width="100%"
        maxWidth="600px"
        maxHeight="90vh"
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          Comments
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Comment List */}
        <Box
          flex={1}
          overflow="auto"
          mb={2}
          px={1}
          sx={{ maxHeight: "300px", scrollbarWidth: "thin" }}
        >
          <Stack spacing={1}>
            {comments.map((c, index) => (
              <Paper key={index} sx={{ p: 1.5, bgcolor: "#f9f9f9" }}>
                <Typography variant="subtitle2">{c.user}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.text}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Add Comment */}
        <Stack direction="row" spacing={1} mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" onClick={handlePost}>
            Post
          </Button>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
          sx={{ fontWeight: 600, borderRadius: 2 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default CommentsModal;
