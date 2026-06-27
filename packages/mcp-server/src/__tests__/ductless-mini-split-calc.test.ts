import { describe, it, expect } from "vitest";
import {
  efficiency, quietness, zoneControl, installEase,
  dmCost, inverter, forRetrofit, indoor,
  bestUse, ductlessMiniSplitTypes,
} from "../ductless-mini-split-calc.js";

describe("efficiency", () => {
  it("single zone wall most efficient", () => {
    expect(efficiency("single_zone_wall")).toBeGreaterThan(efficiency("multi_zone"));
  });
});

describe("quietness", () => {
  it("concealed duct quietest", () => {
    expect(quietness("concealed_duct")).toBeGreaterThan(quietness("floor_mounted"));
  });
});

describe("zoneControl", () => {
  it("multi zone best zone control", () => {
    expect(zoneControl("multi_zone")).toBeGreaterThan(zoneControl("single_zone_wall"));
  });
});

describe("installEase", () => {
  it("single zone wall easiest install", () => {
    expect(installEase("single_zone_wall")).toBeGreaterThan(installEase("concealed_duct"));
  });
});

describe("dmCost", () => {
  it("concealed duct most expensive", () => {
    expect(dmCost("concealed_duct")).toBeGreaterThan(dmCost("single_zone_wall"));
  });
});

describe("inverter", () => {
  it("all types use inverter", () => {
    expect(inverter("single_zone_wall")).toBe(true);
    expect(inverter("concealed_duct")).toBe(true);
  });
});

describe("forRetrofit", () => {
  it("single zone wall for retrofit", () => {
    expect(forRetrofit("single_zone_wall")).toBe(true);
  });
  it("ceiling cassette not for retrofit", () => {
    expect(forRetrofit("ceiling_cassette")).toBe(false);
  });
});

describe("indoor", () => {
  it("concealed duct uses slim duct", () => {
    expect(indoor("concealed_duct")).toBe("slim_duct_concealed_above_ceiling_short_duct_run_grille");
  });
});

describe("bestUse", () => {
  it("multi zone for whole home retrofit", () => {
    expect(bestUse("multi_zone")).toBe("whole_home_retrofit_condo_multiple_room_individual_control");
  });
});

describe("ductlessMiniSplitTypes", () => {
  it("returns 5 types", () => {
    expect(ductlessMiniSplitTypes()).toHaveLength(5);
  });
});
