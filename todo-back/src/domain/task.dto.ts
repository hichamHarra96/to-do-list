export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
  }
  
  export class TaskDto {  
    constructor(
      public title: string,
      public description: string,
      public status: TaskStatus
    ) {}
  }
  