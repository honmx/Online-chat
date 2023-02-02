import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { Stack } from "@mui/material";
import Message from "../components/Message";
import { setMessages } from "../store/slices/chatSlice";
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { db } from "../firebase";

const Messages = ({ messages }) => {

  const dispatch = useDispatch();

  const chatFieldRef = useRef();

  useEffect(() => {
    if (chatFieldRef.current) chatFieldRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <Stack spacing={1} sx={{ border: 1, flex: "1 1 0", overflowY: "auto" }}>
      {messages.map(message => <Message key={message.timestamp} message={message} />)}
      <div ref={chatFieldRef} />
    </Stack>
  )
};

export default Messages;
