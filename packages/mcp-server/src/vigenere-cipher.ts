export class VigenereCipher {
  static encrypt(plaintext: string, key: string): string {
    const k = key.toUpperCase();
    let result = "";
    let ki = 0;

    for (const ch of plaintext) {
      if (/[a-zA-Z]/.test(ch)) {
        const base = ch === ch.toUpperCase() ? 65 : 97;
        const shift = k.charCodeAt(ki % k.length) - 65;
        result += String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
        ki++;
      } else {
        result += ch;
      }
    }

    return result;
  }

  static decrypt(ciphertext: string, key: string): string {
    const k = key.toUpperCase();
    let result = "";
    let ki = 0;

    for (const ch of ciphertext) {
      if (/[a-zA-Z]/.test(ch)) {
        const base = ch === ch.toUpperCase() ? 65 : 97;
        const shift = k.charCodeAt(ki % k.length) - 65;
        result += String.fromCharCode(((ch.charCodeAt(0) - base - shift + 26) % 26) + base);
        ki++;
      } else {
        result += ch;
      }
    }

    return result;
  }

  static kasiskiExamination(ciphertext: string, minLen: number = 3): Map<number, number> {
    const clean = ciphertext.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const distances: number[] = [];

    for (let len = minLen; len <= 5; len++) {
      for (let i = 0; i <= clean.length - len; i++) {
        const substr = clean.substring(i, i + len);
        const next = clean.indexOf(substr, i + 1);
        if (next !== -1) distances.push(next - i);
      }
    }

    const factors = new Map<number, number>();
    for (const d of distances) {
      for (let f = 2; f <= d; f++) {
        if (d % f === 0) factors.set(f, (factors.get(f) || 0) + 1);
      }
    }

    return factors;
  }

  static indexOfCoincidence(text: string): number {
    const clean = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const n = clean.length;
    if (n <= 1) return 0;

    const freq = new Array(26).fill(0);
    for (const ch of clean) freq[ch.charCodeAt(0) - 65]++;

    let sum = 0;
    for (const f of freq) sum += f * (f - 1);
    return sum / (n * (n - 1));
  }
}
