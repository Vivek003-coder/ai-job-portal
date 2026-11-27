import api from "./api";

const matchingService = {
  async getRecommendations() {
    const response = await api.get("/matching/recommendations");
    return response.data;
  },
};

export default matchingService;
