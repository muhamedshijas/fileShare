import React from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DownloadIcon from "@mui/icons-material/Download";

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
  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Shared PDF Files
      </Typography>

      <Grid container spacing={3}>
        {pdfFiles.map((file) => (
          <Grid item xs={12} sm={6} md={4} key={file.id}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                p: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 4 },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <PictureAsPdfIcon color="error" sx={{ fontSize: 50 }} />

                <Box flex={1}>
                  <Typography variant="h6">{file.subject}</Typography>
                  <Typography fontSize={14} color="text.secondary">
                    Semester: {file.semester}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Uploaded by: {file.uploadedBy}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton title="Details">
                    <InfoIcon />
                  </IconButton>
                  <IconButton title="Like">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton title="Comment">
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <IconButton title="Download">
                    <DownloadIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
