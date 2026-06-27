import { describe, it, expect } from "vitest";
import {
  powerFactor, efficiency, thd, complexity,
  methodCost, bridgeless, forServer, topology,
  bestUse, powerFactorMethods,
} from "../power-factor-calc.js";

describe("powerFactor", () => {
  it("vienna 3level best power factor", () => {
    expect(powerFactor("vienna_3level")).toBeGreaterThan(powerFactor("passive_pfc_inductor"));
  });
});

describe("efficiency", () => {
  it("bridgeless totem best efficiency", () => {
    expect(efficiency("bridgeless_totem")).toBeGreaterThan(efficiency("passive_pfc_inductor"));
  });
});

describe("thd", () => {
  it("vienna 3level best thd", () => {
    expect(thd("vienna_3level")).toBeGreaterThan(thd("passive_pfc_inductor"));
  });
});

describe("complexity", () => {
  it("vienna 3level most complex", () => {
    expect(complexity("vienna_3level")).toBeGreaterThan(complexity("passive_pfc_inductor"));
  });
});

describe("methodCost", () => {
  it("vienna 3level most expensive", () => {
    expect(methodCost("vienna_3level")).toBeGreaterThan(methodCost("passive_pfc_inductor"));
  });
});

describe("bridgeless", () => {
  it("bridgeless totem is bridgeless", () => {
    expect(bridgeless("bridgeless_totem")).toBe(true);
  });
  it("active pfc boost not bridgeless", () => {
    expect(bridgeless("active_pfc_boost")).toBe(false);
  });
});

describe("forServer", () => {
  it("active pfc boost is for server", () => {
    expect(forServer("active_pfc_boost")).toBe(true);
  });
  it("passive pfc inductor not for server", () => {
    expect(forServer("passive_pfc_inductor")).toBe(false);
  });
});

describe("topology", () => {
  it("bridgeless totem uses totem pole gan", () => {
    expect(topology("bridgeless_totem")).toBe("totem_pole_gan");
  });
});

describe("bestUse", () => {
  it("vienna 3level best for ev charger onboard", () => {
    expect(bestUse("vienna_3level")).toBe("ev_charger_onboard");
  });
});

describe("powerFactorMethods", () => {
  it("returns 5 types", () => {
    expect(powerFactorMethods()).toHaveLength(5);
  });
});
