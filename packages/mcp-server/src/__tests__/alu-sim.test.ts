import { describe, it, expect } from "vitest";
import { ALU } from "../alu-sim.js";

describe("ALU", () => {
  const alu = new ALU(8);

  it("ADD", () => {
    const r = alu.execute("ADD", 100, 50);
    expect(r.result).toBe(150);
    expect(r.flags.zero).toBe(false);
  });

  it("ADD with overflow", () => {
    const r = alu.execute("ADD", 200, 200);
    expect(r.result).toBe(144); // (400) & 0xFF
    expect(r.flags.carry).toBe(true);
  });

  it("SUB", () => {
    const r = alu.execute("SUB", 100, 30);
    expect(r.result).toBe(70);
  });

  it("SUB underflow sets carry", () => {
    const r = alu.execute("SUB", 10, 20);
    expect(r.flags.carry).toBe(true);
  });

  it("AND", () => {
    expect(alu.execute("AND", 0b11001100, 0b10101010).result).toBe(0b10001000);
  });

  it("OR", () => {
    expect(alu.execute("OR", 0b11001100, 0b10101010).result).toBe(0b11101110);
  });

  it("XOR", () => {
    expect(alu.execute("XOR", 0b11001100, 0b10101010).result).toBe(0b01100110);
  });

  it("NOT", () => {
    expect(alu.execute("NOT", 0b00001111).result).toBe(0b11110000);
  });

  it("SHL", () => {
    expect(alu.execute("SHL", 1, 4).result).toBe(16);
  });

  it("SHR", () => {
    expect(alu.execute("SHR", 128, 2).result).toBe(32);
  });

  it("INC", () => {
    const r = alu.execute("INC", 41);
    expect(r.result).toBe(42);
  });

  it("DEC", () => {
    const r = alu.execute("DEC", 42);
    expect(r.result).toBe(41);
  });

  it("NEG", () => {
    const a8 = new ALU(8);
    const r = a8.execute("NEG", 1);
    expect(r.result).toBe(255); // two's complement of 1 in 8 bits
  });

  it("CMP sets zero when equal", () => {
    const r = alu.execute("CMP", 42, 42);
    expect(r.flags.zero).toBe(true);
  });

  it("CMP sets negative when a < b", () => {
    const r = alu.execute("CMP", 10, 20);
    expect(r.flags.negative).toBe(true);
  });

  it("zero flag", () => {
    const r = alu.execute("SUB", 10, 10);
    expect(r.flags.zero).toBe(true);
  });

  it("toBinary", () => {
    expect(alu.toBinary(42)).toBe("00101010");
  });

  it("toHex", () => {
    expect(alu.toHex(255)).toBe("ff");
  });

  it("getSigned", () => {
    expect(alu.getSigned(128)).toBe(-128);
    expect(alu.getSigned(127)).toBe(127);
  });

  it("width", () => {
    expect(alu.width).toBe(8);
  });

  it("16-bit ALU works", () => {
    const alu16 = new ALU(16);
    const r = alu16.execute("ADD", 30000, 40000);
    expect(r.result).toBe(4464); // 70000 & 0xFFFF
    expect(r.flags.carry).toBe(true);
  });
});
