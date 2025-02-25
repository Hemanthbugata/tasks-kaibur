import axios from 'axios';
import { Task } from '../types/TaskTypes';

const API_URL = 'http://localhost:8080';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: Task): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/tasks`, task);
    return true;
  } catch {
    return false;
  }
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
    return true;
  } catch {
    return false;
  }
};

export const executeTask = async (command: string) => {
  const response = await axios.put(`${API_URL}/tasks/execute`, { command });
  return response.data;
};
