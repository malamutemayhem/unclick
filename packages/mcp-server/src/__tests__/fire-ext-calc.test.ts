import { describe, it, expect } from "vitest";
import {
  fireRating, rechargeEase, cleanupMess, sprayRange,
  extCost, electricalSafe, cookingSafe, agentType,
  bestHazard, fireExtinguishers,
} from "../fire-ext-calc.js";

describe("fireRating", () => {
  it("dry powder abc highest fire rating", () => {
    expect(fireRating("dry_powder_abc")).toBeGreaterThan(fireRating("co2_class_b"));
  });
});

describe("rechargeEase", () => {
  it("water class a easiest recharge", () => {
    expect(rechargeEase("water_class_a")).toBeGreaterThan(rechargeEase("wet_chemical_k"));
  });
});

describe("cleanupMess", () => {
  it("dry powder abc messiest cleanup", () => {
    expect(cleanupMess("dry_powder_abc")).toBeGreaterThan(cleanupMess("co2_class_b"));
  });
});

describe("sprayRange", () => {
  it("water class a longest spray range", () => {
    expect(sprayRange("water_class_a")).toBeGreaterThan(sprayRange("co2_class_b"));
  });
});

describe("extCost", () => {
  it("wet chemical k most expensive", () => {
    expect(extCost("wet_chemical_k")).toBeGreaterThan(extCost("water_class_a"));
  });
});

describe("electricalSafe", () => {
  it("co2 class b is electrical safe", () => {
    expect(electricalSafe("co2_class_b")).toBe(true);
  });
  it("water class a is not", () => {
    expect(electricalSafe("water_class_a")).toBe(false);
  });
});

describe("cookingSafe", () => {
  it("wet chemical k is cooking safe", () => {
    expect(cookingSafe("wet_chemical_k")).toBe(true);
  });
  it("dry powder abc is not", () => {
    expect(cookingSafe("dry_powder_abc")).toBe(false);
  });
});

describe("agentType", () => {
  it("foam afff uses aqueous film forming foam", () => {
    expect(agentType("foam_afff")).toBe("aqueous_film_forming_foam");
  });
});

describe("bestHazard", () => {
  it("co2 class b for server room electronics", () => {
    expect(bestHazard("co2_class_b")).toBe("server_room_electronics");
  });
});

describe("fireExtinguishers", () => {
  it("returns 5 types", () => {
    expect(fireExtinguishers()).toHaveLength(5);
  });
});
