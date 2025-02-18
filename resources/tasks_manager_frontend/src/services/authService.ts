import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Registrar um novo usuário
export const registerUser = async (name: string, email: string, password: string, password_confirmation: string): Promise<AuthResponse> => {
  const response = await api.post("/register", { name, email, password, password_confirmation });
  return response.data.data;
};

// Fazer login
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post("/login", { email, password });
  return response.data.data;
};

// Obter usuário autenticado
export const getAuthenticatedUser = async (): Promise<User> => {
  const response = await api.get("/user");
  return response.data.data;
};

// Logout
export const logoutUser = async (): Promise<void> => {
  await api.post("/logout");
};