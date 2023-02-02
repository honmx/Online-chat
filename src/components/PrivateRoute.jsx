import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../helpers/getCurrentUser";

const PrivateRoute = ({ auth, element }) => {

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser && auth) navigate("/");
    if (currentUser && !auth) navigate("/chat");
  })

  if (currentUser && auth) return element;
  if (!currentUser && !auth) return element;
};

export default PrivateRoute;
