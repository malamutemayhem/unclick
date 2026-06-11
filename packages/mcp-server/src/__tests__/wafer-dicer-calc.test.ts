import { describe, it, expect } from "vitest";
import {
  cutAccuracy, throughput, kerf, chipping,
  wdCost, contactFree, forThinWafer, dicerConfig,
  bestUse, waferDicerTypes,
} from "../wafer-dicer-calc.js";

describe("cutAccuracy", () => {
  it("stealth dicer best cut accuracy", () => {
    expect(cutAccuracy("stealth_dicer")).toBeGreaterThan(cutAccuracy("scribe_break"));
  });
});

describe("throughput", () => {
  it("scribe break highest throughput", () => {
    expect(throughput("scribe_break")).toBeGreaterThan(throughput("plasma_dicer"));
  });
});

describe("kerf", () => {
  it("stealth dicer best kerf", () => {
    expect(kerf("stealth_dicer")).toBeGreaterThan(kerf("blade_dicer"));
  });
});

describe("chipping", () => {
  it("stealth dicer best chipping control", () => {
    expect(chipping("stealth_dicer")).toBeGreaterThan(chipping("scribe_break"));
  });
});

describe("wdCost", () => {
  it("stealth dicer most expensive", () => {
    expect(wdCost("stealth_dicer")).toBeGreaterThan(wdCost("scribe_break"));
  });
});

describe("contactFree", () => {
  it("laser dicer is contact free", () => {
    expect(contactFree("laser_dicer")).toBe(true);
  });
  it("blade dicer not contact free", () => {
    expect(contactFree("blade_dicer")).toBe(false);
  });
});

describe("forThinWafer", () => {
  it("stealth dicer for thin wafer", () => {
    expect(forThinWafer("stealth_dicer")).toBe(true);
  });
  it("blade dicer not for thin wafer", () => {
    expect(forThinWafer("blade_dicer")).toBe(false);
  });
});

describe("dicerConfig", () => {
  it("stealth dicer uses internal laser modify zero kerf split", () => {
    expect(dicerConfig("stealth_dicer")).toBe("stealth_wafer_dicer_internal_laser_modify_zero_kerf_split");
  });
});

describe("bestUse", () => {
  it("laser dicer for mems sensor narrow kerf no contact fragile", () => {
    expect(bestUse("laser_dicer")).toBe("mems_sensor_laser_wafer_dicer_narrow_kerf_no_contact_fragile");
  });
});

describe("waferDicerTypes", () => {
  it("returns 5 types", () => {
    expect(waferDicerTypes()).toHaveLength(5);
  });
});
