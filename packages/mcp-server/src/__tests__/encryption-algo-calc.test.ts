import { describe, it, expect } from "vitest";
import {
  keyLengthBits, speedMbps, securityStrength,
  hardwareAcceleration, adoptionLevel, symmetric,
  quantumResistant, blockSizeBits, primaryUseCase, encryptionAlgos,
} from "../encryption-algo-calc.js";

describe("keyLengthBits", () => {
  it("rsa 2048 longest key", () => {
    expect(keyLengthBits("rsa_2048")).toBeGreaterThan(
      keyLengthBits("aes_256")
    );
  });
});

describe("speedMbps", () => {
  it("chacha20 fastest", () => {
    expect(speedMbps("chacha20")).toBeGreaterThan(
      speedMbps("rsa_2048")
    );
  });
});

describe("securityStrength", () => {
  it("aes 256 strongest security", () => {
    expect(securityStrength("aes_256")).toBeGreaterThan(
      securityStrength("blowfish")
    );
  });
});

describe("hardwareAcceleration", () => {
  it("aes 256 best hw acceleration", () => {
    expect(hardwareAcceleration("aes_256")).toBeGreaterThan(
      hardwareAcceleration("chacha20")
    );
  });
});

describe("adoptionLevel", () => {
  it("aes 256 most adopted", () => {
    expect(adoptionLevel("aes_256")).toBeGreaterThan(
      adoptionLevel("twofish")
    );
  });
});

describe("symmetric", () => {
  it("aes is symmetric", () => {
    expect(symmetric("aes_256")).toBe(true);
  });
  it("rsa is not", () => {
    expect(symmetric("rsa_2048")).toBe(false);
  });
});

describe("quantumResistant", () => {
  it("aes 256 is quantum resistant", () => {
    expect(quantumResistant("aes_256")).toBe(true);
  });
  it("rsa is not", () => {
    expect(quantumResistant("rsa_2048")).toBe(false);
  });
});

describe("blockSizeBits", () => {
  it("chacha20 is stream cipher", () => {
    expect(blockSizeBits("chacha20")).toBe("stream");
  });
});

describe("primaryUseCase", () => {
  it("rsa used for key exchange", () => {
    expect(primaryUseCase("rsa_2048")).toBe("key_exchange");
  });
});

describe("encryptionAlgos", () => {
  it("returns 5 algos", () => {
    expect(encryptionAlgos()).toHaveLength(5);
  });
});
