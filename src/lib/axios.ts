import { getApiUrl } from "@/utils/api";
import axios from "axios";

export const api = axios.create({
  baseURL: getApiUrl(),
});
