import { describe, it, expect } from "vitest";
import {
  speed, imageQuality, colorConsistency, makeready,
  opCost, usesWater, forShortRun, plate,
  bestUse, offsetPressTypes,
} from "../offset-press-calc.js";

describe("speed", () => {
  it("web heatset fastest", () => {
    expect(speed("web_heatset")).toBeGreaterThan(speed("digital_offset"));
  });
});

describe("imageQuality", () => {
  it("sheetfed commercial best image quality", () => {
    expect(imageQuality("sheetfed_commercial")).toBeGreaterThan(imageQuality("web_coldset"));
  });
});

describe("colorConsistency", () => {
  it("waterless best color consistency", () => {
    expect(colorConsistency("waterless")).toBeGreaterThan(colorConsistency("web_coldset"));
  });
});

describe("makeready", () => {
  it("digital offset fastest makeready", () => {
    expect(makeready("digital_offset")).toBeGreaterThan(makeready("web_heatset"));
  });
});

describe("opCost", () => {
  it("web heatset most expensive", () => {
    expect(opCost("web_heatset")).toBeGreaterThan(opCost("digital_offset"));
  });
});

describe("usesWater", () => {
  it("sheetfed commercial uses water", () => {
    expect(usesWater("sheetfed_commercial")).toBe(true);
  });
  it("waterless does not use water", () => {
    expect(usesWater("waterless")).toBe(false);
  });
});

describe("forShortRun", () => {
  it("digital offset for short run", () => {
    expect(forShortRun("digital_offset")).toBe(true);
  });
  it("web heatset not for short run", () => {
    expect(forShortRun("web_heatset")).toBe(false);
  });
});

describe("plate", () => {
  it("waterless uses silicone rubber layer", () => {
    expect(plate("waterless")).toBe("silicone_rubber_layer_ink_repellent_no_fountain_solution");
  });
});

describe("bestUse", () => {
  it("web coldset for newspaper", () => {
    expect(bestUse("web_coldset")).toBe("newspaper_directory_flyer_uncoated_high_speed_daily");
  });
});

describe("offsetPressTypes", () => {
  it("returns 5 types", () => {
    expect(offsetPressTypes()).toHaveLength(5);
  });
});
