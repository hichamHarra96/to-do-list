export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export class Task {
  _id?: string;

  constructor(
    public title: string,
    public description: string,
    public status: TaskStatus
  ) {}
}
