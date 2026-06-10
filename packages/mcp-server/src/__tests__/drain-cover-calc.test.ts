import { describe, it, expect } from "vitest";
import {
  flowRate, clogPrevention, cleanEase, aestheticClean,
  coverCost, toolFreeInstall, universalFit, coverMaterial,
  bestLocation, drainCovers,
} from "../drain-cover-calc.js";

describe("flowRate", () => {
  it("linear slot channel highest flow rate", () => {
    expect(flowRate("linear_slot_channel")).toBeGreaterThan(flowRate("hair_catcher_dome"));
  });
});

describe("clogPrevention", () => {
  it("hair catcher dome best clog prevention", () => {
    expect(clogPrevention("hair_catcher_dome")).toBeGreaterThan(clogPrevention("pop_up_click"));
  });
});

describe("cleanEase", () => {
  it("mesh screen flat easiest to clean", () => {
    expect(cleanEase("mesh_screen_flat")).toBeGreaterThan(cleanEase("linear_slot_channel"));
  });
});

describe("aestheticClean", () => {
  it("linear slot channel most aesthetic", () => {
    expect(aestheticClean("linear_slot_channel")).toBeGreaterThan(aestheticClean("hair_catcher_dome"));
  });
});

describe("coverCost", () => {
  it("linear slot channel most expensive", () => {
    expect(coverCost("linear_slot_channel")).toBeGreaterThan(coverCost("mesh_screen_flat"));
  });
});

describe("toolFreeInstall", () => {
  it("mesh screen flat is tool free install", () => {
    expect(toolFreeInstall("mesh_screen_flat")).toBe(true);
  });
  it("pop up click is not", () => {
    expect(toolFreeInstall("pop_up_click")).toBe(false);
  });
});

describe("universalFit", () => {
  it("hair catcher dome is universal fit", () => {
    expect(universalFit("hair_catcher_dome")).toBe(true);
  });
  it("linear slot channel is not", () => {
    expect(universalFit("linear_slot_channel")).toBe(false);
  });
});

describe("coverMaterial", () => {
  it("hair catcher dome uses silicone flexible mesh", () => {
    expect(coverMaterial("hair_catcher_dome")).toBe("silicone_flexible_mesh");
  });
});

describe("bestLocation", () => {
  it("hair catcher dome best for shower floor drain", () => {
    expect(bestLocation("hair_catcher_dome")).toBe("shower_floor_drain");
  });
});

describe("drainCovers", () => {
  it("returns 5 types", () => {
    expect(drainCovers()).toHaveLength(5);
  });
});
