import { describe, it, expect } from "vitest";
import {
  precision, materialRemoval, surfaceFinish, throughput,
  sgCost, cnc, forHardMaterial, grinding,
  bestUse, surfaceGrinderTypes,
} from "../surface-grinder-calc.js";

describe("precision", () => {
  it("creep feed most precise", () => {
    expect(precision("creep_feed")).toBeGreaterThan(precision("vertical_spindle_rotary"));
  });
});

describe("materialRemoval", () => {
  it("creep feed highest material removal", () => {
    expect(materialRemoval("creep_feed")).toBeGreaterThan(materialRemoval("horizontal_spindle_reciprocating"));
  });
});

describe("surfaceFinish", () => {
  it("horizontal spindle reciprocating best surface finish", () => {
    expect(surfaceFinish("horizontal_spindle_reciprocating")).toBeGreaterThan(surfaceFinish("vertical_spindle_rotary"));
  });
});

describe("throughput", () => {
  it("double disc highest throughput", () => {
    expect(throughput("double_disc")).toBeGreaterThan(throughput("horizontal_spindle_reciprocating"));
  });
});

describe("sgCost", () => {
  it("creep feed most expensive", () => {
    expect(sgCost("creep_feed")).toBeGreaterThan(sgCost("horizontal_spindle_reciprocating"));
  });
});

describe("cnc", () => {
  it("double disc is cnc", () => {
    expect(cnc("double_disc")).toBe(true);
  });
  it("horizontal spindle reciprocating not cnc", () => {
    expect(cnc("horizontal_spindle_reciprocating")).toBe(false);
  });
});

describe("forHardMaterial", () => {
  it("creep feed for hard material", () => {
    expect(forHardMaterial("creep_feed")).toBe(true);
  });
  it("double disc not for hard material", () => {
    expect(forHardMaterial("double_disc")).toBe(false);
  });
});

describe("grinding", () => {
  it("vertical spindle rotary uses cup wheel", () => {
    expect(grinding("vertical_spindle_rotary")).toBe("cup_wheel_face_grinding_rotary_table_blanchard_style");
  });
});

describe("bestUse", () => {
  it("double disc for automotive brake disc", () => {
    expect(bestUse("double_disc")).toBe("automotive_brake_disc_piston_ring_high_volume_parallel");
  });
});

describe("surfaceGrinderTypes", () => {
  it("returns 5 types", () => {
    expect(surfaceGrinderTypes()).toHaveLength(5);
  });
});
