import { describe, it, expect } from "vitest";
import {
  rejection, flowRate, efficiency, maintenance,
  roCost, energyRecovery, forDrinking, membrane,
  bestUse, reverseOsmosisTypes,
} from "../reverse-osmosis-calc.js";

describe("rejection", () => {
  it("seawater best rejection", () => {
    expect(rejection("seawater_desalination")).toBeGreaterThan(rejection("residential_under_sink"));
  });
});

describe("flowRate", () => {
  it("industrial best flow rate", () => {
    expect(flowRate("industrial_brackish_water")).toBeGreaterThan(flowRate("residential_under_sink"));
  });
});

describe("efficiency", () => {
  it("industrial most efficient", () => {
    expect(efficiency("industrial_brackish_water")).toBeGreaterThan(efficiency("residential_under_sink"));
  });
});

describe("maintenance", () => {
  it("residential lowest maintenance", () => {
    expect(maintenance("residential_under_sink")).toBeGreaterThan(maintenance("seawater_desalination"));
  });
});

describe("roCost", () => {
  it("seawater most expensive", () => {
    expect(roCost("seawater_desalination")).toBeGreaterThan(roCost("residential_under_sink"));
  });
});

describe("energyRecovery", () => {
  it("seawater has energy recovery", () => {
    expect(energyRecovery("seawater_desalination")).toBe(true);
  });
  it("residential no energy recovery", () => {
    expect(energyRecovery("residential_under_sink")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("residential for drinking", () => {
    expect(forDrinking("residential_under_sink")).toBe(true);
  });
  it("lab not for drinking", () => {
    expect(forDrinking("high_purity_laboratory")).toBe(false);
  });
});

describe("membrane", () => {
  it("lab uses double pass", () => {
    expect(membrane("high_purity_laboratory")).toBe("double_pass_ro_edi_polisher");
  });
});

describe("bestUse", () => {
  it("seawater for coastal desalination", () => {
    expect(bestUse("seawater_desalination")).toBe("coastal_city_desalination_plant");
  });
});

describe("reverseOsmosisTypes", () => {
  it("returns 5 types", () => {
    expect(reverseOsmosisTypes()).toHaveLength(5);
  });
});
