import axios from "axios";

const api = axios.create({
  baseURL: "https://laptop-store-backend-52x7.onrender.com/"
});

export default api;
