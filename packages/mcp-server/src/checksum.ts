export function crc32(data: string | Uint8Array): number {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  let crc = 0xFFFFFFFF;
  for (const byte of bytes) {
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

export function crc32Hex(data: string | Uint8Array): string {
  return crc32(data).toString(16).padStart(8, "0");
}

export function adler32(data: string | Uint8Array): number {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  let a = 1;
  let b = 0;
  for (const byte of bytes) {
    a = (a + byte) % 65521;
    b = (b + a) % 65521;
  }
  return ((b << 16) | a) >>> 0;
}

export function fnv1a32(data: string | Uint8Array): number {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  let hash = 0x811c9dc5;
  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function djb2(data: string): number {
  let hash = 5381;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) + hash + data.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

export function murmur3(data: string, seed = 0): number {
  const bytes = new TextEncoder().encode(data);
  let h = seed;
  const len = bytes.length;
  const nblocks = len >> 2;

  for (let i = 0; i < nblocks; i++) {
    let k = bytes[i * 4] | (bytes[i * 4 + 1] << 8) | (bytes[i * 4 + 2] << 16) | (bytes[i * 4 + 3] << 24);
    k = Math.imul(k, 0xcc9e2d51);
    k = (k << 15) | (k >>> 17);
    k = Math.imul(k, 0x1b873593);
    h ^= k;
    h = (h << 13) | (h >>> 19);
    h = Math.imul(h, 5) + 0xe6546b64;
  }

  let k = 0;
  const tail = nblocks * 4;
  switch (len & 3) {
    case 3: k ^= bytes[tail + 2] << 16;
    case 2: k ^= bytes[tail + 1] << 8;
    case 1:
      k ^= bytes[tail];
      k = Math.imul(k, 0xcc9e2d51);
      k = (k << 15) | (k >>> 17);
      k = Math.imul(k, 0x1b873593);
      h ^= k;
  }

  h ^= len;
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;

  return h >>> 0;
}
