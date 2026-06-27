import { describe, it, expect } from "vitest";
import {
  airflow, noiseLevel, coolingEffect, safetyChild,
  fanCost, hasRemote, oscillates, motorType,
  bestRoom, towerFans,
} from "../tower-fan-calc.js";

describe("airflow", () => {
  it("bladeless air multiply highest airflow", () => {
    expect(airflow("bladeless_air_multiply")).toBeGreaterThan(airflow("usb_desk_mini"));
  });
});

describe("noiseLevel", () => {
  it("usb desk mini quietest", () => {
    expect(noiseLevel("usb_desk_mini")).toBeGreaterThan(noiseLevel("evaporative_cool"));
  });
});

describe("coolingEffect", () => {
  it("evaporative cool best cooling effect", () => {
    expect(coolingEffect("evaporative_cool")).toBeGreaterThan(coolingEffect("usb_desk_mini"));
  });
});

describe("safetyChild", () => {
  it("bladeless air multiply safest for children", () => {
    expect(safetyChild("bladeless_air_multiply")).toBeGreaterThan(safetyChild("oscillating_blade"));
  });
});

describe("fanCost", () => {
  it("bladeless air multiply most expensive", () => {
    expect(fanCost("bladeless_air_multiply")).toBeGreaterThan(fanCost("usb_desk_mini"));
  });
});

describe("hasRemote", () => {
  it("oscillating blade has remote", () => {
    expect(hasRemote("oscillating_blade")).toBe(true);
  });
  it("usb desk mini does not", () => {
    expect(hasRemote("usb_desk_mini")).toBe(false);
  });
});

describe("oscillates", () => {
  it("oscillating blade oscillates", () => {
    expect(oscillates("oscillating_blade")).toBe(true);
  });
  it("evaporative cool does not", () => {
    expect(oscillates("evaporative_cool")).toBe(false);
  });
});

describe("motorType", () => {
  it("bladeless air multiply uses brushless dc impeller", () => {
    expect(motorType("bladeless_air_multiply")).toBe("brushless_dc_impeller");
  });
});

describe("bestRoom", () => {
  it("bladeless air multiply best for nursery child safe", () => {
    expect(bestRoom("bladeless_air_multiply")).toBe("nursery_child_safe");
  });
});

describe("towerFans", () => {
  it("returns 5 types", () => {
    expect(towerFans()).toHaveLength(5);
  });
});
