import { TaskDto } from "../domain/task.dto";
import { NotFoundError } from "../errors/not-found-error";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(task: TaskDto) {
    return await this.taskRepository.create({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  async getTasks() {
    return await this.taskRepository.findAll();
  }

  async getTaskById(id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: string, task: Partial<TaskDto>) {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return await this.taskRepository.update(id, task);
  }

  async deleteTask(id: string) {
    const deletedTask = await this.taskRepository.findById(id);
    if (!deletedTask) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return await this.taskRepository.delete(id);
  }
}
