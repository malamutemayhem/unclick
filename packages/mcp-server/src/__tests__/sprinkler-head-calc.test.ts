import { describe, it, expect } from "vitest";
import {
  coverage, response, aesthetic, flow,
  shCost, concealed, forWarehouse, activation,
  bestUse, sprinklerHeadTypes,
} from "../sprinkler-head-calc.js";

describe("coverage", () => {
  it("esfr best coverage", () => {
    expect(coverage("esfr_early_suppression")).toBeGreaterThan(coverage("sidewall_horizontal"));
  });
});

describe("response", () => {
  it("esfr fastest response", () => {
    expect(response("esfr_early_suppression")).toBeGreaterThan(response("concealed_flush_cover"));
  });
});

describe("aesthetic", () => {
  it("concealed best aesthetic", () => {
    expect(aesthetic("concealed_flush_cover")).toBeGreaterThan(aesthetic("esfr_early_suppression"));
  });
});

describe("flow", () => {
  it("esfr highest flow", () => {
    expect(flow("esfr_early_suppression")).toBeGreaterThan(flow("sidewall_horizontal"));
  });
});

describe("shCost", () => {
  it("esfr most expensive", () => {
    expect(shCost("esfr_early_suppression")).toBeGreaterThan(shCost("pendant_standard_drop"));
  });
});

describe("concealed", () => {
  it("concealed is concealed", () => {
    expect(concealed("concealed_flush_cover")).toBe(true);
  });
  it("pendant not concealed", () => {
    expect(concealed("pendant_standard_drop")).toBe(false);
  });
});

describe("forWarehouse", () => {
  it("esfr for warehouse", () => {
    expect(forWarehouse("esfr_early_suppression")).toBe(true);
  });
  it("pendant not for warehouse", () => {
    expect(forWarehouse("pendant_standard_drop")).toBe(false);
  });
});

describe("activation", () => {
  it("concealed uses solder plate", () => {
    expect(activation("concealed_flush_cover")).toBe("solder_plate_cover_drop");
  });
});

describe("bestUse", () => {
  it("sidewall for hotel corridor", () => {
    expect(bestUse("sidewall_horizontal")).toBe("hotel_corridor_small_room");
  });
});

describe("sprinklerHeadTypes", () => {
  it("returns 5 types", () => {
    expect(sprinklerHeadTypes()).toHaveLength(5);
  });
});
