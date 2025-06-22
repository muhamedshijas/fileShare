import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element=<HomePage /> />
      </Routes>
    </Box>
  );
}

export default App;
