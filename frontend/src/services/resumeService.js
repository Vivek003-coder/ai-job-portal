import api from "./api";

const resumeService = {
  async getMyResume() {
    const response = await api.get("/resumes/me");
    return response.data;
  },

  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/resumes/me", formData);
    return response.data;
  },

  async download() {
    const response = await api.get("/resumes/me/download", {
      responseType: "blob",
    });
    return response.data;
  },

  async remove() {
    await api.delete("/resumes/me");
  },
};

export default resumeService;
