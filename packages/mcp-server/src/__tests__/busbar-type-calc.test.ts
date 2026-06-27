import { describe, it, expect } from "vitest";
import {
  current, voltage, thermal, flexibility,
  bbCost, insulated, forDataCenter, material,
  bestUse, busbarTypes,
} from "../busbar-type-calc.js";

describe("current", () => {
  it("insulated enclosed highest current", () => {
    expect(current("insulated_enclosed_bus")).toBeGreaterThan(current("flexible_braided_strap"));
  });
});

describe("voltage", () => {
  it("aluminum tubular highest voltage", () => {
    expect(voltage("aluminum_tubular")).toBeGreaterThan(voltage("flexible_braided_strap"));
  });
});

describe("thermal", () => {
  it("laminated sandwich best thermal", () => {
    expect(thermal("laminated_sandwich")).toBeGreaterThan(thermal("flexible_braided_strap"));
  });
});

describe("flexibility", () => {
  it("flexible braided most flexible", () => {
    expect(flexibility("flexible_braided_strap")).toBeGreaterThan(flexibility("aluminum_tubular"));
  });
});

describe("bbCost", () => {
  it("insulated enclosed most expensive", () => {
    expect(bbCost("insulated_enclosed_bus")).toBeGreaterThan(bbCost("aluminum_tubular"));
  });
});

describe("insulated", () => {
  it("laminated sandwich is insulated", () => {
    expect(insulated("laminated_sandwich")).toBe(true);
  });
  it("copper flat bar not insulated", () => {
    expect(insulated("copper_flat_bar")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("insulated enclosed for data center", () => {
    expect(forDataCenter("insulated_enclosed_bus")).toBe(true);
  });
  it("copper flat bar not for data center", () => {
    expect(forDataCenter("copper_flat_bar")).toBe(false);
  });
});

describe("material", () => {
  it("aluminum tubular uses 6101 alloy", () => {
    expect(material("aluminum_tubular")).toBe("6101_t6_aluminum_alloy");
  });
});

describe("bestUse", () => {
  it("copper flat bar best for switchgear main bus", () => {
    expect(bestUse("copper_flat_bar")).toBe("switchgear_main_bus_heavy");
  });
});

describe("busbarTypes", () => {
  it("returns 5 types", () => {
    expect(busbarTypes()).toHaveLength(5);
  });
});
