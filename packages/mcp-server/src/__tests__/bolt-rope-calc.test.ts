import { describe, it, expect } from "vitest";
import {
  gripHold, stretchLow, durability, sewEase,
  ropeCost, synthetic, wireCore, fiberType,
  bestUse, boltRopes,
} from "../bolt-rope-calc.js";

describe("gripHold", () => {
  it("cotton rope soft best grip hold", () => {
    expect(gripHold("cotton_rope_soft")).toBeGreaterThan(gripHold("wire_rope_luff"));
  });
});

describe("stretchLow", () => {
  it("wire rope luff lowest stretch", () => {
    expect(stretchLow("wire_rope_luff")).toBeGreaterThan(stretchLow("cotton_rope_soft"));
  });
});

describe("durability", () => {
  it("polyester rope modern most durable", () => {
    expect(durability("polyester_rope_modern")).toBeGreaterThan(durability("cotton_rope_soft"));
  });
});

describe("sewEase", () => {
  it("cotton rope soft easiest sew", () => {
    expect(sewEase("cotton_rope_soft")).toBeGreaterThan(sewEase("wire_rope_luff"));
  });
});

describe("ropeCost", () => {
  it("dyneema core light most expensive", () => {
    expect(ropeCost("dyneema_core_light")).toBeGreaterThan(ropeCost("cotton_rope_soft"));
  });
});

describe("synthetic", () => {
  it("polyester rope modern is synthetic", () => {
    expect(synthetic("polyester_rope_modern")).toBe(true);
  });
  it("manila rope standard not synthetic", () => {
    expect(synthetic("manila_rope_standard")).toBe(false);
  });
});

describe("wireCore", () => {
  it("wire rope luff has wire core", () => {
    expect(wireCore("wire_rope_luff")).toBe(true);
  });
  it("manila rope standard no wire core", () => {
    expect(wireCore("manila_rope_standard")).toBe(false);
  });
});

describe("fiberType", () => {
  it("dyneema core light uses hmpe dyneema core", () => {
    expect(fiberType("dyneema_core_light")).toBe("hmpe_dyneema_core");
  });
});

describe("bestUse", () => {
  it("manila rope standard best for traditional luff rope", () => {
    expect(bestUse("manila_rope_standard")).toBe("traditional_luff_rope");
  });
});

describe("boltRopes", () => {
  it("returns 5 types", () => {
    expect(boltRopes()).toHaveLength(5);
  });
});
