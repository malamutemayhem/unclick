import { describe, it, expect } from "vitest";
import { STPBridge, electRoot } from "../spanning-tree.js";

describe("STPBridge", () => {
  it("starts as own root", () => {
    const b = new STPBridge("SW1");
    expect(b.isRoot).toBe(true);
    expect(b.currentRoot).toBe("SW1");
    expect(b.costToRoot).toBe(0);
  });

  it("addPort creates blocking port", () => {
    const b = new STPBridge("SW1");
    const pid = b.addPort("SW2", 10);
    const port = b.getPort(pid)!;
    expect(port.state).toBe("blocking");
    expect(port.linkedBridge).toBe("SW2");
  });

  it("receiveBPDU updates root if superior", () => {
    const b = new STPBridge("SW2");
    const pid = b.addPort("SW1", 10);
    const bpdu = { rootId: "SW1", rootCost: 0, senderId: "SW1", portId: 0 };
    expect(b.receiveBPDU(pid, bpdu)).toBe(true);
    expect(b.currentRoot).toBe("SW1");
    expect(b.costToRoot).toBe(10);
    expect(b.isRoot).toBe(false);
  });

  it("rejects inferior BPDU", () => {
    const b = new STPBridge("SW1");
    const pid = b.addPort("SW2", 10);
    const bpdu = { rootId: "SW2", rootCost: 0, senderId: "SW2", portId: 0 };
    expect(b.receiveBPDU(pid, bpdu)).toBe(false);
  });

  it("computeRoles sets root ports to forwarding", () => {
    const b = new STPBridge("SW2");
    const pid = b.addPort("SW1", 10);
    b.receiveBPDU(pid, { rootId: "SW1", rootCost: 0, senderId: "SW1", portId: 0 });
    b.computeRoles();
    expect(b.getPort(pid)!.role).toBe("root");
    expect(b.getPort(pid)!.state).toBe("forwarding");
  });

  it("computeRoles on root bridge sets all designated", () => {
    const b = new STPBridge("SW1");
    b.addPort("SW2", 10);
    b.addPort("SW3", 20);
    b.computeRoles();
    const ports = b.getPorts();
    expect(ports.every((p) => p.role === "designated")).toBe(true);
    expect(ports.every((p) => p.state === "forwarding")).toBe(true);
  });

  it("non-root alternate port is blocking", () => {
    const b = new STPBridge("SW3");
    const p1 = b.addPort("SW1", 10);
    const p2 = b.addPort("SW2", 20);
    b.receiveBPDU(p1, { rootId: "SW1", rootCost: 0, senderId: "SW1", portId: 0 });
    b.computeRoles();
    expect(b.getPort(p1)!.role).toBe("root");
    expect(b.getPort(p2)!.role).toBe("alternate");
    expect(b.getPort(p2)!.state).toBe("blocking");
  });

  it("portCount tracks ports", () => {
    const b = new STPBridge("SW1");
    expect(b.portCount).toBe(0);
    b.addPort("SW2", 10);
    b.addPort("SW3", 20);
    expect(b.portCount).toBe(2);
  });

  it("disablePort sets disabled state", () => {
    const b = new STPBridge("SW1");
    const pid = b.addPort("SW2", 10);
    b.disablePort(pid);
    expect(b.getPort(pid)!.state).toBe("disabled");
  });

  it("reset restores initial state", () => {
    const b = new STPBridge("SW2");
    const pid = b.addPort("SW1", 10);
    b.receiveBPDU(pid, { rootId: "SW1", rootCost: 0, senderId: "SW1", portId: 0 });
    b.reset();
    expect(b.isRoot).toBe(true);
    expect(b.currentRoot).toBe("SW2");
    expect(b.getPort(pid)!.state).toBe("blocking");
  });

  it("generateBPDU includes current root info", () => {
    const b = new STPBridge("SW1");
    b.addPort("SW2", 10);
    const bpdu = b.generateBPDU(0);
    expect(bpdu.rootId).toBe("SW1");
    expect(bpdu.rootCost).toBe(0);
    expect(bpdu.senderId).toBe("SW1");
  });

  it("getPort returns null for invalid id", () => {
    const b = new STPBridge("SW1");
    expect(b.getPort(99)).toBeNull();
  });

  it("receiveBPDU returns false for invalid port", () => {
    const b = new STPBridge("SW1");
    expect(b.receiveBPDU(99, { rootId: "SW0", rootCost: 0, senderId: "SW0", portId: 0 })).toBe(false);
  });
});

describe("electRoot", () => {
  it("elects lowest ID as root", () => {
    const sw1 = new STPBridge("SW1");
    const sw2 = new STPBridge("SW2");
    const sw3 = new STPBridge("SW3");

    sw1.addPort("SW2", 10);
    sw1.addPort("SW3", 20);
    sw2.addPort("SW1", 10);
    sw2.addPort("SW3", 15);
    sw3.addPort("SW1", 20);
    sw3.addPort("SW2", 15);

    electRoot([sw1, sw2, sw3]);

    expect(sw1.isRoot).toBe(true);
    expect(sw2.currentRoot).toBe("SW1");
    expect(sw3.currentRoot).toBe("SW1");
  });
});
