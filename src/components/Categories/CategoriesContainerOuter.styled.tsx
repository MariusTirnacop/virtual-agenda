import { Stack, styled } from "@mui/material";

export const CategoriesContainerOuter = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
  gap: "1rem",
  [theme.breakpoints.down(1250)]: {
    height: "auto",
  },
}));
