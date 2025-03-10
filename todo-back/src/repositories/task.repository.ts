import mongoose, { Schema, Document } from "mongoose";
import { Task } from "../domain/task.entity";
import { TaskStatus } from "../domain/taskStatus";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  status: TaskStatus;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO,
  },
});

export const TaskModel = mongoose.model<TaskDocument>("Task", TaskSchema);

export class TaskRepository {
  async create(task: Omit<Task, "id">): Promise<TaskDocument> {
    const newTask = new TaskModel({ ...task });
    return await newTask.save();
  }

  async findAll(): Promise<TaskDocument[]> {
    return await TaskModel.find();
  }

  async findById(id: string): Promise<TaskDocument | null> {
    return await TaskModel.findById(id);
  }

  async update(id: string, task: Partial<Task>): Promise<TaskDocument | null> {
    return await TaskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: string): Promise<TaskDocument | null> {
    return await TaskModel.findByIdAndDelete(id);
  }
}
