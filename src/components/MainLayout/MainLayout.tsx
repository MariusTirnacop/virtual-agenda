import { Box, useMediaQuery, useTheme } from "@mui/material";
import Content from "../Content/Content";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(975));
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {!isMobile && <Sidebar />}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Content />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
