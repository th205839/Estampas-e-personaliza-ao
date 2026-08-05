export const platformConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  deploymentTarget: import.meta.env.VITE_DEPLOYMENT_TARGET ?? 'browser',
  storageProvider: import.meta.env.VITE_STORAGE_PROVIDER ?? 'browser',
} as const
