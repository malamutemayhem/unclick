import { describe, it, expect } from "vitest";
import {
  cureSpeed, clarity, viscosity, scratchResist,
  resinCost, selfDoming, flexWhenCured, cureMethod,
  bestProject, uvResins,
} from "../uv-resin-calc.js";

describe("cureSpeed", () => {
  it("thin flow coating fastest cure", () => {
    expect(cureSpeed("thin_flow_coating")).toBeGreaterThan(cureSpeed("thick_dome_build"));
  });
});

describe("clarity", () => {
  it("thin flow coating best clarity", () => {
    expect(clarity("thin_flow_coating")).toBeGreaterThan(clarity("color_tinted_premix"));
  });
});

describe("viscosity", () => {
  it("thick dome build highest viscosity", () => {
    expect(viscosity("thick_dome_build")).toBeGreaterThan(viscosity("thin_flow_coating"));
  });
});

describe("scratchResist", () => {
  it("hard scratch resist best scratch resistance", () => {
    expect(scratchResist("hard_scratch_resist")).toBeGreaterThan(scratchResist("flexible_bend_soft"));
  });
});

describe("resinCost", () => {
  it("hard scratch resist more expensive than thin flow", () => {
    expect(resinCost("hard_scratch_resist")).toBeGreaterThan(resinCost("thin_flow_coating"));
  });
});

describe("selfDoming", () => {
  it("thick dome build is self doming", () => {
    expect(selfDoming("thick_dome_build")).toBe(true);
  });
  it("thin flow coating is not self doming", () => {
    expect(selfDoming("thin_flow_coating")).toBe(false);
  });
});

describe("flexWhenCured", () => {
  it("flexible bend soft flexes when cured", () => {
    expect(flexWhenCured("flexible_bend_soft")).toBe(true);
  });
  it("hard scratch resist does not flex", () => {
    expect(flexWhenCured("hard_scratch_resist")).toBe(false);
  });
});

describe("cureMethod", () => {
  it("hard scratch resist uses uv led high power", () => {
    expect(cureMethod("hard_scratch_resist")).toBe("uv_led_high_power");
  });
});

describe("bestProject", () => {
  it("thick dome build best for cabochon dome ring", () => {
    expect(bestProject("thick_dome_build")).toBe("cabochon_dome_ring");
  });
});

describe("uvResins", () => {
  it("returns 5 types", () => {
    expect(uvResins()).toHaveLength(5);
  });
});
