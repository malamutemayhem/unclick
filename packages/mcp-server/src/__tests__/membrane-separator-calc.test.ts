import { describe, it, expect } from "vitest";
import {
  rejection, throughput, poreSize, pressureNeed,
  msCost, crossFlow, forDesalination, separatorConfig,
  bestUse, membraneSeparatorTypes,
} from "../membrane-separator-calc.js";

describe("rejection", () => {
  it("reverse osmosis best rejection", () => {
    expect(rejection("reverse_osmosis")).toBeGreaterThan(rejection("microfiltration"));
  });
});

describe("throughput", () => {
  it("microfiltration highest throughput", () => {
    expect(throughput("microfiltration")).toBeGreaterThan(throughput("pervaporation"));
  });
});

describe("poreSize", () => {
  it("microfiltration largest pore size", () => {
    expect(poreSize("microfiltration")).toBeGreaterThan(poreSize("reverse_osmosis"));
  });
});

describe("pressureNeed", () => {
  it("reverse osmosis highest pressure need", () => {
    expect(pressureNeed("reverse_osmosis")).toBeGreaterThan(pressureNeed("microfiltration"));
  });
});

describe("msCost", () => {
  it("pervaporation most expensive", () => {
    expect(msCost("pervaporation")).toBeGreaterThan(msCost("microfiltration"));
  });
});

describe("crossFlow", () => {
  it("reverse osmosis uses cross flow", () => {
    expect(crossFlow("reverse_osmosis")).toBe(true);
  });
  it("pervaporation no cross flow", () => {
    expect(crossFlow("pervaporation")).toBe(false);
  });
});

describe("forDesalination", () => {
  it("reverse osmosis for desalination", () => {
    expect(forDesalination("reverse_osmosis")).toBe(true);
  });
  it("ultrafiltration not for desalination", () => {
    expect(forDesalination("ultrafiltration")).toBe(false);
  });
});

describe("separatorConfig", () => {
  it("nanofiltration uses medium pore divalent ion soften", () => {
    expect(separatorConfig("nanofiltration")).toBe("nanofiltration_membrane_separator_medium_pore_divalent_ion_soften");
  });
});

describe("bestUse", () => {
  it("microfiltration for beer clarify yeast remove clear", () => {
    expect(bestUse("microfiltration")).toBe("beer_clarify_microfiltration_membrane_separator_yeast_remove_clear");
  });
});

describe("membraneSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(membraneSeparatorTypes()).toHaveLength(5);
  });
});
