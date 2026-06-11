import { describe, it, expect } from "vitest";
import {
  qor, compileSpeed, languageSupport, verification,
  hlsCost, openSource, forProduction, inputLang,
  bestUse, hlsTools,
} from "../hls-tool-calc.js";

describe("qor", () => {
  it("catapult siemens best qor", () => {
    expect(qor("catapult_siemens")).toBeGreaterThan(qor("bambu_open_source"));
  });
});

describe("compileSpeed", () => {
  it("bambu open source fastest compile", () => {
    expect(compileSpeed("bambu_open_source")).toBeGreaterThan(compileSpeed("catapult_siemens"));
  });
});

describe("languageSupport", () => {
  it("intel hls oneapi widest language support", () => {
    expect(languageSupport("intel_hls_oneapi")).toBeGreaterThan(languageSupport("legup_academic"));
  });
});

describe("verification", () => {
  it("catapult siemens best verification", () => {
    expect(verification("catapult_siemens")).toBeGreaterThan(verification("legup_academic"));
  });
});

describe("hlsCost", () => {
  it("catapult siemens most expensive", () => {
    expect(hlsCost("catapult_siemens")).toBeGreaterThan(hlsCost("bambu_open_source"));
  });
});

describe("openSource", () => {
  it("bambu open source is open source", () => {
    expect(openSource("bambu_open_source")).toBe(true);
  });
  it("vivado hls xilinx not open source", () => {
    expect(openSource("vivado_hls_xilinx")).toBe(false);
  });
});

describe("forProduction", () => {
  it("vivado hls xilinx for production", () => {
    expect(forProduction("vivado_hls_xilinx")).toBe(true);
  });
  it("bambu open source not for production", () => {
    expect(forProduction("bambu_open_source")).toBe(false);
  });
});

describe("inputLang", () => {
  it("intel hls oneapi uses sycl oneapi kernel", () => {
    expect(inputLang("intel_hls_oneapi")).toBe("sycl_oneapi_kernel");
  });
});

describe("bestUse", () => {
  it("catapult siemens best for asic ip block design", () => {
    expect(bestUse("catapult_siemens")).toBe("asic_ip_block_design");
  });
});

describe("hlsTools", () => {
  it("returns 5 types", () => {
    expect(hlsTools()).toHaveLength(5);
  });
});
