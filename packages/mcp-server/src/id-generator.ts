const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const HEX = "0123456789abcdef";

let counter = 0;

export function shortId(length = 12): string {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return id;
}

export function prefixedId(prefix: string, length = 12): string {
  return `${prefix}_${shortId(length)}`;
}

export function timestampId(): string {
  const ts = Date.now().toString(36);
  const rand = shortId(6);
  return `${ts}-${rand}`;
}

export function sequentialId(prefix = ""): string {
  counter++;
  const seq = counter.toString().padStart(6, "0");
  return prefix ? `${prefix}-${seq}` : seq;
}

export function hexId(length = 16): string {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += HEX[Math.floor(Math.random() * 16)];
  }
  return id;
}

export function resetSequence(): void {
  counter = 0;
}
