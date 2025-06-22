import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  IconButton,
  Divider,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import InfoModal from "../Modal/InfoModal";
import CommentsModal from "../Modal/commentsModal";

// Dummy PDF Data
const pdfFiles = [
  {
    id: 1,
    subject: "Computer Networks",
    semester: "5",
    uploadedBy: "John Doe",
  },
  {
    id: 2,
    subject: "Database Management",
    semester: "4",
    uploadedBy: "Alice Smith",
  },
  {
    id: 3,
    subject: "Operating Systems",
    semester: "3",
    uploadedBy: "Mark Taylor",
  },
  {
    id: 4,
    subject: "Web Development",
    semester: "6",
    uploadedBy: "Sara Ali",
  },
];

function Home() {
  const [infoShow, setInfoShow] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const handleInfoModal = () => {
    setInfoShow(true);
  };
  const handleCommentModal = () => {
    setCommentShow(true);
  };
  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Shared PDF Files
      </Typography>

      <Stack spacing={2}>
        {pdfFiles.map((file) => (
          <Card
            key={file.id}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              transition: "0.3s",
              "&:hover": { boxShadow: 4 },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <PictureAsPdfIcon color="error" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">{file.subject}</Typography>
                <Typography fontSize={14} color="text.secondary">
                  Semester: {file.semester}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  Uploaded by: {file.uploadedBy}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1}>
              <IconButton title="Details" onClick={handleInfoModal}>
                <InfoIcon />
              </IconButton>
              <IconButton title="Like">
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton title="Comment" onClick={handleCommentModal}>
                <ChatBubbleOutlineIcon />
              </IconButton>
              <IconButton title="Download">
                <DownloadIcon />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>

      {infoShow && <InfoModal />}
      {commentShow && <CommentsModal />}
    </Box>
  );
}

export default Home;
