import { describe, it, expect } from "vitest";
import {
  efficiency, linearity, bandwidth, backoffEff,
  paCost, digitalPd, for5g, operation,
  bestUse, paClasses,
} from "../pa-class-calc.js";

describe("efficiency", () => {
  it("class e zvs highest efficiency", () => {
    expect(efficiency("class_e_zvs")).toBeGreaterThan(efficiency("class_a_linear"));
  });
});

describe("linearity", () => {
  it("class a linear best linearity", () => {
    expect(linearity("class_a_linear")).toBeGreaterThan(linearity("class_e_zvs"));
  });
});

describe("bandwidth", () => {
  it("class a linear widest bandwidth", () => {
    expect(bandwidth("class_a_linear")).toBeGreaterThan(bandwidth("class_e_zvs"));
  });
});

describe("backoffEff", () => {
  it("doherty load mod best backoff efficiency", () => {
    expect(backoffEff("doherty_load_mod")).toBeGreaterThan(backoffEff("class_a_linear"));
  });
});

describe("paCost", () => {
  it("doherty load mod most expensive", () => {
    expect(paCost("doherty_load_mod")).toBeGreaterThan(paCost("class_ab_push_pull"));
  });
});

describe("digitalPd", () => {
  it("doherty load mod uses digital pd", () => {
    expect(digitalPd("doherty_load_mod")).toBe(true);
  });
  it("class e zvs no digital pd", () => {
    expect(digitalPd("class_e_zvs")).toBe(false);
  });
});

describe("for5g", () => {
  it("doherty load mod for 5g", () => {
    expect(for5g("doherty_load_mod")).toBe(true);
  });
  it("class d switching not for 5g", () => {
    expect(for5g("class_d_switching")).toBe(false);
  });
});

describe("operation", () => {
  it("class e zvs uses zero voltage switch shunt", () => {
    expect(operation("class_e_zvs")).toBe("zero_voltage_switch_shunt");
  });
});

describe("bestUse", () => {
  it("doherty load mod best for 5g massive mimo rru", () => {
    expect(bestUse("doherty_load_mod")).toBe("5g_massive_mimo_rru");
  });
});

describe("paClasses", () => {
  it("returns 5 types", () => {
    expect(paClasses()).toHaveLength(5);
  });
});
