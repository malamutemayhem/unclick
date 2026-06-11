import { describe, it, expect } from "vitest";
import {
  efficiency, pressure, temperature, maintenance,
  stCost, removableBundle, forHighPressure, construction,
  bestUse, shellTubeTypes,
} from "../shell-tube-calc.js";

describe("efficiency", () => {
  it("kettle highest efficiency", () => {
    expect(efficiency("kettle_reboiler")).toBeGreaterThan(efficiency("double_pipe_hairpin"));
  });
});

describe("pressure", () => {
  it("double pipe highest pressure", () => {
    expect(pressure("double_pipe_hairpin")).toBeGreaterThan(pressure("kettle_reboiler"));
  });
});

describe("temperature", () => {
  it("u tube highest temperature", () => {
    expect(temperature("u_tube_removable")).toBeGreaterThan(temperature("floating_head_pull_through"));
  });
});

describe("maintenance", () => {
  it("floating head easiest maintenance", () => {
    expect(maintenance("floating_head_pull_through")).toBeGreaterThan(maintenance("fixed_tubesheet_standard"));
  });
});

describe("stCost", () => {
  it("floating head most expensive", () => {
    expect(stCost("floating_head_pull_through")).toBeGreaterThan(stCost("double_pipe_hairpin"));
  });
});

describe("removableBundle", () => {
  it("u tube removable", () => {
    expect(removableBundle("u_tube_removable")).toBe(true);
  });
  it("fixed not removable", () => {
    expect(removableBundle("fixed_tubesheet_standard")).toBe(false);
  });
});

describe("forHighPressure", () => {
  it("fixed for high pressure", () => {
    expect(forHighPressure("fixed_tubesheet_standard")).toBe(true);
  });
  it("kettle not high pressure", () => {
    expect(forHighPressure("kettle_reboiler")).toBe(false);
  });
});

describe("construction", () => {
  it("kettle uses oversized shell", () => {
    expect(construction("kettle_reboiler")).toBe("oversized_shell_vapor_disengagement");
  });
});

describe("bestUse", () => {
  it("floating head for refinery", () => {
    expect(bestUse("floating_head_pull_through")).toBe("refinery_fouling_service_frequent_clean");
  });
});

describe("shellTubeTypes", () => {
  it("returns 5 types", () => {
    expect(shellTubeTypes()).toHaveLength(5);
  });
});
