import logo from "./logo.svg";
import "./App.css";
import axios from 'axios'
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000/"
  return (
    <Box>
      <Routes>
        <Route path="/" element=<HomePage /> />
        <Route path="/login" element=<LoginPage /> />
        <Route path="/signup" element=<SignUpPage /> />
      </Routes>
    </Box>
  );
}

export default App;
