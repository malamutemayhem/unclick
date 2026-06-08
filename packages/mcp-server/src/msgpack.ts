export type MsgPackValue = null | boolean | number | string | Uint8Array | MsgPackValue[] | { [key: string]: MsgPackValue };

export function encode(value: MsgPackValue): Uint8Array {
  const parts: number[] = [];
  encodeValue(value, parts);
  return new Uint8Array(parts);
}

function encodeValue(value: MsgPackValue, out: number[]): void {
  if (value === null) {
    out.push(0xc0);
  } else if (typeof value === "boolean") {
    out.push(value ? 0xc3 : 0xc2);
  } else if (typeof value === "number") {
    if (Number.isInteger(value)) {
      encodeInteger(value, out);
    } else {
      encodeFloat64(value, out);
    }
  } else if (typeof value === "string") {
    encodeString(value, out);
  } else if (value instanceof Uint8Array) {
    encodeBinary(value, out);
  } else if (Array.isArray(value)) {
    encodeArray(value, out);
  } else {
    encodeMap(value, out);
  }
}

function encodeInteger(n: number, out: number[]): void {
  if (n >= 0 && n <= 127) {
    out.push(n);
  } else if (n >= -32 && n < 0) {
    out.push(0xe0 | (n + 32));
  } else if (n >= 0 && n <= 0xff) {
    out.push(0xcc, n);
  } else if (n >= 0 && n <= 0xffff) {
    out.push(0xcd, (n >> 8) & 0xff, n & 0xff);
  } else if (n >= 0 && n <= 0xffffffff) {
    out.push(0xce, (n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff);
  } else if (n >= -128 && n < 0) {
    out.push(0xd0, n & 0xff);
  } else if (n >= -32768 && n < 0) {
    out.push(0xd1, (n >> 8) & 0xff, n & 0xff);
  } else {
    encodeFloat64(n, out);
  }
}

function encodeFloat64(n: number, out: number[]): void {
  out.push(0xcb);
  const buf = new ArrayBuffer(8);
  new DataView(buf).setFloat64(0, n);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < 8; i++) out.push(bytes[i]);
}

function encodeString(s: string, out: number[]): void {
  const encoded = new TextEncoder().encode(s);
  const len = encoded.length;
  if (len <= 31) {
    out.push(0xa0 | len);
  } else if (len <= 0xff) {
    out.push(0xd9, len);
  } else if (len <= 0xffff) {
    out.push(0xda, (len >> 8) & 0xff, len & 0xff);
  } else {
    out.push(0xdb, (len >> 24) & 0xff, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff);
  }
  for (let i = 0; i < encoded.length; i++) out.push(encoded[i]);
}

function encodeBinary(data: Uint8Array, out: number[]): void {
  const len = data.length;
  if (len <= 0xff) {
    out.push(0xc4, len);
  } else if (len <= 0xffff) {
    out.push(0xc5, (len >> 8) & 0xff, len & 0xff);
  } else {
    out.push(0xc6, (len >> 24) & 0xff, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff);
  }
  for (let i = 0; i < data.length; i++) out.push(data[i]);
}

function encodeArray(arr: MsgPackValue[], out: number[]): void {
  const len = arr.length;
  if (len <= 15) {
    out.push(0x90 | len);
  } else if (len <= 0xffff) {
    out.push(0xdc, (len >> 8) & 0xff, len & 0xff);
  } else {
    out.push(0xdd, (len >> 24) & 0xff, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff);
  }
  for (const item of arr) encodeValue(item, out);
}

function encodeMap(obj: { [key: string]: MsgPackValue }, out: number[]): void {
  const keys = Object.keys(obj);
  const len = keys.length;
  if (len <= 15) {
    out.push(0x80 | len);
  } else if (len <= 0xffff) {
    out.push(0xde, (len >> 8) & 0xff, len & 0xff);
  } else {
    out.push(0xdf, (len >> 24) & 0xff, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff);
  }
  for (const key of keys) {
    encodeString(key, out);
    encodeValue(obj[key], out);
  }
}

export function decode(data: Uint8Array): MsgPackValue {
  const result = decodeAt(data, 0);
  return result.value;
}

function decodeAt(data: Uint8Array, offset: number): { value: MsgPackValue; offset: number } {
  const byte = data[offset++];

  if (byte === 0xc0) return { value: null, offset };
  if (byte === 0xc2) return { value: false, offset };
  if (byte === 0xc3) return { value: true, offset };

  if (byte <= 0x7f) return { value: byte, offset };
  if (byte >= 0xe0) return { value: byte - 256, offset };

  if (byte === 0xcc) return { value: data[offset], offset: offset + 1 };
  if (byte === 0xcd) return { value: (data[offset] << 8) | data[offset + 1], offset: offset + 2 };
  if (byte === 0xce) return { value: ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0, offset: offset + 4 };

  if (byte === 0xd0) { const v = data[offset]; return { value: v > 127 ? v - 256 : v, offset: offset + 1 }; }
  if (byte === 0xd1) { const v = (data[offset] << 8) | data[offset + 1]; return { value: v > 32767 ? v - 65536 : v, offset: offset + 2 }; }

  if (byte === 0xcb) {
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    for (let i = 0; i < 8; i++) view.setUint8(i, data[offset + i]);
    return { value: view.getFloat64(0), offset: offset + 8 };
  }

  if ((byte & 0xe0) === 0xa0) {
    const len = byte & 0x1f;
    const str = new TextDecoder().decode(data.slice(offset, offset + len));
    return { value: str, offset: offset + len };
  }
  if (byte === 0xd9) { const len = data[offset]; const str = new TextDecoder().decode(data.slice(offset + 1, offset + 1 + len)); return { value: str, offset: offset + 1 + len }; }

  if (byte === 0xc4) { const len = data[offset]; return { value: data.slice(offset + 1, offset + 1 + len), offset: offset + 1 + len }; }

  if ((byte & 0xf0) === 0x90) {
    const len = byte & 0x0f;
    return decodeArray(data, offset, len);
  }
  if (byte === 0xdc) {
    const len = (data[offset] << 8) | data[offset + 1];
    return decodeArray(data, offset + 2, len);
  }

  if ((byte & 0xf0) === 0x80) {
    const len = byte & 0x0f;
    return decodeMap(data, offset, len);
  }
  if (byte === 0xde) {
    const len = (data[offset] << 8) | data[offset + 1];
    return decodeMap(data, offset + 2, len);
  }

  throw new Error(`Unknown msgpack byte: 0x${byte.toString(16)}`);
}

function decodeArray(data: Uint8Array, offset: number, len: number): { value: MsgPackValue[]; offset: number } {
  const arr: MsgPackValue[] = [];
  for (let i = 0; i < len; i++) {
    const result = decodeAt(data, offset);
    arr.push(result.value);
    offset = result.offset;
  }
  return { value: arr, offset };
}

function decodeMap(data: Uint8Array, offset: number, len: number): { value: { [key: string]: MsgPackValue }; offset: number } {
  const obj: { [key: string]: MsgPackValue } = {};
  for (let i = 0; i < len; i++) {
    const keyResult = decodeAt(data, offset);
    offset = keyResult.offset;
    const valResult = decodeAt(data, offset);
    offset = valResult.offset;
    obj[keyResult.value as string] = valResult.value;
  }
  return { value: obj, offset };
}
