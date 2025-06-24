import React from "react";
import { styled } from "@mui/material/styles";

const RotatingBorder = styled("div")({
  position: "absolute",
  width: 54,
  height: 54,
  borderRadius: "50%",
  border: "2px solid transparent",
  borderTopColor: "#7b2ff2",
  animation: "spin 1s linear infinite",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@keyframes spin": {
    from: { transform: "translate(-50%, -50%) rotate(0deg)" },
    to: { transform: "translate(-50%, -50%) rotate(360deg)" },
  },
});

export default function Loader() {
  return <RotatingBorder />;
}
