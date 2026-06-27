function simpleHash(data: Uint8Array): Uint8Array {
  const hash = new Uint8Array(16);
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let i = 0; i < data.length; i++) {
    a = (a + data[i] * 31) & 0xffffffff;
    b = (b ^ ((a << 7) | (a >>> 25))) & 0xffffffff;
    c = (c + (b * 17)) & 0xffffffff;
    d = (d ^ ((c << 13) | (c >>> 19))) & 0xffffffff;
    a = (a ^ d) & 0xffffffff;
  }

  for (let round = 0; round < 4; round++) {
    a = (a + (b ^ c ^ d)) & 0xffffffff;
    b = (b ^ ((a << 5) | (a >>> 27))) & 0xffffffff;
    c = (c + (d ^ a ^ b)) & 0xffffffff;
    d = (d ^ ((c << 11) | (c >>> 21))) & 0xffffffff;
  }

  const view = new DataView(hash.buffer);
  view.setUint32(0, a);
  view.setUint32(4, b);
  view.setUint32(8, c);
  view.setUint32(12, d);
  return hash;
}

export function hashBytes(data: Uint8Array): Uint8Array {
  return simpleHash(data);
}

export function hashString(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return hashBytes(encoder.encode(str));
}

export function hashHex(data: Uint8Array): string {
  const hash = hashBytes(data);
  return Array.from(hash).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function hmac(key: Uint8Array, message: Uint8Array): Uint8Array {
  const blockSize = 64;

  let normalizedKey: Uint8Array;
  if (key.length > blockSize) {
    normalizedKey = hashBytes(key);
  } else {
    normalizedKey = new Uint8Array(blockSize);
    normalizedKey.set(key);
  }

  const iPad = new Uint8Array(blockSize);
  const oPad = new Uint8Array(blockSize);
  for (let i = 0; i < blockSize; i++) {
    iPad[i] = normalizedKey[i] ^ 0x36;
    oPad[i] = normalizedKey[i] ^ 0x5c;
  }

  const innerData = new Uint8Array(iPad.length + message.length);
  innerData.set(iPad);
  innerData.set(message, iPad.length);
  const innerHash = hashBytes(innerData);

  const outerData = new Uint8Array(oPad.length + innerHash.length);
  outerData.set(oPad);
  outerData.set(innerHash, oPad.length);
  return hashBytes(outerData);
}

export function hmacHex(key: Uint8Array, message: Uint8Array): string {
  const result = hmac(key, message);
  return Array.from(result).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function verify(key: Uint8Array, message: Uint8Array, expectedMac: Uint8Array): boolean {
  const computed = hmac(key, message);
  if (computed.length !== expectedMac.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed[i] ^ expectedMac[i];
  }
  return diff === 0;
}

export function deriveKey(password: Uint8Array, salt: Uint8Array, iterations = 1000): Uint8Array {
  let result = hmac(password, salt);
  let prev = result;
  for (let i = 1; i < iterations; i++) {
    prev = hmac(password, prev);
    for (let j = 0; j < result.length; j++) {
      result[j] ^= prev[j];
    }
  }
  return result;
}
