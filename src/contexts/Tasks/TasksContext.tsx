import dayjs from "dayjs";
import { Tasks } from "../../models/tasks/tasks";
import { TasksContext } from "./TasksProvider";
import { PropsWithChildren, ReactElement, useEffect, useMemo, useState } from "react";

const LOCAL_STORAGE_KEY = "tasks";

export const TasksProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [tasks, setTasks] = useState<Tasks[]>(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      return JSON.parse(storedTasks).map((task: Tasks) => ({
        ...task,
        startDate: dayjs(task.startDate),
      }));
    }
    return [];
  });

  const addTask = (task: Partial<Tasks>) => {
    const generateUniqueId = window.crypto.randomUUID();
    setTasks((prevTasks) => [...prevTasks, { ...task, id: generateUniqueId } as Tasks]);
  };

  const editTask = (newTask: Partial<Tasks>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === newTask.id ? (newTask as Tasks) : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        tasks.map((task) => ({
          ...task,
          startDate: dayjs(task.startDate).toISOString(),
        }))
      )
    );
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      editTask,
      deleteTask,
    }),
    [tasks]
  );

  return <TasksContext.Provider value={value}> {children} </TasksContext.Provider>;
};
