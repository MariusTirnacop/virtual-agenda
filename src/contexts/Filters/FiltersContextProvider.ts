import dayjs, { Dayjs } from "dayjs";
import { createContext, useContext } from "react";
import { FilterCriteria, FilterTypeEnum } from "../../models/filters/filters";

type FiltersContextType = {
  taskDate: Dayjs;
  setTaskDate: (date: Dayjs) => void;
  filterType: FilterTypeEnum;
  setFilterType: (filterType: FilterTypeEnum) => void;
  filterCriteria: FilterCriteria;
  setFilterCriteria: (criteria: FilterCriteria) => void;
};

const initialState: FiltersContextType = {
  taskDate: dayjs(Date.now()),
  setTaskDate: () => {},
  filterType: FilterTypeEnum.BASIC,
  setFilterType: () => {},
  filterCriteria: {} as FilterCriteria,
  setFilterCriteria: () => {},
};

export const FiltersContext = createContext<FiltersContextType>(initialState);

export const useFiltersContext = () => useContext(FiltersContext);
