import { describe, it, expect } from "vitest";
import {
  efficiency, quietness, aesthetics, zoneControl,
  dmCost_, multiZone, forRetrofit, indoor,
  bestUse, ductlessMiniTypes,
} from "../ductless-mini-calc.js";

describe("efficiency", () => {
  it("wall mount inverter most efficient", () => {
    expect(efficiency("wall_mount_inverter")).toBeGreaterThanOrEqual(efficiency("ceiling_cassette_4way"));
  });
});

describe("quietness", () => {
  it("wall mount inverter quietest", () => {
    expect(quietness("wall_mount_inverter")).toBeGreaterThan(quietness("floor_standing_console"));
  });
});

describe("aesthetics", () => {
  it("ceiling cassette best aesthetics", () => {
    expect(aesthetics("ceiling_cassette_4way")).toBeGreaterThan(aesthetics("floor_standing_console"));
  });
});

describe("zoneControl", () => {
  it("multi zone outdoor best zone control", () => {
    expect(zoneControl("multi_zone_outdoor")).toBeGreaterThan(zoneControl("floor_standing_console"));
  });
});

describe("dmCost_", () => {
  it("multi zone outdoor most expensive", () => {
    expect(dmCost_("multi_zone_outdoor")).toBeGreaterThan(dmCost_("wall_mount_inverter"));
  });
});

describe("multiZone", () => {
  it("multi zone outdoor is multi zone", () => {
    expect(multiZone("multi_zone_outdoor")).toBe(true);
  });
  it("wall mount inverter not multi zone", () => {
    expect(multiZone("wall_mount_inverter")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("wall mount inverter for retrofit", () => {
    expect(forRetrofit("wall_mount_inverter")).toBe(true);
  });
  it("ceiling cassette not for retrofit", () => {
    expect(forRetrofit("ceiling_cassette_4way")).toBe(false);
  });
});

describe("indoor", () => {
  it("concealed duct uses slim unit above ceiling", () => {
    expect(indoor("concealed_duct_slim")).toBe("slim_duct_unit_above_ceiling_short_duct_run_grille");
  });
});

describe("bestUse", () => {
  it("multi zone for whole house", () => {
    expect(bestUse("multi_zone_outdoor")).toBe("whole_house_multi_room_individual_zone_control");
  });
});

describe("ductlessMiniTypes", () => {
  it("returns 5 types", () => {
    expect(ductlessMiniTypes()).toHaveLength(5);
  });
});
