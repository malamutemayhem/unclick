import { describe, it, expect } from "vitest";
import {
  heatTransfer, throughput, pressureRating, cleanability,
  pcCost, expandable, forDairy, chillerConfig,
  bestUse, plateChillerTypes,
} from "../plate-chiller-calc.js";

describe("heatTransfer", () => {
  it("gasketed plate best heat transfer", () => {
    expect(heatTransfer("gasketed_plate")).toBeGreaterThan(heatTransfer("plate_and_shell"));
  });
});

describe("throughput", () => {
  it("gasketed plate highest throughput", () => {
    expect(throughput("gasketed_plate")).toBeGreaterThan(throughput("brazed_plate"));
  });
});

describe("pressureRating", () => {
  it("welded plate best pressure rating", () => {
    expect(pressureRating("welded_plate")).toBeGreaterThan(pressureRating("gasketed_plate"));
  });
});

describe("cleanability", () => {
  it("gasketed plate best cleanability", () => {
    expect(cleanability("gasketed_plate")).toBeGreaterThan(cleanability("brazed_plate"));
  });
});

describe("pcCost", () => {
  it("plate and shell most expensive", () => {
    expect(pcCost("plate_and_shell")).toBeGreaterThan(pcCost("brazed_plate"));
  });
});

describe("expandable", () => {
  it("gasketed plate is expandable", () => {
    expect(expandable("gasketed_plate")).toBe(true);
  });
  it("brazed plate not expandable", () => {
    expect(expandable("brazed_plate")).toBe(false);
  });
});

describe("forDairy", () => {
  it("gasketed plate for dairy", () => {
    expect(forDairy("gasketed_plate")).toBe(true);
  });
  it("brazed plate not for dairy", () => {
    expect(forDairy("brazed_plate")).toBe(false);
  });
});

describe("chillerConfig", () => {
  it("semi welded uses weld one side gasket other ammonia safe", () => {
    expect(chillerConfig("semi_welded_plate")).toBe("semi_welded_plate_chiller_weld_one_side_gasket_other_ammonia_safe");
  });
});

describe("bestUse", () => {
  it("welded plate for chemical plant aggressive media high pressure", () => {
    expect(bestUse("welded_plate")).toBe("chemical_plant_welded_plate_chiller_aggressive_media_high_pressure");
  });
});

describe("plateChillerTypes", () => {
  it("returns 5 types", () => {
    expect(plateChillerTypes()).toHaveLength(5);
  });
});
