"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task.service");
const taskStatus_1 = require("../domain/taskStatus");
const mockTaskRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};
const taskService = new task_service_1.TaskService(mockTaskRepository);
describe("Unit Tests - Task Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should create a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTask = { title: "Buy milk", description: "Go to the grocery store", status: taskStatus_1.TaskStatus.TODO };
        const savedTask = Object.assign(Object.assign({}, mockTask), { _id: "12345" });
        mockTaskRepository.create.mockResolvedValue(savedTask);
        const result = yield taskService.createTask(mockTask);
        expect(result).toEqual(savedTask);
        expect(mockTaskRepository.create).toHaveBeenCalledWith(mockTask);
    }));
    test("Should retrieve all tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTasks = [
            { _id: "123", title: "Task 1", description: "Test", status: taskStatus_1.TaskStatus.TODO },
            { _id: "456", title: "Task 2", description: "Test", status: taskStatus_1.TaskStatus.IN_PROGRESS }
        ];
        mockTaskRepository.findAll.mockResolvedValue(mockTasks);
        const result = yield taskService.getTasks();
        expect(result).toEqual(mockTasks);
        expect(mockTaskRepository.findAll).toHaveBeenCalled();
    }));
    test("Should retrieve a task by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTask = { _id: "123", title: "Task 1", description: "Test", status: taskStatus_1.TaskStatus.TODO };
        mockTaskRepository.findById.mockResolvedValue(mockTask);
        const result = yield taskService.getTaskById("123");
        expect(result).toEqual(mockTask);
        expect(mockTaskRepository.findById).toHaveBeenCalledWith("123");
    }));
    test("Should update a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const taskToUpdate = { _id: "123", title: "Task 1", description: "Test", status: taskStatus_1.TaskStatus.TODO };
        const updatedTask = Object.assign(Object.assign({}, taskToUpdate), { status: taskStatus_1.TaskStatus.DONE });
        mockTaskRepository.update.mockResolvedValue(updatedTask);
        const result = yield taskService.updateTask("123", { status: taskStatus_1.TaskStatus.DONE });
        expect(result).toEqual(updatedTask);
        expect(mockTaskRepository.update).toHaveBeenCalledWith("123", { status: taskStatus_1.TaskStatus.DONE });
    }));
    test("Should delete a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTask = { _id: "123", title: "Task 1", description: "Test", status: taskStatus_1.TaskStatus.TODO };
        mockTaskRepository.delete.mockResolvedValue(mockTask);
        const result = yield taskService.deleteTask("123");
        expect(result).toEqual(mockTask);
        expect(mockTaskRepository.delete).toHaveBeenCalledWith("123");
    }));
});
