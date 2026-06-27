import { describe, it, expect } from "vitest";
import {
  fidelity, bandwidth, storage, compatibility,
  srCost, lossless, forVoice, standard,
  bestUse, sampleRates,
} from "../sample-rate-calc.js";

describe("fidelity", () => {
  it("sr 192k mastering highest fidelity", () => {
    expect(fidelity("sr_192k_mastering")).toBeGreaterThan(fidelity("sr_8k_narrowband"));
  });
});

describe("bandwidth", () => {
  it("sr 192k mastering widest bandwidth", () => {
    expect(bandwidth("sr_192k_mastering")).toBeGreaterThan(bandwidth("sr_48k_broadcast"));
  });
});

describe("storage", () => {
  it("sr 8k narrowband best storage efficiency", () => {
    expect(storage("sr_8k_narrowband")).toBeGreaterThan(storage("sr_192k_mastering"));
  });
});

describe("compatibility", () => {
  it("sr 44k1 cd audio most compatible", () => {
    expect(compatibility("sr_44k1_cd_audio")).toBeGreaterThan(compatibility("sr_192k_mastering"));
  });
});

describe("srCost", () => {
  it("sr 192k mastering most expensive", () => {
    expect(srCost("sr_192k_mastering")).toBeGreaterThan(srCost("sr_8k_narrowband"));
  });
});

describe("lossless", () => {
  it("sr 44k1 cd audio is lossless", () => {
    expect(lossless("sr_44k1_cd_audio")).toBe(true);
  });
  it("sr 8k narrowband not lossless", () => {
    expect(lossless("sr_8k_narrowband")).toBe(false);
  });
});

describe("forVoice", () => {
  it("sr 8k narrowband for voice", () => {
    expect(forVoice("sr_8k_narrowband")).toBe(true);
  });
  it("sr 96k hi res not for voice", () => {
    expect(forVoice("sr_96k_hi_res")).toBe(false);
  });
});

describe("standard", () => {
  it("sr 48k broadcast uses aes3 ebu broadcast", () => {
    expect(standard("sr_48k_broadcast")).toBe("aes3_ebu_broadcast");
  });
});

describe("bestUse", () => {
  it("sr 192k mastering best for archival mastering dsd", () => {
    expect(bestUse("sr_192k_mastering")).toBe("archival_mastering_dsd");
  });
});

describe("sampleRates", () => {
  it("returns 5 types", () => {
    expect(sampleRates()).toHaveLength(5);
  });
});
