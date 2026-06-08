export interface GuardResult {
  passed: boolean;
  violations: string[];
}

export type GuardFn = (text: string) => GuardResult;

export function maxLengthGuard(maxChars: number): GuardFn {
  return (text) => {
    if (text.length > maxChars) {
      return { passed: false, violations: [`Exceeds max length: ${text.length} > ${maxChars}`] };
    }
    return { passed: true, violations: [] };
  };
}

export function blockedWordsGuard(words: string[]): GuardFn {
  return (text) => {
    const lower = text.toLowerCase();
    const found = words.filter((w) => lower.includes(w.toLowerCase()));
    if (found.length > 0) {
      return { passed: false, violations: found.map((w) => `Blocked word found: ${w}`) };
    }
    return { passed: true, violations: [] };
  };
}

export function regexGuard(patterns: { pattern: RegExp; message: string }[]): GuardFn {
  return (text) => {
    const violations: string[] = [];
    for (const { pattern, message } of patterns) {
      if (pattern.test(text)) violations.push(message);
    }
    return { passed: violations.length === 0, violations };
  };
}

export function piiGuard(): GuardFn {
  const patterns = [
    { pattern: /\b\d{3}-\d{2}-\d{4}\b/, message: "Possible SSN detected" },
    { pattern: /\b\d{16}\b/, message: "Possible credit card number detected" },
    { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, message: "Email address detected" },
  ];
  return regexGuard(patterns);
}

export function jsonOutputGuard(): GuardFn {
  return (text) => {
    try {
      JSON.parse(text);
      return { passed: true, violations: [] };
    } catch {
      return { passed: false, violations: ["Output is not valid JSON"] };
    }
  };
}

export function combineGuards(...guards: GuardFn[]): GuardFn {
  return (text) => {
    const allViolations: string[] = [];
    for (const guard of guards) {
      const result = guard(text);
      allViolations.push(...result.violations);
    }
    return { passed: allViolations.length === 0, violations: allViolations };
  };
}

export function runGuards(text: string, guards: GuardFn[]): GuardResult {
  return combineGuards(...guards)(text);
}
