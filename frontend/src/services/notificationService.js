import api from "./api";

const notificationService = {
  async getAll() {
    const response = await api.get("/notifications");
    return response.data;
  },

  async markRead(id) {
    await api.patch(`/notifications/${id}/read`);
  },

  async markAllRead() {
    await api.patch("/notifications/read-all");
  },
};

export default notificationService;
