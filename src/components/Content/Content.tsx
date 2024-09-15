import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Categories from "../Categories/Categories";
import Chart from "../Charts/Chart";
import PriorityPieChart from "../Charts/PieChart";
import Sidebar from "../Sidebar/Sidebar";

import { useFilters } from "../../hooks/useFilters";

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
        <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
          <Typography>No tasks found</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default Content;
