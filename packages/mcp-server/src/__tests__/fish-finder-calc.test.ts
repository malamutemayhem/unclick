import { describe, it, expect } from "vitest";
import {
  depthRange, targetSeparation, coverageArea, realTimeDetail,
  finderCost, gpsBuiltIn, networkCapable, transducerType,
  bestFishing, fishFinders,
} from "../fish-finder-calc.js";

describe("depthRange", () => {
  it("chirp sonar deepest range", () => {
    expect(depthRange("chirp_sonar")).toBeGreaterThan(depthRange("basic_flasher"));
  });
});

describe("targetSeparation", () => {
  it("live scope forward best separation", () => {
    expect(targetSeparation("live_scope_forward")).toBeGreaterThan(targetSeparation("color_lcd"));
  });
});

describe("coverageArea", () => {
  it("side imaging widest coverage", () => {
    expect(coverageArea("side_imaging")).toBeGreaterThan(coverageArea("basic_flasher"));
  });
});

describe("realTimeDetail", () => {
  it("live scope forward most detail", () => {
    expect(realTimeDetail("live_scope_forward")).toBeGreaterThan(realTimeDetail("color_lcd"));
  });
});

describe("finderCost", () => {
  it("live scope forward most expensive", () => {
    expect(finderCost("live_scope_forward")).toBeGreaterThan(finderCost("basic_flasher"));
  });
});

describe("gpsBuiltIn", () => {
  it("chirp sonar has gps", () => {
    expect(gpsBuiltIn("chirp_sonar")).toBe(true);
  });
  it("basic flasher does not", () => {
    expect(gpsBuiltIn("basic_flasher")).toBe(false);
  });
});

describe("networkCapable", () => {
  it("side imaging is network capable", () => {
    expect(networkCapable("side_imaging")).toBe(true);
  });
  it("color lcd is not", () => {
    expect(networkCapable("color_lcd")).toBe(false);
  });
});

describe("transducerType", () => {
  it("live scope forward uses panoptix forward facing", () => {
    expect(transducerType("live_scope_forward")).toBe("panoptix_forward_facing");
  });
});

describe("bestFishing", () => {
  it("basic flasher for ice fishing jigging", () => {
    expect(bestFishing("basic_flasher")).toBe("ice_fishing_jigging");
  });
});

describe("fishFinders", () => {
  it("returns 5 types", () => {
    expect(fishFinders()).toHaveLength(5);
  });
});
