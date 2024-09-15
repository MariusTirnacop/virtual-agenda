import { createContext, useContext } from "react";
import { Tasks } from "../../models/tasks/tasks";

type TasksContextType = {
  tasks: Tasks[];
  addTask: (task: Partial<Tasks>) => void;
  editTask: (task: Partial<Tasks>) => void;
  deleteTask: (taskId: string) => void;
};

const initialState = {
  tasks: [],
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
};

export const TasksContext = createContext<TasksContextType>(initialState);

export const useTasksContext = () => useContext(TasksContext);
