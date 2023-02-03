import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { setCurrentUser } from "../helpers/setCurrentUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

const LoginPage = (props) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    await updateDoc(doc(db, "users", user.email), {online: true})
    
    const currentUserFromDatabase = await getDoc(doc(db, "users", user.email));
    setCurrentUser(currentUserFromDatabase.data());
    
    navigate("/chat");
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
