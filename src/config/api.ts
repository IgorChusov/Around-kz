import axios from "axios";
import EnvConfig from "./env";

const api = axios.create({
  baseURL: EnvConfig.apiUrl,

  headers: {
    'Api-key': EnvConfig.apiKey,
  }
})

export default api

