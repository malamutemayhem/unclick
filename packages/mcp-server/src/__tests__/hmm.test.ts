import { describe, it, expect } from "vitest";
import { HMM } from "../hmm.js";

describe("HMM", () => {
  function createWeatherHMM(): HMM {
    return new HMM(
      ["sunny", "rainy"],
      ["walk", "shop", "clean"],
      [0.6, 0.4],
      [
        [0.7, 0.3],
        [0.4, 0.6],
      ],
      [
        [0.6, 0.3, 0.1],
        [0.1, 0.4, 0.5],
      ],
    );
  }

  it("forward computes alpha matrix", () => {
    const hmm = createWeatherHMM();
    const alpha = hmm.forward(["walk", "shop"]);
    expect(alpha.length).toBe(2);
    expect(alpha[0].length).toBe(2);
    expect(alpha[0][0]).toBeGreaterThan(0);
  });

  it("likelihood returns observation probability", () => {
    const hmm = createWeatherHMM();
    const prob = hmm.likelihood(["walk"]);
    expect(prob).toBeGreaterThan(0);
    expect(prob).toBeLessThanOrEqual(1);
  });

  it("likelihood decreases with unlikely sequences", () => {
    const hmm = createWeatherHMM();
    const likely = hmm.likelihood(["walk", "walk"]);
    const unlikely = hmm.likelihood(["clean", "clean"]);
    expect(likely).toBeGreaterThan(unlikely);
  });

  it("viterbi returns most likely state sequence", () => {
    const hmm = createWeatherHMM();
    const result = hmm.viterbi(["walk", "shop", "clean"]);
    expect(result.path.length).toBe(3);
    expect(result.probability).toBeGreaterThan(0);
    expect(["sunny", "rainy"]).toContain(result.path[0]);
  });

  it("viterbi path starts with likely state", () => {
    const hmm = createWeatherHMM();
    const result = hmm.viterbi(["walk"]);
    expect(result.path[0]).toBe("sunny");
  });

  it("generate produces sequences of correct length", () => {
    const hmm = createWeatherHMM();
    const result = hmm.generate(5);
    expect(result.states.length).toBe(5);
    expect(result.observations.length).toBe(5);
  });

  it("generate produces valid states and observations", () => {
    const hmm = createWeatherHMM();
    const result = hmm.generate(10);
    for (const s of result.states) {
      expect(["sunny", "rainy"]).toContain(s);
    }
    for (const o of result.observations) {
      expect(["walk", "shop", "clean"]).toContain(o);
    }
  });

  it("forward probabilities sum correctly", () => {
    const hmm = createWeatherHMM();
    const alpha = hmm.forward(["walk"]);
    const total = alpha[0].reduce((s: number, v: number) => s + v, 0);
    expect(total).toBeGreaterThan(0);
    expect(total).toBeLessThanOrEqual(1);
  });
});
