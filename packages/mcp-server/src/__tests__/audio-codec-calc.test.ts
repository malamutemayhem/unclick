import { describe, it, expect } from "vitest";
import {
  snr, thd, dynamicRange, powerDraw,
  codecCost, digital, forVoice, interface_,
  bestUse, audioCodecs,
} from "../audio-codec-calc.js";

describe("snr", () => {
  it("pcm i2s tdm best snr", () => {
    expect(snr("pcm_i2s_tdm")).toBeGreaterThan(snr("class_d_amp"));
  });
});

describe("thd", () => {
  it("pcm i2s tdm best thd", () => {
    expect(thd("pcm_i2s_tdm")).toBeGreaterThan(thd("class_d_amp"));
  });
});

describe("dynamicRange", () => {
  it("pcm i2s tdm best dynamic range", () => {
    expect(dynamicRange("pcm_i2s_tdm")).toBeGreaterThan(dynamicRange("class_d_amp"));
  });
});

describe("powerDraw", () => {
  it("mems mic asic lowest power draw", () => {
    expect(powerDraw("mems_mic_asic")).toBeGreaterThan(powerDraw("codec_dsp_combo"));
  });
});

describe("codecCost", () => {
  it("codec dsp combo most expensive", () => {
    expect(codecCost("codec_dsp_combo")).toBeGreaterThan(codecCost("sigma_delta_pdm"));
  });
});

describe("digital", () => {
  it("sigma delta pdm is digital", () => {
    expect(digital("sigma_delta_pdm")).toBe(true);
  });
  it("pcm i2s tdm not digital", () => {
    expect(digital("pcm_i2s_tdm")).toBe(false);
  });
});

describe("forVoice", () => {
  it("sigma delta pdm is for voice", () => {
    expect(forVoice("sigma_delta_pdm")).toBe(true);
  });
  it("class d amp not for voice", () => {
    expect(forVoice("class_d_amp")).toBe(false);
  });
});

describe("interface_", () => {
  it("pcm i2s tdm uses i2s tdm sai", () => {
    expect(interface_("pcm_i2s_tdm")).toBe("i2s_tdm_sai");
  });
});

describe("bestUse", () => {
  it("pcm i2s tdm best for studio recording adc", () => {
    expect(bestUse("pcm_i2s_tdm")).toBe("studio_recording_adc");
  });
});

describe("audioCodecs", () => {
  it("returns 5 types", () => {
    expect(audioCodecs()).toHaveLength(5);
  });
});
