import { describe, it, expect } from "vitest";
import {
  moduleWidth, pcbFit, ventilation, accessEase,
  encCost, sealed, stackable, railType,
  bestUse, dinEnclosures,
} from "../din-enclosure-calc.js";

describe("moduleWidth", () => {
  it("double wide power widest module", () => {
    expect(moduleWidth("double_wide_power")).toBeGreaterThan(moduleWidth("slim_signal_module"));
  });
});

describe("pcbFit", () => {
  it("open pcb holder best pcb fit", () => {
    expect(pcbFit("open_pcb_holder")).toBeGreaterThan(pcbFit("sealed_terminal_box"));
  });
});

describe("ventilation", () => {
  it("open pcb holder best ventilation", () => {
    expect(ventilation("open_pcb_holder")).toBeGreaterThan(ventilation("sealed_terminal_box"));
  });
});

describe("accessEase", () => {
  it("open pcb holder easiest access", () => {
    expect(accessEase("open_pcb_holder")).toBeGreaterThan(accessEase("sealed_terminal_box"));
  });
});

describe("encCost", () => {
  it("double wide power most expensive", () => {
    expect(encCost("double_wide_power")).toBeGreaterThan(encCost("open_pcb_holder"));
  });
});

describe("sealed", () => {
  it("sealed terminal box is sealed", () => {
    expect(sealed("sealed_terminal_box")).toBe(true);
  });
  it("open pcb holder not sealed", () => {
    expect(sealed("open_pcb_holder")).toBe(false);
  });
});

describe("stackable", () => {
  it("modular rail mount is stackable", () => {
    expect(stackable("modular_rail_mount")).toBe(true);
  });
  it("sealed terminal box not stackable", () => {
    expect(stackable("sealed_terminal_box")).toBe(false);
  });
});

describe("railType", () => {
  it("double wide power uses ts35 heavy duty", () => {
    expect(railType("double_wide_power")).toBe("ts35_heavy_duty");
  });
});

describe("bestUse", () => {
  it("slim signal module best for analog signal isolator", () => {
    expect(bestUse("slim_signal_module")).toBe("analog_signal_isolator");
  });
});

describe("dinEnclosures", () => {
  it("returns 5 types", () => {
    expect(dinEnclosures()).toHaveLength(5);
  });
});
