import { describe, it, expect } from "vitest";
import {
  energyDissipation, frequencyRange, temperatureStability, maintenanceEase,
  vdCost, passive, forStructural, mechanism,
  bestUse, vibrationDamperTypes,
} from "../vibration-damper-calc.js";

describe("energyDissipation", () => {
  it("viscous fluid best energy dissipation", () => {
    expect(energyDissipation("viscous_fluid_damper")).toBeGreaterThan(energyDissipation("eddy_current_magnetic"));
  });
});

describe("frequencyRange", () => {
  it("eddy current widest frequency range", () => {
    expect(frequencyRange("eddy_current_magnetic")).toBeGreaterThan(frequencyRange("tuned_mass_damper"));
  });
});

describe("temperatureStability", () => {
  it("friction damper best temperature stability", () => {
    expect(temperatureStability("friction_damper_bolt")).toBeGreaterThan(temperatureStability("viscoelastic_constrain"));
  });
});

describe("maintenanceEase", () => {
  it("eddy current easiest maintenance", () => {
    expect(maintenanceEase("eddy_current_magnetic")).toBeGreaterThan(maintenanceEase("viscous_fluid_damper"));
  });
});

describe("vdCost", () => {
  it("tuned mass damper most expensive", () => {
    expect(vdCost("tuned_mass_damper")).toBeGreaterThan(vdCost("friction_damper_bolt"));
  });
});

describe("passive", () => {
  it("all damper types are passive", () => {
    expect(passive("viscous_fluid_damper")).toBe(true);
  });
});

describe("forStructural", () => {
  it("viscous fluid for structural", () => {
    expect(forStructural("viscous_fluid_damper")).toBe(true);
  });
  it("eddy current not for structural", () => {
    expect(forStructural("eddy_current_magnetic")).toBe(false);
  });
});

describe("mechanism", () => {
  it("tuned mass uses mass spring dashpot", () => {
    expect(mechanism("tuned_mass_damper")).toBe("mass_spring_dashpot_tuned_to_natural_freq");
  });
});

describe("bestUse", () => {
  it("viscoelastic for panel duct resonance", () => {
    expect(bestUse("viscoelastic_constrain")).toBe("panel_plate_duct_wall_resonance_damping");
  });
});

describe("vibrationDamperTypes", () => {
  it("returns 5 types", () => {
    expect(vibrationDamperTypes()).toHaveLength(5);
  });
});
