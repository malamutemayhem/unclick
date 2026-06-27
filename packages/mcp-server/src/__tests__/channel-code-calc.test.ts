import { describe, it, expect } from "vitest";
import {
  codingGain, complexity, latency, flexibility,
  chCost, softDecode, forDeepSpace, decoder,
  bestUse, channelCodes,
} from "../channel-code-calc.js";

describe("codingGain", () => {
  it("ldpc highest coding gain", () => {
    expect(codingGain("ldpc_sparse_parity")).toBeGreaterThan(codingGain("reed_solomon_block"));
  });
});

describe("complexity", () => {
  it("turbo highest complexity", () => {
    expect(complexity("turbo_parallel_concat")).toBeGreaterThan(complexity("convolutional_viterbi"));
  });
});

describe("latency", () => {
  it("convolutional lowest latency", () => {
    expect(latency("convolutional_viterbi")).toBeGreaterThan(latency("turbo_parallel_concat"));
  });
});

describe("flexibility", () => {
  it("polar most flexible", () => {
    expect(flexibility("polar_successive_cancel")).toBeGreaterThan(flexibility("reed_solomon_block"));
  });
});

describe("chCost", () => {
  it("turbo most expensive", () => {
    expect(chCost("turbo_parallel_concat")).toBeGreaterThan(chCost("convolutional_viterbi"));
  });
});

describe("softDecode", () => {
  it("ldpc supports soft decode", () => {
    expect(softDecode("ldpc_sparse_parity")).toBe(true);
  });
  it("reed solomon no soft decode", () => {
    expect(softDecode("reed_solomon_block")).toBe(false);
  });
});

describe("forDeepSpace", () => {
  it("convolutional for deep space", () => {
    expect(forDeepSpace("convolutional_viterbi")).toBe(true);
  });
  it("ldpc not for deep space", () => {
    expect(forDeepSpace("ldpc_sparse_parity")).toBe(false);
  });
});

describe("decoder", () => {
  it("reed solomon uses berlekamp massey algebraic", () => {
    expect(decoder("reed_solomon_block")).toBe("berlekamp_massey_algebraic");
  });
});

describe("bestUse", () => {
  it("ldpc best for 5g data channel", () => {
    expect(bestUse("ldpc_sparse_parity")).toBe("5g_nr_data_channel_throughput");
  });
});

describe("channelCodes", () => {
  it("returns 5 types", () => {
    expect(channelCodes()).toHaveLength(5);
  });
});
