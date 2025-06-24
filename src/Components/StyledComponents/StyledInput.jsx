import { Input } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInput = styled(Input)(() => ({
  borderRadius: "8px",
  background: "#DFF0FF",
  boxShadow: "0px 4px 4px 0px rgba(58, 112, 205, 0.25)",

  padding: "12px",
  "&::before": {
    display: "none",
  },

  "&::after": {
    display: "none",
  },

  "& input": {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "120%",
    color: "#252525",
  },

  "& input::placeholder": {
    color: "rgba(0, 0, 0, 0.35)",
  },
}));

export default StyledInput;
