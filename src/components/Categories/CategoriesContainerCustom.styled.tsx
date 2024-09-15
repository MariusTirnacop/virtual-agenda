import { Box, styled } from "@mui/material";

export const CategoriesContainerCustom = styled(Box)(({ theme }) => ({
  backgroundColor: "#e5e7eb",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  height: "100%",
  width: "100%",
  borderRadius: "1rem",
  padding: "1rem",
  overflowY: "auto",
  maxHeight: "100%",
  [theme.breakpoints.down(1250)]: {
    height: "auto",
  },
}));
