const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function base64Encode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let result = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    const triplet = (b0 << 16) | (b1 << 8) | b2;

    result += BASE64_CHARS[(triplet >> 18) & 0x3f];
    result += BASE64_CHARS[(triplet >> 12) & 0x3f];
    result += i + 1 < bytes.length ? BASE64_CHARS[(triplet >> 6) & 0x3f] : "=";
    result += i + 2 < bytes.length ? BASE64_CHARS[triplet & 0x3f] : "=";
  }
  return result;
}

export function base64Decode(input: string): string {
  const clean = input.replace(/=+$/, "");
  const bytes: number[] = [];

  for (let i = 0; i < clean.length; i += 4) {
    const b0 = BASE64_CHARS.indexOf(clean[i]);
    const b1 = BASE64_CHARS.indexOf(clean[i + 1]);
    const b2 = i + 2 < clean.length ? BASE64_CHARS.indexOf(clean[i + 2]) : 0;
    const b3 = i + 3 < clean.length ? BASE64_CHARS.indexOf(clean[i + 3]) : 0;

    const triplet = (b0 << 18) | (b1 << 12) | (b2 << 6) | b3;
    bytes.push((triplet >> 16) & 0xff);
    if (i + 2 < clean.length) bytes.push((triplet >> 8) & 0xff);
    if (i + 3 < clean.length) bytes.push(triplet & 0xff);
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}

export function hexEncode(input: string): string {
  return [...new TextEncoder().encode(input)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function hexDecode(hex: string): string {
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export function rot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function caesarCipher(input: string, shift: number): string {
  const s = ((shift % 26) + 26) % 26;
  return input.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26) + base);
  });
}

export function runLengthEncode(input: string): string {
  if (!input) return "";
  let result = "";
  let count = 1;
  for (let i = 1; i <= input.length; i++) {
    if (i < input.length && input[i] === input[i - 1]) {
      count++;
    } else {
      result += count > 1 ? `${count}${input[i - 1]}` : input[i - 1];
      count = 1;
    }
  }
  return result;
}

export function runLengthDecode(input: string): string {
  let result = "";
  let i = 0;
  while (i < input.length) {
    let num = "";
    while (i < input.length && /[0-9]/.test(input[i])) num += input[i++];
    const count = num ? parseInt(num, 10) : 1;
    if (i < input.length) {
      result += input[i].repeat(count);
      i++;
    }
  }
  return result;
}
