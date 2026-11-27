import api from "./api";

const savedJobService = {
  async getSavedJobs() {
    const response = await api.get("/saved-jobs");
    return response.data;
  },

  async save(jobId) {
    await api.post(`/saved-jobs/${jobId}`);
  },

  async remove(jobId) {
    await api.delete(`/saved-jobs/${jobId}`);
  },
};

export default savedJobService;
