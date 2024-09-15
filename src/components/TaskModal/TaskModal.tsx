import { useModalContext } from "../../contexts/Modal/ModalContextProvider";

import { TaskPriorityEnum, Tasks, TaskStatusEnum } from "../../models/tasks/tasks";
import { useEffect, useMemo, useState } from "react";
import { useTasksContext } from "../../contexts/Tasks/TasksProvider";
import { Dayjs } from "dayjs";
import { useFiltersContext } from "../../contexts/Filters/FiltersContextProvider";
import { TaskModalContainer } from "./TaskModalContainer.styles";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TaskModalHeader } from "./TaskModalHeader";
import TaskModalRelatedTasks from "./TaskModalRelatedTasks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const getInitialState = (startDate: Dayjs): Partial<Tasks> => {
  return {
    title: "",
    description: "",
    priority: TaskPriorityEnum.LOW,
    status: TaskStatusEnum.CREATED,
    startDate,
    hasRelatedTasks: false,
    relatedTaskIds: [],
  };
};

const TaskModal = () => {
  const { open, payload, handleCloseModal, isReadOnly, handleOpenModal } =
    useModalContext();
  const { addTask, editTask, tasks } = useTasksContext();
  const { taskDate } = useFiltersContext();
  const initialState = useMemo(() => getInitialState(taskDate), [taskDate]);
  const [currentTask, setCurrentTask] = useState<Partial<Tasks>>(payload ?? initialState);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentTask.title) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (payload) {
      editTask(currentTask);
    } else {
      addTask(currentTask);
      setCurrentTask(initialState);
    }
    handleCloseModal();
  };

  useEffect(() => {
    setCurrentTask(payload ?? initialState);
    setShowError(false);
  }, [payload, initialState]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <TaskModalContainer>
        <TaskModalHeader
          handleCloseModal={handleCloseModal}
          payload={payload}
          isReadOnly={isReadOnly}
        />
        <Divider />

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {showError && <Alert severity="error">Please fill in the task name.</Alert>}
            <TextField
              slotProps={{
                input: {
                  readOnly: isReadOnly,
                  style: isReadOnly ? { pointerEvents: "none" } : {},
                },
              }}
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              id="Task Name"
              label="Task Name"
              variant="outlined"
              fullWidth
              error={showError && !currentTask.title}
            />
            <TextField
              slotProps={{
                input: {
                  readOnly: isReadOnly,
                  style: isReadOnly ? { pointerEvents: "none" } : {},
                },
              }}
              value={currentTask.description}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, description: e.target.value })
              }
              id="Task Description"
              label="Task Description"
              variant="outlined"
              fullWidth
            />
            {payload && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  format="DD/MM/YYYY"
                  value={currentTask.startDate}
                  onChange={(newValue) =>
                    setCurrentTask({ ...currentTask, startDate: newValue || undefined })
                  }
                  readOnly={isReadOnly}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                    },
                  }}
                />
              </LocalizationProvider>
            )}

            <TaskModalRelatedTasks
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              isReadOnly={isReadOnly}
              tasks={tasks}
              handleOpenModal={handleOpenModal}
            />

            <FormControl fullWidth>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                slotProps={{
                  input: {
                    readOnly: isReadOnly,
                  },
                }}
                value={currentTask.priority}
                style={isReadOnly ? { pointerEvents: "none" } : {}}
                onChange={(e) =>
                  setCurrentTask({
                    ...currentTask,
                    priority: e.target.value as TaskPriorityEnum,
                  })
                }
                labelId="priority"
                id="priority"
                label="Priority"
                color="primary"
                defaultValue={TaskPriorityEnum.LOW}
              >
                <MenuItem value={TaskPriorityEnum.LOW}>Low</MenuItem>
                <MenuItem value={TaskPriorityEnum.MEDIUM}>Medium</MenuItem>
                <MenuItem value={TaskPriorityEnum.HIGH}>High</MenuItem>
              </Select>
            </FormControl>
            {!isReadOnly && (
              <Button sx={{ alignSelf: "flex-end" }} type="submit" variant="contained">
                {payload ? "Edit task" : "Create task"}
              </Button>
            )}
          </Box>
        </form>
      </TaskModalContainer>
    </Modal>
  );
};

export default TaskModal;
