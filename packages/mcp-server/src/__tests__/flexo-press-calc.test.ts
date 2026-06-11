import { describe, it, expect } from "vitest";
import {
  printQuality, throughput, colorRegistration, substrateRange,
  fpCost, multiColor, forPackaging, pressConfig,
  bestUse, flexoPressTypes,
} from "../flexo-press-calc.js";

describe("printQuality", () => {
  it("gearless servo best print quality", () => {
    expect(printQuality("gearless_servo")).toBeGreaterThan(printQuality("stack_type"));
  });
});

describe("throughput", () => {
  it("wide web highest throughput", () => {
    expect(throughput("wide_web")).toBeGreaterThan(throughput("stack_type"));
  });
});

describe("colorRegistration", () => {
  it("central impression best color registration", () => {
    expect(colorRegistration("central_impression")).toBeGreaterThan(colorRegistration("stack_type"));
  });
});

describe("substrateRange", () => {
  it("wide web widest substrate range", () => {
    expect(substrateRange("wide_web")).toBeGreaterThan(substrateRange("central_impression"));
  });
});

describe("fpCost", () => {
  it("gearless servo most expensive", () => {
    expect(fpCost("gearless_servo")).toBeGreaterThan(fpCost("stack_type"));
  });
});

describe("multiColor", () => {
  it("all types support multi color", () => {
    expect(multiColor("stack_type")).toBe(true);
  });
  it("central impression multi color", () => {
    expect(multiColor("central_impression")).toBe(true);
  });
});

describe("forPackaging", () => {
  it("central impression for packaging", () => {
    expect(forPackaging("central_impression")).toBe(true);
  });
  it("wide web for packaging", () => {
    expect(forPackaging("wide_web")).toBe(true);
  });
});

describe("pressConfig", () => {
  it("inline type uses horizontal line modular unit versatile", () => {
    expect(pressConfig("inline_type")).toBe("inline_type_flexo_press_horizontal_line_modular_unit_versatile");
  });
});

describe("bestUse", () => {
  it("gearless servo for high quality repeat length variable", () => {
    expect(bestUse("gearless_servo")).toBe("high_quality_flexo_gearless_servo_press_repeat_length_variable");
  });
});

describe("flexoPressTypes", () => {
  it("returns 5 types", () => {
    expect(flexoPressTypes()).toHaveLength(5);
  });
});
