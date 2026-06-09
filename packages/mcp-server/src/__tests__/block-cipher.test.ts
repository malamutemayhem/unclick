import { describe, it, expect } from "vitest";
import { BlockCipher } from "../block-cipher.js";

describe("BlockCipher", () => {
  const key = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
  const plaintext = new Uint8Array([72, 101, 108, 108, 111, 33, 33, 33]);

  it("ECB encrypt/decrypt roundtrip", () => {
    const cipher = new BlockCipher(key, 8, "ecb");
    const encrypted = cipher.encrypt(plaintext);
    const decrypted = cipher.decrypt(encrypted);
    expect(decrypted).toEqual(plaintext);
  });

  it("CBC encrypt/decrypt roundtrip", () => {
    const iv = new Uint8Array([10, 20, 30, 40, 50, 60, 70, 80]);
    const cipher = new BlockCipher(key, 8, "cbc");
    const encrypted = cipher.encrypt(plaintext, iv);
    const decrypted = cipher.decrypt(encrypted, iv);
    expect(decrypted).toEqual(plaintext);
  });

  it("CTR encrypt/decrypt roundtrip", () => {
    const nonce = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
    const cipher = new BlockCipher(key, 8, "ctr");
    const encrypted = cipher.encrypt(plaintext, nonce);
    const decrypted = cipher.decrypt(encrypted, nonce);
    expect(decrypted).toEqual(plaintext);
  });

  it("ECB same plaintext produces same ciphertext", () => {
    const cipher = new BlockCipher(key, 8, "ecb");
    const e1 = cipher.encrypt(plaintext);
    const e2 = cipher.encrypt(plaintext);
    expect(e1).toEqual(e2);
  });

  it("CBC different IV produces different ciphertext", () => {
    const cipher = new BlockCipher(key, 8, "cbc");
    const e1 = cipher.encrypt(plaintext, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0]));
    const e2 = cipher.encrypt(plaintext, new Uint8Array([2, 0, 0, 0, 0, 0, 0, 0]));
    expect(e1).not.toEqual(e2);
  });

  it("encrypted data differs from plaintext", () => {
    const cipher = new BlockCipher(key, 8, "cbc");
    const encrypted = cipher.encrypt(plaintext);
    expect(encrypted).not.toEqual(plaintext);
  });

  it("handles multi-block data", () => {
    const longData = new Uint8Array(24);
    for (let i = 0; i < 24; i++) longData[i] = i;
    const cipher = new BlockCipher(key, 8, "cbc");
    const encrypted = cipher.encrypt(longData);
    const decrypted = cipher.decrypt(encrypted);
    expect(decrypted).toEqual(longData);
  });

  it("cipherBlockSize and cipherMode", () => {
    const cipher = new BlockCipher(key, 8, "ctr");
    expect(cipher.cipherBlockSize).toBe(8);
    expect(cipher.cipherMode).toBe("ctr");
  });
});
