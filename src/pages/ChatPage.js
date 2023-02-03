import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { Container, Paper} from "@mui/material";
import ChatHeader from "../components/ChatHeader";
import Messages from "../components/Messages";
import InputMessageField from "../components/InputMessageField";
import { setFriend } from "../store/slices/usersSlice";
import { getFriend } from "../services/getFriend";
import { getCurrentUser } from "../helpers/getCurrentUser";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ChatPage = () => {

  const dispatch = useDispatch();

  const currentUser = getCurrentUser();

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
        <ChatHeader />
        <Messages />
        <InputMessageField />
      </Paper>
    </Container>
  )
};

export default ChatPage;
