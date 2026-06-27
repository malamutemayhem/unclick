import { describe, it, expect } from "vitest";
import {
  mechanicalComplexity, pricePremium, practicalUtility, visualAppeal,
  serviceComplexity, visibleOnDial, audibleFunction, primaryPurpose,
  inventionEra, watchComplications,
} from "../watch-complication-calc.js";

describe("mechanicalComplexity", () => {
  it("minute repeater most complex", () => {
    expect(mechanicalComplexity("minute_repeater")).toBeGreaterThan(
      mechanicalComplexity("chronograph")
    );
  });
});

describe("pricePremium", () => {
  it("minute repeater highest premium", () => {
    expect(pricePremium("minute_repeater")).toBeGreaterThan(pricePremium("moon_phase"));
  });
});

describe("practicalUtility", () => {
  it("chronograph most practical", () => {
    expect(practicalUtility("chronograph")).toBeGreaterThan(practicalUtility("tourbillon"));
  });
});

describe("visualAppeal", () => {
  it("tourbillon most visually appealing", () => {
    expect(visualAppeal("tourbillon")).toBeGreaterThan(visualAppeal("minute_repeater"));
  });
});

describe("serviceComplexity", () => {
  it("perpetual calendar hardest to service", () => {
    expect(serviceComplexity("perpetual_calendar")).toBeGreaterThan(
      serviceComplexity("moon_phase")
    );
  });
});

describe("visibleOnDial", () => {
  it("tourbillon visible on dial", () => {
    expect(visibleOnDial("tourbillon")).toBe(true);
  });
  it("minute repeater not visible", () => {
    expect(visibleOnDial("minute_repeater")).toBe(false);
  });
});

describe("audibleFunction", () => {
  it("minute repeater is audible", () => {
    expect(audibleFunction("minute_repeater")).toBe(true);
  });
  it("chronograph is not", () => {
    expect(audibleFunction("chronograph")).toBe(false);
  });
});

describe("primaryPurpose", () => {
  it("tourbillon for gravity compensation", () => {
    expect(primaryPurpose("tourbillon")).toBe("gravity_compensation");
  });
});

describe("inventionEra", () => {
  it("tourbillon invented by breguet", () => {
    expect(inventionEra("tourbillon")).toBe("1801_breguet");
  });
});

describe("watchComplications", () => {
  it("returns 5 complications", () => {
    expect(watchComplications()).toHaveLength(5);
  });
});
