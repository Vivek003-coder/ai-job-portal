import api from "./api";
import { saveAuth, clearAuth } from "../utils/auth";

const authService = {
  async register(userData) {
    const response = await api.post("/users/register", userData);
    const data = response.data;

    if (data?.token) {
      saveAuth(data.token, data.user);
    }

    return data;
  },

  async login(credentials) {
    const response = await api.post("/users/login", credentials);

    const data = response.data;

    if (data?.token) {
      saveAuth(data.token, data.user);
    }

    return data;
  },

  logout() {
    clearAuth();
  },

  async getCurrentUser() {
    const response = await api.get("/users/me");
    return response.data;
  },
};

export default authService;