import { describe, it, expect } from "vitest";
import {
  codingGain, complexity, burstCorrect, flexibility,
  ecCost, softDecode, forStorage, structure,
  bestUse, errorCorrectionTypes,
} from "../error-correction-calc.js";

describe("codingGain", () => {
  it("ldpc highest coding gain", () => {
    expect(codingGain("ldpc_sparse_graph")).toBeGreaterThan(codingGain("hamming_sec_ded"));
  });
});

describe("complexity", () => {
  it("ldpc most complex", () => {
    expect(complexity("ldpc_sparse_graph")).toBeGreaterThan(complexity("hamming_sec_ded"));
  });
});

describe("burstCorrect", () => {
  it("reed solomon best burst correction", () => {
    expect(burstCorrect("reed_solomon_symbol")).toBeGreaterThan(burstCorrect("hamming_sec_ded"));
  });
});

describe("flexibility", () => {
  it("polar most flexible", () => {
    expect(flexibility("polar_arikan_successive")).toBeGreaterThan(flexibility("hamming_sec_ded"));
  });
});

describe("ecCost", () => {
  it("ldpc most expensive", () => {
    expect(ecCost("ldpc_sparse_graph")).toBeGreaterThan(ecCost("hamming_sec_ded"));
  });
});

describe("softDecode", () => {
  it("ldpc uses soft decode", () => {
    expect(softDecode("ldpc_sparse_graph")).toBe(true);
  });
  it("hamming not soft decode", () => {
    expect(softDecode("hamming_sec_ded")).toBe(false);
  });
});

describe("forStorage", () => {
  it("bch for storage", () => {
    expect(forStorage("bch_primitive_cyclic")).toBe(true);
  });
  it("ldpc not for storage", () => {
    expect(forStorage("ldpc_sparse_graph")).toBe(false);
  });
});

describe("structure", () => {
  it("polar uses channel polarize frozen bits", () => {
    expect(structure("polar_arikan_successive")).toBe("channel_polarize_frozen_bits");
  });
});

describe("bestUse", () => {
  it("hamming best for ecc memory dimm", () => {
    expect(bestUse("hamming_sec_ded")).toBe("ecc_memory_dimm_single_bit_fix");
  });
});

describe("errorCorrectionTypes", () => {
  it("returns 5 types", () => {
    expect(errorCorrectionTypes()).toHaveLength(5);
  });
});
