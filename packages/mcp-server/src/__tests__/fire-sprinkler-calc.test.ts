import { describe, it, expect } from "vitest";
import {
  coverage, response, aesthetic, flowRate,
  fsCost, concealed, forWarehouse, activation,
  bestUse, fireSprinklerTypes,
} from "../fire-sprinkler-calc.js";

describe("coverage", () => {
  it("esfr widest coverage", () => {
    expect(coverage("esfr_early_suppression")).toBeGreaterThan(coverage("sidewall_horizontal_wall"));
  });
});

describe("response", () => {
  it("esfr fastest response", () => {
    expect(response("esfr_early_suppression")).toBeGreaterThan(response("concealed_flush_decorative"));
  });
});

describe("aesthetic", () => {
  it("concealed best aesthetic", () => {
    expect(aesthetic("concealed_flush_decorative")).toBeGreaterThan(aesthetic("esfr_early_suppression"));
  });
});

describe("flowRate", () => {
  it("esfr highest flow", () => {
    expect(flowRate("esfr_early_suppression")).toBeGreaterThan(flowRate("sidewall_horizontal_wall"));
  });
});

describe("fsCost", () => {
  it("esfr most expensive", () => {
    expect(fsCost("esfr_early_suppression")).toBeGreaterThan(fsCost("pendant_standard_ceiling"));
  });
});

describe("concealed", () => {
  it("concealed is concealed", () => {
    expect(concealed("concealed_flush_decorative")).toBe(true);
  });
  it("pendant not concealed", () => {
    expect(concealed("pendant_standard_ceiling")).toBe(false);
  });
});

describe("forWarehouse", () => {
  it("esfr for warehouse", () => {
    expect(forWarehouse("esfr_early_suppression")).toBe(true);
  });
  it("pendant not for warehouse", () => {
    expect(forWarehouse("pendant_standard_ceiling")).toBe(false);
  });
});

describe("activation", () => {
  it("concealed uses cover plate drop down", () => {
    expect(activation("concealed_flush_decorative")).toBe("cover_plate_drop_down_solder_link");
  });
});

describe("bestUse", () => {
  it("pendant for office retail", () => {
    expect(bestUse("pendant_standard_ceiling")).toBe("office_retail_standard_ceiling_mount");
  });
});

describe("fireSprinklerTypes", () => {
  it("returns 5 types", () => {
    expect(fireSprinklerTypes()).toHaveLength(5);
  });
});
