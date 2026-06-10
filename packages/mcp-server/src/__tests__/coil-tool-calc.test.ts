import { describe, it, expect } from "vitest";
import {
  coilUniform, speedOutput, sizeRange, portability,
  toolCost, motorized, forJoining, toolMaterial,
  bestTask, coilTools,
} from "../coil-tool-calc.js";

describe("coilUniform", () => {
  it("extruder wall mount most uniform coils", () => {
    expect(coilUniform("extruder_wall_mount")).toBeGreaterThan(coilUniform("hand_roll_table"));
  });
});

describe("speedOutput", () => {
  it("extruder wall mount fastest output", () => {
    expect(speedOutput("extruder_wall_mount")).toBeGreaterThan(speedOutput("scoring_fork_join"));
  });
});

describe("sizeRange", () => {
  it("hand roll table widest size range", () => {
    expect(sizeRange("hand_roll_table")).toBeGreaterThan(sizeRange("scoring_fork_join"));
  });
});

describe("portability", () => {
  it("hand roll table most portable", () => {
    expect(portability("hand_roll_table")).toBeGreaterThan(portability("extruder_wall_mount"));
  });
});

describe("toolCost", () => {
  it("extruder wall mount most expensive", () => {
    expect(toolCost("extruder_wall_mount")).toBeGreaterThan(toolCost("hand_roll_table"));
  });
});

describe("motorized", () => {
  it("no coil tool is motorized", () => {
    expect(motorized("extruder_wall_mount")).toBe(false);
  });
});

describe("forJoining", () => {
  it("scoring fork join is for joining", () => {
    expect(forJoining("scoring_fork_join")).toBe(true);
  });
  it("extruder wall mount is not for joining", () => {
    expect(forJoining("extruder_wall_mount")).toBe(false);
  });
});

describe("toolMaterial", () => {
  it("coil cutter wire uses wire handle gauge", () => {
    expect(toolMaterial("coil_cutter_wire")).toBe("wire_handle_gauge");
  });
});

describe("bestTask", () => {
  it("scoring fork join best for slip score attach", () => {
    expect(bestTask("scoring_fork_join")).toBe("slip_score_attach");
  });
});

describe("coilTools", () => {
  it("returns 5 types", () => {
    expect(coilTools()).toHaveLength(5);
  });
});
