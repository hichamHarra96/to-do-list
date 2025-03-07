import { Request, Response, NextFunction, RequestHandler } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    createTask: RequestHandler = async (req: Request, res: Response) => {
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

    getTasks: RequestHandler = async (req: Request, res: Response) => {
        try {
            const tasks = await this.taskService.getTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Error fetching tasks" });
        }
    };

    getTaskById: RequestHandler = async (req: Request, res: Response) => {
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

    updateTask: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const updatedTask = await this.taskService.updateTask(req.params.id, req.body);
  
          if (!updatedTask) {
               res.status(404).json({ error: "Task not found" });
               return; 
          }
  
          res.json(updatedTask);
      } catch (error) {
          next(error);
      }
  };


    deleteTask: RequestHandler = async (req, res, next) => {
        try {
            const deletedTask = await this.taskService.deleteTask(req.params.id);
    
            if (!deletedTask) {
                res.status(404).json({ error: "Task not found" });
                return;
            }
    
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
    
  
}
