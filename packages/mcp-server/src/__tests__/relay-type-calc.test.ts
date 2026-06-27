import { describe, it, expect } from "vitest";
import {
  current, speed, life, isolation,
  rlCost, silent, forSafety, contact,
  bestUse, relayTypes,
} from "../relay-type-calc.js";

describe("current", () => {
  it("electromechanical highest current", () => {
    expect(current("electromechanical_spdt")).toBeGreaterThan(current("reed_hermetic_glass"));
  });
});

describe("speed", () => {
  it("solid state fastest", () => {
    expect(speed("solid_state_ssr")).toBeGreaterThan(speed("time_delay_adjustable"));
  });
});

describe("life", () => {
  it("solid state longest life", () => {
    expect(life("solid_state_ssr")).toBeGreaterThan(life("electromechanical_spdt"));
  });
});

describe("isolation", () => {
  it("electromechanical best isolation", () => {
    expect(isolation("electromechanical_spdt")).toBeGreaterThan(isolation("reed_hermetic_glass"));
  });
});

describe("rlCost", () => {
  it("solid state most expensive", () => {
    expect(rlCost("solid_state_ssr")).toBeGreaterThan(rlCost("electromechanical_spdt"));
  });
});

describe("silent", () => {
  it("solid state is silent", () => {
    expect(silent("solid_state_ssr")).toBe(true);
  });
  it("electromechanical not silent", () => {
    expect(silent("electromechanical_spdt")).toBe(false);
  });
});

describe("forSafety", () => {
  it("electromechanical for safety", () => {
    expect(forSafety("electromechanical_spdt")).toBe(true);
  });
  it("solid state not for safety", () => {
    expect(forSafety("solid_state_ssr")).toBe(false);
  });
});

describe("contact", () => {
  it("reed uses ferromagnetic blade", () => {
    expect(contact("reed_hermetic_glass")).toBe("ferromagnetic_reed_blade");
  });
});

describe("bestUse", () => {
  it("time delay best for motor starter sequence", () => {
    expect(bestUse("time_delay_adjustable")).toBe("motor_star_delta_starter_sequence");
  });
});

describe("relayTypes", () => {
  it("returns 5 types", () => {
    expect(relayTypes()).toHaveLength(5);
  });
});
