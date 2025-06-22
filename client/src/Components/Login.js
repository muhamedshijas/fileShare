import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import login from "../assets/images/login.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const isdisabled = userName == "" || password == "";
  async function handleSubmit() {
    await axios.post("login", { userName, password });
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
          height: { xs: "auto", md: "500px" },
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
            alt="Login Illustration"
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
            width: { md: "50%", px: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            px: { xs: 3, md: 4 },
            py: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Login to Your Account
          </Typography>
          <TextField
            fullWidth
            label="user name"
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
            disabled={isdisabled}
            sx={{
              height: "50px",
              borderRadius: "8px",
              bgcolor: isdisabled ? "grey.400" : "black",
              color: "white",
              "&:hover": {
                bgcolor: isdisabled ? "grey.500" : "#333",
              },
            }}
            onClick={handleSubmit}
          >
          
            Login
          </Button>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography> or </Typography>
            <Typography>
              {" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  fontWeight: "600",
                  color: "Blue",
                }}
              >
                Register as a new user
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
