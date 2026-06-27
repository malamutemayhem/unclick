import { describe, it, expect } from "vitest";
import {
  edgeSharp, controlFine, leatherPare, easeOfUse,
  knifeCost, replaceBlade, beveled, bladeMaterial,
  bestUse, paringKnives,
} from "../paring-knife-calc.js";

describe("edgeSharp", () => {
  it("japanese skive thin sharpest edge", () => {
    expect(edgeSharp("japanese_skive_thin")).toBeGreaterThan(edgeSharp("utility_snap_blade"));
  });
});

describe("controlFine", () => {
  it("japanese skive thin finest control", () => {
    expect(controlFine("japanese_skive_thin")).toBeGreaterThan(controlFine("utility_snap_blade"));
  });
});

describe("leatherPare", () => {
  it("japanese skive thin best leather pare", () => {
    expect(leatherPare("japanese_skive_thin")).toBeGreaterThan(leatherPare("utility_snap_blade"));
  });
});

describe("easeOfUse", () => {
  it("utility snap blade easiest to use", () => {
    expect(easeOfUse("utility_snap_blade")).toBeGreaterThan(easeOfUse("japanese_skive_thin"));
  });
});

describe("knifeCost", () => {
  it("japanese skive thin most expensive", () => {
    expect(knifeCost("japanese_skive_thin")).toBeGreaterThan(knifeCost("utility_snap_blade"));
  });
});

describe("replaceBlade", () => {
  it("utility snap blade has replaceable blade", () => {
    expect(replaceBlade("utility_snap_blade")).toBe(true);
  });
  it("english bevel wide no replaceable blade", () => {
    expect(replaceBlade("english_bevel_wide")).toBe(false);
  });
});

describe("beveled", () => {
  it("english bevel wide is beveled", () => {
    expect(beveled("english_bevel_wide")).toBe(true);
  });
  it("utility snap blade not beveled", () => {
    expect(beveled("utility_snap_blade")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("english bevel wide uses carbon steel forged", () => {
    expect(bladeMaterial("english_bevel_wide")).toBe("carbon_steel_forged");
  });
});

describe("bestUse", () => {
  it("japanese skive thin best for thin leather skive", () => {
    expect(bestUse("japanese_skive_thin")).toBe("thin_leather_skive");
  });
});

describe("paringKnives", () => {
  it("returns 5 types", () => {
    expect(paringKnives()).toHaveLength(5);
  });
});
