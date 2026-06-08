export interface CurrencyInfo {
  code: string;
  symbol: string;
  decimals: number;
  name: string;
}

export class MoneyFormat {
  private static readonly CURRENCIES: Record<string, CurrencyInfo> = {
    USD: { code: "USD", symbol: "$", decimals: 2, name: "US Dollar" },
    EUR: { code: "EUR", symbol: "€", decimals: 2, name: "Euro" },
    GBP: { code: "GBP", symbol: "£", decimals: 2, name: "British Pound" },
    JPY: { code: "JPY", symbol: "¥", decimals: 0, name: "Japanese Yen" },
    AUD: { code: "AUD", symbol: "A$", decimals: 2, name: "Australian Dollar" },
    CAD: { code: "CAD", symbol: "C$", decimals: 2, name: "Canadian Dollar" },
    CHF: { code: "CHF", symbol: "CHF", decimals: 2, name: "Swiss Franc" },
    CNY: { code: "CNY", symbol: "¥", decimals: 2, name: "Chinese Yuan" },
    INR: { code: "INR", symbol: "₹", decimals: 2, name: "Indian Rupee" },
    NZD: { code: "NZD", symbol: "NZ$", decimals: 2, name: "New Zealand Dollar" },
    KRW: { code: "KRW", symbol: "₩", decimals: 0, name: "South Korean Won" },
    BRL: { code: "BRL", symbol: "R$", decimals: 2, name: "Brazilian Real" },
    SEK: { code: "SEK", symbol: "kr", decimals: 2, name: "Swedish Krona" },
    NOK: { code: "NOK", symbol: "kr", decimals: 2, name: "Norwegian Krone" },
    SGD: { code: "SGD", symbol: "S$", decimals: 2, name: "Singapore Dollar" },
  };

  static format(amount: number, currency: string = "USD"): string {
    const info = MoneyFormat.CURRENCIES[currency.toUpperCase()];
    if (!info) return `${amount.toFixed(2)} ${currency}`;
    const formatted = MoneyFormat.addThousandsSeparator(Math.abs(amount).toFixed(info.decimals));
    const sign = amount < 0 ? "-" : "";
    return `${sign}${info.symbol}${formatted}`;
  }

  static formatCompact(amount: number, currency: string = "USD"): string {
    const info = MoneyFormat.CURRENCIES[currency.toUpperCase()];
    const symbol = info ? info.symbol : currency;
    const abs = Math.abs(amount);
    const sign = amount < 0 ? "-" : "";
    if (abs >= 1e9) return `${sign}${symbol}${(abs / 1e9).toFixed(1)}B`;
    if (abs >= 1e6) return `${sign}${symbol}${(abs / 1e6).toFixed(1)}M`;
    if (abs >= 1e3) return `${sign}${symbol}${(abs / 1e3).toFixed(1)}K`;
    return MoneyFormat.format(amount, currency);
  }

  static toCents(amount: number): number {
    return Math.round(amount * 100);
  }

  static fromCents(cents: number): number {
    return cents / 100;
  }

  static parse(text: string): { amount: number; currency: string } | null {
    const cleaned = text.replace(/[,\s]/g, "");
    for (const [code, info] of Object.entries(MoneyFormat.CURRENCIES)) {
      if (cleaned.startsWith(info.symbol)) {
        const num = parseFloat(cleaned.slice(info.symbol.length));
        if (!isNaN(num)) return { amount: num, currency: code };
      }
    }
    const match = cleaned.match(/^(-?\d+\.?\d*)\s*([A-Z]{3})$/i);
    if (match) return { amount: parseFloat(match[1]), currency: match[2].toUpperCase() };
    return null;
  }

  static split(amount: number, ways: number): number[] {
    const cents = MoneyFormat.toCents(amount);
    const base = Math.floor(cents / ways);
    const remainder = cents - base * ways;
    const result: number[] = [];
    for (let i = 0; i < ways; i++) {
      result.push(MoneyFormat.fromCents(base + (i < remainder ? 1 : 0)));
    }
    return result;
  }

  static getCurrency(code: string): CurrencyInfo | null {
    return MoneyFormat.CURRENCIES[code.toUpperCase()] || null;
  }

  static listCurrencies(): CurrencyInfo[] {
    return Object.values(MoneyFormat.CURRENCIES);
  }

  private static addThousandsSeparator(str: string): string {
    const [integer, decimal] = str.split(".");
    const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal !== undefined ? `${withCommas}.${decimal}` : withCommas;
  }
}
