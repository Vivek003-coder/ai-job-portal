import api from "./api";

const applicationService = {
  async apply(jobId, coverLetter = "") {
    const response = await api.post("/applications", { jobId, coverLetter });
    return response.data;
  },

  async getMyApplications() {
    const response = await api.get("/applications");
    return response.data;
  },

  async getApplicants(jobId) {
    const response = await api.get(`/applications/jobs/${jobId}`);
    return response.data;
  },

  async updateStatus(applicationId, status) {
    const response = await api.patch(`/applications/${applicationId}/status`, { status });
    return response.data;
  },
};

export default applicationService;
