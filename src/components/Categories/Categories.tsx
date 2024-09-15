import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tasks, TaskStatusEnum } from "../../models/tasks/tasks";
import TaskCard from "../TaskCard/TaskCard";

import { useMemo } from "react";

import { useFilters } from "../../hooks/useFilters";
import { CategoriesContainerOuter } from "./CategoriesContainerOuter.styled";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTasksContext } from "../../contexts/Tasks/TasksProvider";
import CategoriesContainer from "./CategoriesContainer";

const Categories = () => {
  const { filteredTasks } = useFilters();
  const { editTask } = useTasksContext();
  const taskArray = Object.values(TaskStatusEnum);
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up(1250));

  const taskStatusToCategory = useMemo(() => {
    return filteredTasks.reduce((acc, task) => {
      return {
        ...acc,
        [task.status]: [...(acc[task.status] || []), task],
      };
    }, {} as Record<TaskStatusEnum, Tasks[]>);
  }, [filteredTasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const task = filteredTasks.find((task) => task.id === active.id);
      if (task) {
        editTask({ ...task, status: over.id as TaskStatusEnum });
      }
    }
  };

  const getEmptyColumnMessage = (category: TaskStatusEnum) => {
    switch (category) {
      case TaskStatusEnum.COMPLETED:
        return {
          message: "You have completed no tasks",
          emoji: "😢",
        };
      case TaskStatusEnum.IN_PROGRESS:
        return {
          message: "No tasks in progress",
          emoji: "💪",
        };
      case TaskStatusEnum.CREATED:
        return {
          message: "Let's start working",
          emoji: "🚀",
        };
      default:
        return {
          message: "No tasks in this column",
          emoji: "🤔",
        };
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <CategoriesContainerOuter sx={{ flexWrap: isWideScreen ? "nowrap" : "wrap" }}>
        {taskArray.map((category) => (
          <CategoriesContainer key={category} category={category}>
            <Typography variant="h6">{category}</Typography>

            {taskStatusToCategory[category]?.length > 0 ? (
              taskStatusToCategory[category].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <Stack
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                py={4}
              >
                <Typography variant="h6">
                  {getEmptyColumnMessage(category).message}
                </Typography>
                <Typography variant="h6">
                  {getEmptyColumnMessage(category).emoji}
                </Typography>
              </Stack>
            )}
          </CategoriesContainer>
        ))}
      </CategoriesContainerOuter>
    </DndContext>
  );
};

export default Categories;
