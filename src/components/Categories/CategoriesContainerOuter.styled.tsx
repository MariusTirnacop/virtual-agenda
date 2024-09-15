import { Stack, styled } from "@mui/material";

export const CategoriesContainerOuter = styled(Stack)({
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
  gap: "1rem",
  [`@media (max-width: 1250px)`]: {
    height: "auto",
  },
});
