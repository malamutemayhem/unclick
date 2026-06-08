export interface PasswordResult {
  score: number;
  strength: "very weak" | "weak" | "fair" | "strong" | "very strong";
  suggestions: string[];
  entropy: number;
}

export class PasswordStrength {
  static analyze(password: string): PasswordResult {
    const suggestions: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else suggestions.push("Use at least 8 characters");

    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    else suggestions.push("Add lowercase letters");

    if (/[A-Z]/.test(password)) score += 1;
    else suggestions.push("Add uppercase letters");

    if (/\d/.test(password)) score += 1;
    else suggestions.push("Add numbers");

    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    else suggestions.push("Add special characters");

    if (PasswordStrength.hasRepeatingChars(password)) {
      score -= 1;
      suggestions.push("Avoid repeating characters");
    }

    if (PasswordStrength.hasSequentialChars(password)) {
      score -= 1;
      suggestions.push("Avoid sequential characters");
    }

    score = Math.max(0, Math.min(score, 7));
    const entropy = PasswordStrength.calculateEntropy(password);

    let strength: PasswordResult["strength"];
    if (score <= 1) strength = "very weak";
    else if (score <= 2) strength = "weak";
    else if (score <= 4) strength = "fair";
    else if (score <= 5) strength = "strong";
    else strength = "very strong";

    return { score, strength, suggestions, entropy };
  }

  static calculateEntropy(password: string): number {
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/\d/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
    if (poolSize === 0) return 0;
    return Math.round(password.length * Math.log2(poolSize) * 100) / 100;
  }

  static hasRepeatingChars(password: string): boolean {
    return /(.)\1{2,}/.test(password);
  }

  static hasSequentialChars(password: string): boolean {
    const lower = password.toLowerCase();
    for (let i = 0; i < lower.length - 2; i++) {
      const c1 = lower.charCodeAt(i);
      const c2 = lower.charCodeAt(i + 1);
      const c3 = lower.charCodeAt(i + 2);
      if (c2 === c1 + 1 && c3 === c2 + 1) return true;
      if (c2 === c1 - 1 && c3 === c2 - 1) return true;
    }
    return false;
  }

  static meetsPolicy(
    password: string,
    policy: { minLength?: number; requireUpper?: boolean; requireLower?: boolean; requireDigit?: boolean; requireSpecial?: boolean },
  ): { passes: boolean; failures: string[] } {
    const failures: string[] = [];
    if (policy.minLength && password.length < policy.minLength) failures.push(`Minimum length ${policy.minLength}`);
    if (policy.requireUpper && !/[A-Z]/.test(password)) failures.push("Uppercase letter required");
    if (policy.requireLower && !/[a-z]/.test(password)) failures.push("Lowercase letter required");
    if (policy.requireDigit && !/\d/.test(password)) failures.push("Digit required");
    if (policy.requireSpecial && !/[^a-zA-Z0-9]/.test(password)) failures.push("Special character required");
    return { passes: failures.length === 0, failures };
  }

  static generateSuggestion(length: number = 16): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let result = "";
    let seed = Date.now();
    for (let i = 0; i < length; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      result += chars[seed % chars.length];
    }
    return result;
  }
}
