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
        /**
         * @swagger
         * /tasks:
         *   post:
         *     summary: Créer une nouvelle tâche
         *     description: Ajoute une nouvelle tâche à la base de données
         *     tags: [Tasks]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *               description:
         *                 type: string
         *               status:
         *                 type: string
         *                 enum: [todo, in_progress, done]
         *     responses:
         *       201:
         *         description: Tâche créée avec succès
         */
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
