import { TaskRepository } from "../repositories/task.repository";
import { Task } from "../domain/task.entity";


export class TaskService {
    private taskRepository = new TaskRepository();

    constructor(taskRepository?: TaskRepository) {
        this.taskRepository = taskRepository || new TaskRepository();
    }


    async createTask(task: Task) {
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

    async updateTask(id: string, task: Partial<Task>) {
        return await this.taskRepository.update(id, task);
    }

    async deleteTask(id: string) {
        return await this.taskRepository.delete(id);
    }
}
