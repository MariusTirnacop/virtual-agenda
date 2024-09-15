import { Box, styled } from "@mui/material";

export const TaskModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "#fff",
  border: "none",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  padding: "2rem",
  borderRadius: "12px",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    maxWidth: "350px",
  },
}));
