import { describe, it, expect } from "vitest";
import {
  colorVibrancy, drySpeed, surfaceCompat, permanence,
  padCost, waterproof, reInkable, inkFormula,
  bestProject, stampPads,
} from "../stamp-pad-calc.js";

describe("colorVibrancy", () => {
  it("pigment ink opaque most vibrant", () => {
    expect(colorVibrancy("pigment_ink_opaque")).toBeGreaterThan(colorVibrancy("embossing_clear_raised"));
  });
});

describe("drySpeed", () => {
  it("dye ink quick dry fastest drying", () => {
    expect(drySpeed("dye_ink_quick_dry")).toBeGreaterThan(drySpeed("embossing_clear_raised"));
  });
});

describe("surfaceCompat", () => {
  it("pigment ink opaque widest surface compatibility", () => {
    expect(surfaceCompat("pigment_ink_opaque")).toBeGreaterThan(surfaceCompat("fabric_textile_wash"));
  });
});

describe("permanence", () => {
  it("archival acid free most permanent", () => {
    expect(permanence("archival_acid_free")).toBeGreaterThan(permanence("dye_ink_quick_dry"));
  });
});

describe("padCost", () => {
  it("embossing clear raised more expensive", () => {
    expect(padCost("embossing_clear_raised")).toBeGreaterThan(padCost("dye_ink_quick_dry"));
  });
});

describe("waterproof", () => {
  it("archival acid free is waterproof", () => {
    expect(waterproof("archival_acid_free")).toBe(true);
  });
  it("dye ink quick dry is not", () => {
    expect(waterproof("dye_ink_quick_dry")).toBe(false);
  });
});

describe("reInkable", () => {
  it("dye ink quick dry is re-inkable", () => {
    expect(reInkable("dye_ink_quick_dry")).toBe(true);
  });
  it("fabric textile wash is not", () => {
    expect(reInkable("fabric_textile_wash")).toBe(false);
  });
});

describe("inkFormula", () => {
  it("embossing clear raised uses clear slow dry emboss", () => {
    expect(inkFormula("embossing_clear_raised")).toBe("clear_slow_dry_emboss");
  });
});

describe("bestProject", () => {
  it("archival acid free best for scrapbook photo preserve", () => {
    expect(bestProject("archival_acid_free")).toBe("scrapbook_photo_preserve");
  });
});

describe("stampPads", () => {
  it("returns 5 types", () => {
    expect(stampPads()).toHaveLength(5);
  });
});
