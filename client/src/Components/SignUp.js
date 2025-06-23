import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import login from "../assets/images/login.jpg";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const isFormInvalid =
    !name || !email || !password || !confirmPassword || password !== confirmPassword;

  const handleSubmit = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await axios.post("/signup", {
        name,
        email,
        password,
      });

      if (response.data.success === false) {
        setErrorMsg(response.data.message);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          width: { xs: "90%", md: "900px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Image Side */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <img
            src={login}
            alt="Sign Up Illustration"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Form Side */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Register a New Account
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {errorMsg}
            </Alert>
          )}

          <TextField
            fullWidth
            label="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={password !== confirmPassword && confirmPassword.length > 0}
            helperText={
              password !== confirmPassword && confirmPassword.length > 0
                ? "Passwords do not match"
                : ""
            }
          />

          <Button
            fullWidth
            disabled={isFormInvalid || loading}
            onClick={handleSubmit}
            sx={{
              height: "50px",
              borderRadius: "8px",
              bgcolor: isFormInvalid ? "grey.400" : "black",
              color: "white",
              "&:hover": {
                bgcolor: isFormInvalid ? "grey.500" : "#333",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          <Box textAlign="center">
            <Typography>or</Typography>
            <Link to="/login" style={{ textDecoration: "none", color: "blue", fontWeight: 600 }}>
              Login to existing account
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
