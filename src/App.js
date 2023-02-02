import { AppBar, Avatar, Box, Button, Container, IconButton, Paper, Stack, TextField, Toolbar, Typography, } from "@mui/material";
import React, { useEffect } from "react"
import './index.css';
import SendIcon from '@mui/icons-material/Send';
import ChatPage from "./pages/ChatPage";
import { json, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import "firebase/auth";
import "firebase/firestore";
import NotFoundPage from "./pages/NotFoundPage";

const App = (props) => {

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute auth={false} element={<LoginPage />} />} />
      <Route path="/chat" element={<PrivateRoute auth={true} element={<ChatPage />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
};

export default App;
