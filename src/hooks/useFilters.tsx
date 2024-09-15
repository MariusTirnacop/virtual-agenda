import { useCallback, useMemo } from "react";
import { useFiltersContext } from "../contexts/Filters/FiltersContextProvider";
import { useTasksContext } from "../contexts/Tasks/TasksProvider";
import { Tasks, TaskStatusEnum } from "../models/tasks/tasks";

import { Dayjs } from "dayjs";
import { FilterTypeEnum } from "../models/filters/filters";

type useFiltersReturnType = {
  handleAdvancedFilters: (
    startDate: Dayjs,
    endDate: Dayjs,
    title: string,
    status: TaskStatusEnum
  ) => void;
  handleBasicFilters: (taskDate: Dayjs | null) => void;
  filteredTasks: Tasks[];
};

export const useFilters = (): useFiltersReturnType => {
  const { filterCriteria, setFilterCriteria, filterType } = useFiltersContext();
  const { tasks } = useTasksContext();

  const filteredTasks = useMemo(() => {
    let newTasks = [...tasks];

    if (filterType === FilterTypeEnum.BASIC) {
      if (filterCriteria.taskDate) {
        newTasks = newTasks.filter((task) =>
          task.startDate.isSame(filterCriteria.taskDate, "day")
        );
      }
    } else if (filterType === FilterTypeEnum.ADVANCED) {
      if (filterCriteria.startDate && filterCriteria.endDate) {
        newTasks = newTasks.filter(
          (task) =>
            (task.startDate.isAfter(filterCriteria.startDate) &&
              task.startDate.isBefore(filterCriteria.endDate)) ||
            task.startDate.isSame(filterCriteria.startDate, "day") ||
            task.startDate.isSame(filterCriteria.endDate, "day")
        );
      }
      if (filterCriteria.title) {
        newTasks = newTasks.filter((task) =>
          task.title.toLowerCase().includes(filterCriteria.title.toLowerCase())
        );
      }
      if (filterCriteria.status) {
        newTasks = newTasks.filter((task) => task.status === filterCriteria.status);
      }
    }

    return newTasks;
  }, [tasks, filterCriteria, filterType]);

  const handleBasicFilters = useCallback(
    (taskDate: Dayjs | null) => {
      setFilterCriteria({ ...filterCriteria, taskDate });
    },
    [filterCriteria, setFilterCriteria]
  );

  const handleAdvancedFilters = useCallback(
    (startDate: Dayjs, endDate: Dayjs, title: string, status: TaskStatusEnum) => {
      setFilterCriteria({
        ...filterCriteria,
        startDate,
        endDate,
        title,
        status,
      });
    },
    [filterCriteria, setFilterCriteria]
  );

  return { handleAdvancedFilters, handleBasicFilters, filteredTasks };
};
