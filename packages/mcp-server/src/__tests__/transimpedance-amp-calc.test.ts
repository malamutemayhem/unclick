import { describe, it, expect } from "vitest";
import {
  bandwidth, transimpedance, noise, dynamicRange,
  tiaCost, differential, forFiber, feedback,
  bestUse, transimpedanceAmps,
} from "../transimpedance-amp-calc.js";

describe("bandwidth", () => {
  it("cherry hooper highest bandwidth", () => {
    expect(bandwidth("cherry_hooper")).toBeGreaterThan(bandwidth("resistive_shunt"));
  });
});

describe("transimpedance", () => {
  it("capacitive reset highest transimpedance", () => {
    expect(transimpedance("capacitive_reset")).toBeGreaterThan(transimpedance("resistive_shunt"));
  });
});

describe("noise", () => {
  it("differential tia lowest noise", () => {
    expect(noise("differential_tia")).toBeGreaterThan(noise("resistive_shunt"));
  });
});

describe("dynamicRange", () => {
  it("capacitive reset best dynamic range", () => {
    expect(dynamicRange("capacitive_reset")).toBeGreaterThan(dynamicRange("resistive_shunt"));
  });
});

describe("tiaCost", () => {
  it("differential tia most expensive", () => {
    expect(tiaCost("differential_tia")).toBeGreaterThan(tiaCost("resistive_shunt"));
  });
});

describe("differential", () => {
  it("cherry hooper is differential", () => {
    expect(differential("cherry_hooper")).toBe(true);
  });
  it("resistive shunt not differential", () => {
    expect(differential("resistive_shunt")).toBe(false);
  });
});

describe("forFiber", () => {
  it("regulated cascode tia is for fiber", () => {
    expect(forFiber("regulated_cascode_tia")).toBe(true);
  });
  it("resistive shunt not for fiber", () => {
    expect(forFiber("resistive_shunt")).toBe(false);
  });
});

describe("feedback", () => {
  it("cherry hooper uses shunt series cascade", () => {
    expect(feedback("cherry_hooper")).toBe("shunt_series_cascade");
  });
});

describe("bestUse", () => {
  it("capacitive reset best for ct scanner pixel", () => {
    expect(bestUse("capacitive_reset")).toBe("ct_scanner_pixel");
  });
});

describe("transimpedanceAmps", () => {
  it("returns 5 types", () => {
    expect(transimpedanceAmps()).toHaveLength(5);
  });
});
