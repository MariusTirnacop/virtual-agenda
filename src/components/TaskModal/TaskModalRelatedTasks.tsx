import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import React from "react";

import { Tasks } from "../../models/tasks/tasks";

type TaskModalRelatedTasksProps = {
  currentTask: Partial<Tasks>;
  setCurrentTask: (value: Partial<Tasks>) => void;
  isReadOnly: boolean;
  tasks: Tasks[];
  handleOpenModal: (task: Tasks | undefined) => void;
};

const TaskModalRelatedTasks = ({
  currentTask,
  setCurrentTask,
  isReadOnly,
  tasks,
  handleOpenModal,
}: TaskModalRelatedTasksProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask({ ...currentTask, hasRelatedTasks: e.target.checked });
  };

  const filteredTasks = tasks.filter((task) => task.id !== currentTask.id);

  return (
    <>
      <FormControlLabel
        sx={{ m: 0 }}
        control={
          <Checkbox
            checked={currentTask.hasRelatedTasks ?? false}
            onChange={handleCheckboxChange}
            disabled={isReadOnly}
          />
        }
        label="Has related tasks?"
      />

      <>
        {currentTask.hasRelatedTasks && !isReadOnly && (
          <FormControl fullWidth>
            <InputLabel id="related-tasks">Related Tasks</InputLabel>
            <Select
              labelId="related-tasks"
              id="related-tasks"
              label="Related Tasks"
              multiple
              value={currentTask.relatedTaskIds ?? []}
              onChange={(e) =>
                setCurrentTask({
                  ...currentTask,
                  relatedTaskIds: e.target.value as string[],
                })
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((taskId) => {
                    const task = filteredTasks.find((task) => task.id === taskId);
                    if (!task) return null;
                    return (
                      <Chip
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                        key={taskId}
                        label={task?.title}
                        onClick={() => {
                          handleOpenModal(task);
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              disabled={filteredTasks.length === 0}
            >
              {filteredTasks.map((task) => (
                <MenuItem key={task.id} value={task.id}>
                  {task.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {currentTask.hasRelatedTasks && isReadOnly && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {(currentTask.relatedTaskIds ?? []).map((taskId) => {
              const task = filteredTasks.find((task) => task.id === taskId);
              return (
                <Chip
                  sx={{ ml: 0.5 }}
                  key={taskId}
                  label={task?.title}
                  onClick={() => {
                    handleOpenModal(task);
                  }}
                />
              );
            })}
          </Box>
        )}
      </>
    </>
  );
};

export default TaskModalRelatedTasks;
