export function validateEnv(config: Record<string, unknown>) {
  const required = [
    "DATABASE_URL",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "APPLE_CLIENT_ID",
    "APPLE_TEAM_ID",
    "APPLE_KEY_ID",
    "APPLE_PRIVATE_KEY"
  ];

  for (const key of required) {
    if (!config[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }

  return config;
}
