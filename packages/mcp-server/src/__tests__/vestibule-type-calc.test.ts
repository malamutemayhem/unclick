import { describe, it, expect } from "vitest";
import {
  energy, security, throughput, comfort,
  vtCost, heated, forSecurity, configuration,
  bestUse, vestibuleTypes,
} from "../vestibule-type-calc.js";

describe("energy", () => {
  it("revolving best energy", () => {
    expect(energy("revolving_integrated")).toBeGreaterThan(energy("security_screening"));
  });
});

describe("security", () => {
  it("screening most secure", () => {
    expect(security("security_screening")).toBeGreaterThan(security("single_entry_airlock"));
  });
});

describe("throughput", () => {
  it("revolving highest throughput", () => {
    expect(throughput("revolving_integrated")).toBeGreaterThan(throughput("security_screening"));
  });
});

describe("comfort", () => {
  it("heated most comfortable", () => {
    expect(comfort("heated_arctic_entry")).toBeGreaterThan(comfort("security_screening"));
  });
});

describe("vtCost", () => {
  it("security most expensive", () => {
    expect(vtCost("security_screening")).toBeGreaterThan(vtCost("single_entry_airlock"));
  });
});

describe("heated", () => {
  it("arctic is heated", () => {
    expect(heated("heated_arctic_entry")).toBe(true);
  });
  it("single entry not heated", () => {
    expect(heated("single_entry_airlock")).toBe(false);
  });
});

describe("forSecurity", () => {
  it("screening for security", () => {
    expect(forSecurity("security_screening")).toBe(true);
  });
  it("revolving not security", () => {
    expect(forSecurity("revolving_integrated")).toBe(false);
  });
});

describe("configuration", () => {
  it("heated uses radiant floor", () => {
    expect(configuration("heated_arctic_entry")).toBe("heated_radiant_floor_curtain");
  });
});

describe("bestUse", () => {
  it("revolving for corporate tower", () => {
    expect(bestUse("revolving_integrated")).toBe("corporate_tower_lobby_prestige");
  });
});

describe("vestibuleTypes", () => {
  it("returns 5 types", () => {
    expect(vestibuleTypes()).toHaveLength(5);
  });
});
