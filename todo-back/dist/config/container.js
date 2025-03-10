"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const task_repository_1 = require("../repositories/task.repository");
const task_service_1 = require("../services/task.service");
const task_controller_1 = require("../controllers/task.controller");
const task_route_1 = require("../routes/task.route");
class Container {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
        this.taskService = new task_service_1.TaskService(this.taskRepository);
        this.taskController = new task_controller_1.TaskController(this.taskService);
        this.taskRoutes = new task_route_1.TaskRoutes(this.taskController);
    }
    static getInstance() {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
    getTaskRoutes() {
        return this.taskRoutes;
    }
}
exports.container = Container.getInstance();
