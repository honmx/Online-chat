import React, { useState } from "react"
import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { convertToMs } from "../helpers/convertToMs";
import { getCurrentUser } from "../helpers/getCurrentUser";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const InputMessageField = () => {

  const [value, setValue] = useState("");

  const currentUser = getCurrentUser();

  const handleClick = async () => {
    setValue("");
    
    const date = Timestamp.now();
    await addDoc(collection(db, "messages"), {
      from: currentUser.uid,
      value,
      timestamp: convertToMs(date)
    });
  }

  return (
    <Box sx={{display: "flex"}}>
      <TextField 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          flex: "1 1 0",
          m: 1
        }}
      />
      <IconButton onClick={handleClick}>
        <SendIcon />
      </IconButton>
    </Box>
  )
};

export default InputMessageField;
