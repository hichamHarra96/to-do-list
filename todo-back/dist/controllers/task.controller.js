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
exports.TaskController = void 0;
const not_found_error_1 = require("../errors/not-found-error");
/**
 * Controller responsible for handling HTTP requests related to tasks.
 * Uses `TaskService` to interact with the database and perform CRUD operations.
 */
class TaskController {
    /**
     * Initializes the TaskController with a TaskService instance.
     * @param {TaskService} taskService - The service responsible for task operations.
     */
    constructor(taskService) {
        /**
         * Creates a new task.
         * @route POST /tasks
         * @param {Request} req - Express request object containing task data.
         * @param {Response} res - Express response object.
         * @returns {void} Sends a response with the created task.
         * @throws {500} Internal Server Error if the task creation fails.
         */
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const task = {
                    title: req.body.title,
                    description: req.body.description,
                    status: (_a = req.body.status) !== null && _a !== void 0 ? _a : "TODO",
                };
                const createdTask = yield this.taskService.createTask(task);
                res.status(201).json(createdTask);
            }
            catch (error) {
                res.status(500).json({ error: "Error creating task" });
            }
        });
        /**
         * Retrieves all tasks.
         * @route GET /tasks
         * @param {Request} req - Express request object.
         * @param {Response} res - Express response object.
         * @returns {void} Sends a response with an array of tasks.
         * @throws {500} Internal Server Error if fetching tasks fails.
         */
        this.getTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.getTasks();
                res.json(tasks);
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching tasks" });
            }
        });
        /**
         * Retrieves a task by ID.
         * @route GET /tasks/:id
         * @param {Request} req - Express request object containing the task ID.
         * @param {Response} res - Express response object.
         * @returns {void} Sends a response with the requested task or 404 if not found.
         * @throws {500} Internal Server Error if fetching the task fails.
         */
        this.getTaskById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.getTaskById(req.params.id);
                res.json(task);
            }
            catch (error) {
                res.status(error instanceof not_found_error_1.NotFoundError ? 404 : 500).json({
                    message: error instanceof Error ? error.message : "Unknown error occurred",
                });
            }
        });
        /**
         * Updates a task by ID.
         * @route PUT /tasks/:id
         * @param {Request} req - Express request object containing the task ID and update data.
         * @param {Response} res - Express response object.
         * @returns {void} Sends a response with the updated task or 404 if not found.
         * @throws {500} Internal Server Error if updating the task fails.
         */
        this.updateTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield this.taskService.updateTask(req.params.id, req.body);
                res.json(updatedTask);
            }
            catch (error) {
                res.status(error instanceof not_found_error_1.NotFoundError ? 404 : 500).json({
                    message: error instanceof Error ? error.message : "Unknown error occurred",
                });
            }
        });
        /**
         * Deletes a task by ID.
         * @route DELETE /tasks/:id
         * @param {Request} req - Express request object containing the task ID.
         * @param {Response} res - Express response object.
         * @returns {void} Sends a 204 response if the task is deleted, or 404 if not found.
         * @throws {500} Internal Server Error if deleting the task fails.
         */
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.taskService.deleteTask(req.params.id);
                res.status(204).send();
            }
            catch (error) {
                res.status(error instanceof not_found_error_1.NotFoundError ? 404 : 500).json({
                    message: error instanceof Error ? error.message : "Unknown error occurred",
                });
            }
        });
        this.taskService = taskService;
    }
}
exports.TaskController = TaskController;
