import { describe, it, expect } from "vitest";
import {
  flowSmooth, lightfastness, waterproof, nibFriendly,
  inkCost, archival, natural, pigmentBase,
  bestUse, calligraphyInks,
} from "../calligraphy-ink-calc.js";

describe("flowSmooth", () => {
  it("walnut brown natural smoothest flow", () => {
    expect(flowSmooth("walnut_brown_natural")).toBeGreaterThan(flowSmooth("acrylic_opaque_color"));
  });
});

describe("lightfastness", () => {
  it("iron gall archival best lightfastness", () => {
    expect(lightfastness("iron_gall_archival")).toBeGreaterThan(lightfastness("walnut_brown_natural"));
  });
});

describe("waterproof", () => {
  it("india ink shellac most waterproof", () => {
    expect(waterproof("india_ink_shellac")).toBeGreaterThan(waterproof("walnut_brown_natural"));
  });
});

describe("nibFriendly", () => {
  it("walnut brown natural most nib friendly", () => {
    expect(nibFriendly("walnut_brown_natural")).toBeGreaterThan(nibFriendly("acrylic_opaque_color"));
  });
});

describe("inkCost", () => {
  it("sumi stick carbon more expensive than walnut brown", () => {
    expect(inkCost("sumi_stick_carbon")).toBeGreaterThan(inkCost("walnut_brown_natural"));
  });
});

describe("archival", () => {
  it("iron gall archival is archival", () => {
    expect(archival("iron_gall_archival")).toBe(true);
  });
  it("walnut brown natural is not archival", () => {
    expect(archival("walnut_brown_natural")).toBe(false);
  });
});

describe("natural", () => {
  it("sumi stick carbon is natural", () => {
    expect(natural("sumi_stick_carbon")).toBe(true);
  });
  it("acrylic opaque color is not natural", () => {
    expect(natural("acrylic_opaque_color")).toBe(false);
  });
});

describe("pigmentBase", () => {
  it("iron gall archival uses iron tannin reaction", () => {
    expect(pigmentBase("iron_gall_archival")).toBe("iron_tannin_reaction");
  });
});

describe("bestUse", () => {
  it("sumi stick carbon best for east asian brush work", () => {
    expect(bestUse("sumi_stick_carbon")).toBe("east_asian_brush_work");
  });
});

describe("calligraphyInks", () => {
  it("returns 5 types", () => {
    expect(calligraphyInks()).toHaveLength(5);
  });
});
