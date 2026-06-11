import { describe, it, expect } from "vitest";
import {
  throttling, shutoff, rangeability, cavitationResist,
  gvCost, balanced, forHighDp, trim,
  bestUse, globeValveTypes,
} from "../globe-valve-calc.js";

describe("throttling", () => {
  it("cage guided best throttling", () => {
    expect(throttling("cage_guided_trim")).toBeGreaterThan(throttling("angle_body_erosion"));
  });
});

describe("shutoff", () => {
  it("single seat best shutoff", () => {
    expect(shutoff("single_seat_standard")).toBeGreaterThan(shutoff("double_seat_balanced"));
  });
});

describe("rangeability", () => {
  it("cage guided best rangeability", () => {
    expect(rangeability("cage_guided_trim")).toBeGreaterThan(rangeability("three_way_divert_mix"));
  });
});

describe("cavitationResist", () => {
  it("angle body best cavitation resistance", () => {
    expect(cavitationResist("angle_body_erosion")).toBeGreaterThan(cavitationResist("single_seat_standard"));
  });
});

describe("gvCost", () => {
  it("cage guided most expensive", () => {
    expect(gvCost("cage_guided_trim")).toBeGreaterThan(gvCost("single_seat_standard"));
  });
});

describe("balanced", () => {
  it("double seat is balanced", () => {
    expect(balanced("double_seat_balanced")).toBe(true);
  });
  it("single seat not balanced", () => {
    expect(balanced("single_seat_standard")).toBe(false);
  });
});

describe("forHighDp", () => {
  it("cage guided for high dp", () => {
    expect(forHighDp("cage_guided_trim")).toBe(true);
  });
  it("single seat not for high dp", () => {
    expect(forHighDp("single_seat_standard")).toBe(false);
  });
});

describe("trim", () => {
  it("three way uses three port plug", () => {
    expect(trim("three_way_divert_mix")).toBe("three_port_plug_divert_or_mix_flow");
  });
});

describe("bestUse", () => {
  it("cage guided for severe service", () => {
    expect(bestUse("cage_guided_trim")).toBe("severe_service_flash_cavitate_noise");
  });
});

describe("globeValveTypes", () => {
  it("returns 5 types", () => {
    expect(globeValveTypes()).toHaveLength(5);
  });
});
