import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000/";

  const { user, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const { data: userData } = await axios.get("/check");
      dispatch({
        type: "user",
        payload: { login: userData.loggedIn, details: userData.user },
      });
    })();
  }, [refresh]);

  return (
    <Box>
      <Routes>
        {user.login && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}
        {!user.login && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Box>
  );
}

export default App;
