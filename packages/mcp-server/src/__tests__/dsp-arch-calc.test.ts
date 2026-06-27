import { describe, it, expect } from "vitest";
import {
  throughput, precision, powerEff, codeSize,
  dspCost, fpu, forAudio, pipeline,
  bestUse, dspArchs,
} from "../dsp-arch-calc.js";

describe("throughput", () => {
  it("vliw multi issue highest throughput", () => {
    expect(throughput("vliw_multi_issue")).toBeGreaterThan(throughput("fixed_point_16bit"));
  });
});

describe("precision", () => {
  it("floating point 32 highest precision", () => {
    expect(precision("floating_point_32")).toBeGreaterThan(precision("fixed_point_16bit"));
  });
});

describe("powerEff", () => {
  it("fixed point 16bit most power efficient", () => {
    expect(powerEff("fixed_point_16bit")).toBeGreaterThan(powerEff("vliw_multi_issue"));
  });
});

describe("codeSize", () => {
  it("fixed point 16bit smallest code size", () => {
    expect(codeSize("fixed_point_16bit")).toBeGreaterThan(codeSize("vliw_multi_issue"));
  });
});

describe("dspCost", () => {
  it("vliw multi issue most expensive", () => {
    expect(dspCost("vliw_multi_issue")).toBeGreaterThan(dspCost("fixed_point_16bit"));
  });
});

describe("fpu", () => {
  it("floating point 32 has fpu", () => {
    expect(fpu("floating_point_32")).toBe(true);
  });
  it("fixed point 16bit no fpu", () => {
    expect(fpu("fixed_point_16bit")).toBe(false);
  });
});

describe("forAudio", () => {
  it("floating point 32 for audio", () => {
    expect(forAudio("floating_point_32")).toBe(true);
  });
  it("vliw multi issue not for audio", () => {
    expect(forAudio("vliw_multi_issue")).toBe(false);
  });
});

describe("pipeline", () => {
  it("vliw multi issue uses 8 way parallel dispatch", () => {
    expect(pipeline("vliw_multi_issue")).toBe("8_way_parallel_dispatch");
  });
});

describe("bestUse", () => {
  it("fixed point 16bit best for hearing aid codec", () => {
    expect(bestUse("fixed_point_16bit")).toBe("hearing_aid_codec");
  });
});

describe("dspArchs", () => {
  it("returns 5 types", () => {
    expect(dspArchs()).toHaveLength(5);
  });
});
