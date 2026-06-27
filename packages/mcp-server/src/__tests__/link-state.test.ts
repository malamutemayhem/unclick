import { describe, it, expect } from "vitest";
import { LinkStateRouter, floodLSAs } from "../link-state.js";

describe("LinkStateRouter", () => {
  it("originates LSA with links", () => {
    const r = new LinkStateRouter("R1");
    r.addLink("R2", 10);
    r.addLink("R3", 20);
    const lsa = r.originateLSA();
    expect(lsa.router).toBe("R1");
    expect(lsa.links).toHaveLength(2);
  });

  it("LSA seq increments", () => {
    const r = new LinkStateRouter("R1");
    r.addLink("R2", 10);
    const l1 = r.originateLSA();
    const l2 = r.originateLSA();
    expect(l2.seq).toBe(l1.seq + 1);
  });

  it("receives new LSA", () => {
    const r = new LinkStateRouter("R1");
    expect(r.receiveLSA({ router: "R2", seq: 1, links: [{ neighbor: "R1", cost: 5 }] })).toBe(true);
    expect(r.lsdbSize).toBe(1);
  });

  it("rejects stale LSA", () => {
    const r = new LinkStateRouter("R1");
    r.receiveLSA({ router: "R2", seq: 2, links: [] });
    expect(r.receiveLSA({ router: "R2", seq: 1, links: [] })).toBe(false);
  });

  it("SPF computes shortest paths", () => {
    const r1 = new LinkStateRouter("R1");
    r1.addLink("R2", 1);
    r1.addLink("R3", 4);
    r1.originateLSA();
    r1.receiveLSA({ router: "R2", seq: 1, links: [{ neighbor: "R1", cost: 1 }, { neighbor: "R3", cost: 2 }] });
    r1.receiveLSA({ router: "R3", seq: 1, links: [{ neighbor: "R1", cost: 4 }, { neighbor: "R2", cost: 2 }] });

    const results = r1.runSPF();
    const toR3 = results.find((r) => r.dest === "R3");
    expect(toR3!.cost).toBe(3); // R1->R2->R3 = 1+2
    expect(toR3!.path).toEqual(["R1", "R2", "R3"]);
  });

  it("getNextHop returns first hop", () => {
    const r1 = new LinkStateRouter("R1");
    r1.addLink("R2", 1);
    r1.originateLSA();
    r1.receiveLSA({ router: "R2", seq: 1, links: [{ neighbor: "R1", cost: 1 }, { neighbor: "R3", cost: 5 }] });
    r1.receiveLSA({ router: "R3", seq: 1, links: [{ neighbor: "R2", cost: 5 }] });

    expect(r1.getNextHop("R3")).toBe("R2");
  });

  it("getNextHop returns null for unknown dest", () => {
    const r1 = new LinkStateRouter("R1");
    r1.originateLSA();
    expect(r1.getNextHop("R99")).toBeNull();
  });

  it("removeLink removes neighbor", () => {
    const r = new LinkStateRouter("R1");
    r.addLink("R2", 10);
    expect(r.removeLink("R2")).toBe(true);
    expect(r.getDirectLinks()).toHaveLength(0);
  });

  it("updateLinkCost changes cost", () => {
    const r = new LinkStateRouter("R1");
    r.addLink("R2", 10);
    r.updateLinkCost("R2", 5);
    expect(r.getDirectLinks()[0].cost).toBe(5);
  });

  it("getLSDB returns all LSAs", () => {
    const r = new LinkStateRouter("R1");
    r.addLink("R2", 1);
    r.originateLSA();
    r.receiveLSA({ router: "R2", seq: 1, links: [] });
    expect(r.getLSDB()).toHaveLength(2);
  });
});

describe("floodLSAs", () => {
  it("synchronizes LSDB across routers", () => {
    const r1 = new LinkStateRouter("R1");
    const r2 = new LinkStateRouter("R2");
    const r3 = new LinkStateRouter("R3");

    r1.addLink("R2", 1);
    r2.addLink("R1", 1);
    r2.addLink("R3", 2);
    r3.addLink("R2", 2);

    floodLSAs([r1, r2, r3]);

    expect(r1.lsdbSize).toBe(3);
    expect(r2.lsdbSize).toBe(3);
    expect(r3.lsdbSize).toBe(3);
  });
});
