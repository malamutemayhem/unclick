import { describe, it, expect } from "vitest";
import {
  effectiveness, speed, residue, safety,
  saCost, gaseous, forElectrical, mechanism,
  bestUse, fireSuppressionAgentTypes,
} from "../fire-suppression-agent-calc.js";

describe("effectiveness", () => {
  it("co2 most effective", () => {
    expect(effectiveness("co2_total_flood_gas")).toBeGreaterThan(effectiveness("water_mist_high_pressure"));
  });
});

describe("speed", () => {
  it("clean agent fastest", () => {
    expect(speed("clean_agent_fm200_hfc")).toBeGreaterThan(speed("foam_afff_film_forming"));
  });
});

describe("residue", () => {
  it("clean agent least residue", () => {
    expect(residue("clean_agent_fm200_hfc")).toBeGreaterThan(residue("dry_chemical_abc_powder"));
  });
});

describe("safety", () => {
  it("water mist safest", () => {
    expect(safety("water_mist_high_pressure")).toBeGreaterThan(safety("co2_total_flood_gas"));
  });
});

describe("saCost", () => {
  it("clean agent most expensive", () => {
    expect(saCost("clean_agent_fm200_hfc")).toBeGreaterThan(saCost("dry_chemical_abc_powder"));
  });
});

describe("gaseous", () => {
  it("co2 is gaseous", () => {
    expect(gaseous("co2_total_flood_gas")).toBe(true);
  });
  it("foam not gaseous", () => {
    expect(gaseous("foam_afff_film_forming")).toBe(false);
  });
});

describe("forElectrical", () => {
  it("co2 for electrical", () => {
    expect(forElectrical("co2_total_flood_gas")).toBe(true);
  });
  it("foam not for electrical", () => {
    expect(forElectrical("foam_afff_film_forming")).toBe(false);
  });
});

describe("mechanism", () => {
  it("foam uses aqueous film", () => {
    expect(mechanism("foam_afff_film_forming")).toBe("aqueous_film_seal_vapor_smother");
  });
});

describe("bestUse", () => {
  it("clean agent for data center", () => {
    expect(bestUse("clean_agent_fm200_hfc")).toBe("data_center_telecom_occupied_critical");
  });
});

describe("fireSuppressionAgentTypes", () => {
  it("returns 5 types", () => {
    expect(fireSuppressionAgentTypes()).toHaveLength(5);
  });
});
