import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export default function UploadButton() {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) console.log("File uploaded:", file.name);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 500, md: 620 },
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadOutlinedIcon sx={{ color: "#7b2ff2", fontSize: 22 }} />}
        onClick={() => fileInputRef.current.click()}
        sx={{
          mt: 2,
          borderRadius: "30px",
          px: 3,
          py: 1.2,
          borderColor: "#7b2ff2",
          color: "#7b2ff2",
          fontWeight: 600,
          fontSize: 16,
          textTransform: "none",
          transition: "all 0.2s",
          "&:hover": {
            background: "#f7f0fe",
            borderColor: "#7b2ff2",
          },
        }}
      >
        Upload Your Resume
      </Button>
    </Box>
  );
}
