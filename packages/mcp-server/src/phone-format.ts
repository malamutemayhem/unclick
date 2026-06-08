export interface PhoneInfo {
  country: string;
  countryCode: string;
  national: string;
  international: string;
  e164: string;
}

export class PhoneFormat {
  private static readonly COUNTRY_CODES: Record<string, { code: string; pattern: RegExp; format: (digits: string) => string }> = {
    US: {
      code: "+1",
      pattern: /^1?(\d{3})(\d{3})(\d{4})$/,
      format: (d) => { const m = d.match(/^1?(\d{3})(\d{3})(\d{4})$/); return m ? `(${m[1]}) ${m[2]}-${m[3]}` : d; },
    },
    GB: {
      code: "+44",
      pattern: /^44?(\d{4})(\d{6})$/,
      format: (d) => { const m = d.match(/^44?(\d{4})(\d{6})$/); return m ? `${m[1]} ${m[2]}` : d; },
    },
    AU: {
      code: "+61",
      pattern: /^61?(\d)(\d{4})(\d{4})$/,
      format: (d) => { const m = d.match(/^61?(\d)(\d{4})(\d{4})$/); return m ? `0${m[1]} ${m[2]} ${m[3]}` : d; },
    },
  };

  static stripFormatting(phone: string): string {
    return phone.replace(/[^\d+]/g, "");
  }

  static digits(phone: string): string {
    return phone.replace(/\D/g, "");
  }

  static formatUS(phone: string): string {
    const d = PhoneFormat.digits(phone);
    const m = d.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    if (!m) return phone;
    return `(${m[1]}) ${m[2]}-${m[3]}`;
  }

  static toE164(phone: string, countryCode: string = "1"): string {
    const d = PhoneFormat.digits(phone);
    if (d.startsWith(countryCode)) return `+${d}`;
    return `+${countryCode}${d}`;
  }

  static fromE164(phone: string): { countryCode: string; number: string } | null {
    const m = phone.match(/^\+(\d{1,3})(\d+)$/);
    if (!m) return null;
    return { countryCode: m[1], number: m[2] };
  }

  static isValid(phone: string): boolean {
    const d = PhoneFormat.digits(phone);
    return d.length >= 7 && d.length <= 15;
  }

  static mask(phone: string, visibleEnd: number = 4): string {
    const d = PhoneFormat.digits(phone);
    if (d.length <= visibleEnd) return d;
    return "*".repeat(d.length - visibleEnd) + d.slice(-visibleEnd);
  }

  static isUS(phone: string): boolean {
    const d = PhoneFormat.digits(phone);
    return /^1?\d{10}$/.test(d);
  }

  static isTollFree(phone: string): boolean {
    const d = PhoneFormat.digits(phone);
    const areaCode = d.length === 11 ? d.substring(1, 4) : d.substring(0, 3);
    return ["800", "888", "877", "866", "855", "844", "833"].includes(areaCode);
  }

  static areaCode(phone: string): string | null {
    const d = PhoneFormat.digits(phone);
    if (d.length === 10) return d.substring(0, 3);
    if (d.length === 11 && d.startsWith("1")) return d.substring(1, 4);
    return null;
  }

  static formatInternational(phone: string, country: string = "US"): string {
    const info = PhoneFormat.COUNTRY_CODES[country.toUpperCase()];
    if (!info) return phone;
    const d = PhoneFormat.digits(phone);
    return `${info.code} ${info.format(d)}`;
  }

  static compare(a: string, b: string): boolean {
    const da = PhoneFormat.digits(a);
    const db = PhoneFormat.digits(b);
    if (da === db) return true;
    if (da.length === 10 && db.length === 11 && db.startsWith("1")) return da === db.slice(1);
    if (db.length === 10 && da.length === 11 && da.startsWith("1")) return db === da.slice(1);
    return false;
  }
}
