import { describe, it, expect } from "vitest";
import {
  cutClean, controlStraight, durability, handleGrip,
  wireCost, braided, nylon, wireGauge,
  bestUse, wireCuts,
} from "../wire-cut-calc.js";

describe("cutClean", () => {
  it("single strand clean cleanest cut", () => {
    expect(cutClean("single_strand_clean")).toBeGreaterThan(cutClean("nylon_line_soft"));
  });
});

describe("controlStraight", () => {
  it("toggle handle grip straightest control", () => {
    expect(controlStraight("toggle_handle_grip")).toBeGreaterThan(controlStraight("nylon_line_soft"));
  });
});

describe("durability", () => {
  it("braided wire strong most durable", () => {
    expect(durability("braided_wire_strong")).toBeGreaterThan(durability("single_strand_clean"));
  });
});

describe("handleGrip", () => {
  it("toggle handle grip best handle grip", () => {
    expect(handleGrip("toggle_handle_grip")).toBeGreaterThan(handleGrip("twisted_wire_standard"));
  });
});

describe("wireCost", () => {
  it("toggle handle grip most expensive", () => {
    expect(wireCost("toggle_handle_grip")).toBeGreaterThan(wireCost("nylon_line_soft"));
  });
});

describe("braided", () => {
  it("braided wire strong is braided", () => {
    expect(braided("braided_wire_strong")).toBe(true);
  });
  it("twisted wire standard not braided", () => {
    expect(braided("twisted_wire_standard")).toBe(false);
  });
});

describe("nylon", () => {
  it("nylon line soft is nylon", () => {
    expect(nylon("nylon_line_soft")).toBe(true);
  });
  it("twisted wire standard not nylon", () => {
    expect(nylon("twisted_wire_standard")).toBe(false);
  });
});

describe("wireGauge", () => {
  it("braided wire strong uses eighteen gauge braid", () => {
    expect(wireGauge("braided_wire_strong")).toBe("eighteen_gauge_braid");
  });
});

describe("bestUse", () => {
  it("twisted wire standard best for general pot cut off", () => {
    expect(bestUse("twisted_wire_standard")).toBe("general_pot_cut_off");
  });
});

describe("wireCuts", () => {
  it("returns 5 types", () => {
    expect(wireCuts()).toHaveLength(5);
  });
});
