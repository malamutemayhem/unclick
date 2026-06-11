import { describe, it, expect } from "vitest";
import {
  heatTransfer, pressureRating, thermalExpansion, cleanability,
  stCost, removableBundle, forHighPress, design,
  bestUse, shellTubeHxTypes,
} from "../shell-tube-hx-calc.js";

describe("heatTransfer", () => {
  it("kettle reboiler best heat transfer", () => {
    expect(heatTransfer("kettle_reboiler")).toBeGreaterThan(heatTransfer("double_tubesheet_safe"));
  });
});

describe("pressureRating", () => {
  it("fixed tubesheet highest pressure rating", () => {
    expect(pressureRating("fixed_tubesheet_standard")).toBeGreaterThan(pressureRating("kettle_reboiler"));
  });
});

describe("thermalExpansion", () => {
  it("u tube best thermal expansion", () => {
    expect(thermalExpansion("u_tube_bundle")).toBeGreaterThan(thermalExpansion("fixed_tubesheet_standard"));
  });
});

describe("cleanability", () => {
  it("floating head best cleanability", () => {
    expect(cleanability("floating_head_pull")).toBeGreaterThan(cleanability("fixed_tubesheet_standard"));
  });
});

describe("stCost", () => {
  it("double tubesheet most expensive", () => {
    expect(stCost("double_tubesheet_safe")).toBeGreaterThan(stCost("fixed_tubesheet_standard"));
  });
});

describe("removableBundle", () => {
  it("u tube has removable bundle", () => {
    expect(removableBundle("u_tube_bundle")).toBe(true);
  });
  it("fixed tubesheet not removable", () => {
    expect(removableBundle("fixed_tubesheet_standard")).toBe(false);
  });
});

describe("forHighPress", () => {
  it("fixed tubesheet for high pressure", () => {
    expect(forHighPress("fixed_tubesheet_standard")).toBe(true);
  });
  it("floating head not for high pressure", () => {
    expect(forHighPress("floating_head_pull")).toBe(false);
  });
});

describe("design", () => {
  it("kettle reboiler uses pool boiling", () => {
    expect(design("kettle_reboiler")).toBe("oversized_shell_pool_boiling_vapor_space");
  });
});

describe("bestUse", () => {
  it("double tubesheet for nuclear pharma", () => {
    expect(bestUse("double_tubesheet_safe")).toBe("nuclear_pharma_toxic_no_cross_contamination");
  });
});

describe("shellTubeHxTypes", () => {
  it("returns 5 types", () => {
    expect(shellTubeHxTypes()).toHaveLength(5);
  });
});
