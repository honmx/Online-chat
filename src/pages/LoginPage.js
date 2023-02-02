import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
// import { authWithEmailAndPassword } from "../services/authWithEmailAndPassword";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCurrentUser } from "../helpers/setCurrentUser";
import { auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { setFriend } from "../store/slices/usersSlice";
import { getFriend } from "../services/getFriend";
import { useDispatch } from "react-redux";

const LoginPage = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setCurrentUser({ ...user });
        // getFriend(user).then(res => dispatch(setFriend(res)))

        updateDoc(doc(db, "users", user.email), {online: true})
          .then(() => navigate("/chat"));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 3
        }}
      >
        <Typography>Let's log in to your account</Typography>
        <form onSubmit={login}>
          <Box>
            <TextField placeholder="Enter your login" value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
          </Box>
          <Box>
            <TextField placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
          </Box>
          <Button type="submit">Log in</Button>
        </form>
      </Paper>
    </Container>
  )
};

export default LoginPage;
