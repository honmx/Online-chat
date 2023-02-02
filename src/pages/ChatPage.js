import { AppBar, Avatar, Box, Button, Container, IconButton, Paper, Stack, TextField, Toolbar, Typography, } from "@mui/material";
import React, { useEffect, useRef, useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import { getCurrentUser } from "../helpers/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/slices/chatSlice";
import { db } from "../firebase";
import { collection, getDocs, doc, onSnapshot, addDoc, Timestamp, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getFriend } from "../services/getFriend";
import { setFriend } from "../store/slices/usersSlice";
import { convertToMs } from "../helpers/convertToMs";
import { convertFromMs } from "../helpers/convertFromMs";

const ChatPage = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const [value, setValue] = useState("");

  const messages = useSelector(state => state.chat.messages);
  const friend = useSelector(state => state.users.friend);

  const chatFieldRef = useRef();

  const handleClick = async () => {
    const date = Timestamp.now();
    await addDoc(collection(db, "messages"), {
      from: currentUser.uid,
      value,
      timestamp: convertToMs(date)
    });
  }

  useEffect(() => {
    getFriend(currentUser).then(res => dispatch(setFriend(res)))
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "messages"), orderBy("timestamp")), (doc) => {
      const history = [];
      doc.forEach(item => {
        history.push(item.data());
      });
      dispatch(setMessages(history));

    });
    
    return unsub;
  }, []);

  useEffect(() => {
    if (chatFieldRef.current) chatFieldRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  useEffect(() => {
    let unsub;
    getFriend(currentUser)
      .then(res => {
        dispatch(setFriend(res));
        return res;
      })
      .then(res => {
        unsub = onSnapshot(doc(db, "users", res.email), (doc) => {
          dispatch(setFriend(doc.data()));
        })
      })

    return unsub;
  }, []);

  const signOut = () => {
    localStorage.setItem("user", null);
    const date = Timestamp.now();
    updateDoc(doc(db, "users", currentUser.email), { online: false, lastSeen: (date.seconds + date.nanoseconds / 1000000000) * 1000 })
      .then(() => navigate("/"));
  }

  return (
    <Container maxWidth="md" sx={{ height: "100vh", pt: 2, pb: 2 }}>
      <Paper
        elevation={10}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 5
        }}
      >
        {/* chat header */}
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
                (friend?.online ? "online" : "last seen " + convertFromMs(friend?.lastSeen).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
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
        {/* messages */}
        <Stack spacing={1} sx={{ border: 1, flex: "1 1 0", overflowY: "auto" }}>
          {
            messages.map(message => {
              // console.log(message);
              // mymessage / freindmessage
              return message.from === currentUser.uid ?
                (
                  <>
                    <Box key={message.timestamp} sx={{ display: "flex", marginLeft: "auto !important" }}>
                      <Box>
                        <Typography>{message.value}</Typography>
                        <Typography>{new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Typography>
                      </Box>
                      <Avatar />
                    </Box>
                    <div ref={chatFieldRef} />
                  </>
                ) : (
                  <>
                    <Box key={message.timestamp} sx={{ display: "flex" }}>
                      <Avatar />
                      <Box>
                        <Typography>{message.value}</Typography>
                        <Typography>{new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Typography>
                      </Box>
                    </Box>
                    <div ref={chatFieldRef} />
                  </>

                )
            })
          }
        </Stack>
        {/* input field */}
        <Box>
          <TextField value={value} onChange={(e) => setValue(e.target.value)} />
          <IconButton onClick={handleClick}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  )
};

export default ChatPage;
