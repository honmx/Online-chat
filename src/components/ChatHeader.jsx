import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { convertFromMs } from "../helpers/convertFromMs";
import { useSelector } from "react-redux";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getCurrentUser } from "../helpers/getCurrentUser";
import { convertToMs } from "../helpers/convertToMs";
import { useNavigate } from "react-router-dom";


const ChatHeader = () => {

  const navigate = useNavigate();

  const currentUser = getCurrentUser();
  const friend = useSelector(state => state.users.friend);

  const signOut = () => {
    localStorage.setItem("user", null);
    const date = Timestamp.now();
    updateDoc(doc(db, "users", currentUser.email), { online: false, lastSeen: convertToMs(date) })
      .then(() => navigate("/"));
  }

  return (
    <Box sx={{
      display: "flex",
      p: 2
    }}>
      <Avatar sx={{ width: 60, height: 60 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>Username</Typography>
        <Typography>
          {
            friend?.lastSeen &&
            (friend?.online ? "online" : "last seen " + convertFromMs(friend?.lastSeen))
          }
        </Typography>
      </Box>
      <Button
        sx={{ ml: "auto" }}
        onClick={signOut}
      >
        Sign out
      </Button>
    </Box>
  )
};

export default ChatHeader;
