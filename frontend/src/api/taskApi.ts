// api/taskApi.ts
import axios from 'axios';
import { Task } from '../types/TaskTypes';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get('http://localhost:8080/tasks');
  return response.data;
};

export const createTask = async (taskData: Task): Promise<Task> => {
  const response = await axios.put('http://localhost:8080/tasks', taskData);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  const response = await axios.delete(`http://localhost:8080/tasks/${taskId}`);
  return response.status === 204;
};

export const executeTask = (taskId: string, command: string): Promise<any> => {
  return axios.post(`http://localhost:8080/tasks/${taskId}/execute`, { command });
};
