import { PropsWithChildren, ReactElement, useMemo, useState } from "react";
import { FiltersContext } from "./FiltersContextProvider";
import dayjs, { Dayjs } from "dayjs";
import { FilterCriteria, FilterTypeEnum } from "../../models/filters/filters";
import { TaskStatusEnum } from "../../models/tasks/tasks";

const defaultFilterCriteria: FilterCriteria = {
  taskDate: null,
  startDate: dayjs(Date.now()),
  endDate: dayjs(Date.now()),
  title: "",
  status: TaskStatusEnum.CREATED,
};

const FiltersContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [taskDate, setTaskDate] = useState<Dayjs>(dayjs(Date.now()));
  const [filterType, setFilterType] = useState<FilterTypeEnum>(FilterTypeEnum.BASIC);
  const [filterCriteria, setFilterCriteria] =
    useState<FilterCriteria>(defaultFilterCriteria);

  const value = useMemo(() => {
    return {
      taskDate,
      setTaskDate,
      filterType,
      setFilterType,
      filterCriteria,
      setFilterCriteria,
    };
  }, [taskDate, filterType, filterCriteria]);

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export default FiltersContextProvider;
