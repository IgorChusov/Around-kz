import axios from "axios";
import EnvConfig from "./env";

export const api = axios.create({
  baseURL: EnvConfig.apiUrl,
  headers: {
    'api-key': `${EnvConfig.apiKey}`,
  },
})
