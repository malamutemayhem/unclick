export type ALUOp =
  | "ADD"
  | "SUB"
  | "AND"
  | "OR"
  | "XOR"
  | "NOT"
  | "SHL"
  | "SHR"
  | "ASHR"
  | "MUL"
  | "DIV"
  | "MOD"
  | "INC"
  | "DEC"
  | "NEG"
  | "CMP";

export interface ALUFlags {
  zero: boolean;
  negative: boolean;
  carry: boolean;
  overflow: boolean;
}

export interface ALUResult {
  result: number;
  flags: ALUFlags;
}

export class ALU {
  private bitWidth: number;
  private mask: number;
  private signBit: number;
  private maxSigned: number;
  private minSigned: number;

  constructor(bitWidth = 32) {
    this.bitWidth = bitWidth;
    this.mask = bitWidth >= 32 ? 0xffffffff : (1 << bitWidth) - 1;
    this.signBit = bitWidth >= 32 ? 0x80000000 : 1 << (bitWidth - 1);
    this.maxSigned = this.signBit - 1;
    this.minSigned = -this.signBit;
  }

  execute(op: ALUOp, a: number, b = 0): ALUResult {
    a = a & this.mask;
    b = b & this.mask;
    let result: number;
    let carry = false;

    switch (op) {
      case "ADD": {
        const sum = a + b;
        carry = sum > this.mask;
        result = sum & this.mask;
        break;
      }
      case "SUB": {
        const diff = a - b;
        carry = diff < 0;
        result = diff & this.mask;
        break;
      }
      case "AND": result = a & b; break;
      case "OR": result = a | b; break;
      case "XOR": result = a ^ b; break;
      case "NOT": result = (~a) & this.mask; break;
      case "SHL": result = (a << b) & this.mask; break;
      case "SHR": result = (a >>> b) & this.mask; break;
      case "ASHR": {
        const signed = this.toSigned(a);
        result = (signed >> b) & this.mask;
        break;
      }
      case "MUL": result = Math.imul(a, b) & this.mask; break;
      case "DIV": result = b !== 0 ? (a / b) >>> 0 : 0; break;
      case "MOD": result = b !== 0 ? a % b : 0; break;
      case "INC": {
        const sum = a + 1;
        carry = sum > this.mask;
        result = sum & this.mask;
        break;
      }
      case "DEC": {
        const diff = a - 1;
        carry = diff < 0;
        result = diff & this.mask;
        break;
      }
      case "NEG": result = (-a) & this.mask; break;
      case "CMP": {
        const diff = a - b;
        carry = diff < 0;
        result = diff & this.mask;
        break;
      }
    }

    const zero = result === 0;
    const negative = !!(result & this.signBit);
    const overflow = this.checkOverflow(op, a, b, result);

    return {
      result,
      flags: { zero, negative, carry, overflow },
    };
  }

  private checkOverflow(op: ALUOp, a: number, b: number, result: number): boolean {
    if (op !== "ADD" && op !== "SUB") return false;
    const aSign = !!(a & this.signBit);
    const bSign = op === "SUB" ? !(b & this.signBit) : !!(b & this.signBit);
    const rSign = !!(result & this.signBit);
    return aSign === bSign && aSign !== rSign;
  }

  private toSigned(n: number): number {
    if (n & this.signBit) return n - (this.mask + 1);
    return n;
  }

  get width(): number {
    return this.bitWidth;
  }

  toBinary(n: number): string {
    return (n & this.mask).toString(2).padStart(this.bitWidth, "0");
  }

  toHex(n: number): string {
    const hexDigits = Math.ceil(this.bitWidth / 4);
    return (n & this.mask).toString(16).padStart(hexDigits, "0");
  }

  getSigned(n: number): number {
    return this.toSigned(n & this.mask);
  }
}
