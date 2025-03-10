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
exports.TaskService = void 0;
const not_found_error_1 = require("../errors/not-found-error");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskRepository.create({
                title: task.title,
                description: task.description,
                status: task.status,
            });
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskRepository.findAll();
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.findById(id);
            if (!task) {
                throw new not_found_error_1.NotFoundError(`Task with ID ${id} not found`);
            }
            return task;
        });
    }
    updateTask(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTask = yield this.taskRepository.findById(id);
            if (!existingTask) {
                throw new not_found_error_1.NotFoundError(`Task with ID ${id} not found`);
            }
            return yield this.taskRepository.update(id, task);
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTask = yield this.taskRepository.findById(id);
            if (!deletedTask) {
                throw new not_found_error_1.NotFoundError(`Task with ID ${id} not found`);
            }
            return yield this.taskRepository.delete(id);
        });
    }
}
exports.TaskService = TaskService;
