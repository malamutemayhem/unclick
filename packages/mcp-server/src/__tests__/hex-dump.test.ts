import { describe, it, expect } from "vitest";
import { HexDump } from "../hex-dump.js";

describe("HexDump", () => {
  it("dumps bytes in hex format", () => {
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    const dump = HexDump.dump(data);
    expect(dump).toContain("48 65 6c 6c 6f");
    expect(dump).toContain("Hello");
  });

  it("converts hex string to bytes", () => {
    const bytes = HexDump.fromHex("48656c6c6f");
    expect(bytes).toEqual(new Uint8Array([72, 101, 108, 108, 111]));
  });

  it("converts bytes to hex string", () => {
    expect(HexDump.toHex([0xff, 0x00, 0xab])).toBe("ff00ab");
  });

  it("converts string to bytes and back", () => {
    const bytes = HexDump.fromString("test");
    expect(HexDump.toString(bytes)).toBe("test");
  });

  it("compares two byte arrays", () => {
    const a = new Uint8Array([1, 2, 3]);
    const b = new Uint8Array([1, 5, 3]);
    const diffs = HexDump.compare(a, b);
    expect(diffs.length).toBe(1);
    expect(diffs[0].offset).toBe(1);
    expect(diffs[0].byteA).toBe(2);
    expect(diffs[0].byteB).toBe(5);
  });

  it("calculates checksum", () => {
    expect(HexDump.checksum([1, 2, 3])).toBe(6);
    expect(HexDump.checksum([255, 1])).toBe(0);
  });

  it("computes byte frequency", () => {
    const freq = HexDump.byteFrequency([1, 2, 1, 1, 2]);
    expect(freq.get(1)).toBe(3);
    expect(freq.get(2)).toBe(2);
  });

  it("handles custom width", () => {
    const data = new Uint8Array(32);
    for (let i = 0; i < 32; i++) data[i] = i;
    const dump = HexDump.dump(data, { width: 8 });
    const lines = dump.split("\n");
    expect(lines.length).toBe(4);
  });
});
