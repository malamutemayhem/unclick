import { describe, it, expect } from "vitest";
import {
  snapStrength, easeOfUse, portability, snapVariety,
  pressCost, noSewing, interchangeableDies, snapMaterial,
  bestFabric, snapPresses,
} from "../snap-press-calc.js";

describe("snapStrength", () => {
  it("table press heavy most snap strength", () => {
    expect(snapStrength("table_press_heavy")).toBeGreaterThan(snapStrength("kam_snap_plastic"));
  });
});

describe("easeOfUse", () => {
  it("hand plier squeeze easiest to use", () => {
    expect(easeOfUse("hand_plier_squeeze")).toBeGreaterThan(easeOfUse("metal_rivet_setter"));
  });
});

describe("portability", () => {
  it("hand plier squeeze most portable", () => {
    expect(portability("hand_plier_squeeze")).toBeGreaterThan(portability("table_press_heavy"));
  });
});

describe("snapVariety", () => {
  it("table press heavy most snap variety", () => {
    expect(snapVariety("table_press_heavy")).toBeGreaterThan(snapVariety("sew_on_snap_ring"));
  });
});

describe("pressCost", () => {
  it("table press heavy most expensive", () => {
    expect(pressCost("table_press_heavy")).toBeGreaterThan(pressCost("hand_plier_squeeze"));
  });
});

describe("noSewing", () => {
  it("hand plier squeeze needs no sewing", () => {
    expect(noSewing("hand_plier_squeeze")).toBe(true);
  });
  it("sew on snap ring needs sewing", () => {
    expect(noSewing("sew_on_snap_ring")).toBe(false);
  });
});

describe("interchangeableDies", () => {
  it("table press heavy has interchangeable dies", () => {
    expect(interchangeableDies("table_press_heavy")).toBe(true);
  });
  it("hand plier squeeze has no interchangeable dies", () => {
    expect(interchangeableDies("hand_plier_squeeze")).toBe(false);
  });
});

describe("snapMaterial", () => {
  it("kam snap plastic uses resin plastic color", () => {
    expect(snapMaterial("kam_snap_plastic")).toBe("resin_plastic_color");
  });
});

describe("bestFabric", () => {
  it("kam snap plastic best for baby clothes diaper", () => {
    expect(bestFabric("kam_snap_plastic")).toBe("baby_clothes_diaper");
  });
});

describe("snapPresses", () => {
  it("returns 5 types", () => {
    expect(snapPresses()).toHaveLength(5);
  });
});
