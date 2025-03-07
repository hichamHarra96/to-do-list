import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validateObjectId } from "../middlewares/validateObjectId";
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
         * tags:
         *   name: Tasks
         *   description: to-do list API
         */

        /**
         * @swagger
         * /tasks:
         *   post:
         *     summary: Create a new task
         *     description: Adds a new task to the database.
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
         *                 description: The title of the task
         *                 example: "Go to the gym"
         *               description:
         *                 type: string
         *                 description: A short description of the task
         *                 example: "Workout for 1 hour"
         *               status:
         *                 type: string
         *                 enum: [todo, in_progress, done]
         *                 description: The current status of the task
         *                 example: "todo"
         *     responses:
         *       201:
         *         description: Task successfully created
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: string
         *                   example: "60d0fe4f5311236168a109ca"
         *                 title:
         *                   type: string
         *                   example: "Go to the gym"
         *                 description:
         *                   type: string
         *                   example: "Workout for 1 hour"
         *                 status:
         *                   type: string
         *                   example: "todo"
         *       500:
         *         description: Internal server error
         */
        this.router.post("/", this.taskController.createTask);

        /**
         * @swagger
         * /tasks:
         *   get:
         *     summary: Retrieve all tasks
         *     description: Fetches all tasks from the database.
         *     tags: [Tasks]
         *     responses:
         *       200:
         *         description: A list of all tasks
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: string
         *                     example: "60d0fe4f5311236168a109ca"
         *                   title:
         *                     type: string
         *                     example: "Go to the gym"
         *                   description:
         *                     type: string
         *                     example: "Workout for 1 hour"
         *                   status:
         *                     type: string
         *                     example: "todo"
         *       500:
         *         description: Internal server error
         */
        this.router.get("/", this.taskController.getTasks);

        /**
         * @swagger
         * /tasks/{id}:
         *   get:
         *     summary: Retrieve a specific task
         *     description: Fetches a single task based on its unique ID.
         *     tags: [Tasks]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The unique task ID
         *     responses:
         *       200:
         *         description: Task retrieved successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: string
         *                   example: "60d0fe4f5311236168a109ca"
         *                 title:
         *                   type: string
         *                   example: "Go to the gym"
         *                 description:
         *                   type: string
         *                   example: "Workout for 1 hour"
         *                 status:
         *                   type: string
         *                   example: "todo"
         *       404:
         *         description: Task not found
         *       500:
         *         description: Internal server error
         */
        this.router.get("/:id",validateObjectId, this.taskController.getTaskById);

        /**
         * @swagger
         * /tasks/{id}:
         *   put:
         *     summary: Update an existing task
         *     description: Updates a task’s title, description, or status.
         *     tags: [Tasks]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The unique task ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *                 example: "Go to the gym"
         *               description:
         *                 type: string
         *                 example: "Workout for 1 hour"
         *               status:
         *                 type: string
         *                 enum: [todo, in_progress, done]
         *                 example: "done"
         *     responses:
         *       200:
         *         description: Task successfully updated
         *       404:
         *         description: Task not found
         *       500:
         *         description: Internal server error
         */
        this.router.put("/:id",validateObjectId, this.taskController.updateTask);

        /**
         * @swagger
         * /tasks/{id}:
         *   delete:
         *     summary: Delete a task
         *     description: Removes a task from the database.
         *     tags: [Tasks]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The unique task ID
         *     responses:
         *       204:
         *         description: Task successfully deleted
         *       404:
         *         description: Task not found
         *       500:
         *         description: Internal server error
         */
        this.router.delete("/:id",validateObjectId, this.taskController.deleteTask);
    }

    public getRouter(): Router {
        return this.router;
    }
}
