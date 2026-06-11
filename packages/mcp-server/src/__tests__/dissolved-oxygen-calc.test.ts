import { describe, it, expect } from "vitest";
import {
  accuracy, response, stability, maintenance,
  doCost, membraneFree, forTrace, sensor,
  bestUse, dissolvedOxygenTypes,
} from "../dissolved-oxygen-calc.js";

describe("accuracy", () => {
  it("optical luminescent most accurate", () => {
    expect(accuracy("optical_luminescent")).toBeGreaterThan(accuracy("galvanic_membrane"));
  });
});

describe("response", () => {
  it("optical luminescent fastest response", () => {
    expect(response("optical_luminescent")).toBeGreaterThan(response("galvanic_membrane"));
  });
});

describe("stability", () => {
  it("optical luminescent most stable", () => {
    expect(stability("optical_luminescent")).toBeGreaterThan(stability("galvanic_membrane"));
  });
});

describe("maintenance", () => {
  it("optical luminescent lowest maintenance", () => {
    expect(maintenance("optical_luminescent")).toBeGreaterThan(maintenance("galvanic_membrane"));
  });
});

describe("doCost", () => {
  it("optical luminescent most expensive", () => {
    expect(doCost("optical_luminescent")).toBeGreaterThan(doCost("galvanic_membrane"));
  });
});

describe("membraneFree", () => {
  it("optical luminescent is membrane free", () => {
    expect(membraneFree("optical_luminescent")).toBe(true);
  });
  it("galvanic membrane is not membrane free", () => {
    expect(membraneFree("galvanic_membrane")).toBe(false);
  });
});

describe("forTrace", () => {
  it("amperometric for trace measurement", () => {
    expect(forTrace("electrochemical_amperometric")).toBe(true);
  });
  it("galvanic not for trace", () => {
    expect(forTrace("galvanic_membrane")).toBe(false);
  });
});

describe("sensor", () => {
  it("optical uses ruthenium complex", () => {
    expect(sensor("optical_luminescent")).toBe("fluorescence_quench_ruthenium_complex");
  });
});

describe("bestUse", () => {
  it("galvanic for wastewater aeration", () => {
    expect(bestUse("galvanic_membrane")).toBe("wastewater_aeration_basin_basic_do");
  });
});

describe("dissolvedOxygenTypes", () => {
  it("returns 5 types", () => {
    expect(dissolvedOxygenTypes()).toHaveLength(5);
  });
});
