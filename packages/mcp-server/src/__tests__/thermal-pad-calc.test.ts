import { describe, it, expect } from "vitest";
import {
  conductivity, conformability, compressibility, electricIsolate,
  padCost, reusable, electricInsulate, material,
  bestUse, thermalPads,
} from "../thermal-pad-calc.js";

describe("conductivity", () => {
  it("graphite sheet thin highest conductivity", () => {
    expect(conductivity("graphite_sheet_thin")).toBeGreaterThan(conductivity("putty_conform_thick"));
  });
});

describe("conformability", () => {
  it("phase change pad best conformability", () => {
    expect(conformability("phase_change_pad")).toBeGreaterThan(conformability("ceramic_filled_hard"));
  });
});

describe("compressibility", () => {
  it("putty conform thick most compressible", () => {
    expect(compressibility("putty_conform_thick")).toBeGreaterThan(compressibility("ceramic_filled_hard"));
  });
});

describe("electricIsolate", () => {
  it("ceramic filled hard best electric isolate", () => {
    expect(electricIsolate("ceramic_filled_hard")).toBeGreaterThan(electricIsolate("graphite_sheet_thin"));
  });
});

describe("padCost", () => {
  it("phase change pad most expensive", () => {
    expect(padCost("phase_change_pad")).toBeGreaterThan(padCost("silicone_gap_filler"));
  });
});

describe("reusable", () => {
  it("graphite sheet thin is reusable", () => {
    expect(reusable("graphite_sheet_thin")).toBe(true);
  });
  it("silicone gap filler not reusable", () => {
    expect(reusable("silicone_gap_filler")).toBe(false);
  });
});

describe("electricInsulate", () => {
  it("silicone gap filler is electric insulate", () => {
    expect(electricInsulate("silicone_gap_filler")).toBe(true);
  });
  it("graphite sheet thin not electric insulate", () => {
    expect(electricInsulate("graphite_sheet_thin")).toBe(false);
  });
});

describe("material", () => {
  it("phase change pad uses paraffin phase change", () => {
    expect(material("phase_change_pad")).toBe("paraffin_phase_change");
  });
});

describe("bestUse", () => {
  it("ceramic filled hard best for power device isolate", () => {
    expect(bestUse("ceramic_filled_hard")).toBe("power_device_isolate");
  });
});

describe("thermalPads", () => {
  it("returns 5 types", () => {
    expect(thermalPads()).toHaveLength(5);
  });
});
