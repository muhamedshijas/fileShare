import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import login from "../assets/images/login.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isDisabled = userName === "" || password === "";

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/login", {
        userName,
        password,
      });

      if (res.data.success === false) {
        setError(res.data.message);
      } else {
        dispatch({ type: "refresh" });
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
          height: { xs: "auto", md: "500px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Image Section */}
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
            alt="Login"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            width: { md: "50%" },
            px: { xs: 3, md: 4 },
            py: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Login to Your Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            disabled={isDisabled || loading}
            onClick={handleSubmit}
            sx={{
              height: "50px",
              borderRadius: "8px",
              bgcolor: isDisabled ? "grey.400" : "black",
              color: "white",
              "&:hover": {
                bgcolor: isDisabled ? "grey.500" : "#333",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Box textAlign="center">
            <Typography>or</Typography>
            <Link
              to="/signup"
              style={{ textDecoration: "none", fontWeight: 600, color: "blue" }}
            >
              Register as a new user
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
