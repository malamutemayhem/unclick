import { describe, it, expect } from "vitest";
import {
  buildFrame,
  serialize,
  deserialize,
  isBroadcast,
  isMulticast,
  isUnicast,
  frameSize,
} from "../ethernet-frame.js";

describe("buildFrame", () => {
  it("creates a frame with FCS", () => {
    const frame = buildFrame("ff:ff:ff:ff:ff:ff", "aa:bb:cc:dd:ee:ff", 0x0800, [1, 2, 3]);
    expect(frame.dstMac).toBe("ff:ff:ff:ff:ff:ff");
    expect(frame.srcMac).toBe("aa:bb:cc:dd:ee:ff");
    expect(frame.etherType).toBe(0x0800);
    expect(frame.payload).toEqual([1, 2, 3]);
    expect(frame.fcs).toBeGreaterThan(0);
  });

  it("builds with VLAN tag", () => {
    const frame = buildFrame("ff:ff:ff:ff:ff:ff", "aa:bb:cc:dd:ee:ff", 0x0800, [1], {
      priority: 3,
      dei: false,
      vlanId: 100,
    });
    expect(frame.vlanTag).toBeDefined();
    expect(frame.vlanTag!.vlanId).toBe(100);
    expect(frame.vlanTag!.priority).toBe(3);
  });
});

describe("serialize / deserialize", () => {
  it("round-trips a basic frame", () => {
    const frame = buildFrame("11:22:33:44:55:66", "aa:bb:cc:dd:ee:ff", 0x0800, [10, 20, 30]);
    const bytes = serialize(frame);
    const parsed = deserialize(bytes)!;
    expect(parsed.dstMac).toBe("11:22:33:44:55:66");
    expect(parsed.srcMac).toBe("aa:bb:cc:dd:ee:ff");
    expect(parsed.etherType).toBe(0x0800);
    expect(parsed.payload).toEqual([10, 20, 30]);
  });

  it("round-trips a VLAN-tagged frame", () => {
    const frame = buildFrame("11:22:33:44:55:66", "aa:bb:cc:dd:ee:ff", 0x0800, [42], {
      priority: 5,
      dei: true,
      vlanId: 200,
    });
    const bytes = serialize(frame);
    const parsed = deserialize(bytes)!;
    expect(parsed.vlanTag).toBeDefined();
    expect(parsed.vlanTag!.vlanId).toBe(200);
    expect(parsed.vlanTag!.priority).toBe(5);
    expect(parsed.vlanTag!.dei).toBe(true);
  });

  it("deserialize returns null for short data", () => {
    expect(deserialize([1, 2, 3])).toBeNull();
  });
});

describe("MAC classification", () => {
  it("isBroadcast", () => {
    expect(isBroadcast("ff:ff:ff:ff:ff:ff")).toBe(true);
    expect(isBroadcast("FF:FF:FF:FF:FF:FF")).toBe(true);
    expect(isBroadcast("aa:bb:cc:dd:ee:ff")).toBe(false);
  });

  it("isMulticast detects odd first octet", () => {
    expect(isMulticast("01:00:5e:00:00:01")).toBe(true);
    expect(isMulticast("00:00:00:00:00:00")).toBe(false);
  });

  it("isUnicast", () => {
    expect(isUnicast("aa:bb:cc:dd:ee:ff")).toBe(true);
    expect(isUnicast("00:11:22:33:44:55")).toBe(true);
    expect(isUnicast("01:00:5e:00:00:01")).toBe(false);
  });
});

describe("frameSize", () => {
  it("calculates basic frame size", () => {
    const frame = buildFrame("11:22:33:44:55:66", "aa:bb:cc:dd:ee:ff", 0x0800, [1, 2, 3]);
    expect(frameSize(frame)).toBe(14 + 3 + 4); // header + payload + FCS
  });

  it("adds 4 bytes for VLAN tag", () => {
    const frame = buildFrame("11:22:33:44:55:66", "aa:bb:cc:dd:ee:ff", 0x0800, [1, 2, 3], {
      priority: 0,
      dei: false,
      vlanId: 10,
    });
    expect(frameSize(frame)).toBe(14 + 4 + 3 + 4);
  });
});
