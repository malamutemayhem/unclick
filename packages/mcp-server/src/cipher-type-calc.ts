export type CipherType = "caesar" | "vigenere" | "enigma" | "aes" | "rsa";

export function keySpaceSize(cipher: CipherType): number {
  const m: Record<CipherType, number> = {
    caesar: 1, vigenere: 4, enigma: 7, aes: 10, rsa: 10,
  };
  return m[cipher];
}

export function computationalCost(cipher: CipherType): number {
  const m: Record<CipherType, number> = {
    caesar: 1, vigenere: 2, enigma: 5, aes: 7, rsa: 10,
  };
  return m[cipher];
}

export function breakDifficulty(cipher: CipherType): number {
  const m: Record<CipherType, number> = {
    caesar: 1, vigenere: 3, enigma: 6, aes: 10, rsa: 10,
  };
  return m[cipher];
}

export function throughputRating(cipher: CipherType): number {
  const m: Record<CipherType, number> = {
    caesar: 10, vigenere: 9, enigma: 4, aes: 9, rsa: 2,
  };
  return m[cipher];
}

export function inventionYear(cipher: CipherType): number {
  const m: Record<CipherType, number> = {
    caesar: -50, vigenere: 1553, enigma: 1918, aes: 2001, rsa: 1977,
  };
  return m[cipher];
}

export function symmetric(cipher: CipherType): boolean {
  const m: Record<CipherType, boolean> = {
    caesar: true, vigenere: true, enigma: true, aes: true, rsa: false,
  };
  return m[cipher];
}

export function digital(cipher: CipherType): boolean {
  const m: Record<CipherType, boolean> = {
    caesar: false, vigenere: false, enigma: false, aes: true, rsa: true,
  };
  return m[cipher];
}

export function bestApplication(cipher: CipherType): string {
  const m: Record<CipherType, string> = {
    caesar: "educational", vigenere: "historical", enigma: "military_historical",
    aes: "data_encryption", rsa: "key_exchange",
  };
  return m[cipher];
}

export function securityLevel(cipher: CipherType): string {
  const m: Record<CipherType, string> = {
    caesar: "trivial", vigenere: "weak", enigma: "historical",
    aes: "military_grade", rsa: "military_grade",
  };
  return m[cipher];
}

export function cipherTypes(): CipherType[] {
  return ["caesar", "vigenere", "enigma", "aes", "rsa"];
}
