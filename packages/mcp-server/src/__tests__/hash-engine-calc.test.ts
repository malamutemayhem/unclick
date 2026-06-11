import { describe, it, expect } from "vitest";
import {
  throughput, security, parallelism, area,
  heCost, quantumResist, forBlockchain, structure,
  bestUse, hashEngines,
} from "../hash-engine-calc.js";

describe("throughput", () => {
  it("blake3 tree hash highest throughput", () => {
    expect(throughput("blake3_tree_hash")).toBeGreaterThan(throughput("sha3_keccak_sponge"));
  });
});

describe("security", () => {
  it("sha3 keccak sponge most secure", () => {
    expect(security("sha3_keccak_sponge")).toBeGreaterThan(security("md5_legacy_compat"));
  });
});

describe("parallelism", () => {
  it("blake3 tree hash most parallelizable", () => {
    expect(parallelism("blake3_tree_hash")).toBeGreaterThan(parallelism("sha2_256_pipeline"));
  });
});

describe("area", () => {
  it("md5 legacy compat smallest area", () => {
    expect(area("md5_legacy_compat")).toBeGreaterThan(area("sha3_keccak_sponge"));
  });
});

describe("heCost", () => {
  it("blake3 tree hash more expensive than md5", () => {
    expect(heCost("blake3_tree_hash")).toBeGreaterThan(heCost("md5_legacy_compat"));
  });
});

describe("quantumResist", () => {
  it("sha3 keccak sponge is quantum resistant", () => {
    expect(quantumResist("sha3_keccak_sponge")).toBe(true);
  });
  it("sha2 256 pipeline not quantum resistant", () => {
    expect(quantumResist("sha2_256_pipeline")).toBe(false);
  });
});

describe("forBlockchain", () => {
  it("sha2 256 pipeline for blockchain", () => {
    expect(forBlockchain("sha2_256_pipeline")).toBe(true);
  });
  it("blake3 tree hash not for blockchain", () => {
    expect(forBlockchain("blake3_tree_hash")).toBe(false);
  });
});

describe("structure", () => {
  it("sha3 keccak sponge uses sponge absorb squeeze", () => {
    expect(structure("sha3_keccak_sponge")).toBe("sponge_absorb_squeeze");
  });
});

describe("bestUse", () => {
  it("poly1305 mac auth best for chacha20 aead tag", () => {
    expect(bestUse("poly1305_mac_auth")).toBe("chacha20_aead_tag");
  });
});

describe("hashEngines", () => {
  it("returns 5 types", () => {
    expect(hashEngines()).toHaveLength(5);
  });
});
