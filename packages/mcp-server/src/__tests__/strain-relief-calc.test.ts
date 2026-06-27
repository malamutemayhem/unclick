import { describe, it, expect } from "vitest";
import {
  pullResist, flexProtect, installEase, cableRange,
  reliefCost, reusable, forFlex, mountMethod,
  bestUse, strainReliefs,
} from "../strain-relief-calc.js";

describe("pullResist", () => {
  it("cord grip highest pull resistance", () => {
    expect(pullResist("cord_grip_threaded")).toBeGreaterThan(pullResist("spiral_wrap_sleeve"));
  });
});

describe("flexProtect", () => {
  it("boot molded best flex protection", () => {
    expect(flexProtect("boot_molded_flex")).toBeGreaterThan(flexProtect("cable_clamp_saddle"));
  });
});

describe("installEase", () => {
  it("bushing snap grommet easiest install", () => {
    expect(installEase("bushing_snap_grommet")).toBeGreaterThan(installEase("cord_grip_threaded"));
  });
});

describe("cableRange", () => {
  it("spiral wrap sleeve widest cable range", () => {
    expect(cableRange("spiral_wrap_sleeve")).toBeGreaterThan(cableRange("boot_molded_flex"));
  });
});

describe("reliefCost", () => {
  it("boot molded flex most expensive", () => {
    expect(reliefCost("boot_molded_flex")).toBeGreaterThan(reliefCost("bushing_snap_grommet"));
  });
});

describe("reusable", () => {
  it("cable clamp saddle is reusable", () => {
    expect(reusable("cable_clamp_saddle")).toBe(true);
  });
  it("cord grip threaded not reusable", () => {
    expect(reusable("cord_grip_threaded")).toBe(false);
  });
});

describe("forFlex", () => {
  it("boot molded flex is for flex", () => {
    expect(forFlex("boot_molded_flex")).toBe(true);
  });
  it("cord grip threaded not for flex", () => {
    expect(forFlex("cord_grip_threaded")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("bushing snap grommet uses snap fit panel hole", () => {
    expect(mountMethod("bushing_snap_grommet")).toBe("snap_fit_panel_hole");
  });
});

describe("bestUse", () => {
  it("spiral wrap sleeve best for wire harness protect", () => {
    expect(bestUse("spiral_wrap_sleeve")).toBe("wire_harness_protect");
  });
});

describe("strainReliefs", () => {
  it("returns 5 types", () => {
    expect(strainReliefs()).toHaveLength(5);
  });
});
