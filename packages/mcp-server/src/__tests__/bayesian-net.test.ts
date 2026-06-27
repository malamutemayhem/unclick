import { describe, it, expect } from "vitest";
import { BayesianNetwork } from "../bayesian-net.js";

describe("BayesianNetwork", () => {
  function createWeatherNet(): BayesianNetwork {
    const net = new BayesianNetwork();
    net.addNode("Rain");
    net.addNode("Sprinkler", ["Rain"]);
    net.addNode("WetGrass", ["Rain", "Sprinkler"]);

    net.setProbability("Rain", {}, 0.2);
    net.setProbability("Sprinkler", { Rain: true }, 0.01);
    net.setProbability("Sprinkler", { Rain: false }, 0.4);
    net.setProbability("WetGrass", { Rain: true, Sprinkler: true }, 0.99);
    net.setProbability("WetGrass", { Rain: true, Sprinkler: false }, 0.8);
    net.setProbability("WetGrass", { Rain: false, Sprinkler: true }, 0.9);
    net.setProbability("WetGrass", { Rain: false, Sprinkler: false }, 0.0);

    return net;
  }

  it("adds nodes and tracks count", () => {
    const net = createWeatherNet();
    expect(net.nodeCount()).toBe(3);
  });

  it("counts edges", () => {
    const net = createWeatherNet();
    expect(net.edgeCount()).toBe(3);
  });

  it("gets and sets probabilities", () => {
    const net = createWeatherNet();
    expect(net.getProbability("Rain", {})).toBe(0.2);
    expect(net.getProbability("Sprinkler", { Rain: true })).toBe(0.01);
  });

  it("identifies root nodes", () => {
    const net = createWeatherNet();
    expect(net.isRoot("Rain")).toBe(true);
    expect(net.isRoot("Sprinkler")).toBe(false);
  });

  it("gets parents", () => {
    const net = createWeatherNet();
    expect(net.getParents("WetGrass")).toEqual(["Rain", "Sprinkler"]);
    expect(net.getParents("Rain")).toEqual([]);
  });

  it("gets children", () => {
    const net = createWeatherNet();
    expect(net.getChildren("Rain")).toContain("Sprinkler");
    expect(net.getChildren("Rain")).toContain("WetGrass");
  });

  it("performs topological sort", () => {
    const net = createWeatherNet();
    const sorted = net.topologicalSort();
    expect(sorted.indexOf("Rain")).toBeLessThan(sorted.indexOf("Sprinkler"));
    expect(sorted.indexOf("Rain")).toBeLessThan(sorted.indexOf("WetGrass"));
  });

  it("generates forward samples", () => {
    const net = createWeatherNet();
    const sample = net.forwardSample();
    expect(typeof sample.Rain).toBe("boolean");
    expect(typeof sample.Sprinkler).toBe("boolean");
    expect(typeof sample.WetGrass).toBe("boolean");
  });

  it("lists all node names", () => {
    const net = createWeatherNet();
    const nodes = net.getNodes();
    expect(nodes).toContain("Rain");
    expect(nodes).toContain("Sprinkler");
    expect(nodes).toContain("WetGrass");
  });

  it("throws on unknown node", () => {
    const net = createWeatherNet();
    expect(() => net.getProbability("Unknown", {})).toThrow();
  });
});
