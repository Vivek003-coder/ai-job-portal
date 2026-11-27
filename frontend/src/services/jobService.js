import api from "./api";

const jobService = {
  // Get all jobs
  async getJobs(params = {}) {
    const response = await api.get("/jobs", {
      params,
    });

    return response.data;
  },

  async getMyJobs() {
    const response = await api.get("/jobs/mine");
    return response.data;
  },

  // Get single job
  async getJobById(id) {
    const response = await api.get(`/jobs/${id}`);

    return response.data;
  },

  // Create a new job
  async createJob(jobData) {
    const response = await api.post("/jobs", jobData);

    return response.data;
  },

  // Update job
  async updateJob(id, jobData) {
    const response = await api.put(`/jobs/${id}`, jobData);

    return response.data;
  },

  // Delete job
  async deleteJob(id) {
    const response = await api.delete(`/jobs/${id}`);

    return response.data;
  },

  // Close / activate job
  async updateJobStatus(id, status) {
    const response = await api.patch(`/jobs/${id}/status`, {
      status,
    });

    return response.data;
  },
};

export default jobService;