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
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await closeDB();
  });

  let taskId: string; 

  test("Should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Buy milk",
        description: "Go to the grocery store",
        status: "todo",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe("Buy milk");
    expect(response.body.description).toBe("Go to the grocery store");

    taskId = response.body._id; 
  });

  test("Should retrieve all tasks", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Should retrieve a task by ID", async () => {
    const response = await request(app).get(`/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", taskId);
  });

  test("Should update a task", async () => {
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
      expect(response.body).toEqual({ error: "Task not found" });
  });


  test("Should delete a task", async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);

    expect(response.status).toBe(204); 
  });
  
  test("Should return 404 when deleting a non-existent task", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString(); 

    const response = await request(app).delete(`/tasks/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Task not found" });
});


  test("Should return 404 for a non-existent task", async () => {
    const response = await request(app).get("/tasks/000000000000000000000000"); 

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Task not found" });
  });
});
