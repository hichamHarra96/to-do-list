"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const container_1 = require("../config/container");
const database_1 = __importStar(require("../config/database"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/tasks", container_1.container.getTaskRoutes().getRouter());
describe("API Routes Tests - Task Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.default)();
        while (!mongoose_1.default.connection.db) {
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.dropDatabase();
        yield mongoose_1.default.connection.close();
        yield (0, database_1.closeDB)();
    }));
    let taskId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.connection.db) {
            throw new Error("Database connection is not available.");
        }
        yield mongoose_1.default.connection.db.collection("tasks").deleteMany({});
        const response = yield (0, supertest_1.default)(app).post("/tasks").send({
            title: "Buy milk",
            description: "Go to the grocery store",
            status: "todo",
        });
        taskId = response.body._id;
    }));
    test("Should create a new task", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/tasks")
            .send({
            title: "Buy bread",
            description: "Go to the bakery",
            status: "todo",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.title).toBe("Buy bread");
    }));
    test("Should retrieve all tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/tasks");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    }));
    test("Should retrieve a task by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(taskId).toBeDefined();
        const response = yield (0, supertest_1.default)(app).get(`/tasks/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", taskId);
    }));
    test("Should return 404 for a non-existent task", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/tasks/${new mongoose_1.default.Types.ObjectId()}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toContain("not found");
    }));
    test("Should update a task", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(taskId).toBeDefined();
        const response = yield (0, supertest_1.default)(app)
            .put(`/tasks/${taskId}`)
            .send({ status: "done" });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("done");
    }));
    test("Should return 404 when updating a non-existent task", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = new mongoose_1.default.Types.ObjectId().toString();
        const response = yield (0, supertest_1.default)(app)
            .put(`/tasks/${nonExistentId}`)
            .send({ status: "done" });
        expect(response.status).toBe(404);
        expect(response.body.message).toContain("not found");
    }));
    test("Should delete a task", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(taskId).toBeDefined();
        const response = yield (0, supertest_1.default)(app).delete(`/tasks/${taskId}`);
        expect(response.status).toBe(204);
    }));
    test("Should return 404 when deleting a non-existent task", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = new mongoose_1.default.Types.ObjectId().toString();
        const response = yield (0, supertest_1.default)(app).delete(`/tasks/${nonExistentId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toContain("not found");
    }));
    test("Should return 400 for an invalid task ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/tasks/invalid-id");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid task ID format" });
    }));
});
