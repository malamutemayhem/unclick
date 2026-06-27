import { describe, it, expect } from "vitest";
import {
  audioQuality, surroundEffect, bassResponse, setupSimplicity,
  barCost, hasSubwoofer, wirelessStreaming, connectivity,
  bestUseCase, soundbars,
} from "../soundbar-calc.js";

describe("audioQuality", () => {
  it("dolby atmos best quality", () => {
    expect(audioQuality("dolby_atmos")).toBeGreaterThan(audioQuality("basic_stereo"));
  });
});

describe("surroundEffect", () => {
  it("dolby atmos best surround", () => {
    expect(surroundEffect("dolby_atmos")).toBeGreaterThan(surroundEffect("basic_stereo"));
  });
});

describe("bassResponse", () => {
  it("soundbase platform strong bass", () => {
    expect(bassResponse("soundbase_platform")).toBeGreaterThan(bassResponse("basic_stereo"));
  });
});

describe("setupSimplicity", () => {
  it("basic stereo simplest setup", () => {
    expect(setupSimplicity("basic_stereo")).toBeGreaterThan(setupSimplicity("multiroom_wireless"));
  });
});

describe("barCost", () => {
  it("dolby atmos most expensive", () => {
    expect(barCost("dolby_atmos")).toBeGreaterThan(barCost("basic_stereo"));
  });
});

describe("hasSubwoofer", () => {
  it("dolby atmos has subwoofer", () => {
    expect(hasSubwoofer("dolby_atmos")).toBe(true);
  });
  it("basic stereo does not", () => {
    expect(hasSubwoofer("basic_stereo")).toBe(false);
  });
});

describe("wirelessStreaming", () => {
  it("multiroom wireless has streaming", () => {
    expect(wirelessStreaming("multiroom_wireless")).toBe(true);
  });
  it("basic stereo does not", () => {
    expect(wirelessStreaming("basic_stereo")).toBe(false);
  });
});

describe("connectivity", () => {
  it("dolby atmos uses earc hdmi wifi bluetooth", () => {
    expect(connectivity("dolby_atmos")).toBe("earc_hdmi_wifi_bluetooth");
  });
});

describe("bestUseCase", () => {
  it("gaming rgb for pc console gaming desk", () => {
    expect(bestUseCase("gaming_rgb")).toBe("pc_console_gaming_desk");
  });
});

describe("soundbars", () => {
  it("returns 5 types", () => {
    expect(soundbars()).toHaveLength(5);
  });
});
