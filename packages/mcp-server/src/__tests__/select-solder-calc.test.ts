import { describe, it, expect } from "vitest";
import {
  precision, throughput, flexibility, heatControl,
  systemCost, automated, contactless, heatSource,
  bestUse, selectSolders,
} from "../select-solder-calc.js";

describe("precision", () => {
  it("laser solder beam most precise", () => {
    expect(precision("laser_solder_beam")).toBeGreaterThan(precision("dip_solder_bath"));
  });
});

describe("throughput", () => {
  it("dip solder bath highest throughput", () => {
    expect(throughput("dip_solder_bath")).toBeGreaterThan(throughput("laser_solder_beam"));
  });
});

describe("flexibility", () => {
  it("robot iron cartesian most flexible", () => {
    expect(flexibility("robot_iron_cartesian")).toBeGreaterThan(flexibility("dip_solder_bath"));
  });
});

describe("heatControl", () => {
  it("laser solder beam best heat control", () => {
    expect(heatControl("laser_solder_beam")).toBeGreaterThan(heatControl("dip_solder_bath"));
  });
});

describe("systemCost", () => {
  it("laser solder beam most expensive", () => {
    expect(systemCost("laser_solder_beam")).toBeGreaterThan(systemCost("dip_solder_bath"));
  });
});

describe("automated", () => {
  it("miniwave nozzle point is automated", () => {
    expect(automated("miniwave_nozzle_point")).toBe(true);
  });
  it("dip solder bath not automated", () => {
    expect(automated("dip_solder_bath")).toBe(false);
  });
});

describe("contactless", () => {
  it("laser solder beam is contactless", () => {
    expect(contactless("laser_solder_beam")).toBe(true);
  });
  it("robot iron cartesian not contactless", () => {
    expect(contactless("robot_iron_cartesian")).toBe(false);
  });
});

describe("heatSource", () => {
  it("robot iron cartesian uses heated tip cartridge", () => {
    expect(heatSource("robot_iron_cartesian")).toBe("heated_tip_cartridge");
  });
});

describe("bestUse", () => {
  it("laser solder beam best for heat sensitive precision", () => {
    expect(bestUse("laser_solder_beam")).toBe("heat_sensitive_precision");
  });
});

describe("selectSolders", () => {
  it("returns 5 types", () => {
    expect(selectSolders()).toHaveLength(5);
  });
});
