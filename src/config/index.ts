export const config = {
  apiUrl: process.env.NEXT_PUBLIC_SERVER_API_URL as string,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
