import { Dayjs } from "dayjs";
import { TaskStatusEnum } from "../tasks/tasks";

export enum FilterTypeEnum {
  BASIC = "basic",
  ADVANCED = "advanced",
}

export type FilterCriteria = {
  taskDate: Dayjs | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  title: string | null;
  status: TaskStatusEnum | null;
};
