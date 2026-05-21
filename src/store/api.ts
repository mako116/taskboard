import axios from "axios";
import { BASE_URL } from "../utility/urlConfig";
const apiClient = axios.create({
  baseURL: BASE_URL,
});

 

const api = Object.assign(apiClient, {
  fetchUsers: async (): Promise<any[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  },
  fetchTodos: async (): Promise<any[]> => {
    const response = await apiClient.get('/todos');
    return response.data;
  }
});

export default api;
