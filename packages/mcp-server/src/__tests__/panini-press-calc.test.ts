import { describe, it, expect } from "vitest";
import {
  grillMarkQuality, sandwichCapacity, pressureControl, compactStorage,
  pressCost, opensFlat, removablePlates, plateType,
  bestUse, paniniPresses,
} from "../panini-press-calc.js";

describe("grillMarkQuality", () => {
  it("commercial ribbed cast best grill marks", () => {
    expect(grillMarkQuality("commercial_ribbed_cast")).toBeGreaterThan(grillMarkQuality("open_flat_grill_mode"));
  });
});

describe("sandwichCapacity", () => {
  it("commercial ribbed cast biggest capacity", () => {
    expect(sandwichCapacity("commercial_ribbed_cast")).toBeGreaterThan(sandwichCapacity("compact_two_slice"));
  });
});

describe("pressureControl", () => {
  it("floating hinge adjust best pressure control", () => {
    expect(pressureControl("floating_hinge_adjust")).toBeGreaterThan(pressureControl("compact_two_slice"));
  });
});

describe("compactStorage", () => {
  it("compact two slice most compact", () => {
    expect(compactStorage("compact_two_slice")).toBeGreaterThan(compactStorage("commercial_ribbed_cast"));
  });
});

describe("pressCost", () => {
  it("commercial ribbed cast most expensive", () => {
    expect(pressCost("commercial_ribbed_cast")).toBeGreaterThan(pressCost("compact_two_slice"));
  });
});

describe("opensFlat", () => {
  it("open flat grill mode opens flat", () => {
    expect(opensFlat("open_flat_grill_mode")).toBe(true);
  });
  it("compact two slice does not", () => {
    expect(opensFlat("compact_two_slice")).toBe(false);
  });
});

describe("removablePlates", () => {
  it("full size four slice has removable plates", () => {
    expect(removablePlates("full_size_four_slice")).toBe(true);
  });
  it("compact two slice does not", () => {
    expect(removablePlates("compact_two_slice")).toBe(false);
  });
});

describe("plateType", () => {
  it("floating hinge adjust uses nonstick ribbed floating", () => {
    expect(plateType("floating_hinge_adjust")).toBe("nonstick_ribbed_floating");
  });
});

describe("bestUse", () => {
  it("deep fill pocket best for loaded filling no leak", () => {
    expect(bestUse("floating_hinge_adjust")).toBe("thick_artisan_sandwich");
  });
});

describe("paniniPresses", () => {
  it("returns 5 types", () => {
    expect(paniniPresses()).toHaveLength(5);
  });
});
