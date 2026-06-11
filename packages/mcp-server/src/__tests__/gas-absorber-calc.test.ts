import { describe, it, expect } from "vitest";
import {
  massTransfer, capacity, pressureDrop, turndown,
  gaCost, wetted, forAcidGas, internals,
  bestUse, gasAbsorberTypes,
} from "../gas-absorber-calc.js";

describe("massTransfer", () => {
  it("falling film absorber best mass transfer", () => {
    expect(massTransfer("falling_film_absorber")).toBeGreaterThan(massTransfer("spray_tower_open"));
  });
});

describe("capacity", () => {
  it("spray tower highest capacity", () => {
    expect(capacity("spray_tower_open")).toBeGreaterThan(capacity("falling_film_absorber"));
  });
});

describe("pressureDrop", () => {
  it("spray tower lowest pressure drop (highest score)", () => {
    expect(pressureDrop("spray_tower_open")).toBeGreaterThan(pressureDrop("venturi_scrubber_contact"));
  });
});

describe("turndown", () => {
  it("spray tower and tray absorber best turndown", () => {
    expect(turndown("spray_tower_open")).toBeGreaterThan(turndown("falling_film_absorber"));
  });
});

describe("gaCost", () => {
  it("falling film absorber most expensive", () => {
    expect(gaCost("falling_film_absorber")).toBeGreaterThan(gaCost("spray_tower_open"));
  });
});

describe("wetted", () => {
  it("all gas absorbers are wetted", () => {
    expect(wetted("packed_tower_countercurrent")).toBe(true);
    expect(wetted("venturi_scrubber_contact")).toBe(true);
  });
});

describe("forAcidGas", () => {
  it("packed tower for acid gas", () => {
    expect(forAcidGas("packed_tower_countercurrent")).toBe(true);
  });
  it("spray tower not for acid gas", () => {
    expect(forAcidGas("spray_tower_open")).toBe(false);
  });
});

describe("internals", () => {
  it("venturi scrubber uses converge throat", () => {
    expect(internals("venturi_scrubber_contact")).toBe("converge_throat_high_velocity_drop");
  });
});

describe("bestUse", () => {
  it("falling film absorber for hcl absorb", () => {
    expect(bestUse("falling_film_absorber")).toBe("hcl_absorb_exothermic_heat_remove");
  });
});

describe("gasAbsorberTypes", () => {
  it("returns 5 types", () => {
    expect(gasAbsorberTypes()).toHaveLength(5);
  });
});
