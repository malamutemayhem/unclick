export function rot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (ch: string) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function caesar(input: string, shift: number): string {
  const s = ((shift % 26) + 26) % 26;
  return input.replace(/[a-zA-Z]/g, (ch: string) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + s) % 26) + base);
  });
}

export function atbash(input: string): string {
  return input.replace(/[a-zA-Z]/g, (ch: string) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(base + 25 - (ch.charCodeAt(0) - base));
  });
}

export function reverseString(input: string): string {
  return [...input].reverse().join("");
}

export function xorEncode(input: string, key: string): string {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    result += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

export function xorDecode(encoded: string, key: string): string {
  return xorEncode(encoded, key);
}

export function toCharCodes(input: string): number[] {
  const result: number[] = [];
  for (let i = 0; i < input.length; i++) result.push(input.charCodeAt(i));
  return result;
}

export function fromCharCodes(codes: number[]): string {
  return codes.map((c: number) => String.fromCharCode(c)).join("");
}
