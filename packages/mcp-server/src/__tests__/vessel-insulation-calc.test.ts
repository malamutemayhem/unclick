import { describe, it, expect } from "vitest";
import {
  thermalResist, tempLimit, moistureResist, compressiveStr,
  viCost_, hydrophobic, forHighTemp, material,
  bestUse, vesselInsulationTypes,
} from "../vessel-insulation-calc.js";

describe("thermalResist", () => {
  it("aerogel best thermal resistance", () => {
    expect(thermalResist("aerogel_blanket_thin")).toBeGreaterThan(thermalResist("calcium_silicate_block"));
  });
});

describe("tempLimit", () => {
  it("ceramic fiber highest temp limit", () => {
    expect(tempLimit("ceramic_fiber_module")).toBeGreaterThan(tempLimit("cellular_glass_foam"));
  });
});

describe("moistureResist", () => {
  it("cellular glass best moisture resistance", () => {
    expect(moistureResist("cellular_glass_foam")).toBeGreaterThan(moistureResist("mineral_wool_blanket"));
  });
});

describe("compressiveStr", () => {
  it("calcium silicate best compressive strength", () => {
    expect(compressiveStr("calcium_silicate_block")).toBeGreaterThan(compressiveStr("mineral_wool_blanket"));
  });
});

describe("viCost_", () => {
  it("aerogel most expensive", () => {
    expect(viCost_("aerogel_blanket_thin")).toBeGreaterThan(viCost_("mineral_wool_blanket"));
  });
});

describe("hydrophobic", () => {
  it("cellular glass is hydrophobic", () => {
    expect(hydrophobic("cellular_glass_foam")).toBe(true);
  });
  it("mineral wool not hydrophobic", () => {
    expect(hydrophobic("mineral_wool_blanket")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("ceramic fiber for high temp", () => {
    expect(forHighTemp("ceramic_fiber_module")).toBe(true);
  });
  it("mineral wool not for high temp", () => {
    expect(forHighTemp("mineral_wool_blanket")).toBe(false);
  });
});

describe("material", () => {
  it("aerogel uses silica fiber sheet", () => {
    expect(material("aerogel_blanket_thin")).toBe("silica_aerogel_fiber_reinforced_flexible_sheet");
  });
});

describe("bestUse", () => {
  it("cellular glass for cold service", () => {
    expect(bestUse("cellular_glass_foam")).toBe("cold_service_tank_base_below_ambient_moisture");
  });
});

describe("vesselInsulationTypes", () => {
  it("returns 5 types", () => {
    expect(vesselInsulationTypes()).toHaveLength(5);
  });
});
