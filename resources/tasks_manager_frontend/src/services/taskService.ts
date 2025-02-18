import { SetStateAction } from "react";
import api from "./api";

export interface Task {
  description: SetStateAction<string>;
  id: string;
  title: string;
  status: "pendente" | "em_andamento" | "concluido";
  category_id: string;
}

// Buscar tarefas com filtro opcional por categoria
export const getTasks = async (categoryId?: string): Promise<Task[]> => {
  const response = await api.get("/tasks", {});
  console.log(response.data.data)
  return response.data.data;
};

// Criar uma nova tarefa
export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data.data;
};

// Atualizar o status da tarefa
export const updateTaskStatus = async (id: string, status: string): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, { status });
  return response.data.data;
};

// Deletar uma tarefa
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.data;
};