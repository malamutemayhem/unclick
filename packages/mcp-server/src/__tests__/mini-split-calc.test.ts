import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, noise, aesthetic,
  msCost, multiZone, forRetrofit, compressor,
  bestUse, miniSplitTypes,
} from "../mini-split-calc.js";

describe("efficiency", () => {
  it("wall mount most efficient", () => {
    expect(efficiency("wall_mount_single_zone")).toBeGreaterThan(efficiency("multi_zone_outdoor_unit"));
  });
});

describe("capacity", () => {
  it("multi zone highest capacity", () => {
    expect(capacity("multi_zone_outdoor_unit")).toBeGreaterThan(capacity("wall_mount_single_zone"));
  });
});

describe("noise", () => {
  it("concealed duct quietest", () => {
    expect(noise("concealed_duct_slim")).toBeGreaterThan(noise("multi_zone_outdoor_unit"));
  });
});

describe("aesthetic", () => {
  it("concealed duct best aesthetic", () => {
    expect(aesthetic("concealed_duct_slim")).toBeGreaterThan(aesthetic("wall_mount_single_zone"));
  });
});

describe("msCost", () => {
  it("multi zone most expensive", () => {
    expect(msCost("multi_zone_outdoor_unit")).toBeGreaterThan(msCost("wall_mount_single_zone"));
  });
});

describe("multiZone", () => {
  it("multi zone is multi zone", () => {
    expect(multiZone("multi_zone_outdoor_unit")).toBe(true);
  });
  it("wall mount not multi zone", () => {
    expect(multiZone("wall_mount_single_zone")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("wall mount for retrofit", () => {
    expect(forRetrofit("wall_mount_single_zone")).toBe(true);
  });
  it("ceiling cassette not retrofit", () => {
    expect(forRetrofit("ceiling_cassette_commercial")).toBe(false);
  });
});

describe("compressor", () => {
  it("concealed uses slim duct", () => {
    expect(compressor("concealed_duct_slim")).toBe("inverter_slim_duct_concealed");
  });
});

describe("bestUse", () => {
  it("multi zone for whole house", () => {
    expect(bestUse("multi_zone_outdoor_unit")).toBe("whole_house_no_ductwork");
  });
});

describe("miniSplitTypes", () => {
  it("returns 5 types", () => {
    expect(miniSplitTypes()).toHaveLength(5);
  });
});
