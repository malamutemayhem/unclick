import { describe, it, expect } from "vitest";
import {
  throughput, energy, security, aesthetic,
  rdCost, automatic, forSecurity, wing,
  bestUse, revolvingDoorTypes,
} from "../revolving-door-calc.js";

describe("throughput", () => {
  it("automatic highest throughput", () => {
    expect(throughput("automatic_three_wing")).toBeGreaterThan(throughput("security_mantrap_interlocked"));
  });
});

describe("energy", () => {
  it("four wing best energy", () => {
    expect(energy("four_wing_manual")).toBeGreaterThan(energy("security_mantrap_interlocked"));
  });
});

describe("security", () => {
  it("mantrap most secure", () => {
    expect(security("security_mantrap_interlocked")).toBeGreaterThan(security("manual_three_wing"));
  });
});

describe("aesthetic", () => {
  it("all glass best aesthetic", () => {
    expect(aesthetic("all_glass_crystal")).toBeGreaterThan(aesthetic("security_mantrap_interlocked"));
  });
});

describe("rdCost", () => {
  it("mantrap most expensive", () => {
    expect(rdCost("security_mantrap_interlocked")).toBeGreaterThan(rdCost("manual_three_wing"));
  });
});

describe("automatic", () => {
  it("automatic three wing is automatic", () => {
    expect(automatic("automatic_three_wing")).toBe(true);
  });
  it("manual three wing not automatic", () => {
    expect(automatic("manual_three_wing")).toBe(false);
  });
});

describe("forSecurity", () => {
  it("mantrap for security", () => {
    expect(forSecurity("security_mantrap_interlocked")).toBe(true);
  });
  it("all glass not security", () => {
    expect(forSecurity("all_glass_crystal")).toBe(false);
  });
});

describe("wing", () => {
  it("all glass uses curved drum", () => {
    expect(wing("all_glass_crystal")).toBe("frameless_curved_glass_drum");
  });
});

describe("bestUse", () => {
  it("mantrap for data center", () => {
    expect(bestUse("security_mantrap_interlocked")).toBe("data_center_embassy_secure");
  });
});

describe("revolvingDoorTypes", () => {
  it("returns 5 types", () => {
    expect(revolvingDoorTypes()).toHaveLength(5);
  });
});
