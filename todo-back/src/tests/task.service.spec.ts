import { TaskService } from "../services/task.service";
import { TaskRepository } from "../repositories/task.repository";
import { TaskStatus } from "../domain/taskStatus";
import { container } from "../config/container"; 

const mockTaskRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const taskService = new TaskService(mockTaskRepository);

describe("Unit Tests - Task Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should create a task", async () => {
    const mockTask = { title: "Buy milk", description: "Go to the grocery store", status: TaskStatus.TODO };
    const savedTask = { ...mockTask, _id: "12345" };

    mockTaskRepository.create.mockResolvedValue(savedTask);
    const result = await taskService.createTask(mockTask);

    expect(result).toEqual(savedTask);
    expect(mockTaskRepository.create).toHaveBeenCalledWith(mockTask);
  });

  test("Should retrieve all tasks", async () => {
    const mockTasks = [
      { _id: "123", title: "Task 1", description: "Test", status: TaskStatus.TODO },
      { _id: "456", title: "Task 2", description: "Test", status: TaskStatus.IN_PROGRESS }
    ];

    mockTaskRepository.findAll.mockResolvedValue(mockTasks);
    const result = await taskService.getTasks();

    expect(result).toEqual(mockTasks);
    expect(mockTaskRepository.findAll).toHaveBeenCalled();
  });

  test("Should retrieve a task by ID", async () => {
    const mockTask = { _id: "123", title: "Task 1", description: "Test", status: TaskStatus.TODO };

    mockTaskRepository.findById.mockResolvedValue(mockTask);
    const result = await taskService.getTaskById("123");

    expect(result).toEqual(mockTask);
    expect(mockTaskRepository.findById).toHaveBeenCalledWith("123");
  });

  test("Should update a task", async () => {
    const taskToUpdate = { _id: "123", title: "Task 1", description: "Test", status: TaskStatus.TODO };
    const updatedTask = { ...taskToUpdate, status: TaskStatus.DONE };

    mockTaskRepository.update.mockResolvedValue(updatedTask);
    const result = await taskService.updateTask("123", { status: TaskStatus.DONE });

    expect(result).toEqual(updatedTask);
    expect(mockTaskRepository.update).toHaveBeenCalledWith("123", { status: TaskStatus.DONE });
  });

  test("Should delete a task", async () => {
    const mockTask = { _id: "123", title: "Task 1", description: "Test", status: TaskStatus.TODO };

    mockTaskRepository.delete.mockResolvedValue(mockTask);
    const result = await taskService.deleteTask("123");

    expect(result).toEqual(mockTask);
    expect(mockTaskRepository.delete).toHaveBeenCalledWith("123");
  });
});
