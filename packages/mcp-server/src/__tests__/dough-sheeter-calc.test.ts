import { describe, it, expect } from "vitest";
import {
  speed, thickness, consistency, doughGentle,
  dsCost, automatic, forLaminated, action,
  bestUse, doughSheeterTypes,
} from "../dough-sheeter-calc.js";

describe("speed", () => {
  it("automatic line fastest", () => {
    expect(speed("automatic_line")).toBeGreaterThan(speed("tabletop_bench"));
  });
});

describe("thickness", () => {
  it("automatic line best thickness control", () => {
    expect(thickness("automatic_line")).toBeGreaterThan(thickness("tabletop_bench"));
  });
});

describe("consistency", () => {
  it("automatic line best consistency", () => {
    expect(consistency("automatic_line")).toBeGreaterThan(consistency("tabletop_bench"));
  });
});

describe("doughGentle", () => {
  it("croissant laminator most gentle", () => {
    expect(doughGentle("croissant_laminator")).toBeGreaterThan(doughGentle("pizza_press"));
  });
});

describe("dsCost", () => {
  it("automatic line most expensive", () => {
    expect(dsCost("automatic_line")).toBeGreaterThan(dsCost("tabletop_bench"));
  });
});

describe("automatic", () => {
  it("automatic line is automatic", () => {
    expect(automatic("automatic_line")).toBe(true);
  });
  it("reversible floor not automatic", () => {
    expect(automatic("reversible_floor")).toBe(false);
  });
});

describe("forLaminated", () => {
  it("croissant laminator for laminated", () => {
    expect(forLaminated("croissant_laminator")).toBe(true);
  });
  it("pizza press not for laminated", () => {
    expect(forLaminated("pizza_press")).toBe(false);
  });
});

describe("action", () => {
  it("pizza press uses heated platen", () => {
    expect(action("pizza_press")).toBe("heated_platen_press_flatten_round_dough_ball_to_disk");
  });
});

describe("bestUse", () => {
  it("croissant laminator for pastry layers", () => {
    expect(bestUse("croissant_laminator")).toBe("croissant_puff_pastry_danish_laminated_butter_dough_layers");
  });
});

describe("doughSheeterTypes", () => {
  it("returns 5 types", () => {
    expect(doughSheeterTypes()).toHaveLength(5);
  });
});
