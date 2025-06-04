import React from "react";
import { Box, TextField } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { styled } from "@mui/material/styles";
import Loader from "./Loader";

const ArrowButtonWrapper = styled("div")({
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  width: 50,
  height: 50,
  borderRadius: "50%",
  background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px 0 rgba(123,47,242,0.10)",
  cursor: "pointer",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-50%) scale(1.1)",
  },
});

export default function SearchBar({ search, setSearch, loading, onSearch }) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 10,
        boxShadow: "0 2px 12px 0 rgba(123,47,242,0.07)",
        background: "#fff",
        border: "3px solid #D2E8FF",
        px: 2,
        display: "flex",
        alignItems: "center",
        minHeight: 70,
        maxWidth: 1500,
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Looking Java Jobs in Delhi 7 years Experience 10 LPA"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: 17,
            color: "#222",
            pl: 2,
            pr: 7,
          },
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ flex: 1, background: "transparent" }}
      />

      <ArrowButtonWrapper onClick={onSearch} aria-label="search button">
        {loading && <Loader />}
        <ArrowUpwardIcon sx={{ color: "#fff", fontSize: 28, zIndex: 1 }} />
      </ArrowButtonWrapper>
    </Box>
  );
}
