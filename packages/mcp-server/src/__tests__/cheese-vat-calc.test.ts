import { describe, it, expect } from "vitest";
import {
  curdUniformity, heatingControl, capacity, automation,
  cvCost, enclosed, forHard, vatConfig,
  bestUse, cheeseVatTypes,
} from "../cheese-vat-calc.js";

describe("curdUniformity", () => {
  it("double o best curd uniformity", () => {
    expect(curdUniformity("double_o")).toBeGreaterThan(curdUniformity("open_rectangular"));
  });
});

describe("heatingControl", () => {
  it("double o best heating control", () => {
    expect(heatingControl("double_o")).toBeGreaterThan(heatingControl("cottage_cheese"));
  });
});

describe("capacity", () => {
  it("double o highest capacity", () => {
    expect(capacity("double_o")).toBeGreaterThan(capacity("vertical_dutch"));
  });
});

describe("automation", () => {
  it("double o highest automation", () => {
    expect(automation("double_o")).toBeGreaterThan(automation("open_rectangular"));
  });
});

describe("cvCost", () => {
  it("double o most expensive", () => {
    expect(cvCost("double_o")).toBeGreaterThan(cvCost("open_rectangular"));
  });
});

describe("enclosed", () => {
  it("enclosed horizontal is enclosed", () => {
    expect(enclosed("enclosed_horizontal")).toBe(true);
  });
  it("open rectangular not enclosed", () => {
    expect(enclosed("open_rectangular")).toBe(false);
  });
});

describe("forHard", () => {
  it("enclosed horizontal for hard cheese", () => {
    expect(forHard("enclosed_horizontal")).toBe(true);
  });
  it("cottage cheese not for hard", () => {
    expect(forHard("cottage_cheese")).toBe(false);
  });
});

describe("vatConfig", () => {
  it("vertical dutch uses column gravity drain", () => {
    expect(vatConfig("vertical_dutch")).toBe("vertical_dutch_cheese_vat_column_gravity_drain_gouda_edam_style");
  });
});

describe("bestUse", () => {
  it("double o for mega cheese factory", () => {
    expect(bestUse("double_o")).toBe("mega_cheese_factory_double_o_vat_continuous_production_high_volume");
  });
});

describe("cheeseVatTypes", () => {
  it("returns 5 types", () => {
    expect(cheeseVatTypes()).toHaveLength(5);
  });
});
