import api from "./api.service";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Erro ao fazer login");
  }
};