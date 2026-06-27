import { describe, it, expect } from "vitest";
import {
  heatEven, meltSpeed, controlTemp, portability,
  embossCost, dualTemp, forDetail, heatSource,
  bestUse, heatEmbosss,
} from "../heat-emboss-calc.js";

describe("heatEven", () => {
  it("craft iron flat most even heat", () => {
    expect(heatEven("craft_iron_flat")).toBeGreaterThan(heatEven("emboss_pen_detail"));
  });
});

describe("meltSpeed", () => {
  it("heat gun standard fastest melt", () => {
    expect(meltSpeed("heat_gun_standard")).toBeGreaterThan(meltSpeed("emboss_pen_detail"));
  });
});

describe("controlTemp", () => {
  it("dual temp switch best temp control", () => {
    expect(controlTemp("dual_temp_switch")).toBeGreaterThan(controlTemp("mini_heat_tool"));
  });
});

describe("portability", () => {
  it("mini heat tool most portable", () => {
    expect(portability("mini_heat_tool")).toBeGreaterThan(portability("craft_iron_flat"));
  });
});

describe("embossCost", () => {
  it("dual temp switch most expensive", () => {
    expect(embossCost("dual_temp_switch")).toBeGreaterThan(embossCost("mini_heat_tool"));
  });
});

describe("dualTemp", () => {
  it("dual temp switch has dual temp", () => {
    expect(dualTemp("dual_temp_switch")).toBe(true);
  });
  it("heat gun standard no dual temp", () => {
    expect(dualTemp("heat_gun_standard")).toBe(false);
  });
});

describe("forDetail", () => {
  it("emboss pen detail is for detail", () => {
    expect(forDetail("emboss_pen_detail")).toBe(true);
  });
  it("heat gun standard not for detail", () => {
    expect(forDetail("heat_gun_standard")).toBe(false);
  });
});

describe("heatSource", () => {
  it("craft iron flat uses flat plate iron", () => {
    expect(heatSource("craft_iron_flat")).toBe("flat_plate_iron");
  });
});

describe("bestUse", () => {
  it("heat gun standard best for general powder emboss", () => {
    expect(bestUse("heat_gun_standard")).toBe("general_powder_emboss");
  });
});

describe("heatEmbosss", () => {
  it("returns 5 types", () => {
    expect(heatEmbosss()).toHaveLength(5);
  });
});
