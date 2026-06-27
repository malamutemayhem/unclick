import { describe, it, expect } from "vitest";
import {
  handProtection, punchFeedback, wristSupport, easeOnOff,
  gloveCost, thumbAttached, laceUp, paddingType,
  bestTraining, boxingGloves,
} from "../boxing-glove-calc.js";

describe("handProtection", () => {
  it("sparring padded 16oz best hand protection", () => {
    expect(handProtection("sparring_padded_16oz")).toBeGreaterThan(handProtection("mma_open_finger_4oz"));
  });
});

describe("punchFeedback", () => {
  it("mma open finger 4oz best punch feedback", () => {
    expect(punchFeedback("mma_open_finger_4oz")).toBeGreaterThan(punchFeedback("sparring_padded_16oz"));
  });
});

describe("wristSupport", () => {
  it("competition lace 10oz best wrist support", () => {
    expect(wristSupport("competition_lace_10oz")).toBeGreaterThan(wristSupport("cardio_wrap_quick_on"));
  });
});

describe("easeOnOff", () => {
  it("cardio wrap quick on easiest on off", () => {
    expect(easeOnOff("cardio_wrap_quick_on")).toBeGreaterThan(easeOnOff("competition_lace_10oz"));
  });
});

describe("gloveCost", () => {
  it("competition lace 10oz most expensive", () => {
    expect(gloveCost("competition_lace_10oz")).toBeGreaterThan(gloveCost("cardio_wrap_quick_on"));
  });
});

describe("thumbAttached", () => {
  it("sparring padded 16oz has thumb attached", () => {
    expect(thumbAttached("sparring_padded_16oz")).toBe(true);
  });
  it("mma open finger 4oz does not", () => {
    expect(thumbAttached("mma_open_finger_4oz")).toBe(false);
  });
});

describe("laceUp", () => {
  it("competition lace 10oz is lace up", () => {
    expect(laceUp("competition_lace_10oz")).toBe(true);
  });
  it("bag glove light 12oz is not", () => {
    expect(laceUp("bag_glove_light_12oz")).toBe(false);
  });
});

describe("paddingType", () => {
  it("sparring padded 16oz uses injected mold foam 16oz", () => {
    expect(paddingType("sparring_padded_16oz")).toBe("injected_mold_foam_16oz");
  });
});

describe("bestTraining", () => {
  it("mma open finger 4oz best for mma grapple strike", () => {
    expect(bestTraining("mma_open_finger_4oz")).toBe("mma_grapple_strike");
  });
});

describe("boxingGloves", () => {
  it("returns 5 types", () => {
    expect(boxingGloves()).toHaveLength(5);
  });
});
