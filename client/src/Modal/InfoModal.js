import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

function InfoModal({ setShow, id }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/getfile/${id}`);
        if (!data.err) {
          setFile(data.file);
        }
      } catch (err) {
        console.error("Error fetching file info:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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
        maxWidth={{ md: "700px", sm: "600px" }}
        maxHeight="90vh"
        overflow="auto"
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          textAlign="center"
          mb={2}
        >
          File Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="300px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box mb={4}>
              <Stack spacing={1}>
                <InfoRow label="Title" value={file?.title || "N/A"} />
                <InfoRow label="Subject" value={file?.subject || "N/A"} />
                <InfoRow
                  label="Tags"
                  value={(file?.tags || []).join(", ") || "N/A"}
                />
                <InfoRow
                  label="Uploaded By"
                  value={file?.uploadedBy?.userName || "N/A"}
                />
                <InfoRow
                  label="Uploaded On"
                  value={
                    file?.createdAt
                      ? new Date(file.createdAt).toLocaleDateString()
                      : "N/A"
                  }
                />
              </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box mb={4}>
              <Stack spacing={1}>
                <IconStat
                  icon={<FavoriteBorderIcon color="error" />}
                  label={`${file?.likes?.length || 0} Likes`}
                />
                <IconStat
                  icon={<ChatBubbleOutlineIcon color="primary" />}
                  label={`${file?.comments?.length || 0} Comments`}
                />
                <IconStat
                  icon={<DownloadIcon color="success" />}
                  label="Downloads not tracked"
                />
              </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                bgcolor: "black",
                color: "white",
              }}
            >
              Close
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

// Reusable Info row
const InfoRow = ({ label, value }) => (
  <Box
    display="flex"
    flexDirection={{ xs: "column", sm: "row" }}
    justifyContent="space-between"
    gap={0.5}
  >
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
