import { randomBytes } from "crypto";
import { stampMeta } from "./connector-meta.js";

export async function passwordGenerate(args: Record<string, unknown>) {
  const length = Math.min(Math.max(Number(args.length) || 16, 4), 128);
  const includeUpper = args.uppercase !== false;
  const includeLower = args.lowercase !== false;
  const includeDigits = args.digits !== false;
  const includeSymbols = args.symbols !== false;
  let chars = "";
  if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeDigits) chars += "0123456789";
  if (includeSymbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";
  if (!chars) chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = randomBytes(length);
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[bytes[i] % chars.length];
  }
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const strength = [hasUpper, hasLower, hasDigit, hasSymbol].filter(Boolean).length;
  return stampMeta({
    password,
    length,
    strength: strength >= 4 ? "strong" : strength >= 3 ? "good" : strength >= 2 ? "fair" : "weak",
    character_types: { uppercase: hasUpper, lowercase: hasLower, digits: hasDigit, symbols: hasSymbol },
  }, {
    source: "local crypto.randomBytes",
    fetched_at: new Date().toISOString(),
    next_steps: ["use the generated password securely", "increase length for stronger passwords"],
  });
}
