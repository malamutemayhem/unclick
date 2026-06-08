export function encode(input: string): string {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    result += input.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return result;
}

export function decode(hex: string): string {
  const clean = hex.replace(/\s+/g, "");
  let result = "";
  for (let i = 0; i < clean.length; i += 2) {
    result += String.fromCharCode(parseInt(clean.slice(i, i + 2), 16));
  }
  return result;
}

export function encodeBytes(bytes: Uint8Array): string {
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += bytes[i].toString(16).padStart(2, "0");
  }
  return result;
}

export function decodeToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/\s+/g, "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16);
  }
  return bytes;
}

export function isValid(hex: string): boolean {
  const clean = hex.replace(/\s+/g, "");
  return /^[0-9a-fA-F]*$/.test(clean) && clean.length % 2 === 0;
}

export function dump(input: string, bytesPerLine: number = 16): string {
  const lines: string[] = [];
  for (let i = 0; i < input.length; i += bytesPerLine) {
    const chunk = input.slice(i, i + bytesPerLine);
    const offset = i.toString(16).padStart(8, "0");
    const hexParts: string[] = [];
    const asciiParts: string[] = [];
    for (let j = 0; j < bytesPerLine; j++) {
      if (j < chunk.length) {
        const code = chunk.charCodeAt(j);
        hexParts.push(code.toString(16).padStart(2, "0"));
        asciiParts.push(code >= 32 && code < 127 ? chunk[j] : ".");
      } else {
        hexParts.push("  ");
        asciiParts.push(" ");
      }
    }
    lines.push(`${offset}  ${hexParts.join(" ")}  |${asciiParts.join("")}|`);
  }
  return lines.join("\n");
}
