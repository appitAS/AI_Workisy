import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  keyframes,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useJobStore from "../store/jobStore";

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.8; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const NotFound = () => {
  const { error } = useJobStore();

  useEffect(() => {
    document.title = "Page Not Found | Job Portal";
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 18,
      }}
    >
      <Box
        elevation={8}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          textAlign: "center",

          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, #ffeded 0%, transparent 60%)",
            opacity: 0.4,
            animation: `${float} 8s infinite linear`,
            zIndex: 0,
          },
        }}
      >
        <Box position="relative" zIndex={1}>
          <Box
            sx={{
              display: "inline-flex",
              borderRadius: "50%",
              p: 2,
              background: "linear-gradient(45deg, #ffecec, #ffdfdf)",
              boxShadow: "0 5px 15px rgba(211, 47, 47, 0.2)",
              animation: `${pulse} 2s infinite ease-in-out`,
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: { xs: 50, sm: 60 }, color: "#d32f2f" }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4rem", sm: "5rem" },
              fontWeight: 700,
              background: "linear-gradient(45deg, #d32f2f, #ff6b6b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
              letterSpacing: 1.5,
            }}
          >
            {error?.status || 500}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 2,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            {/* {error?.message || "Oops! Something went wrong."} */}
            Our current AI model is not available right now. You can try another
            model.
          </Typography>

          <Button
            variant="contained"
            href="/"
            sx={{
              mt: 2,
              borderRadius: 50,
              px: 5,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              background: "linear-gradient(45deg, #1976d2, #2196f3)",
              boxShadow: "0 4px 10px rgba(33, 150, 243, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 6px 15px rgba(33, 150, 243, 0.5)",
                background: "linear-gradient(45deg, #1565c0, #1976d2)",
              },
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
