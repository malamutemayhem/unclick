import { describe, it, expect } from "vitest";
import {
  capacity, reach, latency, availability,
  dciCost, encrypted, forMultiRegion, transport,
  bestUse, dcInterconnects,
} from "../dc-interconnect-calc.js";

describe("capacity", () => {
  it("submarine cable highest capacity", () => {
    expect(capacity("submarine_cable")).toBeGreaterThan(capacity("free_space_optical"));
  });
});

describe("reach", () => {
  it("submarine cable longest reach", () => {
    expect(reach("submarine_cable")).toBeGreaterThan(reach("free_space_optical"));
  });
});

describe("latency", () => {
  it("dark fiber direct lowest latency", () => {
    expect(latency("dark_fiber_direct")).toBeGreaterThan(latency("submarine_cable"));
  });
});

describe("availability", () => {
  it("metro wavelength highest availability", () => {
    expect(availability("metro_wavelength")).toBeGreaterThan(availability("free_space_optical"));
  });
});

describe("dciCost", () => {
  it("submarine cable most expensive", () => {
    expect(dciCost("submarine_cable")).toBeGreaterThan(dciCost("free_space_optical"));
  });
});

describe("encrypted", () => {
  it("dci dwdm coherent is encrypted", () => {
    expect(encrypted("dci_dwdm_coherent")).toBe(true);
  });
  it("dark fiber direct not encrypted", () => {
    expect(encrypted("dark_fiber_direct")).toBe(false);
  });
});

describe("forMultiRegion", () => {
  it("submarine cable is for multi region", () => {
    expect(forMultiRegion("submarine_cable")).toBe(true);
  });
  it("dark fiber direct not for multi region", () => {
    expect(forMultiRegion("dark_fiber_direct")).toBe(false);
  });
});

describe("transport", () => {
  it("submarine cable uses sdm multi core fiber", () => {
    expect(transport("submarine_cable")).toBe("sdm_multi_core_fiber");
  });
});

describe("bestUse", () => {
  it("dark fiber direct best for ultra low latency hft", () => {
    expect(bestUse("dark_fiber_direct")).toBe("ultra_low_latency_hft");
  });
});

describe("dcInterconnects", () => {
  it("returns 5 types", () => {
    expect(dcInterconnects()).toHaveLength(5);
  });
});
