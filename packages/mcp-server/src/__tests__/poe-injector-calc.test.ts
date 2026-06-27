import { describe, it, expect } from "vitest";
import {
  powerOutput, portCount, efficiency, compatibility,
  injectorCost, managed, highPower, standard,
  bestUse, poeInjectors,
} from "../poe-injector-calc.js";

describe("powerOutput", () => {
  it("ultra 802 3bt highest power output", () => {
    expect(powerOutput("ultra_802_3bt")).toBeGreaterThan(powerOutput("passive_12v_pair"));
  });
});

describe("portCount", () => {
  it("multi port midspan most ports", () => {
    expect(portCount("multi_port_midspan")).toBeGreaterThan(portCount("standard_802_3af"));
  });
});

describe("efficiency", () => {
  it("ultra 802 3bt most efficient", () => {
    expect(efficiency("ultra_802_3bt")).toBeGreaterThan(efficiency("passive_12v_pair"));
  });
});

describe("compatibility", () => {
  it("standard 802 3af most compatible", () => {
    expect(compatibility("standard_802_3af")).toBeGreaterThan(compatibility("passive_12v_pair"));
  });
});

describe("injectorCost", () => {
  it("multi port midspan most expensive", () => {
    expect(injectorCost("multi_port_midspan")).toBeGreaterThan(injectorCost("passive_12v_pair"));
  });
});

describe("managed", () => {
  it("multi port midspan is managed", () => {
    expect(managed("multi_port_midspan")).toBe(true);
  });
  it("standard 802 3af not managed", () => {
    expect(managed("standard_802_3af")).toBe(false);
  });
});

describe("highPower", () => {
  it("ultra 802 3bt is high power", () => {
    expect(highPower("ultra_802_3bt")).toBe(true);
  });
  it("standard 802 3af not high power", () => {
    expect(highPower("standard_802_3af")).toBe(false);
  });
});

describe("standard", () => {
  it("plus 802 3at uses ieee 802 3at 30w", () => {
    expect(standard("plus_802_3at")).toBe("ieee_802_3at_30w");
  });
});

describe("bestUse", () => {
  it("multi port midspan best for bulk ap deployment", () => {
    expect(bestUse("multi_port_midspan")).toBe("bulk_ap_deployment");
  });
});

describe("poeInjectors", () => {
  it("returns 5 types", () => {
    expect(poeInjectors()).toHaveLength(5);
  });
});
