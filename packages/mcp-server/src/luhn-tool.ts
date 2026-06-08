import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function luhnCheck(digits: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function computeCheckDigit(partial: string): number {
  const withZero = partial + "0";
  let sum = 0;
  let alt = false;
  for (let i = withZero.length - 1; i >= 0; i--) {
    let n = parseInt(withZero[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return (10 - (sum % 10)) % 10;
}

export async function luhnValidate(args: Record<string, unknown>) {
  const raw = typeof args.number === "string" || typeof args.number === "number"
    ? String(args.number)
    : "";
  const digits = raw.replace(/[\s-]/g, "");
  if (!digits || !/^\d+$/.test(digits)) return { error: "number is required (digits only)" };

  const mode = args.mode === "generate" ? "generate" : "validate";

  if (mode === "generate") {
    const checkDigit = computeCheckDigit(digits);
    const full = digits + checkDigit;
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Validate the full number with mode: validate"],
    };
    return stampMeta({ input: digits, check_digit: checkDigit, full_number: full, mode }, meta);
  }

  const valid = luhnCheck(digits);
  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: valid
      ? ["Number passes Luhn check"]
      : ["Generate a valid check digit with mode: generate"],
  };
  return stampMeta({ input: digits, valid, digit_count: digits.length, mode }, meta);
}
