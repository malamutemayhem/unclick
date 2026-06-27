import { describe, it, expect } from "vitest";
import {
  precision, speed, surfaceFinish, complexity,
  emCost, noForce, forHardened, electrode,
  bestUse, edmMachineTypes,
} from "../edm-machine-calc.js";

describe("precision", () => {
  it("micro edm most precise", () => {
    expect(precision("micro_edm_precision")).toBeGreaterThan(precision("hole_drill_edm"));
  });
});

describe("speed", () => {
  it("wire submerged fastest", () => {
    expect(speed("wire_submerged_flush")).toBeGreaterThan(speed("micro_edm_precision"));
  });
});

describe("surfaceFinish", () => {
  it("micro edm best surface", () => {
    expect(surfaceFinish("micro_edm_precision")).toBeGreaterThan(surfaceFinish("hole_drill_edm"));
  });
});

describe("complexity", () => {
  it("sinker most complex shapes", () => {
    expect(complexity("sinker_ram_die")).toBeGreaterThan(complexity("hole_drill_edm"));
  });
});

describe("emCost", () => {
  it("micro edm most expensive", () => {
    expect(emCost("micro_edm_precision")).toBeGreaterThan(emCost("hole_drill_edm"));
  });
});

describe("noForce", () => {
  it("all edm types have no cutting force", () => {
    expect(noForce("wire_edm_cnc")).toBe(true);
  });
  it("sinker no force", () => {
    expect(noForce("sinker_ram_die")).toBe(true);
  });
});

describe("forHardened", () => {
  it("wire edm for hardened materials", () => {
    expect(forHardened("wire_edm_cnc")).toBe(true);
  });
  it("hole drill for hardened", () => {
    expect(forHardened("hole_drill_edm")).toBe(true);
  });
});

describe("electrode", () => {
  it("wire edm uses brass wire", () => {
    expect(electrode("wire_edm_cnc")).toBe("brass_wire_0_25mm_continuous");
  });
});

describe("bestUse", () => {
  it("sinker for injection mold", () => {
    expect(bestUse("sinker_ram_die")).toBe("injection_mold_cavity_detail");
  });
});

describe("edmMachineTypes", () => {
  it("returns 5 types", () => {
    expect(edmMachineTypes()).toHaveLength(5);
  });
});
