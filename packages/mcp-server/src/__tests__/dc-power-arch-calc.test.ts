import { describe, it, expect } from "vitest";
import {
  efficiency, reliability, density, flexibility,
  archCost, dcDistribution, forEdge, conversion,
  bestUse, dcPowerArchs,
} from "../dc-power-arch-calc.js";

describe("efficiency", () => {
  it("hvdc 380v most efficient", () => {
    expect(efficiency("hvdc_380v")).toBeGreaterThan(efficiency("ac_ups_pdu"));
  });
});

describe("reliability", () => {
  it("ac ups pdu most reliable", () => {
    expect(reliability("ac_ups_pdu")).toBeGreaterThan(reliability("fuel_cell_dc"));
  });
});

describe("density", () => {
  it("dc bus 48v direct highest density", () => {
    expect(density("dc_bus_48v_direct")).toBeGreaterThan(density("fuel_cell_dc"));
  });
});

describe("flexibility", () => {
  it("ac ups pdu most flexible", () => {
    expect(flexibility("ac_ups_pdu")).toBeGreaterThan(flexibility("fuel_cell_dc"));
  });
});

describe("archCost", () => {
  it("fuel cell dc most expensive", () => {
    expect(archCost("fuel_cell_dc")).toBeGreaterThan(archCost("dc_bus_48v_direct"));
  });
});

describe("dcDistribution", () => {
  it("hvdc 380v is dc distribution", () => {
    expect(dcDistribution("hvdc_380v")).toBe(true);
  });
  it("ac ups pdu not dc distribution", () => {
    expect(dcDistribution("ac_ups_pdu")).toBe(false);
  });
});

describe("forEdge", () => {
  it("dc bus 48v direct is for edge", () => {
    expect(forEdge("dc_bus_48v_direct")).toBe(true);
  });
  it("hvdc 380v not for edge", () => {
    expect(forEdge("hvdc_380v")).toBe(false);
  });
});

describe("conversion", () => {
  it("fuel cell dc uses hydrogen pem dc direct", () => {
    expect(conversion("fuel_cell_dc")).toBe("hydrogen_pem_dc_direct");
  });
});

describe("bestUse", () => {
  it("hvdc 380v best for hyperscale efficiency", () => {
    expect(bestUse("hvdc_380v")).toBe("hyperscale_efficiency");
  });
});

describe("dcPowerArchs", () => {
  it("returns 5 types", () => {
    expect(dcPowerArchs()).toHaveLength(5);
  });
});
