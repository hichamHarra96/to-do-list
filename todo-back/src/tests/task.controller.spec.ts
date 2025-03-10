import request from "supertest";
import express from "express";
import { container } from "../config/container"; 
import connectDB, { closeDB } from "../config/database";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use("/tasks", container.getTaskRoutes().getRouter()); 

describe("API Routes Tests - Task Controller", () => {

  beforeAll(async () => {
    await connectDB();

    while (!mongoose.connection.db) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await closeDB();
  });

  let taskId: string;

  beforeEach(async () => {
    if (!mongoose.connection.db) {
      throw new Error("Database connection is not available.");
    }

    await mongoose.connection.db.collection("tasks").deleteMany({});

    const response = await request(app).post("/tasks").send({
      title: "Buy milk",
      description: "Go to the grocery store",
      status: "todo",
    });

    taskId = response.body._id;
  });

  test("Should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Buy bread",
        description: "Go to the bakery",
        status: "todo",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("Buy bread");
  });

  test("Should retrieve all tasks", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Should retrieve a task by ID", async () => {
    expect(taskId).toBeDefined();

    const response = await request(app).get(`/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", taskId);
  });

  test("Should return 404 for a non-existent task", async () => {
    const response = await request(app).get(`/tasks/${new mongoose.Types.ObjectId()}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toContain("not found");
  });

  test("Should update a task", async () => {
    expect(taskId).toBeDefined();

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ status: "done" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("done");
  });

  test("Should return 404 when updating a non-existent task", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const response = await request(app)
      .put(`/tasks/${nonExistentId}`)
      .send({ status: "done" });

    expect(response.status).toBe(404);
    expect(response.body.message).toContain("not found");
  });

  test("Should delete a task", async () => {
    expect(taskId).toBeDefined();

    const response = await request(app).delete(`/tasks/${taskId}`);

    expect(response.status).toBe(204);
  });

  test("Should return 404 when deleting a non-existent task", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const response = await request(app).delete(`/tasks/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toContain("not found");
  });

  test("Should return 400 for an invalid task ID", async () => {
    const response = await request(app).get("/tasks/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid task ID format" });
  });
});
