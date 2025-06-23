import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
  IconButton,
  Chip,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useSelector } from "react-redux";

function UploadModal({ setShow }) {
  const user = useSelector((state) => {
    return state.user.details;
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput("");
  };

  const handleKeyPress = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim() !== "") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const handleShow = () => {
    setShow(false);
  };
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !allowedTypes.includes(selectedFile.type)) {
      return alert("Only PDF, DOC, DOCX, PPT files are allowed.");
    }

    setFile(selectedFile);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "unsigned_notes_upload"); // your preset
    formData.append("folder", "notes");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dv5bvojzi/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setFileUrl(data.secure_url);
      } else {
        alert("File upload failed.");
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
      setFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!fileUrl) return alert("Please upload a file first.");

    const { data } = await axios.post("/upload", {
      title,
      subject,
      semester,
      tags,
      fileUrl,
      uploadBy:user.userName
    });
    if (data.success) {
      alert("file added successfully");
      handleShow();
    }
  };

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bgcolor="rgba(0, 0, 0, 0.4)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={999}
        px={2}
      >
        <Box
          bgcolor="white"
          borderRadius={3}
          boxShadow={6}
          p={{ xs: 2, sm: 4 }}
          width="100%"
          maxWidth="600px"
          maxHeight="90vh"
          overflow="auto"
          position="relative"
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleShow}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="bold"
            textAlign="center"
            mb={3}
          >
            Upload a File
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              disabled={isUploading}
            >
              {file ? "Change File" : "Choose File"}
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            <Typography variant="caption" color="text.secondary">
              Allowed formats: PDF, DOC, DOCX, PPT, PPTX
            </Typography>

            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              disabled={!fileUrl}
            />
            <TextField
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              disabled={!fileUrl}
            />
            <TextField
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              fullWidth
              disabled={!fileUrl}
            />

            <Box display="flex" gap={1}>
              <TextField
                label="Add Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyPress}
                fullWidth
                disabled={!fileUrl}
              />
              <Button
                variant="contained"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || !fileUrl}
                sx={{ minWidth: "60px", px: 2 }}
              >
                <AddIcon />
              </Button>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={1}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  color="primary"
                />
              ))}
            </Box>
          </Stack>

          <Button
            variant="contained"
            fullWidth
            onClick={handleFinalSubmit}
            sx={{ mt: 3, bgcolor: "black", color: "white", py: 1.2 }}
            disabled={!fileUrl}
          >
            Submit Details
          </Button>
        </Box>
      </Box>

      <Backdrop
        open={isUploading}
        sx={{ zIndex: 1300, color: "#fff", backdropFilter: "blur(2px)" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default UploadModal;
