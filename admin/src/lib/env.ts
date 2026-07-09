const requiredServerEnv = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

export function hasServerEnv() {
  return requiredServerEnv.every((key) => Boolean(process.env[key]));
}

export function getServerEnv() {
  const missing = requiredServerEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing server env: ${missing.join(", ")}`);
  }

  return {
    supabaseUrl: process.env.SUPABASE_URL!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  };
}

export function getPublicBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}
