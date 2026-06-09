import { describe, it, expect } from "vitest";
import { LFSR, OTPCipher, StreamCipherSim } from "../otp-generator.js";

describe("LFSR", () => {
  it("produces bits", () => {
    const lfsr = new LFSR(0xACE1, 16);
    const bit = lfsr.next();
    expect(bit === 0 || bit === 1).toBe(true);
  });

  it("same seed produces same sequence", () => {
    const a = new LFSR(42, 8);
    const b = new LFSR(42, 8);
    for (let i = 0; i < 20; i++) {
      expect(a.next()).toBe(b.next());
    }
  });

  it("nextByte produces byte", () => {
    const lfsr = new LFSR(42, 16);
    const byte = lfsr.nextByte();
    expect(byte).toBeGreaterThanOrEqual(0);
    expect(byte).toBeLessThanOrEqual(255);
  });

  it("generateBytes returns correct length", () => {
    const lfsr = new LFSR(42, 16);
    const bytes = lfsr.generateBytes(10);
    expect(bytes.length).toBe(10);
  });

  it("currentState and registerSize", () => {
    const lfsr = new LFSR(123, 16);
    expect(lfsr.registerSize).toBe(16);
    expect(lfsr.currentState).toBe(123);
  });
});

describe("OTPCipher", () => {
  it("encrypt/decrypt roundtrip", () => {
    const pad = new Uint8Array([10, 20, 30, 40, 50]);
    const cipher = new OTPCipher(pad);
    const plaintext = new Uint8Array([1, 2, 3]);
    const encrypted = cipher.encrypt(plaintext);
    const decrypter = new OTPCipher(pad);
    const decrypted = decrypter.decrypt(encrypted, 0);
    expect(decrypted).toEqual(plaintext);
  });

  it("throws when pad exhausted", () => {
    const pad = new Uint8Array([10, 20]);
    const cipher = new OTPCipher(pad);
    expect(() => cipher.encrypt(new Uint8Array([1, 2, 3]))).toThrow("exhausted");
  });

  it("remaining tracks usage", () => {
    const pad = new Uint8Array(10);
    const cipher = new OTPCipher(pad);
    expect(cipher.remaining).toBe(10);
    cipher.encrypt(new Uint8Array(3));
    expect(cipher.remaining).toBe(7);
    expect(cipher.used).toBe(3);
  });

  it("reset resets position", () => {
    const pad = new Uint8Array(10);
    const cipher = new OTPCipher(pad);
    cipher.encrypt(new Uint8Array(5));
    cipher.reset();
    expect(cipher.remaining).toBe(10);
  });
});

describe("StreamCipherSim", () => {
  it("encrypt produces different output", () => {
    const cipher = new StreamCipherSim(42, 99);
    const data = new Uint8Array([1, 2, 3, 4, 5]);
    const encrypted = cipher.encrypt(data);
    expect(encrypted).not.toEqual(data);
  });

  it("same seeds produce same keystream", () => {
    const a = new StreamCipherSim(42, 99);
    const b = new StreamCipherSim(42, 99);
    const ksA = a.generateKeystream(16);
    const ksB = b.generateKeystream(16);
    expect(ksA).toEqual(ksB);
  });

  it("encrypt then encrypt with same seed decrypts", () => {
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    const enc = new StreamCipherSim(10, 20);
    const encrypted = enc.encrypt(data);
    const dec = new StreamCipherSim(10, 20);
    const decrypted = dec.encrypt(encrypted);
    expect(decrypted).toEqual(data);
  });

  it("generateKeystream returns correct length", () => {
    const cipher = new StreamCipherSim(1, 2);
    expect(cipher.generateKeystream(32).length).toBe(32);
  });
});
