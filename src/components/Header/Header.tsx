import { Stack, Typography } from "@mui/material";
import { AppLogo } from "../assets/AppLogo";

const Header = () => {
  return (
    <Stack
      width="100%"
      alignItems="center"
      justifyContent="center"
      p={2}
      gap={2}
      flexDirection="row"
    >
      <Typography variant="h4">Virtual Agenda</Typography>
      <AppLogo width={45} height={45} />
    </Stack>
  );
};

export default Header;
