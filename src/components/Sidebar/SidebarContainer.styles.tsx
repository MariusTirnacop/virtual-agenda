import { Box, styled } from "@mui/material";

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "350px",
  borderRight: "1px solid #e0e0e0",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  [theme.breakpoints.down(975)]: {
    width: "100%",
    marginBottom: "1rem",
  },
}));
