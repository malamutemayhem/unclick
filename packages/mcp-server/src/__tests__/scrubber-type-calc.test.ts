import { describe, it, expect } from "vitest";
import {
  removal, particulate, pressure, maintenance,
  scCost, wet, forSo2, contact,
  bestUse, scrubberTypes,
} from "../scrubber-type-calc.js";

describe("removal", () => {
  it("wet esp best removal", () => {
    expect(removal("wet_electrostatic_ionize")).toBeGreaterThan(removal("spray_tower_open_chamber"));
  });
});

describe("particulate", () => {
  it("venturi best particulate", () => {
    expect(particulate("venturi_high_energy_throat")).toBeGreaterThan(particulate("packed_tower_counter_flow"));
  });
});

describe("pressure", () => {
  it("dsi lowest pressure drop", () => {
    expect(pressure("dry_sorbent_injection_dsi")).toBeGreaterThan(pressure("venturi_high_energy_throat"));
  });
});

describe("maintenance", () => {
  it("dsi easiest maintenance", () => {
    expect(maintenance("dry_sorbent_injection_dsi")).toBeGreaterThan(maintenance("wet_electrostatic_ionize"));
  });
});

describe("scCost", () => {
  it("wet esp most expensive", () => {
    expect(scCost("wet_electrostatic_ionize")).toBeGreaterThan(scCost("dry_sorbent_injection_dsi"));
  });
});

describe("wet", () => {
  it("packed tower is wet", () => {
    expect(wet("packed_tower_counter_flow")).toBe(true);
  });
  it("dsi not wet", () => {
    expect(wet("dry_sorbent_injection_dsi")).toBe(false);
  });
});

describe("forSo2", () => {
  it("packed tower for so2", () => {
    expect(forSo2("packed_tower_counter_flow")).toBe(true);
  });
  it("venturi not for so2", () => {
    expect(forSo2("venturi_high_energy_throat")).toBe(false);
  });
});

describe("contact", () => {
  it("venturi uses high velocity throat", () => {
    expect(contact("venturi_high_energy_throat")).toBe("high_velocity_throat_atomize");
  });
});

describe("bestUse", () => {
  it("packed tower for acid gas removal", () => {
    expect(bestUse("packed_tower_counter_flow")).toBe("acid_gas_so2_hcl_nh3_removal");
  });
});

describe("scrubberTypes", () => {
  it("returns 5 types", () => {
    expect(scrubberTypes()).toHaveLength(5);
  });
});
