import { describe, it, expect } from "vitest";
import {
  panelArea, paintLayers, silverStainFiringTemp, leadCameLengthCm,
  glassWeight, brushStrokesPerCm2, paintingHours, firingCycles,
  lightTransmissionPercent, costPerM2, grisailleStyles,
} from "../grisaille-calc.js";

describe("panelArea", () => {
  it("positive area", () => {
    expect(panelArea(60, 120)).toBeGreaterThan(0);
  });
});

describe("paintLayers", () => {
  it("foliate most layers", () => {
    expect(paintLayers("foliate")).toBeGreaterThan(paintLayers("geometric"));
  });
});

describe("silverStainFiringTemp", () => {
  it("positive temp", () => {
    expect(silverStainFiringTemp(5)).toBeGreaterThan(500);
  });
});

describe("leadCameLengthCm", () => {
  it("positive length", () => {
    expect(leadCameLengthCm(60, 120, 3)).toBeGreaterThan(0);
  });
});

describe("glassWeight", () => {
  it("positive weight", () => {
    expect(glassWeight(7200, 3)).toBeGreaterThan(0);
  });
});

describe("brushStrokesPerCm2", () => {
  it("crosshatch most", () => {
    expect(brushStrokesPerCm2("crosshatch")).toBeGreaterThan(brushStrokesPerCm2("geometric"));
  });
});

describe("paintingHours", () => {
  it("positive hours", () => {
    expect(paintingHours(7200, "foliate")).toBeGreaterThan(0);
  });
});

describe("firingCycles", () => {
  it("positive cycles", () => {
    expect(firingCycles(5)).toBeGreaterThan(0);
  });
});

describe("lightTransmissionPercent", () => {
  it("geometric best", () => {
    expect(lightTransmissionPercent("geometric")).toBeGreaterThan(lightTransmissionPercent("crosshatch"));
  });
});

describe("costPerM2", () => {
  it("foliate most expensive", () => {
    expect(costPerM2("foliate")).toBeGreaterThan(costPerM2("geometric"));
  });
});

describe("grisailleStyles", () => {
  it("returns 5 styles", () => {
    expect(grisailleStyles()).toHaveLength(5);
  });
});
