import { describe, it, expect } from "vitest";
import {
  dryingCapacity, dryingSpeed, storageWhenEmpty, stability,
  rackCost, noFloorSpace, usesElectricity, mountType,
  bestSetup, dryingRacks,
} from "../drying-rack-calc.js";

describe("dryingCapacity", () => {
  it("retractable clothesline highest capacity", () => {
    expect(dryingCapacity("retractable_clothesline")).toBeGreaterThan(dryingCapacity("over_door_hang"));
  });
});

describe("dryingSpeed", () => {
  it("heated electric rack fastest drying", () => {
    expect(dryingSpeed("heated_electric_rack")).toBeGreaterThan(dryingSpeed("accordion_fold"));
  });
});

describe("storageWhenEmpty", () => {
  it("ceiling pulley best storage when empty", () => {
    expect(storageWhenEmpty("ceiling_pulley")).toBeGreaterThan(storageWhenEmpty("heated_electric_rack"));
  });
});

describe("stability", () => {
  it("ceiling pulley most stable", () => {
    expect(stability("ceiling_pulley")).toBeGreaterThan(stability("over_door_hang"));
  });
});

describe("rackCost", () => {
  it("heated electric rack most expensive", () => {
    expect(rackCost("heated_electric_rack")).toBeGreaterThan(rackCost("over_door_hang"));
  });
});

describe("noFloorSpace", () => {
  it("ceiling pulley uses no floor space", () => {
    expect(noFloorSpace("ceiling_pulley")).toBe(true);
  });
  it("accordion fold uses floor space", () => {
    expect(noFloorSpace("accordion_fold")).toBe(false);
  });
});

describe("usesElectricity", () => {
  it("heated electric rack uses electricity", () => {
    expect(usesElectricity("heated_electric_rack")).toBe(true);
  });
  it("ceiling pulley does not", () => {
    expect(usesElectricity("ceiling_pulley")).toBe(false);
  });
});

describe("mountType", () => {
  it("ceiling pulley uses ceiling screw rope pulley", () => {
    expect(mountType("ceiling_pulley")).toBe("ceiling_screw_rope_pulley");
  });
});

describe("bestSetup", () => {
  it("retractable clothesline best for outdoor yard patio", () => {
    expect(bestSetup("retractable_clothesline")).toBe("outdoor_yard_patio");
  });
});

describe("dryingRacks", () => {
  it("returns 5 types", () => {
    expect(dryingRacks()).toHaveLength(5);
  });
});
