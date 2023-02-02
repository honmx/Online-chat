import React from "react"
import { Avatar, Box, Typography } from "@mui/material";
import { convertFromMs } from "../helpers/convertFromMs";
import { getCurrentUser } from "../helpers/getCurrentUser";


const Message = ({ message }) => {

  const currentUser = getCurrentUser();

  return (
    <Box
      key={message.timestamp}
      sx={{
        display: "flex",
        marginLeft: currentUser.uid === message.from ? "auto !important" : "none"
      }}
    >
      {
        currentUser.uid !== message.from &&
        <Avatar />
      }
      <Box>
        <Typography>{message.value}</Typography>
        <Typography>{convertFromMs(message.timestamp)}</Typography>
      </Box>
      {
        currentUser.uid === message.from &&
        <Avatar />
      }
    </Box>
  )
};

export default Message;
