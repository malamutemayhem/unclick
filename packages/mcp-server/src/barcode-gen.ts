export interface BarcodePattern {
  bars: boolean[];
  text: string;
  checkDigit?: number;
}

const CODE128_START_B = 104;
const CODE128_STOP = 106;

const EAN_ENCODING: Record<string, string[]> = {
  L: [
    "0001101", "0011001", "0010011", "0111101", "0100011",
    "0110001", "0101111", "0111011", "0110111", "0001011",
  ],
  R: [
    "1110010", "1100110", "1101100", "1000010", "1011100",
    "1001110", "1010000", "1000100", "1001000", "1110100",
  ],
};

export class BarcodeGenerator {
  static ean13CheckDigit(digits: string): number {
    if (digits.length !== 12) throw new Error("EAN-13 requires 12 digits");
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const d = parseInt(digits[i], 10);
      sum += i % 2 === 0 ? d : d * 3;
    }
    return (10 - (sum % 10)) % 10;
  }

  static ean13(digits: string): BarcodePattern {
    let input = digits;
    if (input.length === 12) {
      const check = BarcodeGenerator.ean13CheckDigit(input);
      input = input + check;
    }
    if (input.length !== 13) throw new Error("EAN-13 requires 12 or 13 digits");

    const bars: boolean[] = [];
    bars.push(true, false, true);

    for (let i = 1; i <= 6; i++) {
      const d = parseInt(input[i], 10);
      const encoding = EAN_ENCODING.L[d];
      for (const bit of encoding) bars.push(bit === "1");
    }

    bars.push(false, true, false, true, false);

    for (let i = 7; i <= 12; i++) {
      const d = parseInt(input[i], 10);
      const encoding = EAN_ENCODING.R[d];
      for (const bit of encoding) bars.push(bit === "1");
    }

    bars.push(true, false, true);
    return { bars, text: input, checkDigit: parseInt(input[12], 10) };
  }

  static upcACheckDigit(digits: string): number {
    if (digits.length !== 11) throw new Error("UPC-A requires 11 digits");
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      const d = parseInt(digits[i], 10);
      sum += i % 2 === 0 ? d * 3 : d;
    }
    return (10 - (sum % 10)) % 10;
  }

  static code128Value(char: string): number {
    const code = char.charCodeAt(0);
    if (code >= 32 && code <= 126) return code - 32;
    return 0;
  }

  static code128Checksum(data: string): number {
    let sum = CODE128_START_B;
    for (let i = 0; i < data.length; i++) {
      sum += BarcodeGenerator.code128Value(data[i]) * (i + 1);
    }
    return sum % 103;
  }

  static isbn10CheckDigit(digits: string): string {
    if (digits.length !== 9) throw new Error("ISBN-10 requires 9 digits");
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(digits[i], 10) * (10 - i);
    }
    const remainder = (11 - (sum % 11)) % 11;
    return remainder === 10 ? "X" : String(remainder);
  }

  static isbn13CheckDigit(digits: string): number {
    return BarcodeGenerator.ean13CheckDigit(digits);
  }

  static isValidEan13(digits: string): boolean {
    if (digits.length !== 13 || !/^\d+$/.test(digits)) return false;
    const check = BarcodeGenerator.ean13CheckDigit(digits.slice(0, 12));
    return check === parseInt(digits[12], 10);
  }

  static isValidIsbn10(digits: string): boolean {
    if (digits.length !== 10) return false;
    const check = BarcodeGenerator.isbn10CheckDigit(digits.slice(0, 9));
    return check === digits[9];
  }

  static toAsciiArt(pattern: BarcodePattern, height = 5): string {
    const lines: string[] = [];
    for (let h = 0; h < height; h++) {
      lines.push(pattern.bars.map((b) => (b ? "#" : " ")).join(""));
    }
    return lines.join("\n");
  }
}
