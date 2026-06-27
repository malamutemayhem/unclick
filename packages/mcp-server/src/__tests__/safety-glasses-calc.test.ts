import { describe, it, expect } from "vitest";
import {
  impactResist, clarity, fogResist, comfort,
  glassesCost, uvProtect, fitsOverRx, lensType,
  bestTask, safetyGlasses,
} from "../safety-glasses-calc.js";

describe("impactResist", () => {
  it("anti fog sealed best impact resistance", () => {
    expect(impactResist("anti_fog_sealed")).toBeGreaterThan(impactResist("over_glasses_fit"));
  });
});

describe("clarity", () => {
  it("clear lens standard best clarity", () => {
    expect(clarity("clear_lens_standard")).toBeGreaterThan(clarity("tinted_outdoor_uv"));
  });
});

describe("fogResist", () => {
  it("anti fog sealed best fog resistance", () => {
    expect(fogResist("anti_fog_sealed")).toBeGreaterThan(fogResist("clear_lens_standard"));
  });
});

describe("comfort", () => {
  it("clear lens standard most comfortable", () => {
    expect(comfort("clear_lens_standard")).toBeGreaterThan(comfort("over_glasses_fit"));
  });
});

describe("glassesCost", () => {
  it("prescription insert rx most expensive", () => {
    expect(glassesCost("prescription_insert_rx")).toBeGreaterThan(glassesCost("clear_lens_standard"));
  });
});

describe("uvProtect", () => {
  it("all types have uv protection", () => {
    expect(uvProtect("clear_lens_standard")).toBe(true);
    expect(uvProtect("tinted_outdoor_uv")).toBe(true);
  });
});

describe("fitsOverRx", () => {
  it("over glasses fit works over prescription glasses", () => {
    expect(fitsOverRx("over_glasses_fit")).toBe(true);
  });
  it("clear lens standard does not", () => {
    expect(fitsOverRx("clear_lens_standard")).toBe(false);
  });
});

describe("lensType", () => {
  it("anti fog sealed uses polycarbonate coated gasket", () => {
    expect(lensType("anti_fog_sealed")).toBe("polycarbonate_coated_gasket");
  });
});

describe("bestTask", () => {
  it("tinted outdoor uv best for outdoor construction sun", () => {
    expect(bestTask("tinted_outdoor_uv")).toBe("outdoor_construction_sun");
  });
});

describe("safetyGlasses", () => {
  it("returns 5 types", () => {
    expect(safetyGlasses()).toHaveLength(5);
  });
});
