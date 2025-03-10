import axios from "axios";
import { Task } from "@/entities/task.entity";

const API_URL = import.meta.env.VITE_API_URL;

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await axios.get<Task>(`${API_URL}/${id}`);
    return response.data;
  },

  async createTask(task: Task): Promise<Task> {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
  },

  async updateTask(id: string, task: Task): Promise<Task> {
    const response = await axios.put<Task>(`${API_URL}/${id}`, task);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
