import { describe, it, expect } from "vitest";
import {
  tensionEven, durability, setupSpeed, registrationAccuracy,
  frameCost, retensionable, noGlue, frameMaterial,
  bestUse, printFrames,
} from "../print-frame-calc.js";

describe("tensionEven", () => {
  it("newman pro tension most even tension", () => {
    expect(tensionEven("newman_pro_tension")).toBeGreaterThan(tensionEven("wood_basic_staple"));
  });
});

describe("durability", () => {
  it("newman pro tension most durable", () => {
    expect(durability("newman_pro_tension")).toBeGreaterThan(durability("wood_basic_staple"));
  });
});

describe("setupSpeed", () => {
  it("roller frame fast fastest setup", () => {
    expect(setupSpeed("roller_frame_fast")).toBeGreaterThan(setupSpeed("newman_pro_tension"));
  });
});

describe("registrationAccuracy", () => {
  it("newman pro tension most accurate registration", () => {
    expect(registrationAccuracy("newman_pro_tension")).toBeGreaterThan(registrationAccuracy("wood_basic_staple"));
  });
});

describe("frameCost", () => {
  it("newman pro tension most expensive", () => {
    expect(frameCost("newman_pro_tension")).toBeGreaterThan(frameCost("wood_basic_staple"));
  });
});

describe("retensionable", () => {
  it("aluminum retensionable is retensionable", () => {
    expect(retensionable("aluminum_retensionable")).toBe(true);
  });
  it("wood basic staple not retensionable", () => {
    expect(retensionable("wood_basic_staple")).toBe(false);
  });
});

describe("noGlue", () => {
  it("roller frame fast has no glue", () => {
    expect(noGlue("roller_frame_fast")).toBe(true);
  });
  it("wood basic staple uses glue", () => {
    expect(noGlue("wood_basic_staple")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("wood basic staple uses pine wood stapled", () => {
    expect(frameMaterial("wood_basic_staple")).toBe("pine_wood_stapled");
  });
});

describe("bestUse", () => {
  it("newman pro tension best for precision cmyk print", () => {
    expect(bestUse("newman_pro_tension")).toBe("precision_cmyk_print");
  });
});

describe("printFrames", () => {
  it("returns 5 types", () => {
    expect(printFrames()).toHaveLength(5);
  });
});
