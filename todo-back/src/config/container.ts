import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { TaskRoutes } from "../routes/task.route";

class Container {
    private static instance: Container;
    private taskRepository: TaskRepository;
    private taskService: TaskService;
    private taskController: TaskController;
    private taskRoutes: TaskRoutes;

    private constructor() {
        this.taskRepository = new TaskRepository();
        this.taskService = new TaskService(this.taskRepository);
        this.taskController = new TaskController(this.taskService);
        this.taskRoutes = new TaskRoutes(this.taskController);
    }

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }

    public getTaskRoutes(): TaskRoutes {
        return this.taskRoutes;
    }
}

export const container = Container.getInstance();
