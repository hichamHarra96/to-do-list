import { describe, it, expect, beforeEach, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { taskService } from "@/services/task.service";
import { Task } from "@/entities/task.entity";

const mock = new MockAdapter(axios);

describe("taskService", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    description: "This is a test task",
    completed: false,
  };

  beforeEach(() => {
    mock.reset();
  });

  afterEach(() => {
    mock.reset();
  });

  it("should fetch all tasks", async () => {
    mock.onGet(import.meta.env.VITE_API_URL).reply(200, [mockTask]);

    const tasks = await taskService.getTasks();
    expect(tasks).toEqual([mockTask]);
  });

  it("should fetch a task by id", async () => {
    mock.onGet(`${import.meta.env.VITE_API_URL}/1`).reply(200, mockTask);

    const task = await taskService.getTaskById("1");
    expect(task).toEqual(mockTask);
  });

  it("should create a new task", async () => {
    mock.onPost(import.meta.env.VITE_API_URL).reply(201, mockTask);

    const createdTask = await taskService.createTask(mockTask);
    expect(createdTask).toEqual(mockTask);
  });

  it("should update a task", async () => {
    const updatedTask = { ...mockTask, title: "Updated Task" };
    mock.onPut(`${import.meta.env.VITE_API_URL}/1`).reply(200, updatedTask);

    const result = await taskService.updateTask("1", updatedTask);
    expect(result).toEqual(updatedTask);
  });

  it("should delete a task", async () => {
    mock.onDelete(`${import.meta.env.VITE_API_URL}/1`).reply(204);

    await expect(taskService.deleteTask("1")).resolves.toBeUndefined();
  });

  it("should handle network errors gracefully", async () => {
    mock.onGet(`${import.meta.env.VITE_API_URL}/1`).reply(500);

    await expect(taskService.getTaskById("1")).rejects.toThrow();
  });
});
