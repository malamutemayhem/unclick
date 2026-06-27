import { describe, it, expect } from "vitest";
import {
  cutSmooth, controlFine, adjustEase, woodRange,
  kannaCost, curved, forEdge, bladeStyle,
  bestUse, kannaPlanes,
} from "../kanna-plane-calc.js";

describe("cutSmooth", () => {
  it("hira kanna flat smoothest cut", () => {
    expect(cutSmooth("hira_kanna_flat")).toBeGreaterThan(cutSmooth("dai_naoshi_tune"));
  });
});

describe("controlFine", () => {
  it("shinogi nomi paring finest control", () => {
    expect(controlFine("kiwa_kanna_edge")).toBeGreaterThan(controlFine("hira_kanna_flat"));
  });
});

describe("adjustEase", () => {
  it("dai naoshi tune easiest adjust", () => {
    expect(adjustEase("dai_naoshi_tune")).toBeGreaterThan(adjustEase("sori_kanna_curved"));
  });
});

describe("woodRange", () => {
  it("hira kanna flat widest wood range", () => {
    expect(woodRange("hira_kanna_flat")).toBeGreaterThan(woodRange("kiwa_kanna_edge"));
  });
});

describe("kannaCost", () => {
  it("sori kanna curved most expensive", () => {
    expect(kannaCost("sori_kanna_curved")).toBeGreaterThan(kannaCost("dai_naoshi_tune"));
  });
});

describe("curved", () => {
  it("maru kanna round is curved", () => {
    expect(curved("maru_kanna_round")).toBe(true);
  });
  it("hira kanna flat not curved", () => {
    expect(curved("hira_kanna_flat")).toBe(false);
  });
});

describe("forEdge", () => {
  it("kiwa kanna edge is for edge", () => {
    expect(forEdge("kiwa_kanna_edge")).toBe(true);
  });
  it("hira kanna flat not for edge", () => {
    expect(forEdge("hira_kanna_flat")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("maru kanna round uses round sole blade", () => {
    expect(bladeStyle("maru_kanna_round")).toBe("round_sole_blade");
  });
});

describe("bestUse", () => {
  it("hira kanna flat best for general flat surface", () => {
    expect(bestUse("hira_kanna_flat")).toBe("general_flat_surface");
  });
});

describe("kannaPlanes", () => {
  it("returns 5 types", () => {
    expect(kannaPlanes()).toHaveLength(5);
  });
});
