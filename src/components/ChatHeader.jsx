import React from "react";
import { Avatar, Badge, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { convertFromMs } from "../helpers/convertFromMs";
import { getCurrentUser } from "../helpers/getCurrentUser";
import { convertToMs } from "../helpers/convertToMs";
import { setCurrentUser } from "../helpers/setCurrentUser";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


const ChatHeader = () => {

  const navigate = useNavigate();

  const currentUser = getCurrentUser();
  const friend = useSelector(state => state.users.friend);

  const signOut = () => {
    setCurrentUser(null);
    const date = Timestamp.now();
    updateDoc(doc(db, "users", currentUser.email), { online: false, lastSeen: convertToMs(date) })
      .then(() => navigate("/"));
  }

  return (
    <Box sx={{
      display: "flex",
      p: 2,
      borderBottom: "1px solid #777"
    }}>
      <Badge 
        badgeContent={""}
        color={"success"}
        invisible={!friend?.online}
        overlap="circular"
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom"
        }}
        variant=""
      >
        <Avatar sx={{ width: 60, height: 60 }} />
      </Badge>
      <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
        <Typography fontSize={20}>{friend?.username}</Typography>
        <Typography fontWeight={100} fontSize={14}>
          {
            friend?.lastSeen &&
            (!friend?.online && "last seen " + convertFromMs(friend?.lastSeen))
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
