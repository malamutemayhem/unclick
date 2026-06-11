import { describe, it, expect } from "vitest";
import {
  channelCount, sampleDepth, protocolSupport, portability,
  analyzerCost, standalone, forProtocol, captureMethod,
  bestUse, logicAnalyzers,
} from "../logic-analyzer-calc.js";

describe("channelCount", () => {
  it("mixed signal combo most channels", () => {
    expect(channelCount("mixed_signal_combo")).toBeGreaterThan(channelCount("usb_basic_hobby"));
  });
});

describe("sampleDepth", () => {
  it("standalone bench pro deepest sample", () => {
    expect(sampleDepth("standalone_bench_pro")).toBeGreaterThan(sampleDepth("usb_basic_hobby"));
  });
});

describe("protocolSupport", () => {
  it("protocol decode adv best protocol support", () => {
    expect(protocolSupport("protocol_decode_adv")).toBeGreaterThan(protocolSupport("usb_basic_hobby"));
  });
});

describe("portability", () => {
  it("portable field logic most portable", () => {
    expect(portability("portable_field_logic")).toBeGreaterThan(portability("standalone_bench_pro"));
  });
});

describe("analyzerCost", () => {
  it("standalone bench pro most expensive", () => {
    expect(analyzerCost("standalone_bench_pro")).toBeGreaterThan(analyzerCost("usb_basic_hobby"));
  });
});

describe("standalone", () => {
  it("standalone bench pro is standalone", () => {
    expect(standalone("standalone_bench_pro")).toBe(true);
  });
  it("usb basic hobby not standalone", () => {
    expect(standalone("usb_basic_hobby")).toBe(false);
  });
});

describe("forProtocol", () => {
  it("protocol decode adv is for protocol", () => {
    expect(forProtocol("protocol_decode_adv")).toBe(true);
  });
  it("usb basic hobby not for protocol", () => {
    expect(forProtocol("usb_basic_hobby")).toBe(false);
  });
});

describe("captureMethod", () => {
  it("mixed signal combo uses analog digital merge", () => {
    expect(captureMethod("mixed_signal_combo")).toBe("analog_digital_merge");
  });
});

describe("bestUse", () => {
  it("portable field logic best for field logic capture", () => {
    expect(bestUse("portable_field_logic")).toBe("field_logic_capture");
  });
});

describe("logicAnalyzers", () => {
  it("returns 5 types", () => {
    expect(logicAnalyzers()).toHaveLength(5);
  });
});
