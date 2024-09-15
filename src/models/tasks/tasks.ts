import { Dayjs } from "dayjs";

export enum TaskStatusEnum {
  CREATED = "Created",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export enum TaskPriorityEnum {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export type Tasks = {
  id: string;
  title: string;
  description: string;
  startDate: Dayjs;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  hasRelatedTasks?: boolean;
  relatedTaskIds?: string[];
};
