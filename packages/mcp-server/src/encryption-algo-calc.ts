export type EncryptionAlgo = "aes_256" | "rsa_2048" | "chacha20" | "blowfish" | "twofish";

export function keyLengthBits(e: EncryptionAlgo): number {
  const m: Record<EncryptionAlgo, number> = {
    aes_256: 256, rsa_2048: 2048, chacha20: 256, blowfish: 448, twofish: 256,
  };
  return m[e];
}

export function speedMbps(e: EncryptionAlgo): number {
  const m: Record<EncryptionAlgo, number> = {
    aes_256: 9, rsa_2048: 1, chacha20: 10, blowfish: 7, twofish: 6,
  };
  return m[e];
}

export function securityStrength(e: EncryptionAlgo): number {
  const m: Record<EncryptionAlgo, number> = {
    aes_256: 10, rsa_2048: 7, chacha20: 9, blowfish: 5, twofish: 8,
  };
  return m[e];
}

export function hardwareAcceleration(e: EncryptionAlgo): number {
  const m: Record<EncryptionAlgo, number> = {
    aes_256: 10, rsa_2048: 3, chacha20: 4, blowfish: 2, twofish: 3,
  };
  return m[e];
}

export function adoptionLevel(e: EncryptionAlgo): number {
  const m: Record<EncryptionAlgo, number> = {
    aes_256: 10, rsa_2048: 8, chacha20: 7, blowfish: 3, twofish: 2,
  };
  return m[e];
}

export function symmetric(e: EncryptionAlgo): boolean {
  const m: Record<EncryptionAlgo, boolean> = {
    aes_256: true, rsa_2048: false, chacha20: true, blowfish: true, twofish: true,
  };
  return m[e];
}

export function quantumResistant(e: EncryptionAlgo): boolean {
  const m: Record<EncryptionAlgo, boolean> = {
    aes_256: true, rsa_2048: false, chacha20: true, blowfish: false, twofish: true,
  };
  return m[e];
}

export function blockSizeBits(e: EncryptionAlgo): string {
  const m: Record<EncryptionAlgo, string> = {
    aes_256: "128", rsa_2048: "variable", chacha20: "stream",
    blowfish: "64", twofish: "128",
  };
  return m[e];
}

export function primaryUseCase(e: EncryptionAlgo): string {
  const m: Record<EncryptionAlgo, string> = {
    aes_256: "disk_encryption", rsa_2048: "key_exchange",
    chacha20: "mobile_tls", blowfish: "legacy_systems",
    twofish: "high_security",
  };
  return m[e];
}

export function encryptionAlgos(): EncryptionAlgo[] {
  return ["aes_256", "rsa_2048", "chacha20", "blowfish", "twofish"];
}
