import api from "./api";

const profileService = {
  async getProfile() {
    const response = await api.get("/users/profile");
    return response.data;
  },

  async updateProfile(profile) {
    const response = await api.put("/users/profile", profile);
    return response.data;
  },
};

export default profileService;
