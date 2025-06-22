import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import InfoModal from "../Modal/InfoModal";
import CommentsModal from "../Modal/commentsModal";

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

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleInfoModal = () => setInfoShow(true);
  const handleCommentModal = () => setCommentShow(true);

  return (
    <Box p={2}>
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
                  {file.subject}
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  Semester: {file.semester}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  Uploaded by: {file.uploadedBy}
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

      {/* Modals */}
      {infoShow && <InfoModal onClose={() => setInfoShow(false)} />}
      {commentShow && <CommentsModal onClose={() => setCommentShow(false)} />}
    </Box>
  );
}

export default Home;
