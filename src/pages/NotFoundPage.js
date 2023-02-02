import React from "react"
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant="h1">Page not found</Typography>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
      >
        Go back
      </Button>
    </Box>
  )
};

export default NotFoundPage;
