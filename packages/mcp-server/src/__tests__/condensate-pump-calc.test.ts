import { describe, it, expect } from "vitest";
import {
  capacity, reliability, efficiency, maintenance,
  cpCost, redundant, forSteam, drive,
  bestUse, condensatePumpTypes,
} from "../condensate-pump-calc.js";

describe("capacity", () => {
  it("vacuum highest capacity", () => {
    expect(capacity("vacuum_deaerating")).toBeGreaterThan(capacity("mini_split_ac_lift"));
  });
});

describe("reliability", () => {
  it("duplex most reliable", () => {
    expect(reliability("duplex_alternating")).toBeGreaterThan(reliability("mini_split_ac_lift"));
  });
});

describe("efficiency", () => {
  it("vacuum most efficient", () => {
    expect(efficiency("vacuum_deaerating")).toBeGreaterThan(efficiency("mini_split_ac_lift"));
  });
});

describe("maintenance", () => {
  it("vacuum highest maintenance", () => {
    expect(maintenance("vacuum_deaerating")).toBeGreaterThan(maintenance("mini_split_ac_lift"));
  });
});

describe("cpCost", () => {
  it("vacuum most expensive", () => {
    expect(cpCost("vacuum_deaerating")).toBeGreaterThan(cpCost("mini_split_ac_lift"));
  });
});

describe("redundant", () => {
  it("duplex is redundant", () => {
    expect(redundant("duplex_alternating")).toBe(true);
  });
  it("centrifugal not redundant", () => {
    expect(redundant("centrifugal_electric_return")).toBe(false);
  });
});

describe("forSteam", () => {
  it("pressure powered for steam", () => {
    expect(forSteam("pressure_powered_steam")).toBe(true);
  });
  it("mini split not for steam", () => {
    expect(forSteam("mini_split_ac_lift")).toBe(false);
  });
});

describe("drive", () => {
  it("duplex uses alternating controller", () => {
    expect(drive("duplex_alternating")).toBe("duplex_alternating_controller");
  });
});

describe("bestUse", () => {
  it("mini split for ac condensate", () => {
    expect(bestUse("mini_split_ac_lift")).toBe("ac_condensate_removal_lift");
  });
});

describe("condensatePumpTypes", () => {
  it("returns 5 types", () => {
    expect(condensatePumpTypes()).toHaveLength(5);
  });
});
