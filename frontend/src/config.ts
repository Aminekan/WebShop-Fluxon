const env = import.meta.env;

export const config = {
  apiBaseUrl: env.VITE_API_BASE_URL ?? "http://localhost:5276",
  useMockApi: env.VITE_USE_MOCK_API !== "false"
};
