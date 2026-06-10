import { describe, it, expect } from "vitest";
import {
  drySpeed, colorVibrancy, blendAbility, archivalSafe,
  padCost, waterproof, forEmbossing, inkBase,
  bestProject, inkPads,
} from "../ink-pad-calc.js";

describe("drySpeed", () => {
  it("dye ink quick fastest drying", () => {
    expect(drySpeed("dye_ink_quick")).toBeGreaterThan(drySpeed("emboss_ink_clear"));
  });
});

describe("colorVibrancy", () => {
  it("pigment ink opaque most vibrant", () => {
    expect(colorVibrancy("pigment_ink_opaque")).toBeGreaterThan(colorVibrancy("emboss_ink_clear"));
  });
});

describe("blendAbility", () => {
  it("distress ink blend best blending", () => {
    expect(blendAbility("distress_ink_blend")).toBeGreaterThan(blendAbility("pigment_ink_opaque"));
  });
});

describe("archivalSafe", () => {
  it("pigment ink opaque most archival safe", () => {
    expect(archivalSafe("pigment_ink_opaque")).toBeGreaterThan(archivalSafe("dye_ink_quick"));
  });
});

describe("padCost", () => {
  it("distress ink blend most expensive", () => {
    expect(padCost("distress_ink_blend")).toBeGreaterThan(padCost("dye_ink_quick"));
  });
});

describe("waterproof", () => {
  it("pigment ink opaque is waterproof", () => {
    expect(waterproof("pigment_ink_opaque")).toBe(true);
  });
  it("dye ink quick is not waterproof", () => {
    expect(waterproof("dye_ink_quick")).toBe(false);
  });
});

describe("forEmbossing", () => {
  it("emboss ink clear is for embossing", () => {
    expect(forEmbossing("emboss_ink_clear")).toBe(true);
  });
  it("dye ink quick is not for embossing", () => {
    expect(forEmbossing("dye_ink_quick")).toBe(false);
  });
});

describe("inkBase", () => {
  it("distress ink blend uses water reactive fade", () => {
    expect(inkBase("distress_ink_blend")).toBe("water_reactive_fade");
  });
});

describe("bestProject", () => {
  it("emboss ink clear best for clear emboss resist", () => {
    expect(bestProject("emboss_ink_clear")).toBe("clear_emboss_resist");
  });
});

describe("inkPads", () => {
  it("returns 5 types", () => {
    expect(inkPads()).toHaveLength(5);
  });
});
