import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
  TextField,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import InfoModal from "../Modal/InfoModal";
import CommentsModal from "../Modal/commentsModal";
import axios from "axios";
import { useSelector } from "react-redux";

function Home() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const user = useSelector((state) => state.user.details);
  const id = user?._id;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleInfoModal = (id) => {
    setInfoShow(true);
    setSelectedId(id);
  };

  const handleCommentModal = (id) => {
    setSelectedId(id);
    setCommentShow(true);
  };

  const handleLike = async (noteId) => {
    try {
      const { data } = await axios.post(`/like`, { noteId, id });
      if (data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleDownload = (url, filename = "file.pdf") => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/allfiles");
        if (!data.err) {
          setPdfFiles(data.allFiles);
        }
      } catch (err) {
        console.error("Error loading files:", err);
      }
    })();
  }, [refresh]);

  // Filter logic for search
  const filteredFiles = pdfFiles.filter((file) => {
    const term = searchTerm.toLowerCase();
    return (
      file.title?.toLowerCase().includes(term) ||
      file.tags?.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Shared PDF Files
      </Typography>

      {/* 🔍 Search Input */}
      <TextField
        fullWidth
        placeholder="Search by title or tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {filteredFiles.map((file) => {
          const isLiked = file.likes?.includes(user._id);
          return (
            <Card
              key={file._id}
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 2,
                py: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 4 },
              }}
            >
              {/* Left section */}
              <Stack direction="row" spacing={2} alignItems="center">
                <PictureAsPdfIcon color="error" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {file.title}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    Semester: {file.semester}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    Subject: {file.subject}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Tags: {file.tags?.join(", ") || "None"}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Uploaded by: {file.uploadedBy?.userName}
                  </Typography>
                </Box>
              </Stack>

              {/* Icons section */}
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent={{ xs: "center", sm: "flex-end" }}
                sx={{ minWidth: "120px" }}
              >
                <Tooltip title="Details">
                  <IconButton onClick={() => handleInfoModal(file._id)}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={isLiked ? "Unlike" : "Like"}>
                  <IconButton onClick={() => handleLike(file._id)}>
                    {isLiked ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Comment">
                  <IconButton onClick={() => handleCommentModal(file._id)}>
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Download">
                  <IconButton onClick={() => handleDownload(file.fileUrl)}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Card>
          );
        })}
      </Stack>

      {/* Modals */}
      {infoShow && <InfoModal id={selectedId} setShow={setInfoShow} />}
      {commentShow && (
        <CommentsModal onClose={() => setCommentShow(false)} id={selectedId} />
      )}
    </Box>
  );
}

export default Home;
