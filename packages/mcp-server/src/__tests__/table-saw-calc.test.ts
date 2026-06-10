import { describe, it, expect } from "vitest";
import {
  cuttingCapacity, cutAccuracy, dustCollection, portabilityScore,
  sawCost, rivenKnife, dadoCapble, fenceType,
  bestShop, tableSaws,
} from "../table-saw-calc.js";

describe("cuttingCapacity", () => {
  it("cabinet stationary highest capacity", () => {
    expect(cuttingCapacity("cabinet_stationary")).toBeGreaterThan(cuttingCapacity("benchtop_mini"));
  });
});

describe("cutAccuracy", () => {
  it("cabinet stationary most accurate", () => {
    expect(cutAccuracy("cabinet_stationary")).toBeGreaterThan(cutAccuracy("jobsite_portable"));
  });
});

describe("dustCollection", () => {
  it("cabinet stationary best dust collection", () => {
    expect(dustCollection("cabinet_stationary")).toBeGreaterThan(dustCollection("jobsite_portable"));
  });
});

describe("portabilityScore", () => {
  it("jobsite portable most portable", () => {
    expect(portabilityScore("jobsite_portable")).toBeGreaterThan(portabilityScore("cabinet_stationary"));
  });
});

describe("sawCost", () => {
  it("cabinet stationary most expensive", () => {
    expect(sawCost("cabinet_stationary")).toBeGreaterThan(sawCost("benchtop_mini"));
  });
});

describe("rivenKnife", () => {
  it("contractor stand has riven knife", () => {
    expect(rivenKnife("contractor_stand")).toBe(true);
  });
  it("benchtop mini does not", () => {
    expect(rivenKnife("benchtop_mini")).toBe(false);
  });
});

describe("dadoCapble", () => {
  it("cabinet stationary is dado capable", () => {
    expect(dadoCapble("cabinet_stationary")).toBe(true);
  });
  it("jobsite portable is not", () => {
    expect(dadoCapble("jobsite_portable")).toBe(false);
  });
});

describe("fenceType", () => {
  it("cabinet stationary uses biesemeyer precision rail", () => {
    expect(fenceType("cabinet_stationary")).toBe("biesemeyer_precision_rail");
  });
});

describe("bestShop", () => {
  it("benchtop mini for apartment small project", () => {
    expect(bestShop("benchtop_mini")).toBe("apartment_small_project");
  });
});

describe("tableSaws", () => {
  it("returns 5 types", () => {
    expect(tableSaws()).toHaveLength(5);
  });
});
