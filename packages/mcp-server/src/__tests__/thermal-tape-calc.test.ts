import { describe, it, expect } from "vitest";
import {
  conductivity, adhesion, thickness, tempResist,
  tapeCost, removable, electricInsulate, adhesiveType,
  bestUse, thermalTapes,
} from "../thermal-tape-calc.js";

describe("conductivity", () => {
  it("graphite backed foil highest conductivity", () => {
    expect(conductivity("graphite_backed_foil")).toBeGreaterThan(conductivity("acrylic_adhesive_thin"));
  });
});

describe("adhesion", () => {
  it("double sided transfer best adhesion", () => {
    expect(adhesion("double_sided_transfer")).toBeGreaterThan(adhesion("graphite_backed_foil"));
  });
});

describe("thickness", () => {
  it("double sided transfer thinnest", () => {
    expect(thickness("double_sided_transfer")).toBeGreaterThan(thickness("ceramic_filled_tape"));
  });
});

describe("tempResist", () => {
  it("silicone adhesive high best temp resist", () => {
    expect(tempResist("silicone_adhesive_high")).toBeGreaterThan(tempResist("acrylic_adhesive_thin"));
  });
});

describe("tapeCost", () => {
  it("graphite backed foil most expensive", () => {
    expect(tapeCost("graphite_backed_foil")).toBeGreaterThan(tapeCost("acrylic_adhesive_thin"));
  });
});

describe("removable", () => {
  it("silicone adhesive high is removable", () => {
    expect(removable("silicone_adhesive_high")).toBe(true);
  });
  it("acrylic adhesive thin not removable", () => {
    expect(removable("acrylic_adhesive_thin")).toBe(false);
  });
});

describe("electricInsulate", () => {
  it("ceramic filled tape is electric insulate", () => {
    expect(electricInsulate("ceramic_filled_tape")).toBe(true);
  });
  it("graphite backed foil not electric insulate", () => {
    expect(electricInsulate("graphite_backed_foil")).toBe(false);
  });
});

describe("adhesiveType", () => {
  it("ceramic filled tape uses ceramic filled acrylic", () => {
    expect(adhesiveType("ceramic_filled_tape")).toBe("ceramic_filled_acrylic");
  });
});

describe("bestUse", () => {
  it("double sided transfer best for heatsink permanent attach", () => {
    expect(bestUse("double_sided_transfer")).toBe("heatsink_permanent_attach");
  });
});

describe("thermalTapes", () => {
  it("returns 5 types", () => {
    expect(thermalTapes()).toHaveLength(5);
  });
});
