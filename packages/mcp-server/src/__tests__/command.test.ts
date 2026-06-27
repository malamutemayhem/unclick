import { describe, it, expect } from "vitest";
import { CommandHistory, MacroCommand, Command } from "../command.js";

describe("CommandHistory", () => {
  it("executes commands", () => {
    const h = new CommandHistory();
    let value = 0;
    h.execute({ execute: () => { value = 1; }, description: "set to 1" });
    expect(value).toBe(1);
  });

  it("undo reverses command", () => {
    const h = new CommandHistory();
    let value = 0;
    h.execute({ execute: () => { value = 1; }, undo: () => { value = 0; }, description: "set" });
    expect(value).toBe(1);
    h.undo();
    expect(value).toBe(0);
  });

  it("redo re-executes", () => {
    const h = new CommandHistory();
    let value = 0;
    h.execute({ execute: () => { value++; }, undo: () => { value--; }, description: "inc" });
    h.undo();
    h.redo();
    expect(value).toBe(1);
  });

  it("canUndo and canRedo", () => {
    const h = new CommandHistory();
    expect(h.canUndo).toBe(false);
    h.execute({ execute: () => {}, undo: () => {} });
    expect(h.canUndo).toBe(true);
    expect(h.canRedo).toBe(false);
    h.undo();
    expect(h.canRedo).toBe(true);
  });

  it("execute after undo discards redo", () => {
    const h = new CommandHistory();
    h.execute({ execute: () => {}, undo: () => {}, description: "a" });
    h.execute({ execute: () => {}, undo: () => {}, description: "b" });
    h.undo();
    h.execute({ execute: () => {}, undo: () => {}, description: "c" });
    expect(h.canRedo).toBe(false);
    expect(h.size).toBe(2);
  });

  it("getHistory returns descriptions", () => {
    const h = new CommandHistory();
    h.execute({ execute: () => {}, description: "first" });
    h.execute({ execute: () => {}, description: "second" });
    expect(h.getHistory()).toEqual(["first", "second"]);
  });

  it("clear resets", () => {
    const h = new CommandHistory();
    h.execute({ execute: () => {} });
    h.clear();
    expect(h.size).toBe(0);
  });
});

describe("MacroCommand", () => {
  it("executes all commands", () => {
    const log: string[] = [];
    const macro = new MacroCommand([
      { execute: () => log.push("a") },
      { execute: () => log.push("b") },
    ]);
    macro.execute();
    expect(log).toEqual(["a", "b"]);
  });

  it("undoes in reverse order", () => {
    const log: string[] = [];
    const macro = new MacroCommand([
      { execute: () => {}, undo: () => log.push("undo-a") },
      { execute: () => {}, undo: () => log.push("undo-b") },
    ]);
    macro.undo();
    expect(log).toEqual(["undo-b", "undo-a"]);
  });
});
