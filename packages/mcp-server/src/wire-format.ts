export function encodeVarInt(value: number): number[] {
  const bytes: number[] = [];
  let v = value >>> 0;
  while (v > 0x7f) {
    bytes.push((v & 0x7f) | 0x80);
    v >>>= 7;
  }
  bytes.push(v);
  return bytes;
}

export function decodeVarInt(bytes: number[]): { value: number; bytesRead: number } {
  let value = 0;
  let shift = 0;
  let i = 0;
  for (; i < bytes.length; i++) {
    value |= (bytes[i] & 0x7f) << shift;
    if ((bytes[i] & 0x80) === 0) break;
    shift += 7;
  }
  return { value: value >>> 0, bytesRead: i + 1 };
}

export function encodeLength(length: number, data: string): string {
  return `${length}:${data}`;
}

export function decodeLength(encoded: string): { length: number; data: string; rest: string } {
  const colonIdx = encoded.indexOf(":");
  if (colonIdx === -1) throw new Error("Invalid length-prefixed format");
  const length = parseInt(encoded.slice(0, colonIdx), 10);
  const data = encoded.slice(colonIdx + 1, colonIdx + 1 + length);
  const rest = encoded.slice(colonIdx + 1 + length);
  return { length, data, rest };
}

export function packFields(fields: Array<{ tag: number; value: string }>): string {
  return fields.map((f) => `${f.tag}=${f.value}`).join("\x1e");
}

export function unpackFields(packed: string): Array<{ tag: number; value: string }> {
  if (!packed) return [];
  return packed.split("\x1e").map((part) => {
    const eqIdx = part.indexOf("=");
    return { tag: parseInt(part.slice(0, eqIdx), 10), value: part.slice(eqIdx + 1) };
  });
}

export function cobs(data: number[]): number[] {
  const output: number[] = [0];
  let codeIdx = 0;
  let code = 1;
  for (const byte of data) {
    if (byte === 0) {
      output[codeIdx] = code;
      codeIdx = output.length;
      output.push(0);
      code = 1;
    } else {
      output.push(byte);
      code++;
      if (code === 0xff) {
        output[codeIdx] = code;
        codeIdx = output.length;
        output.push(0);
        code = 1;
      }
    }
  }
  output[codeIdx] = code;
  return output;
}

export function uncobs(encoded: number[]): number[] {
  const output: number[] = [];
  let i = 0;
  while (i < encoded.length) {
    const code = encoded[i];
    if (code === 0) break;
    for (let j = 1; j < code && (i + j) < encoded.length; j++) {
      output.push(encoded[i + j]);
    }
    i += code;
    if (code < 0xff && i < encoded.length) {
      output.push(0);
    }
  }
  if (output.length > 0 && output[output.length - 1] === 0) output.pop();
  return output;
}
