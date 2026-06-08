export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const maskedLocal = local.length <= 2 ? "*".repeat(local.length) : local[0] + "*".repeat(local.length - 2) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "*".repeat(digits.length);
  return "*".repeat(digits.length - 4) + digits.slice(-4);
}

export function maskCreditCard(cc: string): string {
  const digits = cc.replace(/\D/g, "");
  if (digits.length < 4) return "*".repeat(digits.length);
  return "*".repeat(digits.length - 4) + digits.slice(-4);
}

export function maskString(s: string, visibleStart = 0, visibleEnd = 0): string {
  if (s.length <= visibleStart + visibleEnd) return "*".repeat(s.length);
  const start = s.slice(0, visibleStart);
  const end = s.slice(s.length - visibleEnd);
  const middle = "*".repeat(s.length - visibleStart - visibleEnd);
  return start + middle + end;
}

export function anonymizeObject<T extends Record<string, unknown>>(
  obj: T,
  fields: string[],
  maskFn: (value: string) => string = (v) => maskString(v, 1, 1),
): T {
  const result = { ...obj };
  for (const field of fields) {
    if (field in result && typeof result[field] === "string") {
      (result as Record<string, unknown>)[field] = maskFn(result[field] as string);
    }
  }
  return result;
}

export function hashForAnonymity(value: string, salt = ""): string {
  let hash = 0;
  const input = salt + value;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash).toString(36);
}

export function redactPattern(text: string, pattern: RegExp, replacement = "[REDACTED]"): string {
  return text.replace(pattern, replacement);
}

export const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
export const PHONE_PATTERN = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
export const SSN_PATTERN = /\d{3}-\d{2}-\d{4}/g;

export function redactPII(text: string): string {
  let result = text;
  result = redactPattern(result, EMAIL_PATTERN, "[EMAIL]");
  result = redactPattern(result, PHONE_PATTERN, "[PHONE]");
  result = redactPattern(result, SSN_PATTERN, "[SSN]");
  return result;
}
