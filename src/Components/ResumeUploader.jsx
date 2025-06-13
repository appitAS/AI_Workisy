import { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ResumeUploader({ setResumeFile }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size < 1024 * 1024) {
      setResumeFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      alert("Resume File should be Less than 1 MB");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ minHeight: "50vh", p: 3, bgcolor: "#e8f0fe", borderRadius: 3 }}
    >
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 2 }}
        fullWidth
      >
        Upload Resume File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
      </Button>
      <Typography variant="caption" color="textSecondary">
        *Resume File should be Less than 1 MB
      </Typography>
      <Box mt={2} display="flex" justifyContent="center">
        {preview ? (
          <img
            src={preview}
            alt="Resume Preview"
            style={{ width: 200, borderRadius: 8 }}
          />
        ) : (
          <img
            src="your-placeholder-image-url.jpg"
            alt="Placeholder"
            style={{ width: 200, borderRadius: 8 }}
          />
        )}
      </Box>
    </Paper>
  );
}
