import { Box, styled } from "@mui/material";

export const TaskModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "#ffffff",
  border: "2px solid #000",
  boxShadow: "24px",
  padding: "1.5rem",
  borderRadius: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    maxWidth: "350px",
  },
}));
