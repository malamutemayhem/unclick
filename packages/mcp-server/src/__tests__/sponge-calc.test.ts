import { describe, it, expect } from "vitest";
import {
  scrubbingPower, surfaceSafe, absorption, longevity,
  spongeCost, biodegradable, dishwasherSafe, spongeMaterial,
  bestTask, sponges,
} from "../sponge-calc.js";

describe("scrubbingPower", () => {
  it("steel wool scrub highest scrubbing power", () => {
    expect(scrubbingPower("steel_wool_scrub")).toBeGreaterThan(scrubbingPower("silicone_antimicrobial"));
  });
});

describe("surfaceSafe", () => {
  it("silicone antimicrobial most surface safe", () => {
    expect(surfaceSafe("silicone_antimicrobial")).toBeGreaterThan(surfaceSafe("steel_wool_scrub"));
  });
});

describe("absorption", () => {
  it("cellulose natural highest absorption", () => {
    expect(absorption("cellulose_natural")).toBeGreaterThan(absorption("silicone_antimicrobial"));
  });
});

describe("longevity", () => {
  it("silicone antimicrobial longest lasting", () => {
    expect(longevity("silicone_antimicrobial")).toBeGreaterThan(longevity("melamine_magic_eraser"));
  });
});

describe("spongeCost", () => {
  it("silicone antimicrobial most expensive", () => {
    expect(spongeCost("silicone_antimicrobial")).toBeGreaterThan(spongeCost("pop_up_compressed"));
  });
});

describe("biodegradable", () => {
  it("cellulose natural is biodegradable", () => {
    expect(biodegradable("cellulose_natural")).toBe(true);
  });
  it("melamine magic eraser is not", () => {
    expect(biodegradable("melamine_magic_eraser")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("silicone antimicrobial is dishwasher safe", () => {
    expect(dishwasherSafe("silicone_antimicrobial")).toBe(true);
  });
  it("cellulose natural is not", () => {
    expect(dishwasherSafe("cellulose_natural")).toBe(false);
  });
});

describe("spongeMaterial", () => {
  it("melamine magic eraser uses melamine foam micro abrasive", () => {
    expect(spongeMaterial("melamine_magic_eraser")).toBe("melamine_foam_micro_abrasive");
  });
});

describe("bestTask", () => {
  it("steel wool scrub best for burnt pan grill grate", () => {
    expect(bestTask("steel_wool_scrub")).toBe("burnt_pan_grill_grate");
  });
});

describe("sponges", () => {
  it("returns 5 types", () => {
    expect(sponges()).toHaveLength(5);
  });
});
