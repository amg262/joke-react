export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost:8081',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const; 