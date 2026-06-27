import { describe, it, expect } from "vitest";
import {
  heatTransfer, pressure, compactness, foulingResist,
  heCost, cleanable, forCorrosive, flow,
  bestUse, heatExchangers,
} from "../heat-exchanger-calc.js";

describe("heatTransfer", () => {
  it("plate frame best heat transfer", () => {
    expect(heatTransfer("plate_frame_gasketed")).toBeGreaterThan(heatTransfer("double_pipe_concentric"));
  });
});

describe("pressure", () => {
  it("shell and tube highest pressure", () => {
    expect(pressure("shell_and_tube_baffled")).toBeGreaterThan(pressure("finned_tube_crossflow"));
  });
});

describe("compactness", () => {
  it("plate frame most compact", () => {
    expect(compactness("plate_frame_gasketed")).toBeGreaterThan(compactness("double_pipe_concentric"));
  });
});

describe("foulingResist", () => {
  it("spiral welded best fouling resistance", () => {
    expect(foulingResist("spiral_welded_compact")).toBeGreaterThan(foulingResist("plate_frame_gasketed"));
  });
});

describe("heCost", () => {
  it("spiral welded most expensive", () => {
    expect(heCost("spiral_welded_compact")).toBeGreaterThan(heCost("double_pipe_concentric"));
  });
});

describe("cleanable", () => {
  it("plate frame is cleanable", () => {
    expect(cleanable("plate_frame_gasketed")).toBe(true);
  });
  it("finned tube not cleanable", () => {
    expect(cleanable("finned_tube_crossflow")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("shell and tube for corrosive", () => {
    expect(forCorrosive("shell_and_tube_baffled")).toBe(true);
  });
  it("plate frame not for corrosive", () => {
    expect(forCorrosive("plate_frame_gasketed")).toBe(false);
  });
});

describe("flow", () => {
  it("spiral uses spiral counter single channel", () => {
    expect(flow("spiral_welded_compact")).toBe("spiral_counter_single_channel");
  });
});

describe("bestUse", () => {
  it("plate frame best for dairy pasteurization", () => {
    expect(bestUse("plate_frame_gasketed")).toBe("dairy_pasteurization_quick_clean");
  });
});

describe("heatExchangers", () => {
  it("returns 5 types", () => {
    expect(heatExchangers()).toHaveLength(5);
  });
});
