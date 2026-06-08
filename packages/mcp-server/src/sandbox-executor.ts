export interface SandboxConfig {
  maxOutputLength: number;
  allowedGlobals: string[];
  timeoutMs: number;
}

const DEFAULT_CONFIG: SandboxConfig = {
  maxOutputLength: 10000,
  allowedGlobals: ["Math", "JSON", "parseInt", "parseFloat", "isNaN", "isFinite", "Number", "String", "Boolean", "Array", "Object", "Date"],
  timeoutMs: 1000,
};

export interface SandboxResult<T = unknown> {
  success: boolean;
  value?: T;
  error?: string;
  truncated: boolean;
}

export function safeEval(expression: string, variables: Record<string, unknown> = {}, config: Partial<SandboxConfig> = {}): SandboxResult {
  const c = { ...DEFAULT_CONFIG, ...config };
  try {
    const varNames = Object.keys(variables);
    const varValues = Object.values(variables);
    const fn = new Function(...varNames, `"use strict"; return (${expression});`);
    const result = fn(...varValues);
    const output = typeof result === "string" ? result : JSON.stringify(result);
    return {
      success: true,
      value: result,
      truncated: output !== undefined && output !== null && output.length > c.maxOutputLength,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      truncated: false,
    };
  }
}

export function validateExpression(expression: string, allowedPatterns: RegExp[] = []): { valid: boolean; reason?: string } {
  const dangerous = [/\beval\b/, /\bFunction\b/, /\bimport\b/, /\brequire\b/, /\bprocess\b/, /\bglobal\b/, /\bwindow\b/, /\bdocument\b/];
  for (const pattern of dangerous) {
    if (pattern.test(expression)) {
      const matched = expression.match(pattern)?.[0];
      return { valid: false, reason: `Forbidden pattern: ${matched}` };
    }
  }
  for (const allowed of allowedPatterns) {
    if (!allowed.test(expression)) continue;
  }
  return { valid: true };
}

export function safeCompute(expression: string, variables: Record<string, number> = {}): SandboxResult<number> {
  const validation = validateExpression(expression);
  if (!validation.valid) return { success: false, error: validation.reason, truncated: false };
  if (!/^[\d\s+\-*/%().a-zA-Z_,]+$/.test(expression)) {
    return { success: false, error: "Expression contains forbidden characters", truncated: false };
  }
  return safeEval(expression, variables) as SandboxResult<number>;
}
