import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import login from "../assets/images/login.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormInvalid =
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  async function handleSubmit() {
    await axios.post("/signup", { email, name, password });
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
          height: { xs: "auto", md: "auto" },
          width: { xs: "90%", sm: "90%", md: "900px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Image Side */}
        <Box
          sx={{
            width: { xs: "60%", md: "50%" },
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            px: { xs: 3, md: 4 },
            py: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Register a New Account
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
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
            disabled={isFormInvalid}
            sx={{
              height: "50px",
              borderRadius: "8px",
              bgcolor: isFormInvalid ? "grey.400" : "black",
              color: "white",
              "&:hover": {
                bgcolor: isFormInvalid ? "grey.500" : "#333",
              },
            }}
            onClick={handleSubmit}
          >
            Register
          </Button>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography> or </Typography>
            <Typography>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontWeight: "600",
                  color: "Blue",
                }}
              >
                Login to existing account
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
