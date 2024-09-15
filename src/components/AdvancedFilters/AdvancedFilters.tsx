import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { TaskStatusEnum } from "../../models/tasks/tasks";
import { useFilters } from "../../hooks/useFilters";

const AdvancedFilters = () => {
  const { handleAdvancedFilters } = useFilters();
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(Date.now()));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(Date.now()));
  const [status, setStatus] = useState<TaskStatusEnum>(TaskStatusEnum.CREATED);
  const [title, setTitle] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      setShowError(true);
      return;
    }
    setShowError(false);
    handleAdvancedFilters(startDate, endDate, title, status);
  };

  const showAllTasksAndReset = () => {
    handleAdvancedFilters(null, null, null, null);
    setStartDate(dayjs(Date.now()));
    setEndDate(dayjs(Date.now()));
    setStatus(TaskStatusEnum.CREATED);
    setTitle("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <DatePicker
            label="Select start date"
            value={startDate}
            onChange={(newValue) => newValue && setStartDate(newValue)}
            format="DD/MM/YYYY"
            sx={{
              width: "100%",
            }}
          />
          <DatePicker
            label="Select end date"
            value={endDate}
            onChange={(newValue) => newValue && setEndDate(newValue)}
            format="DD/MM/YYYY"
            sx={{
              width: "100%",
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatusEnum)}
              labelId="status"
              id="status"
              label="Status"
              color="primary"
              defaultValue={TaskStatusEnum.CREATED}
              sx={{
                width: "100%",
              }}
            >
              <MenuItem value={TaskStatusEnum.CREATED}>Created</MenuItem>
              <MenuItem value={TaskStatusEnum.IN_PROGRESS}>In Progress</MenuItem>
              <MenuItem value={TaskStatusEnum.COMPLETED}>Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              width: "100%",
            }}
            error={showError && !title}
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Filter
            </Button>
            <Button variant="outlined" type="reset" onClick={showAllTasksAndReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </LocalizationProvider>
  );
};

export default AdvancedFilters;
