export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
}

export interface Task {
    title: string;
    description: string;
    status: TaskStatus;
}
