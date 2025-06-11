import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useJobStore from "../store/jobStore";

const NotFound = () => {
  const { error } = useJobStore();

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#fefefe",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 60, color: "#d32f2f", mb: 2 }} />
        <Typography variant="h3" color="error" gutterBottom>
          {error?.status || 500}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {error?.message || "Oops! Something went wrong."}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          The page you are looking for might be removed or is temporarily unavailable.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href="/"
          sx={{ mt: 4, borderRadius: 2, px: 4, py: 1 }}
        >
          Go to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
