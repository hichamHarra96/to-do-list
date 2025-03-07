import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    createTask = async (req: Request, res: Response) => {
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

    getTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await this.taskService.getTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Error fetching tasks" });
        }
    };

    getTaskById = async (req: Request, res: Response) => {
        try {
            const task = await this.taskService.getTaskById(req.params.id);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
            } else {
                res.json(task);
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching task" });
        }
    };

    updateTask = async (req: Request, res: Response) => {
        try {
            const updatedTask = await this.taskService.updateTask(req.params.id, req.body);
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }
    };

    deleteTask = async (req: Request, res: Response) => {
        try {
            await this.taskService.deleteTask(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error deleting task" });
        }
    };
}
