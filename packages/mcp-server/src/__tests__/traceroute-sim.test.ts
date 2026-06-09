import { describe, it, expect } from "vitest";
import { TracerouteSim } from "../traceroute-sim.js";

describe("TracerouteSim", () => {
  function buildNetwork(): TracerouteSim {
    const sim = new TracerouteSim(3, 30, 42);
    sim.addNode("10.0.0.1", 5, "gateway");
    sim.addNode("10.1.0.1", 10, "isp-router");
    sim.addNode("10.2.0.1", 15, "backbone");
    sim.addNode("93.184.216.34", 20, "target");
    sim.addPath("93.184.216.34", ["10.0.0.1", "10.1.0.1", "10.2.0.1", "93.184.216.34"]);
    return sim;
  }

  it("traces to target", () => {
    const sim = buildNetwork();
    const result = sim.trace("93.184.216.34");
    expect(result.reached).toBe(true);
    expect(result.totalHops).toBe(4);
    expect(result.hops[0].ip).toBe("10.0.0.1");
    expect(result.hops[3].ip).toBe("93.184.216.34");
  });

  it("each hop has correct probe count", () => {
    const sim = buildNetwork();
    const result = sim.trace("93.184.216.34");
    for (const hop of result.hops) {
      expect(hop.rtt).toHaveLength(3);
    }
  });

  it("cumulative latency increases", () => {
    const sim = buildNetwork();
    const result = sim.trace("93.184.216.34");
    const avgRtts = result.hops.map(
      (h) => h.rtt.filter((r) => r >= 0).reduce((a, b) => a + b, 0) / h.rtt.length
    );
    for (let i = 1; i < avgRtts.length; i++) {
      expect(avgRtts[i]).toBeGreaterThan(avgRtts[i - 1]);
    }
  });

  it("unknown target returns unreachable", () => {
    const sim = buildNetwork();
    const result = sim.trace("1.2.3.4");
    expect(result.reached).toBe(false);
    expect(result.totalHops).toBe(0);
  });

  it("format produces readable output", () => {
    const sim = buildNetwork();
    const result = sim.trace("93.184.216.34");
    const output = sim.format(result);
    expect(output).toContain("traceroute to 93.184.216.34");
    expect(output).toContain("gateway");
    expect(output).toContain("ms");
  });

  it("format shows unreachable for failed trace", () => {
    const sim = buildNetwork();
    const result = sim.trace("1.2.3.4");
    const output = sim.format(result);
    expect(output).toContain("unreachable");
  });

  it("hop labels included", () => {
    const sim = buildNetwork();
    const result = sim.trace("93.184.216.34");
    expect(result.hops[0].label).toBe("gateway");
    expect(result.hops[1].label).toBe("isp-router");
  });

  it("nodeCount tracks nodes", () => {
    const sim = buildNetwork();
    expect(sim.nodeCount).toBe(4);
  });

  it("pathCount tracks paths", () => {
    const sim = buildNetwork();
    expect(sim.pathCount).toBe(1);
  });

  it("drop rate causes * entries", () => {
    const sim = new TracerouteSim(3, 30, 42);
    sim.addNode("10.0.0.1", 5, "gateway", 1.0);
    sim.addNode("10.0.0.2", 10, "target");
    sim.addPath("10.0.0.2", ["10.0.0.1", "10.0.0.2"]);
    const result = sim.trace("10.0.0.2");
    const firstHop = result.hops[0];
    expect(firstHop.rtt.every((r) => r === -1)).toBe(true);
  });

  it("deterministic with seed", () => {
    const sim1 = new TracerouteSim(3, 30, 99);
    const sim2 = new TracerouteSim(3, 30, 99);
    for (const sim of [sim1, sim2]) {
      sim.addNode("10.0.0.1", 5);
      sim.addNode("10.0.0.2", 10);
      sim.addPath("10.0.0.2", ["10.0.0.1", "10.0.0.2"]);
    }
    const r1 = sim1.trace("10.0.0.2");
    const r2 = sim2.trace("10.0.0.2");
    expect(r1.hops[0].rtt).toEqual(r2.hops[0].rtt);
  });
});
