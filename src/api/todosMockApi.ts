import { ITodo } from '../hooks/useTodos';
import axiosInstance from './axiosInstance';

export const getTodos = async (): Promise<ITodo[]> => {
  const response = await axiosInstance.get('/todos');
  return response.data;
};

export const addTodo = async (text: string) => {
  const response = await axiosInstance.post('/todos', { text });
  return response.data; 
};

export const updateTodo = async (id: number, updates: Partial<{ text: string; completed: boolean }>) => {
  const response = await axiosInstance.patch(`/todos/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`/todos/${id}`);
};