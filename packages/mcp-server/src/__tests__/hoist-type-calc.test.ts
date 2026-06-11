import { describe, it, expect } from "vitest";
import {
  capacity, speed, precision, portability,
  htCost, powered, forOverhead, lift,
  bestUse, hoistTypes,
} from "../hoist-type-calc.js";

describe("capacity", () => {
  it("electric wire rope highest capacity", () => {
    expect(capacity("electric_wire_rope_trolley")).toBeGreaterThan(capacity("lever_ratchet_come_along"));
  });
});

describe("speed", () => {
  it("electric wire rope fastest", () => {
    expect(speed("electric_wire_rope_trolley")).toBeGreaterThan(speed("manual_hand_chain_block"));
  });
});

describe("precision", () => {
  it("electric wire rope most precise", () => {
    expect(precision("electric_wire_rope_trolley")).toBeGreaterThan(precision("lever_ratchet_come_along"));
  });
});

describe("portability", () => {
  it("lever ratchet most portable", () => {
    expect(portability("lever_ratchet_come_along")).toBeGreaterThan(portability("electric_wire_rope_trolley"));
  });
});

describe("htCost", () => {
  it("electric wire rope most expensive", () => {
    expect(htCost("electric_wire_rope_trolley")).toBeGreaterThan(htCost("lever_ratchet_come_along"));
  });
});

describe("powered", () => {
  it("electric chain is powered", () => {
    expect(powered("electric_chain_single_speed")).toBe(true);
  });
  it("manual not powered", () => {
    expect(powered("manual_hand_chain_block")).toBe(false);
  });
});

describe("forOverhead", () => {
  it("electric chain for overhead", () => {
    expect(forOverhead("electric_chain_single_speed")).toBe(true);
  });
  it("lever ratchet not for overhead", () => {
    expect(forOverhead("lever_ratchet_come_along")).toBe(false);
  });
});

describe("lift", () => {
  it("pneumatic uses air motor vane", () => {
    expect(lift("pneumatic_air_chain")).toBe("air_motor_vane_chain_drive");
  });
});

describe("bestUse", () => {
  it("electric wire rope for heavy industrial", () => {
    expect(bestUse("electric_wire_rope_trolley")).toBe("heavy_industrial_crane_bridge_gantry");
  });
});

describe("hoistTypes", () => {
  it("returns 5 types", () => {
    expect(hoistTypes()).toHaveLength(5);
  });
});
