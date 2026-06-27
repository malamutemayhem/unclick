import { describe, it, expect } from "vitest";
import {
  liftCapacity, liftSpeed, portability, durability,
  hcCost, powered, forHazardous, drive,
  bestUse, hoistChainTypes,
} from "../hoist-chain-calc.js";

describe("liftCapacity", () => {
  it("trolley mount beam highest capacity", () => {
    expect(liftCapacity("trolley_mount_beam")).toBeGreaterThan(liftCapacity("lever_ratchet_pull"));
  });
});

describe("liftSpeed", () => {
  it("electric chain hook fastest", () => {
    expect(liftSpeed("electric_chain_hook")).toBeGreaterThan(liftSpeed("manual_hand_chain"));
  });
});

describe("portability", () => {
  it("lever ratchet pull most portable", () => {
    expect(portability("lever_ratchet_pull")).toBeGreaterThan(portability("trolley_mount_beam"));
  });
});

describe("durability", () => {
  it("manual hand chain most durable", () => {
    expect(durability("manual_hand_chain")).toBeGreaterThanOrEqual(durability("pneumatic_chain_spark"));
  });
});

describe("hcCost", () => {
  it("pneumatic chain most expensive", () => {
    expect(hcCost("pneumatic_chain_spark")).toBeGreaterThan(hcCost("manual_hand_chain"));
  });
});

describe("powered", () => {
  it("electric chain hook is powered", () => {
    expect(powered("electric_chain_hook")).toBe(true);
  });
  it("manual hand chain not powered", () => {
    expect(powered("manual_hand_chain")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("pneumatic chain for hazardous", () => {
    expect(forHazardous("pneumatic_chain_spark")).toBe(true);
  });
  it("electric chain hook not for hazardous", () => {
    expect(forHazardous("electric_chain_hook")).toBe(false);
  });
});

describe("drive", () => {
  it("pneumatic uses air motor vane type", () => {
    expect(drive("pneumatic_chain_spark")).toBe("air_motor_vane_type_chain_sprocket_exhaust");
  });
});

describe("bestUse", () => {
  it("lever ratchet for tensioning", () => {
    expect(bestUse("lever_ratchet_pull")).toBe("tensioning_pulling_confined_space_alignment_work");
  });
});

describe("hoistChainTypes", () => {
  it("returns 5 types", () => {
    expect(hoistChainTypes()).toHaveLength(5);
  });
});
