import { TaskRepository } from "../repositories/task.repository";
import { Task } from "../domain/task.entity";
import { TaskDto } from "../domain/task.dto";


export class TaskService {
    private taskRepository = new TaskRepository();

    constructor(taskRepository?: TaskRepository) {
        this.taskRepository = taskRepository || new TaskRepository();
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
        return await this.taskRepository.update(id, task);
    }

    async deleteTask(id: string) {
        return await this.taskRepository.delete(id);
    }
}
