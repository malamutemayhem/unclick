import { describe, it, expect } from "vitest";
import {
  pressureRating, installSpeed, reliability, disassembly,
  pcCost, mechanical, forFieldJoint, joint,
  bestUse, pipeCouplingTypes,
} from "../pipe-coupling-calc.js";

describe("pressureRating", () => {
  it("welded butt joint highest pressure", () => {
    expect(pressureRating("welded_butt_joint")).toBeGreaterThan(pressureRating("push_fit_quick"));
  });
});

describe("installSpeed", () => {
  it("grooved fastest install", () => {
    expect(installSpeed("grooved_victaulic")).toBeGreaterThan(installSpeed("welded_butt_joint"));
  });
});

describe("reliability", () => {
  it("welded butt joint most reliable", () => {
    expect(reliability("welded_butt_joint")).toBeGreaterThan(reliability("push_fit_quick"));
  });
});

describe("disassembly", () => {
  it("grooved easiest disassembly", () => {
    expect(disassembly("grooved_victaulic")).toBeGreaterThan(disassembly("welded_butt_joint"));
  });
});

describe("pcCost", () => {
  it("welded butt joint most expensive", () => {
    expect(pcCost("welded_butt_joint")).toBeGreaterThan(pcCost("threaded_npt_standard"));
  });
});

describe("mechanical", () => {
  it("threaded is mechanical", () => {
    expect(mechanical("threaded_npt_standard")).toBe(true);
  });
  it("welded butt joint not mechanical", () => {
    expect(mechanical("welded_butt_joint")).toBe(false);
  });
});

describe("forFieldJoint", () => {
  it("grooved for field joint", () => {
    expect(forFieldJoint("grooved_victaulic")).toBe(true);
  });
  it("welded butt joint not for field joint", () => {
    expect(forFieldJoint("welded_butt_joint")).toBe(false);
  });
});

describe("joint", () => {
  it("compression tube uses ferrule nut", () => {
    expect(joint("compression_tube")).toBe("ferrule_nut_compression_metal_to_metal_seal");
  });
});

describe("bestUse", () => {
  it("grooved for fire protection", () => {
    expect(bestUse("grooved_victaulic")).toBe("fire_protection_hvac_quick_install_modular");
  });
});

describe("pipeCouplingTypes", () => {
  it("returns 5 types", () => {
    expect(pipeCouplingTypes()).toHaveLength(5);
  });
});
