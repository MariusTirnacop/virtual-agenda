import { CalendarIcon, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/material";
import { useFiltersContext } from "../../contexts/Filters/FiltersContextProvider";
import { useFilters } from "../../hooks/useFilters";
import { Dayjs } from "dayjs";

const BasicFilters = () => {
  const { taskDate, setTaskDate } = useFiltersContext();
  const { handleBasicFilters } = useFilters();

  const handleFilterChange = (newValue: Dayjs | null) => {
    if (!newValue) return;
    setTaskDate(newValue);
    handleBasicFilters(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <CalendarIcon />
        <DatePicker
          format="DD/MM/YYYY"
          label="Filter by date"
          value={taskDate}
          onChange={handleFilterChange}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default BasicFilters;
