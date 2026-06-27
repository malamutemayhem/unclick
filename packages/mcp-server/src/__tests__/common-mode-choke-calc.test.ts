import { describe, it, expect } from "vitest";
import {
  impedance, currentRating, freqRange, insertionLoss,
  chokeCost, surfaceMount, forHighFreq, coreType,
  bestUse, commonModeChokes,
} from "../common-mode-choke-calc.js";

describe("impedance", () => {
  it("nanocrystal core highest impedance", () => {
    expect(impedance("nanocrystal_core")).toBeGreaterThan(impedance("smd_chip_common"));
  });
});

describe("currentRating", () => {
  it("line filter three highest current rating", () => {
    expect(currentRating("line_filter_three")).toBeGreaterThan(currentRating("smd_chip_common"));
  });
});

describe("freqRange", () => {
  it("nanocrystal core widest freq range", () => {
    expect(freqRange("nanocrystal_core")).toBeGreaterThan(freqRange("toroid_wound_pair"));
  });
});

describe("insertionLoss", () => {
  it("nanocrystal core best insertion loss", () => {
    expect(insertionLoss("nanocrystal_core")).toBeGreaterThan(insertionLoss("planar_pcb_embed"));
  });
});

describe("chokeCost", () => {
  it("nanocrystal core most expensive", () => {
    expect(chokeCost("nanocrystal_core")).toBeGreaterThan(chokeCost("smd_chip_common"));
  });
});

describe("surfaceMount", () => {
  it("smd chip common is surface mount", () => {
    expect(surfaceMount("smd_chip_common")).toBe(true);
  });
  it("toroid wound pair not surface mount", () => {
    expect(surfaceMount("toroid_wound_pair")).toBe(false);
  });
});

describe("forHighFreq", () => {
  it("nanocrystal core is for high freq", () => {
    expect(forHighFreq("nanocrystal_core")).toBe(true);
  });
  it("toroid wound pair not for high freq", () => {
    expect(forHighFreq("toroid_wound_pair")).toBe(false);
  });
});

describe("coreType", () => {
  it("planar pcb embed uses pcb trace integrated", () => {
    expect(coreType("planar_pcb_embed")).toBe("pcb_trace_integrated");
  });
});

describe("bestUse", () => {
  it("smd chip common best for usb hdmi data filter", () => {
    expect(bestUse("smd_chip_common")).toBe("usb_hdmi_data_filter");
  });
});

describe("commonModeChokes", () => {
  it("returns 5 types", () => {
    expect(commonModeChokes()).toHaveLength(5);
  });
});
