import api from "./api";

export interface Category {
  id: string;
  name: string;
}

// Buscar todas as categorias
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");
  return response.data.data.categories;
};

// Criar uma nova categoria
export const createCategory = async (name: string): Promise<Category> => {
  const response = await api.post("/categories", { name });
  return response.data.data;
};