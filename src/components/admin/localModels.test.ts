import { describe, expect, it } from "vitest";
import {
  CURATED_LOCAL_MODELS,
  estimateDownloadTime,
  findCuratedModel,
  formatSizeGB,
  friendlyModelName,
  modelFit,
  normalizeModelTag,
  recommendModels,
  suggestRamGB,
  type MachineProbe,
} from "./localModels";

const baseProbe: MachineProbe = {
  cores: 8,
  approxMemGB: 8,
  memIsFloor: true,
  gpuLabel: null,
  appleSilicon: false,
  platform: "mac",
};

describe("curated local model catalog", () => {
  it("keeps the 80/20 promise: a small set with a wide skill range", () => {
    expect(CURATED_LOCAL_MODELS.length).toBeGreaterThanOrEqual(8);
    expect(CURATED_LOCAL_MODELS.length).toBeLessThanOrEqual(12);

    const uses = new Set(CURATED_LOCAL_MODELS.flatMap((m) => m.uses));
    expect(uses).toContain("chat");
    expect(uses).toContain("code");
    expect(uses).toContain("vision");
    expect(uses).toContain("reasoning");
    expect(uses).toContain("memory");
  });

  it("has unique tags and complete plain-English fields", () => {
    const tags = CURATED_LOCAL_MODELS.map((m) => m.tag);
    expect(new Set(tags).size).toBe(tags.length);

    for (const m of CURATED_LOCAL_MODELS) {
      expect(m.nick.length).toBeGreaterThan(0);
      expect(m.blurb.length).toBeGreaterThan(20);
      expect(m.goodFor.length).toBeGreaterThan(0);
      expect(m.sizeGB).toBeGreaterThan(0);
      expect(m.comfortableRamGB).toBeGreaterThanOrEqual(8);
      expect(m.speed).toBeGreaterThanOrEqual(1);
      expect(m.speed).toBeLessThanOrEqual(5);
      expect(m.brains).toBeGreaterThanOrEqual(1);
      expect(m.brains).toBeLessThanOrEqual(5);
    }
  });

  it("contains no em dashes in any user-facing copy", () => {
    for (const m of CURATED_LOCAL_MODELS) {
      const copy = [m.nick, m.blurb, m.analogy ?? "", ...m.goodFor].join(" ");
      expect(copy).not.toMatch(/—/);
    }
  });

  it("offers something for an 8 GB machine in every headline lane", () => {
    const light = CURATED_LOCAL_MODELS.filter((m) => m.comfortableRamGB <= 8);
    expect(light.some((m) => m.uses.includes("chat"))).toBe(true);
    expect(light.some((m) => m.uses.includes("vision"))).toBe(true);
    expect(light.some((m) => m.uses.includes("memory"))).toBe(true);
  });
});

describe("normalizeModelTag / friendly names", () => {
  it("treats :latest as the bare tag", () => {
    expect(normalizeModelTag("phi4:latest")).toBe("phi4");
    expect(normalizeModelTag("Phi4")).toBe("phi4");
    expect(findCuratedModel("phi4:latest")?.nick).toBe("Homework Whiz");
  });

  it("falls back to the raw tag for unknown models", () => {
    expect(friendlyModelName("some-custom:13b")).toBe("some-custom:13b");
    expect(friendlyModelName("llama3.2:3b")).toBe("Everyday Helper");
  });
});

describe("machine fit and recommendations", () => {
  it("marks comfortable models as great and oversized ones honestly", () => {
    const small = findCuratedModel("llama3.2:3b")!;
    const heavy = findCuratedModel("gemma3:27b")!;
    expect(modelFit(small, 8)).toBe("great");
    expect(modelFit(heavy, 8)).toBe("too-big");
    expect(modelFit(heavy, 32)).toBe("great");
  });

  it("lets a mid model squeeze onto a smaller machine as ok", () => {
    const mid = findCuratedModel("llama3.1:8b")!;
    expect(modelFit(mid, 8)).toBe("ok");
  });

  it("recommends only models the machine can comfortably run", () => {
    for (const ram of [8, 16, 32, 64]) {
      const rec = recommendModels(ram);
      expect(rec.best.comfortableRamGB).toBeLessThanOrEqual(ram);
      for (const extra of rec.extras) {
        expect(extra.comfortableRamGB).toBeLessThanOrEqual(ram);
      }
    }
  });

  it("scales the headline pick with the machine", () => {
    const small = recommendModels(8);
    const big = recommendModels(32);
    expect(small.best.sizeGB).toBeLessThanOrEqual(4);
    expect(big.best.brains).toBeGreaterThanOrEqual(small.best.brains);
    expect(big.best.tag).toBe("gemma3:27b");
  });

  it("always includes the librarian so memory features work everywhere", () => {
    expect(recommendModels(8).librarian?.tag).toBe("nomic-embed-text");
  });

  it("never recommends the same model twice across best and extras", () => {
    for (const ram of [8, 16, 32, 64]) {
      const rec = recommendModels(ram);
      const tags = [rec.best.tag, ...rec.extras.map((m) => m.tag)];
      expect(new Set(tags).size).toBe(tags.length);
    }
  });
});

describe("suggestRamGB", () => {
  it("suggests 16 when the capped reading hits 8 on Apple Silicon", () => {
    expect(suggestRamGB({ ...baseProbe, appleSilicon: true })).toBe(16);
  });

  it("stays safe at 8 for an ordinary capped reading", () => {
    expect(suggestRamGB(baseProbe)).toBe(8);
  });

  it("respects a genuinely low reading", () => {
    expect(
      suggestRamGB({ ...baseProbe, approxMemGB: 4, memIsFloor: false }),
    ).toBe(8);
  });
});

describe("plain-English sizing", () => {
  it("formats sizes the way people read them", () => {
    expect(formatSizeGB(0.3)).toBe("300 MB");
    expect(formatSizeGB(2)).toBe("2 GB");
    expect(formatSizeGB(4.9)).toBe("4.9 GB");
  });

  it("phrases download times without jargon", () => {
    expect(estimateDownloadTime(0.3)).toBe("under a minute");
    expect(estimateDownloadTime(2)).toMatch(/about \d+ minutes/);
    expect(estimateDownloadTime(17)).toMatch(/minutes|hour/);
  });
});
