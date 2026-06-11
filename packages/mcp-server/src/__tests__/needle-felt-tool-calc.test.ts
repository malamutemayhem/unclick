import { describe, it, expect } from "vitest";
import {
  controlFine, speedFelt, detailFine, comfortGrip,
  toolCost, multiNeedle, powered, needleHolder,
  bestUse, needleFeltTools,
} from "../needle-felt-tool-calc.js";

describe("controlFine", () => {
  it("single needle hand finest control", () => {
    expect(controlFine("single_needle_hand")).toBeGreaterThan(controlFine("felting_machine_auto"));
  });
});

describe("speedFelt", () => {
  it("felting machine auto fastest felt", () => {
    expect(speedFelt("felting_machine_auto")).toBeGreaterThan(speedFelt("single_needle_hand"));
  });
});

describe("detailFine", () => {
  it("single needle hand finest detail", () => {
    expect(detailFine("single_needle_hand")).toBeGreaterThan(detailFine("felting_machine_auto"));
  });
});

describe("comfortGrip", () => {
  it("clover tool spring most comfortable grip", () => {
    expect(comfortGrip("clover_tool_spring")).toBeGreaterThan(comfortGrip("single_needle_hand"));
  });
});

describe("toolCost", () => {
  it("felting machine auto most expensive", () => {
    expect(toolCost("felting_machine_auto")).toBeGreaterThan(toolCost("single_needle_hand"));
  });
});

describe("multiNeedle", () => {
  it("multi needle pen is multi needle", () => {
    expect(multiNeedle("multi_needle_pen")).toBe(true);
  });
  it("single needle hand not multi needle", () => {
    expect(multiNeedle("single_needle_hand")).toBe(false);
  });
});

describe("powered", () => {
  it("felting machine auto is powered", () => {
    expect(powered("felting_machine_auto")).toBe(true);
  });
  it("single needle hand not powered", () => {
    expect(powered("single_needle_hand")).toBe(false);
  });
});

describe("needleHolder", () => {
  it("clover tool spring uses ergonomic spring body", () => {
    expect(needleHolder("clover_tool_spring")).toBe("ergonomic_spring_body");
  });
});

describe("bestUse", () => {
  it("single needle hand best for fine detail sculpt", () => {
    expect(bestUse("single_needle_hand")).toBe("fine_detail_sculpt");
  });
});

describe("needleFeltTools", () => {
  it("returns 5 types", () => {
    expect(needleFeltTools()).toHaveLength(5);
  });
});
