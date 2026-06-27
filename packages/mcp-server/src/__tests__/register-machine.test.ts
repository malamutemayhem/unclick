import { describe, it, expect } from "vitest";
import { RegisterMachine } from "../register-machine.js";

describe("RegisterMachine", () => {
  it("INC increments register", () => {
    const rm = new RegisterMachine();
    rm.addInstruction({ op: "INC", reg: 0, next: 1 });
    rm.addInstruction({ op: "HALT" });
    rm.run();
    expect(rm.getRegister(0)).toBe(1);
  });

  it("DEC decrements or branches on zero", () => {
    const rm = new RegisterMachine();
    rm.setRegister(0, 3);
    rm.addInstruction({ op: "DEC", reg: 0, next: 0, zero: 1 });
    rm.addInstruction({ op: "HALT" });
    rm.run();
    expect(rm.getRegister(0)).toBe(0);
  });

  it("computes addition via transfer", () => {
    const rm = new RegisterMachine();
    rm.setRegister(0, 3);
    rm.setRegister(1, 5);
    rm.addInstruction({ op: "DEC", reg: 0, next: 1, zero: 2 });
    rm.addInstruction({ op: "INC", reg: 1, next: 0 });
    rm.addInstruction({ op: "HALT" });
    rm.run();
    expect(rm.getRegister(1)).toBe(8);
  });

  it("CLR clears register", () => {
    const rm = new RegisterMachine();
    rm.setRegister(0, 42);
    rm.addInstruction({ op: "CLR", reg: 0, next: 1 });
    rm.addInstruction({ op: "HALT" });
    rm.run();
    expect(rm.getRegister(0)).toBe(0);
  });

  it("CPY copies register value", () => {
    const rm = new RegisterMachine();
    rm.setRegister(0, 7);
    rm.addInstruction({ op: "CPY", from: 0, to: 1, next: 1 });
    rm.addInstruction({ op: "HALT" });
    rm.run();
    expect(rm.getRegister(1)).toBe(7);
  });

  it("halts at max steps if infinite loop", () => {
    const rm = new RegisterMachine();
    rm.addInstruction({ op: "JMP", next: 0 });
    const result = rm.run(100);
    expect(result.halted).toBe(false);
    expect(result.steps).toBe(100);
  });

  it("reset clears registers", () => {
    const rm = new RegisterMachine();
    rm.setRegister(0, 10);
    rm.reset();
    expect(rm.getRegister(0)).toBe(0);
  });

  it("programSize tracks instructions", () => {
    const rm = new RegisterMachine();
    rm.addInstruction({ op: "HALT" });
    rm.addInstruction({ op: "HALT" });
    expect(rm.programSize()).toBe(2);
  });
});
