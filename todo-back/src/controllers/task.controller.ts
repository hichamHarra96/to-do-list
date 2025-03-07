import { Request, Response, RequestHandler } from "express";
import { TaskService } from "../services/task.service";

/**
 * Controller responsible for handling HTTP requests related to tasks.
 * Uses `TaskService` to interact with the database and perform CRUD operations.
 */
export class TaskController {
    private taskService: TaskService;

    /**
     * Initializes the TaskController with a TaskService instance.
     * @param {TaskService} taskService - The service responsible for task operations.
     */
    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    /**
     * Creates a new task.
     * @route POST /tasks
     * @param {Request} req - Express request object containing task data.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a response with the created task.
     * @throws {500} Internal Server Error if the task creation fails.
     */
    createTask: RequestHandler = async (req, res): Promise<void> => {
        try {
            const task = { 
                title: req.body.title, 
                description: req.body.description, 
                status: req.body.status ?? "TODO"
            };
            const createdTask = await this.taskService.createTask(task);
            res.status(201).json(createdTask);
        } catch (error) {
            res.status(500).json({ error: "Error creating task" });
        }
    };

    /**
     * Retrieves all tasks.
     * @route GET /tasks
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a response with an array of tasks.
     * @throws {500} Internal Server Error if fetching tasks fails.
     */
    getTasks: RequestHandler = async (req, res): Promise<void> => {
        try {
            const tasks = await this.taskService.getTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Error fetching tasks" });
        }
    };

    /**
     * Retrieves a task by ID.
     * @route GET /tasks/:id
     * @param {Request} req - Express request object containing the task ID.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a response with the requested task or 404 if not found.
     * @throws {500} Internal Server Error if fetching the task fails.
     */
    getTaskById: RequestHandler = async (req, res): Promise<void> => {
        try {
            const task = await this.taskService.getTaskById(req.params.id);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: "Error fetching task" });
        }
    };

    /**
     * Updates a task by ID.
     * @route PUT /tasks/:id
     * @param {Request} req - Express request object containing the task ID and update data.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a response with the updated task or 404 if not found.
     * @throws {500} Internal Server Error if updating the task fails.
     */
    updateTask: RequestHandler = async (req, res): Promise<void> => {
        try {
            const updatedTask = await this.taskService.updateTask(req.params.id, req.body);
            if (!updatedTask) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }
    };

    /**
     * Deletes a task by ID.
     * @route DELETE /tasks/:id
     * @param {Request} req - Express request object containing the task ID.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a 204 response if the task is deleted, or 404 if not found.
     * @throws {500} Internal Server Error if deleting the task fails.
     */
    deleteTask: RequestHandler = async (req, res): Promise<void> => {
        try {
            const deletedTask = await this.taskService.deleteTask(req.params.id);
            if (!deletedTask) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error deleting task" });
        }
    };
}
