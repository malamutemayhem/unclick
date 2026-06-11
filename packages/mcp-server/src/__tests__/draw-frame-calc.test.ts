import { describe, it, expect } from "vitest";
import {
  draftQuality, deliverySpeed, evenness, doublingCapacity,
  dfCost, autoLeveler, forCombing, rollerConfig,
  bestUse, drawFrameTypes,
} from "../draw-frame-calc.js";

describe("draftQuality", () => {
  it("autoleveler regulated best draft quality", () => {
    expect(draftQuality("autoleveler_regulated")).toBeGreaterThan(draftQuality("single_head_breaker"));
  });
});

describe("deliverySpeed", () => {
  it("high speed compact fastest delivery", () => {
    expect(deliverySpeed("high_speed_compact")).toBeGreaterThan(deliverySpeed("blended_mixing"));
  });
});

describe("evenness", () => {
  it("autoleveler regulated best evenness", () => {
    expect(evenness("autoleveler_regulated")).toBeGreaterThan(evenness("single_head_breaker"));
  });
});

describe("doublingCapacity", () => {
  it("blended mixing highest doubling capacity", () => {
    expect(doublingCapacity("blended_mixing")).toBeGreaterThan(doublingCapacity("high_speed_compact"));
  });
});

describe("dfCost", () => {
  it("autoleveler regulated most expensive", () => {
    expect(dfCost("autoleveler_regulated")).toBeGreaterThan(dfCost("single_head_breaker"));
  });
});

describe("autoLeveler", () => {
  it("autoleveler regulated has auto leveler", () => {
    expect(autoLeveler("autoleveler_regulated")).toBe(true);
  });
  it("single head breaker no auto leveler", () => {
    expect(autoLeveler("single_head_breaker")).toBe(false);
  });
});

describe("forCombing", () => {
  it("double head finisher for combing", () => {
    expect(forCombing("double_head_finisher")).toBe(true);
  });
  it("single head breaker not for combing", () => {
    expect(forCombing("single_head_breaker")).toBe(false);
  });
});

describe("rollerConfig", () => {
  it("blended mixing uses multi creel doubling", () => {
    expect(rollerConfig("blended_mixing")).toBe("multi_creel_doubling_8_to_12_fold_blend_mixing_draft_passage");
  });
});

describe("bestUse", () => {
  it("high speed compact for rotor spinning feed", () => {
    expect(bestUse("high_speed_compact")).toBe("high_volume_open_end_rotor_spinning_feed_fast_sliver_output");
  });
});

describe("drawFrameTypes", () => {
  it("returns 5 types", () => {
    expect(drawFrameTypes()).toHaveLength(5);
  });
});
