import { useState, useEffect } from 'react';
import { getTodos, addTodo as apiAddTodo, updateTodo, deleteTodo as apiDeleteTodo } from '../api/todosMockApi';

export interface ITodo {
  id: number,
  text: string,
  completed: boolean
}

export interface IError {
  message?: string
}

export function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError({ message: err instanceof Error ? err.message : 'Unknown error' });
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    try {
      const newTodo = await apiAddTodo(text);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err: unknown) {
      setError({ message: err instanceof Error ? err.message : 'Unknown error' });
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await updateTodo(id, {
        completed: !todoToUpdate.completed,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err: unknown) {
      setError({ message: err instanceof Error ? err.message : 'Unknown error' });
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await apiDeleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err: unknown) {
      setError({ message: err instanceof Error ? err.message : 'Unknown error' });
    }
  };

  return { todos, addTodo, toggleTodo, deleteTodo, loading, error };
}