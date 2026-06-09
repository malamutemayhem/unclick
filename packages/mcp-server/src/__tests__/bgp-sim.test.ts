import { describe, it, expect } from "vitest";
import { BGPPeer } from "../bgp-sim.js";

describe("BGPPeer", () => {
  it("creates with ASN and routerId", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    expect(peer.asn).toBe(65000);
    expect(peer.routerId).toBe("10.0.0.1");
  });

  it("adds and lists peers", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("10.0.0.2", 65001);
    expect(peer.peerCount).toBe(1);
    expect(peer.listPeers()[0].asn).toBe(65001);
  });

  it("receives update and installs route", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("10.0.0.2", 65001);
    peer.receiveUpdate("10.0.0.2", {
      prefix: "192.168.0.0/16",
      asPath: [65001],
      nextHop: "10.0.0.2",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    expect(peer.routeCount).toBe(1);
    const route = peer.getRoute("192.168.0.0/16")!;
    expect(route.asPath).toEqual([65001]);
  });

  it("rejects route with own ASN in path (loop prevention)", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("10.0.0.2", 65001);
    const accepted = peer.receiveUpdate("10.0.0.2", {
      prefix: "10.0.0.0/8",
      asPath: [65001, 65000],
      nextHop: "10.0.0.2",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    expect(accepted).toBe(false);
  });

  it("selects higher local-pref", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("P1", 65001);
    peer.addPeer("P2", 65002);

    peer.receiveUpdate("P1", {
      prefix: "10.0.0.0/8",
      asPath: [65001],
      nextHop: "1.1.1.1",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    peer.receiveUpdate("P2", {
      prefix: "10.0.0.0/8",
      asPath: [65002],
      nextHop: "2.2.2.2",
      localPref: 200,
      med: 0,
      origin: "igp",
    });

    expect(peer.getRoute("10.0.0.0/8")!.localPref).toBe(200);
  });

  it("selects shorter AS path when localPref equal", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("P1", 65001);
    peer.addPeer("P2", 65002);

    peer.receiveUpdate("P1", {
      prefix: "10.0.0.0/8",
      asPath: [65001, 65003, 65004],
      nextHop: "1.1.1.1",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    peer.receiveUpdate("P2", {
      prefix: "10.0.0.0/8",
      asPath: [65002],
      nextHop: "2.2.2.2",
      localPref: 100,
      med: 0,
      origin: "igp",
    });

    expect(peer.getRoute("10.0.0.0/8")!.asPath).toEqual([65002]);
  });

  it("withdraw removes route", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("P1", 65001);
    peer.receiveUpdate("P1", {
      prefix: "10.0.0.0/8",
      asPath: [65001],
      nextHop: "1.1.1.1",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    peer.withdraw("P1", "10.0.0.0/8");
    expect(peer.getRoute("10.0.0.0/8")).toBeNull();
  });

  it("generateUpdate prepends own ASN", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("P1", 65001);
    peer.receiveUpdate("P1", {
      prefix: "10.0.0.0/8",
      asPath: [65001],
      nextHop: "1.1.1.1",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    const update = peer.generateUpdate("10.0.0.0/8")!;
    expect(update.asPath[0]).toBe(65000);
    expect(update.nextHop).toBe("10.0.0.1");
  });

  it("generateUpdate returns null for unknown prefix", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    expect(peer.generateUpdate("1.2.3.0/24")).toBeNull();
  });

  it("setPeerState and getPeerState", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("P1", 65001);
    peer.setPeerState("P1", "Established");
    expect(peer.getPeerState("P1")).toBe("Established");
  });

  it("removePeer cleans up routes", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("P1", 65001);
    peer.receiveUpdate("P1", {
      prefix: "10.0.0.0/8",
      asPath: [65001],
      nextHop: "1.1.1.1",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    peer.removePeer("P1");
    expect(peer.peerCount).toBe(0);
  });

  it("getRoutingTable returns all routes", () => {
    const peer = new BGPPeer(65000, "10.0.0.1");
    peer.addPeer("P1", 65001);
    peer.receiveUpdate("P1", {
      prefix: "10.0.0.0/8",
      asPath: [65001],
      nextHop: "1.1.1.1",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    peer.receiveUpdate("P1", {
      prefix: "172.16.0.0/12",
      asPath: [65001],
      nextHop: "1.1.1.1",
      localPref: 100,
      med: 0,
      origin: "igp",
    });
    expect(peer.getRoutingTable()).toHaveLength(2);
  });
});
