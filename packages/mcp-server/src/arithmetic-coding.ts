export interface FrequencyTable {
  readonly symbols: Map<number, number>;
  readonly total: number;
}

export function buildFrequencyTable(data: Uint8Array): FrequencyTable {
  const symbols = new Map<number, number>();
  for (const b of data) {
    symbols.set(b, (symbols.get(b) ?? 0) + 1);
  }
  let total = 0;
  for (const c of symbols.values()) total += c;
  return { symbols, total };
}

export function encode(data: Uint8Array, freq?: FrequencyTable): { encoded: number[]; freq: FrequencyTable; length: number } {
  if (data.length === 0) {
    return { encoded: [], freq: freq ?? { symbols: new Map(), total: 0 }, length: 0 };
  }

  const ft = freq ?? buildFrequencyTable(data);
  const sorted = [...ft.symbols.keys()].sort((a, b) => a - b);

  const cumulative = new Map<number, [number, number]>();
  let cumStart = 0;
  for (const sym of sorted) {
    const count = ft.symbols.get(sym)!;
    cumulative.set(sym, [cumStart, cumStart + count]);
    cumStart += count;
  }

  const PRECISION = 32;
  const FULL = Math.pow(2, PRECISION);
  const HALF = FULL / 2;
  const QUARTER = FULL / 4;

  let low = 0;
  let high = FULL;
  let pending = 0;
  const bits: number[] = [];

  function emitBit(bit: number) {
    bits.push(bit);
    while (pending > 0) {
      bits.push(1 - bit);
      pending--;
    }
  }

  for (const symbol of data) {
    const range = high - low;
    const [symLow, symHigh] = cumulative.get(symbol)!;

    high = low + Math.floor((range * symHigh) / ft.total);
    low = low + Math.floor((range * symLow) / ft.total);

    while (true) {
      if (high <= HALF) {
        emitBit(0);
        low = low * 2;
        high = high * 2;
      } else if (low >= HALF) {
        emitBit(1);
        low = (low - HALF) * 2;
        high = (high - HALF) * 2;
      } else if (low >= QUARTER && high <= 3 * QUARTER) {
        pending++;
        low = (low - QUARTER) * 2;
        high = (high - QUARTER) * 2;
      } else {
        break;
      }
    }
  }

  pending++;
  if (low < QUARTER) {
    emitBit(0);
  } else {
    emitBit(1);
  }

  return { encoded: bits, freq: ft, length: data.length };
}

export function decode(bits: number[], freq: FrequencyTable, length: number): Uint8Array {
  if (length === 0) return new Uint8Array(0);

  const sorted = [...freq.symbols.keys()].sort((a, b) => a - b);

  const cumulative = new Map<number, [number, number]>();
  let cumStart = 0;
  for (const sym of sorted) {
    const count = freq.symbols.get(sym)!;
    cumulative.set(sym, [cumStart, cumStart + count]);
    cumStart += count;
  }

  const PRECISION = 32;
  const FULL = Math.pow(2, PRECISION);
  const HALF = FULL / 2;
  const QUARTER = FULL / 4;

  let low = 0;
  let high = FULL;
  let value = 0;
  let bitPos = 0;

  function readBit(): number {
    if (bitPos < bits.length) return bits[bitPos++];
    return 0;
  }

  for (let i = 0; i < PRECISION; i++) {
    value = value * 2 + readBit();
  }

  const result = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    const range = high - low;
    const scaledValue = Math.floor(((value - low + 1) * freq.total - 1) / range);

    let symbol = sorted[0];
    for (const sym of sorted) {
      const [symLow, symHigh] = cumulative.get(sym)!;
      if (scaledValue >= symLow && scaledValue < symHigh) {
        symbol = sym;
        break;
      }
    }

    result[i] = symbol;

    const [symLow, symHigh] = cumulative.get(symbol)!;
    high = low + Math.floor((range * symHigh) / freq.total);
    low = low + Math.floor((range * symLow) / freq.total);

    while (true) {
      if (high <= HALF) {
        low = low * 2;
        high = high * 2;
        value = value * 2 + readBit();
      } else if (low >= HALF) {
        low = (low - HALF) * 2;
        high = (high - HALF) * 2;
        value = (value - HALF) * 2 + readBit();
      } else if (low >= QUARTER && high <= 3 * QUARTER) {
        low = (low - QUARTER) * 2;
        high = (high - QUARTER) * 2;
        value = (value - QUARTER) * 2 + readBit();
      } else {
        break;
      }
    }
  }

  return result;
}

export function compressionRatio(originalSize: number, encodedBits: number): number {
  if (originalSize === 0) return 0;
  const encodedBytes = Math.ceil(encodedBits / 8);
  return encodedBytes / originalSize;
}

export function bitsToBytes(bits: number[]): Uint8Array {
  const byteLen = Math.ceil(bits.length / 8);
  const bytes = new Uint8Array(byteLen);
  for (let i = 0; i < bits.length; i++) {
    if (bits[i]) {
      bytes[Math.floor(i / 8)] |= 1 << (7 - (i % 8));
    }
  }
  return bytes;
}

export function bytesToBits(bytes: Uint8Array, bitCount: number): number[] {
  const bits: number[] = [];
  for (let i = 0; i < bitCount; i++) {
    bits.push((bytes[Math.floor(i / 8)] >> (7 - (i % 8))) & 1);
  }
  return bits;
}
