import { TaskStatus } from "./taskStatus";

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}
