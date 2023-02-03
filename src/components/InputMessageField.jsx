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

  const handleClick = async (e) => {
    e.preventDefault();

    setValue("");
    
    const date = Timestamp.now();
    await addDoc(collection(db, "messages"), {
      from: currentUser.uid,
      value,
      timestamp: convertToMs(date)
    });
  }

  return (
    <Box>
      <form onSubmit={handleClick} style={{display: "flex", alignItems: "center"}}>
      <TextField 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          flex: "1 1 0",
          m: 1,
          ".MuiOutlinedInput-root": {
            borderRadius: 4
          }
        }}
      />
      <IconButton type="submit" sx={{height: 50, width: 50}}>
        <SendIcon />
      </IconButton>
      </form>
    </Box>
  )
};

export default InputMessageField;
