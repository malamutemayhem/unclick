import { describe, it, expect } from "vitest";
import {
  clarity, cureTime, hardness, bubbleFree,
  resinCost, selfLeveling, uvCure, mixRatio,
  bestProject, resinMixes,
} from "../resin-mix-calc.js";

describe("clarity", () => {
  it("epoxy two part clear best clarity", () => {
    expect(clarity("epoxy_two_part_clear")).toBeGreaterThan(clarity("polyurethane_flex_tough"));
  });
});

describe("cureTime", () => {
  it("uv cure instant fastest cure time", () => {
    expect(cureTime("uv_cure_instant")).toBeGreaterThan(cureTime("epoxy_two_part_clear"));
  });
});

describe("hardness", () => {
  it("epoxy two part clear hardest", () => {
    expect(hardness("epoxy_two_part_clear")).toBeGreaterThan(hardness("silicone_resin_heat"));
  });
});

describe("bubbleFree", () => {
  it("uv cure instant most bubble free", () => {
    expect(bubbleFree("uv_cure_instant")).toBeGreaterThan(bubbleFree("polyester_casting_fast"));
  });
});

describe("resinCost", () => {
  it("uv cure instant more expensive than polyester", () => {
    expect(resinCost("uv_cure_instant")).toBeGreaterThan(resinCost("polyester_casting_fast"));
  });
});

describe("selfLeveling", () => {
  it("epoxy two part clear is self leveling", () => {
    expect(selfLeveling("epoxy_two_part_clear")).toBe(true);
  });
  it("polyester casting fast is not self leveling", () => {
    expect(selfLeveling("polyester_casting_fast")).toBe(false);
  });
});

describe("uvCure", () => {
  it("uv cure instant uses uv cure", () => {
    expect(uvCure("uv_cure_instant")).toBe(true);
  });
  it("epoxy two part clear does not use uv cure", () => {
    expect(uvCure("epoxy_two_part_clear")).toBe(false);
  });
});

describe("mixRatio", () => {
  it("uv cure instant uses single component uv", () => {
    expect(mixRatio("uv_cure_instant")).toBe("single_component_uv");
  });
});

describe("bestProject", () => {
  it("epoxy two part clear best for river table clear", () => {
    expect(bestProject("epoxy_two_part_clear")).toBe("river_table_clear");
  });
});

describe("resinMixes", () => {
  it("returns 5 types", () => {
    expect(resinMixes()).toHaveLength(5);
  });
});
