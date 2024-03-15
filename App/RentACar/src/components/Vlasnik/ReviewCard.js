import {
  Button,
  Divider,
  Card,
  Box,
  Typography,
  Grid,
  IconButton,
  Avatar,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewCard({ text = "", ocena = 0, imeOsobe = "" }) {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            marginLeft: 20,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {imeOsobe} rated 📑
        </Typography>
        <Typography
          style={{
            textAlign: "center",
            marginLeft: 20,
            fontSize: 25,
            cursor: "pointer",
          }}
        >
          {text}
        </Typography>
        <Typography
          style={{
            textAlign: "center",
            marginLeft: 20,
            fontSize: 25,
            cursor: "pointer",
          }}
          sx={{fontWeight: 'bold'}}
        >
          {ocena} 
        </Typography>
        <Divider style={{ marginTop: 20 }}></Divider>
      </Grid>
    </Grid>
  );
}
