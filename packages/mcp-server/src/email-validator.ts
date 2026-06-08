export interface EmailParts {
  local: string;
  domain: string;
  tld: string;
}

export class EmailValidator {
  private static readonly COMMON_PROVIDERS = new Set([
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com",
    "icloud.com", "mail.com", "protonmail.com", "zoho.com", "yandex.com",
  ]);

  private static readonly DISPOSABLE_PATTERNS = [
    "tempmail", "throwaway", "mailinator", "guerrilla", "sharklasers",
    "grr.la", "guerrillamail", "dispostable", "yopmail", "trashmail",
  ];

  static isValid(email: string): boolean {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  static parse(email: string): EmailParts | null {
    if (!EmailValidator.isValid(email)) return null;
    const [local, domain] = email.split("@");
    const parts = domain.split(".");
    const tld = parts[parts.length - 1];
    return { local, domain, tld };
  }

  static normalize(email: string): string {
    const lower = email.toLowerCase().trim();
    const parts = EmailValidator.parse(lower);
    if (!parts) return lower;
    let local = parts.local;
    if (parts.domain === "gmail.com") {
      local = local.split("+")[0].replace(/\./g, "");
    } else {
      local = local.split("+")[0];
    }
    return `${local}@${parts.domain}`;
  }

  static isCommonProvider(email: string): boolean {
    const parts = EmailValidator.parse(email);
    if (!parts) return false;
    return EmailValidator.COMMON_PROVIDERS.has(parts.domain.toLowerCase());
  }

  static isLikelyDisposable(email: string): boolean {
    const parts = EmailValidator.parse(email);
    if (!parts) return false;
    const domain = parts.domain.toLowerCase();
    return EmailValidator.DISPOSABLE_PATTERNS.some((p) => domain.includes(p));
  }

  static isCorporate(email: string): boolean {
    return EmailValidator.isValid(email) && !EmailValidator.isCommonProvider(email) && !EmailValidator.isLikelyDisposable(email);
  }

  static extractDomain(email: string): string | null {
    const parts = EmailValidator.parse(email);
    return parts ? parts.domain : null;
  }

  static obfuscate(email: string): string {
    const parts = EmailValidator.parse(email);
    if (!parts) return email;
    const local = parts.local;
    if (local.length <= 2) return `${local[0]}*@${parts.domain}`;
    return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${parts.domain}`;
  }

  static generateVariants(email: string): string[] {
    const parts = EmailValidator.parse(email);
    if (!parts) return [];
    return [
      email,
      `${parts.local}+tag@${parts.domain}`,
      `${parts.local.toUpperCase()}@${parts.domain}`,
    ];
  }
}
