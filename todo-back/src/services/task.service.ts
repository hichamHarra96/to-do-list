import { TaskRepository } from "../repositories/task.repository";
import { Task } from "../domain/task.entity";
import { TaskDto } from "../domain/task.dto";

export class TaskService {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async createTask(task: TaskDto) {
        return await this.taskRepository.create({
            title: task.title,
            description: task.description,
            status: task.status
        });
    }

    async getTasks() {
        return await this.taskRepository.findAll();
    }

    async getTaskById(id: string) {
        return await this.taskRepository.findById(id); 
    }

    async updateTask(id: string, task: Partial<TaskDto>) {
        const existingTask = await this.taskRepository.findById(id);
        if (!existingTask) return null; 
        return await this.taskRepository.update(id, task);
    }

    async deleteTask(id: string) {
        const deletedTask = await this.taskRepository.findById(id);
        if (!deletedTask) return null; 
        return await this.taskRepository.delete(id);
    }
}
