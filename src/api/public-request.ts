import { config } from '@/config';
import axios from 'axios';

const axiosInstancePublic = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.isDevelopment ? 30000 : 10000, // Longer timeout in development
});

export default axiosInstancePublic;