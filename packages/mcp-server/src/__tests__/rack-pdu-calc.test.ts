import { describe, it, expect } from "vitest";
import {
  capacity, monitoring, control, efficiency,
  pduCost, perOutlet, forHpc, feed,
  bestUse, rackPdus,
} from "../rack-pdu-calc.js";

describe("capacity", () => {
  it("busway overhead highest capacity", () => {
    expect(capacity("busway_overhead")).toBeGreaterThan(capacity("basic_metered"));
  });
});

describe("monitoring", () => {
  it("intelligent managed best monitoring", () => {
    expect(monitoring("intelligent_managed")).toBeGreaterThan(monitoring("basic_metered"));
  });
});

describe("control", () => {
  it("intelligent managed best control", () => {
    expect(control("intelligent_managed")).toBeGreaterThan(control("basic_metered"));
  });
});

describe("efficiency", () => {
  it("busway overhead most efficient", () => {
    expect(efficiency("busway_overhead")).toBeGreaterThan(efficiency("switched_outlet"));
  });
});

describe("pduCost", () => {
  it("busway overhead most expensive", () => {
    expect(pduCost("busway_overhead")).toBeGreaterThan(pduCost("basic_metered"));
  });
});

describe("perOutlet", () => {
  it("switched outlet has per outlet", () => {
    expect(perOutlet("switched_outlet")).toBe(true);
  });
  it("basic metered no per outlet", () => {
    expect(perOutlet("basic_metered")).toBe(false);
  });
});

describe("forHpc", () => {
  it("busway overhead is for hpc", () => {
    expect(forHpc("busway_overhead")).toBe(true);
  });
  it("basic metered not for hpc", () => {
    expect(forHpc("basic_metered")).toBe(false);
  });
});

describe("feed", () => {
  it("busway overhead uses busbar 400a overhead", () => {
    expect(feed("busway_overhead")).toBe("busbar_400a_overhead");
  });
});

describe("bestUse", () => {
  it("intelligent managed best for colo billing dcim", () => {
    expect(bestUse("intelligent_managed")).toBe("colo_billing_dcim");
  });
});

describe("rackPdus", () => {
  it("returns 5 types", () => {
    expect(rackPdus()).toHaveLength(5);
  });
});
