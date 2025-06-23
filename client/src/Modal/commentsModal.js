import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

function CommentsModal({ onClose, id }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((state) => state.user.details);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        console.log(id);
        
        const { data } = await axios.get(`/getcomments/${id}`);
        setComments(data.comments || []);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handlePost = async () => {
    if (comment.trim() === "" || !user) return;

    setPosting(true);
    try {
      const { data } = await axios.post("/addcomment", {
        noteId: id,
        userId: user.userName,
        text: comment.trim(),
      });

      if (data.success) {
        setComments((prev) => [...prev, { user: user.userName, text: comment }]);
        setComment("");
      } else {
        alert("Failed to post comment.");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setPosting(false);
    }
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
        p={{ xs: 2, sm: 4 }}
        width="100%"
        maxWidth={{ md: "700px", sm: "400px" }}
        maxHeight="90vh"
        overflow="auto"
        display="flex"
        flexDirection="column"
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          textAlign="center"
          mb={2}
        >
          Comments
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Comment List */}
        <Box
          flex={1}
          overflow="auto"
          mb={2}
          px={1}
          sx={{
            maxHeight: "300px",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "4px",
            },
          }}
        >
          {loading ? (
            <Stack alignItems="center" py={2}>
              <CircularProgress size={24} />
            </Stack>
          ) : comments.length > 0 ? (
            <Stack spacing={1}>
              {comments.map((c, index) => (
                <Paper key={index} sx={{ p: 1.5, bgcolor: "#f9f9f9" }}>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    {c.user}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.text}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              No comments yet.
            </Typography>
          )}
        </Box>

        {/* Add Comment */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          mb={2}
          alignItems="stretch"
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={!comment.trim() || posting}
            onClick={handlePost}
            sx={{ minWidth: { sm: "100px" } }}
          >
            {posting ? "Posting..." : "Post"}
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
