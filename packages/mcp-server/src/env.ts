export function get(key: string, fallback?: string): string {
  const value = typeof process !== "undefined" ? process.env[key] : undefined;
  if (value !== undefined) return value;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing environment variable: ${key}`);
}

export function getNumber(key: string, fallback?: number): number {
  const raw = typeof process !== "undefined" ? process.env[key] : undefined;
  if (raw !== undefined) {
    const num = Number(raw);
    if (isNaN(num)) throw new Error(`Environment variable ${key} is not a number: ${raw}`);
    return num;
  }
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing environment variable: ${key}`);
}

export function getBool(key: string, fallback?: boolean): boolean {
  const raw = typeof process !== "undefined" ? process.env[key] : undefined;
  if (raw !== undefined) {
    const lower = raw.toLowerCase();
    if (["true", "1", "yes", "on"].includes(lower)) return true;
    if (["false", "0", "no", "off", ""].includes(lower)) return false;
    throw new Error(`Environment variable ${key} is not a boolean: ${raw}`);
  }
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing environment variable: ${key}`);
}

export function getList(key: string, separator = ","): string[] {
  const raw = typeof process !== "undefined" ? process.env[key] : undefined;
  if (raw === undefined || raw === "") return [];
  return raw.split(separator).map((s: string) => s.trim()).filter((s: string) => s.length > 0);
}

export function has(key: string): boolean {
  return typeof process !== "undefined" && process.env[key] !== undefined;
}

export function require(keys: string[]): void {
  const missing = keys.filter((k: string) => !has(k));
  if (missing.length > 0) throw new Error(`Missing environment variables: ${missing.join(", ")}`);
}
