
import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { Task, TaskStatus } from "../domain/task.entity";

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = { 
      title: req.body.title, 
      description: req.body.description, 
      status: req.body.status ?? TaskStatus.TODO 
    };
    const createdTask = await taskService.createTask(task);
    res.status(201).json(createdTask); 
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
