import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export class TaskRoutes {
    private router: Router;
    private taskController: TaskController;

    constructor(taskController: TaskController) {
        this.router = Router();
        this.taskController = taskController;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.taskController.createTask);
        this.router.get("/", this.taskController.getTasks);
        this.router.get("/:id", this.taskController.getTaskById);
        this.router.put("/:id", this.taskController.updateTask);
        this.router.delete("/:id", this.taskController.deleteTask);
    }

    public getRouter(): Router {
        return this.router;
    }
}
