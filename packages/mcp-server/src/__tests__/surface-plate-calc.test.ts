import { describe, it, expect } from "vitest";
import {
  flatness, wearResist, stability, portability,
  plateCost, nonMagnetic, burrsafe, plateGrade,
  bestUse, surfacePlates,
} from "../surface-plate-calc.js";

describe("flatness", () => {
  it("granite black pro flattest", () => {
    expect(flatness("granite_black_pro")).toBeGreaterThan(flatness("steel_lapped_shop"));
  });
});

describe("wearResist", () => {
  it("granite black pro best wear resist", () => {
    expect(wearResist("granite_black_pro")).toBeGreaterThan(wearResist("steel_lapped_shop"));
  });
});

describe("stability", () => {
  it("granite black pro most stable", () => {
    expect(stability("granite_black_pro")).toBeGreaterThan(stability("steel_lapped_shop"));
  });
});

describe("portability", () => {
  it("steel lapped shop most portable", () => {
    expect(portability("steel_lapped_shop")).toBeGreaterThan(portability("granite_black_pro"));
  });
});

describe("plateCost", () => {
  it("granite black pro most expensive", () => {
    expect(plateCost("granite_black_pro")).toBeGreaterThan(plateCost("steel_lapped_shop"));
  });
});

describe("nonMagnetic", () => {
  it("granite black pro is non magnetic", () => {
    expect(nonMagnetic("granite_black_pro")).toBe(true);
  });
  it("cast iron ribbed not non magnetic", () => {
    expect(nonMagnetic("cast_iron_ribbed")).toBe(false);
  });
});

describe("burrsafe", () => {
  it("granite black pro is burr safe", () => {
    expect(burrsafe("granite_black_pro")).toBe(true);
  });
  it("steel lapped shop not burr safe", () => {
    expect(burrsafe("steel_lapped_shop")).toBe(false);
  });
});

describe("plateGrade", () => {
  it("granite black pro grade a lab", () => {
    expect(plateGrade("granite_black_pro")).toBe("grade_a_lab");
  });
});

describe("bestUse", () => {
  it("ceramic white lab best for ultra flat metrology", () => {
    expect(bestUse("ceramic_white_lab")).toBe("ultra_flat_metrology");
  });
});

describe("surfacePlates", () => {
  it("returns 5 types", () => {
    expect(surfacePlates()).toHaveLength(5);
  });
});
