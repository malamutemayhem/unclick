import { describe, it, expect } from "vitest";
import {
  conductivity, pulloutResist, vibrationSafe, installSpeed,
  termCost, insulated, forHighVibration, termStyle,
  bestUse, ringTerminals,
} from "../ring-terminal-calc.js";

describe("conductivity", () => {
  it("non insulated bare ring best conductivity", () => {
    expect(conductivity("non_insulated_bare_ring")).toBeGreaterThan(conductivity("locking_fork_spade"));
  });
});

describe("pulloutResist", () => {
  it("heat shrink ring seal best pullout resistance", () => {
    expect(pulloutResist("heat_shrink_ring_seal")).toBeGreaterThan(pulloutResist("locking_fork_spade"));
  });
});

describe("vibrationSafe", () => {
  it("heat shrink ring seal best vibration safety", () => {
    expect(vibrationSafe("heat_shrink_ring_seal")).toBeGreaterThan(vibrationSafe("locking_fork_spade"));
  });
});

describe("installSpeed", () => {
  it("locking fork spade fastest install", () => {
    expect(installSpeed("locking_fork_spade")).toBeGreaterThan(installSpeed("heat_shrink_ring_seal"));
  });
});

describe("termCost", () => {
  it("heat shrink ring seal most expensive", () => {
    expect(termCost("heat_shrink_ring_seal")).toBeGreaterThan(termCost("insulated_vinyl_ring"));
  });
});

describe("insulated", () => {
  it("insulated vinyl ring is insulated", () => {
    expect(insulated("insulated_vinyl_ring")).toBe(true);
  });
  it("non insulated bare ring not insulated", () => {
    expect(insulated("non_insulated_bare_ring")).toBe(false);
  });
});

describe("forHighVibration", () => {
  it("insulated vinyl ring is for high vibration", () => {
    expect(forHighVibration("insulated_vinyl_ring")).toBe(true);
  });
  it("locking fork spade not for high vibration", () => {
    expect(forHighVibration("locking_fork_spade")).toBe(false);
  });
});

describe("termStyle", () => {
  it("flanged ring large uses funnel entry ring", () => {
    expect(termStyle("flanged_ring_large")).toBe("funnel_entry_ring");
  });
});

describe("bestUse", () => {
  it("heat shrink ring seal best for marine battery connect", () => {
    expect(bestUse("heat_shrink_ring_seal")).toBe("marine_battery_connect");
  });
});

describe("ringTerminals", () => {
  it("returns 5 types", () => {
    expect(ringTerminals()).toHaveLength(5);
  });
});
