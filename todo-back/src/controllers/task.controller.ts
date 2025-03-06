import { Router, Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { Task } from "../domain/task.entity";
import { TaskStatus } from "../domain/task.entity";

const router = Router();
const taskService = new TaskService();

router.post("/", async (req: Request, res: Response) => {
    const task: Task = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ?? TaskStatus.TODO
    };
    const createdTask = await taskService.createTask(task);
    res.status(201).json(createdTask);
});


router.get("/", async (_req: Request, res: Response) => {
    const tasks = await taskService.getTasks();
    res.json(tasks);
});

router.get("/:id", async (req: Request, res: Response) => {
    const task = await taskService.getTaskById(req.params.id);
    if (task) res.json(task);
    else res.status(404).json({ message: "Task not found" });
});

router.put("/:id", async (req: Request, res: Response) => {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.json(updatedTask);
});

router.delete("/:id", async (req: Request, res: Response) => {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
});

export default router;
