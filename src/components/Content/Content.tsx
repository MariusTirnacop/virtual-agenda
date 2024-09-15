import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Categories from "../Categories/Categories";
import Chart from "../Charts/Chart";
import PriorityPieChart from "../Charts/PieChart";
import Sidebar from "../Sidebar/Sidebar";

import { useFilters } from "../../hooks/useFilters";
import NoTasksFound from "../assets/NoTasksFound";

const Content = () => {
  const { filteredTasks } = useFilters();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down(975));
  const isMobile = useMediaQuery(theme.breakpoints.down(450));

  return (
    <Stack width="100%" height="100%" flexDirection="column" p={isMobile ? 0 : 2}>
      {isTablet && <Sidebar />}
      <Categories />
      {filteredTasks.length > 0 ? (
        <Stack flexDirection={isTablet ? "column" : "row"} justifyContent="space-between">
          <Chart />
          <PriorityPieChart />
        </Stack>
      ) : (
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          marginTop={isTablet ? "20px" : "15px"}
          gap={2}
        >
          <Typography fontSize={isTablet ? 22 : 16}>No tasks found</Typography>
          <NoTasksFound width={isTablet ? 250 : 500} height={isTablet ? 200 : 400} />
        </Stack>
      )}
    </Stack>
  );
};

export default Content;
