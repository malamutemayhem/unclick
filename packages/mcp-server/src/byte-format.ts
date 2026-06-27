const BINARY_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];
const DECIMAL_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];

export class ByteFormat {
  static format(bytes: number, options?: { binary?: boolean; decimals?: number }): string {
    const binary = options?.binary ?? false;
    const decimals = options?.decimals ?? 2;
    if (bytes === 0) return "0 B";
    const negative = bytes < 0;
    const abs = Math.abs(bytes);
    const base = binary ? 1024 : 1000;
    const units = binary ? BINARY_UNITS : DECIMAL_UNITS;
    const exp = Math.min(Math.floor(Math.log(abs) / Math.log(base)), units.length - 1);
    const value = abs / Math.pow(base, exp);
    const formatted = value.toFixed(decimals).replace(/\.?0+$/, "");
    return `${negative ? "-" : ""}${formatted} ${units[exp]}`;
  }

  static parse(input: string): number {
    const match = input.trim().match(/^(-?\d+(?:\.\d+)?)\s*(B|KB|KiB|MB|MiB|GB|GiB|TB|TiB|PB|PiB|EB|EiB)?$/i);
    if (!match) throw new Error(`Cannot parse byte string: ${input}`);
    const value = parseFloat(match[1]);
    const unit = (match[2] || "B").toUpperCase();
    const multipliers: Record<string, number> = {
      B: 1,
      KB: 1000, KIB: 1024,
      MB: 1e6, MIB: 1048576,
      GB: 1e9, GIB: 1073741824,
      TB: 1e12, TIB: 1099511627776,
      PB: 1e15, PIB: 1125899906842624,
      EB: 1e18, EIB: 1152921504606846976,
    };
    return Math.round(value * (multipliers[unit] || 1));
  }

  static convert(bytes: number, toUnit: string): number {
    const multipliers: Record<string, number> = {
      B: 1,
      KB: 1000, KIB: 1024,
      MB: 1e6, MIB: 1048576,
      GB: 1e9, GIB: 1073741824,
      TB: 1e12, TIB: 1099511627776,
    };
    const m = multipliers[toUnit.toUpperCase()];
    if (m === undefined) throw new Error(`Unknown unit: ${toUnit}`);
    return bytes / m;
  }

  static compare(a: string, b: string): number {
    return this.parse(a) - this.parse(b);
  }

  static sum(...values: string[]): string {
    const total = values.reduce((acc, v) => acc + this.parse(v), 0);
    return this.format(total);
  }

  static isValidByteString(input: string): boolean {
    try {
      this.parse(input);
      return true;
    } catch {
      return false;
    }
  }
}
