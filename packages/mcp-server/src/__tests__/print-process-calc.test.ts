import { describe, it, expect } from "vitest";
import {
  detailResolution, colorLayers, editionSize,
  setupTime, costPerPrint, handPrinted,
  photographicSource, bestApplication, collectorsValue, printProcesses,
} from "../print-process-calc.js";

describe("detailResolution", () => {
  it("etching has best detail", () => {
    expect(detailResolution("etching")).toBeGreaterThan(
      detailResolution("woodcut")
    );
  });
});

describe("colorLayers", () => {
  it("screen print has most color layers", () => {
    expect(colorLayers("screen_print")).toBeGreaterThan(
      colorLayers("woodcut")
    );
  });
});

describe("editionSize", () => {
  it("digital has largest editions", () => {
    expect(editionSize("digital")).toBeGreaterThan(
      editionSize("etching")
    );
  });
});

describe("setupTime", () => {
  it("etching has longest setup", () => {
    expect(setupTime("etching")).toBeGreaterThan(
      setupTime("digital")
    );
  });
});

describe("costPerPrint", () => {
  it("etching costs most per print", () => {
    expect(costPerPrint("etching")).toBeGreaterThan(
      costPerPrint("digital")
    );
  });
});

describe("handPrinted", () => {
  it("etching is hand printed", () => {
    expect(handPrinted("etching")).toBe(true);
  });
  it("digital is not", () => {
    expect(handPrinted("digital")).toBe(false);
  });
});

describe("photographicSource", () => {
  it("digital can use photographic source", () => {
    expect(photographicSource("digital")).toBe(true);
  });
  it("woodcut cannot", () => {
    expect(photographicSource("woodcut")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("etching for illustration", () => {
    expect(bestApplication("etching")).toBe("illustration");
  });
});

describe("collectorsValue", () => {
  it("etching has highest collectors value", () => {
    expect(collectorsValue("etching")).toBeGreaterThan(
      collectorsValue("digital")
    );
  });
});

describe("printProcesses", () => {
  it("returns 5 types", () => {
    expect(printProcesses()).toHaveLength(5);
  });
});
