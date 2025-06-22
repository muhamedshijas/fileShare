import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DownloadIcon from "@mui/icons-material/Download";

function InfoModal({ onClose }) {
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
        maxWidth="700px"
      >
        {/* Modal Title */}
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          File Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Details Section */}
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Information
          </Typography>
          <Stack spacing={1}>
            <InfoRow label="Subject" value="Computer Networks" />
            <InfoRow label="Tags" value="networks, OSI model, routing" />
            <InfoRow label="Uploaded By" value="Muhamed Shijas" />
            <InfoRow label="Uploaded On" value="22/10/2015" />
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Stats Section */}
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Engagement
          </Typography>
          <Stack spacing={1}>
            <IconStat
              icon={<FavoriteBorderIcon color="error" />}
              label="100 Likes"
            />
            <IconStat
              icon={<ChatBubbleOutlineIcon color="primary" />}
              label="100 Comments"
            />
            <IconStat
              icon={<DownloadIcon color="success" />}
              label="100 Downloads"
            />
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Close Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            bgcolor: "black",
            color: "white",
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

// Reusable Info row
const InfoRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography fontWeight={600}>{label}</Typography>
    <Typography color="text.secondary">{value}</Typography>
  </Box>
);

// Reusable Icon Stat
const IconStat = ({ icon, label }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <IconButton disableRipple sx={{ p: 0 }}>
      {icon}
    </IconButton>
    <Typography>{label}</Typography>
  </Box>
);

export default InfoModal;
