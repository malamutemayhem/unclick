import { describe, it, expect } from "vitest";
import { OSPFRouter } from "../ospf-sim.js";

describe("OSPFRouter", () => {
  it("creates with routerId", () => {
    const r = new OSPFRouter("1.1.1.1");
    expect(r.routerId).toBe("1.1.1.1");
    expect(r.neighborCount).toBe(0);
  });

  it("adds neighbor", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addNeighbor("2.2.2.2", 10);
    expect(r.neighborCount).toBe(1);
  });

  it("sets and gets neighbor state", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addNeighbor("2.2.2.2", 10);
    r.setNeighborState("2.2.2.2", "Full");
    expect(r.getNeighborState("2.2.2.2")).toBe("Full");
  });

  it("fullNeighborCount tracks Full adjacencies", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addNeighbor("2.2.2.2", 10);
    r.addNeighbor("3.3.3.3", 20);
    r.setNeighborState("2.2.2.2", "Full");
    expect(r.fullNeighborCount).toBe(1);
  });

  it("electDR picks highest priority", () => {
    const r = new OSPFRouter("1.1.1.1", 1);
    r.addNeighbor("2.2.2.2", 10, 100);
    r.setNeighborState("2.2.2.2", "Full");
    const { dr } = r.electDR();
    expect(dr).toBe("2.2.2.2");
  });

  it("electDR breaks ties by routerId", () => {
    const r = new OSPFRouter("1.1.1.1", 1);
    r.addNeighbor("2.2.2.2", 10, 1);
    r.setNeighborState("2.2.2.2", "Full");
    const { dr } = r.electDR();
    expect(dr).toBe("2.2.2.2"); // higher routerId wins tie
  });

  it("electDR sets BDR", () => {
    const r = new OSPFRouter("1.1.1.1", 1);
    r.addNeighbor("2.2.2.2", 10, 2);
    r.setNeighborState("2.2.2.2", "Full");
    const { dr, bdr } = r.electDR();
    expect(dr).toBe("2.2.2.2");
    expect(bdr).toBe("1.1.1.1");
  });

  it("joinArea tracks areas", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.joinArea(0, ["10.0.0.0/24"]);
    r.joinArea(1, ["172.16.0.0/16"]);
    expect(r.areaCount).toBe(2);
  });

  it("isABR when in multiple areas", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.joinArea(0);
    expect(r.isABR()).toBe(false);
    r.joinArea(1);
    expect(r.isABR()).toBe(true);
  });

  it("addRoute installs route", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addRoute({ dest: "10.0.0.0/24", cost: 10, nextHop: "2.2.2.2", area: 0, type: "intra" });
    expect(r.routeCount).toBe(1);
    expect(r.getRoute("10.0.0.0/24")!.cost).toBe(10);
  });

  it("addRoute prefers intra over inter", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addRoute({ dest: "10.0.0.0/24", cost: 20, nextHop: "3.3.3.3", area: 1, type: "inter" });
    r.addRoute({ dest: "10.0.0.0/24", cost: 30, nextHop: "2.2.2.2", area: 0, type: "intra" });
    expect(r.getRoute("10.0.0.0/24")!.type).toBe("intra");
  });

  it("getRoutingTable returns all routes", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addRoute({ dest: "10.0.0.0/24", cost: 10, nextHop: "2.2.2.2", area: 0, type: "intra" });
    r.addRoute({ dest: "172.16.0.0/16", cost: 20, nextHop: "3.3.3.3", area: 0, type: "intra" });
    expect(r.getRoutingTable()).toHaveLength(2);
  });

  it("getNeighbors returns all", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addNeighbor("2.2.2.2", 10);
    r.addNeighbor("3.3.3.3", 20);
    expect(r.getNeighbors()).toHaveLength(2);
  });

  it("removeNeighbor works", () => {
    const r = new OSPFRouter("1.1.1.1");
    r.addNeighbor("2.2.2.2", 10);
    expect(r.removeNeighbor("2.2.2.2")).toBe(true);
    expect(r.neighborCount).toBe(0);
  });

  it("getRoute returns null for unknown", () => {
    const r = new OSPFRouter("1.1.1.1");
    expect(r.getRoute("1.2.3.0/24")).toBeNull();
  });

  it("designatedRouter initially null", () => {
    const r = new OSPFRouter("1.1.1.1");
    expect(r.designatedRouter).toBeNull();
  });
});
