import { describe, it, expect } from "vitest";
import {
  entropy, throughput, determinism, testability,
  rngCost, nistCertified, forCrypto, mechanism,
  bestUse, rngSources,
} from "../rng-source-calc.js";

describe("entropy", () => {
  it("trng thermal noise highest entropy", () => {
    expect(entropy("trng_thermal_noise")).toBeGreaterThan(entropy("drbg_ctr_aes"));
  });
});

describe("throughput", () => {
  it("drbg ctr aes highest throughput", () => {
    expect(throughput("drbg_ctr_aes")).toBeGreaterThan(throughput("trng_thermal_noise"));
  });
});

describe("determinism", () => {
  it("drbg ctr aes most deterministic", () => {
    expect(determinism("drbg_ctr_aes")).toBeGreaterThan(determinism("trng_jitter_ring"));
  });
});

describe("testability", () => {
  it("drbg ctr aes most testable", () => {
    expect(testability("drbg_ctr_aes")).toBeGreaterThan(testability("qrng_photon_split"));
  });
});

describe("rngCost", () => {
  it("qrng photon split most expensive", () => {
    expect(rngCost("qrng_photon_split")).toBeGreaterThan(rngCost("drbg_ctr_aes"));
  });
});

describe("nistCertified", () => {
  it("trng thermal noise is nist certified", () => {
    expect(nistCertified("trng_thermal_noise")).toBe(true);
  });
  it("qrng photon split not nist certified", () => {
    expect(nistCertified("qrng_photon_split")).toBe(false);
  });
});

describe("forCrypto", () => {
  it("trng thermal noise for crypto", () => {
    expect(forCrypto("trng_thermal_noise")).toBe(true);
  });
  it("drbg hash sha not for crypto", () => {
    expect(forCrypto("drbg_hash_sha")).toBe(false);
  });
});

describe("mechanism", () => {
  it("drbg ctr aes uses aes 256 counter mode", () => {
    expect(mechanism("drbg_ctr_aes")).toBe("aes_256_counter_mode");
  });
});

describe("bestUse", () => {
  it("qrng photon split best for quantum key distribution", () => {
    expect(bestUse("qrng_photon_split")).toBe("quantum_key_distribution");
  });
});

describe("rngSources", () => {
  it("returns 5 types", () => {
    expect(rngSources()).toHaveLength(5);
  });
});
