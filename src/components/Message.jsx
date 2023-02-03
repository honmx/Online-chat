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
        ml: currentUser.uid === message.from ? "auto !important" : "none",
        mr: currentUser.uid === message.from ? "none" : "auto !important",
        mt: 0.5
      }}
    >
      {
        currentUser.uid !== message.from &&
        <Avatar />
      }
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#dedede",
          borderRadius: 3,
          p: "5px 15px",
          ml: 0.5,
          mr: 0.5,
        }}
      >
        <Typography>{message.value}</Typography>
        <Typography
          fontWeight={100}
          sx={{
            // TODO:
            //   [] - custom variant for displaying timestamp of the message
            fontSize: 12,
            alignSelf: currentUser.uid === message.from ? "flex-end" : "flex-start"
          }}
        >
          {convertFromMs(message.timestamp)}
        </Typography>
      </Box>
      {
        currentUser.uid === message.from &&
        <Avatar />
      }
    </Box>
  )
};

export default Message;
