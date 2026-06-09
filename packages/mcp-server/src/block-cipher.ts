export type CipherMode = "ecb" | "cbc" | "ctr";

function xorBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  const result = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i];
  }
  return result;
}

function simpleBlockEncrypt(block: Uint8Array, key: Uint8Array): Uint8Array {
  const result = new Uint8Array(block.length);
  for (let i = 0; i < block.length; i++) {
    let b = block[i];
    b = b ^ key[i % key.length];
    b = ((b << 3) | (b >>> 5)) & 0xff;
    b = (b + key[(i + 1) % key.length]) & 0xff;
    result[i] = b;
  }
  return result;
}

function simpleBlockDecrypt(block: Uint8Array, key: Uint8Array): Uint8Array {
  const result = new Uint8Array(block.length);
  for (let i = 0; i < block.length; i++) {
    let b = block[i];
    b = (b - key[(i + 1) % key.length] + 256) & 0xff;
    b = ((b >>> 3) | (b << 5)) & 0xff;
    b = b ^ key[i % key.length];
    result[i] = b;
  }
  return result;
}

function padBlock(data: Uint8Array, blockSize: number): Uint8Array {
  const padLen = blockSize - (data.length % blockSize);
  const padded = new Uint8Array(data.length + padLen);
  padded.set(data);
  for (let i = data.length; i < padded.length; i++) {
    padded[i] = padLen;
  }
  return padded;
}

function unpadBlock(data: Uint8Array): Uint8Array {
  const padLen = data[data.length - 1];
  if (padLen > data.length || padLen === 0) return data;
  for (let i = data.length - padLen; i < data.length; i++) {
    if (data[i] !== padLen) return data;
  }
  return data.slice(0, data.length - padLen);
}

function incrementCounter(counter: Uint8Array): Uint8Array {
  const result = new Uint8Array(counter);
  for (let i = result.length - 1; i >= 0; i--) {
    result[i]++;
    if (result[i] !== 0) break;
  }
  return result;
}

export class BlockCipher {
  private key: Uint8Array;
  private blockSize: number;
  private mode: CipherMode;

  constructor(key: Uint8Array, blockSize = 8, mode: CipherMode = "cbc") {
    this.key = new Uint8Array(key);
    this.blockSize = blockSize;
    this.mode = mode;
  }

  encrypt(plaintext: Uint8Array, iv?: Uint8Array): Uint8Array {
    const padded = padBlock(plaintext, this.blockSize);
    const numBlocks = padded.length / this.blockSize;

    switch (this.mode) {
      case "ecb":
        return this.encryptECB(padded, numBlocks);
      case "cbc":
        return this.encryptCBC(padded, numBlocks, iv || new Uint8Array(this.blockSize));
      case "ctr":
        return this.encryptCTR(plaintext, iv || new Uint8Array(this.blockSize));
    }
  }

  decrypt(ciphertext: Uint8Array, iv?: Uint8Array): Uint8Array {
    switch (this.mode) {
      case "ecb":
        return unpadBlock(this.decryptECB(ciphertext));
      case "cbc":
        return unpadBlock(this.decryptCBC(ciphertext, iv || new Uint8Array(this.blockSize)));
      case "ctr":
        return this.encryptCTR(ciphertext, iv || new Uint8Array(this.blockSize));
    }
  }

  private encryptECB(padded: Uint8Array, numBlocks: number): Uint8Array {
    const result = new Uint8Array(padded.length);
    for (let i = 0; i < numBlocks; i++) {
      const block = padded.slice(i * this.blockSize, (i + 1) * this.blockSize);
      result.set(simpleBlockEncrypt(block, this.key), i * this.blockSize);
    }
    return result;
  }

  private decryptECB(ciphertext: Uint8Array): Uint8Array {
    const numBlocks = ciphertext.length / this.blockSize;
    const result = new Uint8Array(ciphertext.length);
    for (let i = 0; i < numBlocks; i++) {
      const block = ciphertext.slice(i * this.blockSize, (i + 1) * this.blockSize);
      result.set(simpleBlockDecrypt(block, this.key), i * this.blockSize);
    }
    return result;
  }

  private encryptCBC(padded: Uint8Array, numBlocks: number, iv: Uint8Array): Uint8Array {
    const result = new Uint8Array(padded.length);
    let prev = iv;
    for (let i = 0; i < numBlocks; i++) {
      const block = padded.slice(i * this.blockSize, (i + 1) * this.blockSize);
      const xored = xorBytes(block, prev);
      const encrypted = simpleBlockEncrypt(xored, this.key);
      result.set(encrypted, i * this.blockSize);
      prev = encrypted;
    }
    return result;
  }

  private decryptCBC(ciphertext: Uint8Array, iv: Uint8Array): Uint8Array {
    const numBlocks = ciphertext.length / this.blockSize;
    const result = new Uint8Array(ciphertext.length);
    let prev = iv;
    for (let i = 0; i < numBlocks; i++) {
      const block = ciphertext.slice(i * this.blockSize, (i + 1) * this.blockSize);
      const decrypted = simpleBlockDecrypt(block, this.key);
      result.set(xorBytes(decrypted, prev), i * this.blockSize);
      prev = block;
    }
    return result;
  }

  private encryptCTR(data: Uint8Array, nonce: Uint8Array): Uint8Array {
    const result = new Uint8Array(data.length);
    let counter = new Uint8Array(nonce);
    for (let i = 0; i < data.length; i += this.blockSize) {
      const keystream = simpleBlockEncrypt(counter, this.key);
      const chunkLen = Math.min(this.blockSize, data.length - i);
      for (let j = 0; j < chunkLen; j++) {
        result[i + j] = data[i + j] ^ keystream[j];
      }
      counter = incrementCounter(counter);
    }
    return result;
  }

  get cipherBlockSize(): number {
    return this.blockSize;
  }

  get cipherMode(): CipherMode {
    return this.mode;
  }
}
