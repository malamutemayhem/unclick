import { describe, it, expect } from "vitest";
import {
  lumens, efficiency, darkSky, aesthetic,
  wpCost, photocell, forSecurity, optic,
  bestUse, wallPackLightTypes,
} from "../wall-pack-light-calc.js";

describe("lumens", () => {
  it("adjustable highest lumens", () => {
    expect(lumens("adjustable_head_flood")).toBeGreaterThan(lumens("solar_powered_wireless"));
  });
});

describe("efficiency", () => {
  it("solar most efficient", () => {
    expect(efficiency("solar_powered_wireless")).toBeGreaterThan(efficiency("emergency_battery_backup"));
  });
});

describe("darkSky", () => {
  it("full cutoff best dark sky", () => {
    expect(darkSky("full_cutoff_standard")).toBeGreaterThan(darkSky("adjustable_head_flood"));
  });
});

describe("aesthetic", () => {
  it("decorative best aesthetic", () => {
    expect(aesthetic("semi_cutoff_decorative")).toBeGreaterThan(aesthetic("adjustable_head_flood"));
  });
});

describe("wpCost", () => {
  it("emergency most expensive", () => {
    expect(wpCost("emergency_battery_backup")).toBeGreaterThan(wpCost("full_cutoff_standard"));
  });
});

describe("photocell", () => {
  it("full cutoff has photocell", () => {
    expect(photocell("full_cutoff_standard")).toBe(true);
  });
  it("solar no photocell", () => {
    expect(photocell("solar_powered_wireless")).toBe(false);
  });
});

describe("forSecurity", () => {
  it("adjustable for security", () => {
    expect(forSecurity("adjustable_head_flood")).toBe(true);
  });
  it("decorative not security", () => {
    expect(forSecurity("semi_cutoff_decorative")).toBe(false);
  });
});

describe("optic", () => {
  it("solar uses integrated panel", () => {
    expect(optic("solar_powered_wireless")).toBe("integrated_solar_panel_led");
  });
});

describe("bestUse", () => {
  it("full cutoff for perimeter", () => {
    expect(bestUse("full_cutoff_standard")).toBe("building_perimeter_dark_sky");
  });
});

describe("wallPackLightTypes", () => {
  it("returns 5 types", () => {
    expect(wallPackLightTypes()).toHaveLength(5);
  });
});
