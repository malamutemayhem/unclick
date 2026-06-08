export class CaesarCipher {
  static encrypt(plaintext: string, shift: number): string {
    const s = ((shift % 26) + 26) % 26;
    let result = "";
    for (const ch of plaintext) {
      if (/[a-zA-Z]/.test(ch)) {
        const base = ch === ch.toUpperCase() ? 65 : 97;
        result += String.fromCharCode(((ch.charCodeAt(0) - base + s) % 26) + base);
      } else {
        result += ch;
      }
    }
    return result;
  }

  static decrypt(ciphertext: string, shift: number): string {
    return this.encrypt(ciphertext, -shift);
  }

  static rot13(text: string): string {
    return this.encrypt(text, 13);
  }

  static bruteForce(ciphertext: string): string[] {
    const results: string[] = [];
    for (let shift = 0; shift < 26; shift++) {
      results.push(this.decrypt(ciphertext, shift));
    }
    return results;
  }

  static frequencyAnalysis(text: string): { letter: string; frequency: number }[] {
    const clean = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];

    const freq = new Array(26).fill(0);
    for (const ch of clean) freq[ch.charCodeAt(0) - 65]++;

    return freq
      .map((count, i) => ({
        letter: String.fromCharCode(65 + i),
        frequency: count / clean.length,
      }))
      .sort((a, b) => b.frequency - a.frequency);
  }

  static guessShift(ciphertext: string): number {
    const analysis = this.frequencyAnalysis(ciphertext);
    if (analysis.length === 0) return 0;
    const mostCommon = analysis[0].letter.charCodeAt(0) - 65;
    return (mostCommon - 4 + 26) % 26;
  }
}
