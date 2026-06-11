import { describe, it, expect } from "vitest";
import {
  power, speed, cost_, installEase,
  evCost, dcFast, forCommercial, connector,
  bestUse, evChargerTypes,
} from "../ev-charger-calc.js";

describe("power", () => {
  it("ultra highest power", () => {
    expect(power("dc_ultra_350kw_liquid")).toBeGreaterThan(power("level_2_wall_mount"));
  });
});

describe("speed", () => {
  it("ultra fastest", () => {
    expect(speed("dc_ultra_350kw_liquid")).toBeGreaterThan(speed("level_2_wall_mount"));
  });
});

describe("cost_", () => {
  it("ultra most expensive", () => {
    expect(cost_("dc_ultra_350kw_liquid")).toBeGreaterThan(cost_("level_2_wall_mount"));
  });
});

describe("installEase", () => {
  it("wall mount easiest install", () => {
    expect(installEase("level_2_wall_mount")).toBeGreaterThan(installEase("dc_ultra_350kw_liquid"));
  });
});

describe("evCost", () => {
  it("ultra highest ev cost", () => {
    expect(evCost("dc_ultra_350kw_liquid")).toBeGreaterThan(evCost("level_2_wall_mount"));
  });
});

describe("dcFast", () => {
  it("50kw is dc fast", () => {
    expect(dcFast("dc_fast_50kw_ccs")).toBe(true);
  });
  it("wall mount not dc fast", () => {
    expect(dcFast("level_2_wall_mount")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("pedestal for commercial", () => {
    expect(forCommercial("level_2_pedestal_dual")).toBe(true);
  });
  it("wall mount not commercial", () => {
    expect(forCommercial("level_2_wall_mount")).toBe(false);
  });
});

describe("connector", () => {
  it("150kw uses cooled ccs", () => {
    expect(connector("dc_fast_150kw_ccs")).toBe("ccs_combo_1_dc_150kw_cooled");
  });
});

describe("bestUse", () => {
  it("wall mount for residential", () => {
    expect(bestUse("level_2_wall_mount")).toBe("residential_garage_overnight");
  });
});

describe("evChargerTypes", () => {
  it("returns 5 types", () => {
    expect(evChargerTypes()).toHaveLength(5);
  });
});
