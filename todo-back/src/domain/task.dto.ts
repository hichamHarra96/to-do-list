import { TaskStatus } from "./taskStatus";

export class TaskDto {
  constructor(
    public title: string,
    public description: string,
    public status: TaskStatus
  ) {}
}
