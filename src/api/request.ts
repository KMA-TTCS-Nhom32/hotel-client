import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import queryString from 'query-string';
import { config } from '@/config';
import { AuthCookieService } from '@/services/auth-cookie';
import { API_PATH } from './constant';

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.isDevelopment ? 30000 : 10000, // Longer timeout in development
});

// Singleton for tracking refresh state
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((cb) => cb(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Map to store active requests
// const activeRequests = new Map<string, AbortController>();

const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
  //   const requestKey = `${config.url}_${config.method}`;

  //   // Cancel previous request if it exists
  //   if (activeRequests.has(requestKey)) {
  //     activeRequests.get(requestKey)?.abort();
  //     activeRequests.delete(requestKey);
  //   }

  //   // Create new abort controller for this request
  //   const controller = new AbortController();
  //   config.signal = controller.signal;
  //   activeRequests.set(requestKey, controller);

  // Handle authorization
  const accessToken = AuthCookieService.getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if (config.params) {
    config.paramsSerializer = {
      serialize: (params: Record<string, any>) => queryString.stringify(params),
    };
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  // Clean up completed request
  //   const requestKey = `${response.config.url}_${response.config.method}`;
  //   activeRequests.delete(requestKey);
  return response;
};

const onResponseError = async (error: AxiosError) => {
  if (error.config) {
    // const requestKey = `${error.config.url}_${error.config.method}`;
    // activeRequests.delete(requestKey);
  }

  const originalRequest = error.config;
  const isTokenExpired =
    AuthCookieService.getExpireTime() && new Date(AuthCookieService.getExpireTime()!) < new Date();

  if (
    (error.response?.status === 401 || isTokenExpired) &&
    originalRequest &&
    !originalRequest.headers['x-retry']
  ) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = AuthCookieService.getRefreshToken();
        const response = await fetch(`${config.apiUrl}${API_PATH.REFRESH}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          throw new Error('Refresh failed');
        }

        const data = await response.json();

        // Update cookies with new tokens
        AuthCookieService.setAuthCookies(
          data.accessToken,
          data.refreshToken,
          data.accessTokenExpires,
        );

        isRefreshing = false;
        onTokenRefreshed(data.accessToken);

        return axios({
          ...originalRequest,
          headers: { ...originalRequest.headers, Authorization: `Bearer ${data.accessToken}` },
        });
      } catch (refreshError) {
        AuthCookieService.deleteAuthCookies();
        isRefreshing = false;
        refreshSubscribers = [];
        return Promise.reject(refreshError);
      }
    }

    // If refresh is already in progress, wait for new token
    return new Promise((resolve) => {
      addRefreshSubscriber((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequestSuccess, onRequestError);
axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

export default axiosInstance;
