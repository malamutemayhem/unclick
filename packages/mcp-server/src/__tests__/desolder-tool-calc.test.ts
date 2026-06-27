import { describe, it, expect } from "vitest";
import {
  suctionPower, precision, speedWork, durability,
  toolCost, powered, forSmd, removalMethod,
  bestUse, desolderTools,
} from "../desolder-tool-calc.js";

describe("suctionPower", () => {
  it("vacuum desolder station strongest suction", () => {
    expect(suctionPower("vacuum_desolder_station")).toBeGreaterThan(suctionPower("desoldering_braid_wick"));
  });
});

describe("precision", () => {
  it("desoldering braid wick most precise", () => {
    expect(precision("desoldering_braid_wick")).toBeGreaterThan(precision("solder_sucker_manual"));
  });
});

describe("speedWork", () => {
  it("vacuum desolder station fastest work", () => {
    expect(speedWork("vacuum_desolder_station")).toBeGreaterThan(speedWork("desoldering_braid_wick"));
  });
});

describe("durability", () => {
  it("vacuum desolder station most durable", () => {
    expect(durability("vacuum_desolder_station")).toBeGreaterThan(durability("desoldering_braid_wick"));
  });
});

describe("toolCost", () => {
  it("vacuum desolder station most expensive", () => {
    expect(toolCost("vacuum_desolder_station")).toBeGreaterThan(toolCost("solder_sucker_manual"));
  });
});

describe("powered", () => {
  it("vacuum desolder station is powered", () => {
    expect(powered("vacuum_desolder_station")).toBe(true);
  });
  it("solder sucker manual not powered", () => {
    expect(powered("solder_sucker_manual")).toBe(false);
  });
});

describe("forSmd", () => {
  it("hot air rework gun is for smd", () => {
    expect(forSmd("hot_air_rework_gun")).toBe(true);
  });
  it("solder sucker manual not for smd", () => {
    expect(forSmd("solder_sucker_manual")).toBe(false);
  });
});

describe("removalMethod", () => {
  it("desoldering braid wick uses capillary wick absorb", () => {
    expect(removalMethod("desoldering_braid_wick")).toBe("capillary_wick_absorb");
  });
});

describe("bestUse", () => {
  it("hot air rework gun best for smd rework reflow", () => {
    expect(bestUse("hot_air_rework_gun")).toBe("smd_rework_reflow");
  });
});

describe("desolderTools", () => {
  it("returns 5 types", () => {
    expect(desolderTools()).toHaveLength(5);
  });
});
