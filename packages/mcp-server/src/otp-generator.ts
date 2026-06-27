export class LFSR {
  private state: number;
  private taps: number[];
  private size: number;

  constructor(seed: number, size = 16, taps: number[] = []) {
    this.size = size;
    this.state = seed & ((1 << size) - 1);
    if (this.state === 0) this.state = 1;
    this.taps = taps.length > 0 ? taps : this.defaultTaps(size);
  }

  private defaultTaps(size: number): number[] {
    const tapTable: Record<number, number[]> = {
      8: [7, 5, 4, 3],
      16: [15, 14, 12, 3],
      32: [31, 21, 1, 0],
    };
    return tapTable[size] || [size - 1, Math.floor(size / 2)];
  }

  next(): number {
    let bit = 0;
    for (const tap of this.taps) {
      bit ^= (this.state >> tap) & 1;
    }
    this.state = ((this.state << 1) | bit) & ((1 << this.size) - 1);
    return bit;
  }

  nextByte(): number {
    let byte = 0;
    for (let i = 7; i >= 0; i--) {
      byte |= this.next() << i;
    }
    return byte;
  }

  generateBytes(count: number): Uint8Array {
    const bytes = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      bytes[i] = this.nextByte();
    }
    return bytes;
  }

  get currentState(): number {
    return this.state;
  }

  get registerSize(): number {
    return this.size;
  }
}

export class OTPCipher {
  private pad: Uint8Array;
  private position = 0;

  constructor(pad: Uint8Array) {
    this.pad = new Uint8Array(pad);
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    if (this.position + plaintext.length > this.pad.length) {
      throw new Error("One-time pad exhausted");
    }
    const result = new Uint8Array(plaintext.length);
    for (let i = 0; i < plaintext.length; i++) {
      result[i] = plaintext[i] ^ this.pad[this.position++];
    }
    return result;
  }

  decrypt(ciphertext: Uint8Array, offset: number): Uint8Array {
    if (offset + ciphertext.length > this.pad.length) {
      throw new Error("One-time pad exhausted");
    }
    const result = new Uint8Array(ciphertext.length);
    for (let i = 0; i < ciphertext.length; i++) {
      result[i] = ciphertext[i] ^ this.pad[offset + i];
    }
    return result;
  }

  get remaining(): number {
    return this.pad.length - this.position;
  }

  get used(): number {
    return this.position;
  }

  reset(): void {
    this.position = 0;
  }
}

export class StreamCipherSim {
  private lfsr1: LFSR;
  private lfsr2: LFSR;

  constructor(seed1: number, seed2: number) {
    this.lfsr1 = new LFSR(seed1, 16);
    this.lfsr2 = new LFSR(seed2, 16);
  }

  nextByte(): number {
    const a = this.lfsr1.nextByte();
    const b = this.lfsr2.nextByte();
    return a ^ b;
  }

  encrypt(data: Uint8Array): Uint8Array {
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i] ^ this.nextByte();
    }
    return result;
  }

  generateKeystream(length: number): Uint8Array {
    const stream = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      stream[i] = this.nextByte();
    }
    return stream;
  }
}
