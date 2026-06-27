import { describe, it, expect } from "vitest";
import {
  throughput, latency, powerEff, keySize,
  accCost, sideChannelResist, forTls, algorithm,
  bestUse, cryptoAccels,
} from "../crypto-accel-calc.js";

describe("throughput", () => {
  it("aes ni instruction highest throughput", () => {
    expect(throughput("aes_ni_instruction")).toBeGreaterThan(throughput("rsa_modular_exp"));
  });
});

describe("latency", () => {
  it("aes ni instruction lowest latency", () => {
    expect(latency("aes_ni_instruction")).toBeGreaterThan(latency("rsa_modular_exp"));
  });
});

describe("powerEff", () => {
  it("aes ni instruction most power efficient", () => {
    expect(powerEff("aes_ni_instruction")).toBeGreaterThan(powerEff("rsa_modular_exp"));
  });
});

describe("keySize", () => {
  it("post quantum lattice largest key size", () => {
    expect(keySize("post_quantum_lattice")).toBeGreaterThan(keySize("aes_ni_instruction"));
  });
});

describe("accCost", () => {
  it("post quantum lattice most expensive", () => {
    expect(accCost("post_quantum_lattice")).toBeGreaterThan(accCost("aes_ni_instruction"));
  });
});

describe("sideChannelResist", () => {
  it("aes ni instruction is side channel resistant", () => {
    expect(sideChannelResist("aes_ni_instruction")).toBe(true);
  });
  it("ecc point multiply not side channel resistant", () => {
    expect(sideChannelResist("ecc_point_multiply")).toBe(false);
  });
});

describe("forTls", () => {
  it("sha hardware engine for tls", () => {
    expect(forTls("sha_hardware_engine")).toBe(true);
  });
  it("post quantum lattice not for tls", () => {
    expect(forTls("post_quantum_lattice")).toBe(false);
  });
});

describe("algorithm", () => {
  it("post quantum lattice uses kyber dilithium ntt", () => {
    expect(algorithm("post_quantum_lattice")).toBe("kyber_dilithium_ntt");
  });
});

describe("bestUse", () => {
  it("ecc point multiply best for ecdsa key exchange", () => {
    expect(bestUse("ecc_point_multiply")).toBe("ecdsa_key_exchange");
  });
});

describe("cryptoAccels", () => {
  it("returns 5 types", () => {
    expect(cryptoAccels()).toHaveLength(5);
  });
});
