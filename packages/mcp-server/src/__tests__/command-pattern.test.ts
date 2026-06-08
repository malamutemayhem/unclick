import { describe, it, expect } from "vitest";
import { CommandQueue, MacroCommand, ConditionalCommand } from "../command-pattern.js";
import type { Command } from "../command-pattern.js";

function makeCommand(log: string[], id: string): Command {
  return {
    execute: () => log.push(`exec:${id}`),
    undo: () => log.push(`undo:${id}`),
    description: id,
  };
}

describe("CommandQueue", () => {
  it("enqueues and executes commands", () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.enqueue(makeCommand(log, "a"));
    q.enqueue(makeCommand(log, "b"));
    q.executeNext();
    expect(log).toEqual(["exec:a"]);
    expect(q.pending()).toBe(1);
  });

  it("executeAll processes all", () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.enqueue(makeCommand(log, "a"));
    q.enqueue(makeCommand(log, "b"));
    const count = q.executeAll();
    expect(count).toBe(2);
    expect(log).toEqual(["exec:a", "exec:b"]);
  });

  it("undoes last executed", () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.enqueue(makeCommand(log, "a"));
    q.executeNext();
    q.undoLast();
    expect(log).toEqual(["exec:a", "undo:a"]);
  });

  it("returns false when nothing to undo", () => {
    const q = new CommandQueue();
    expect(q.undoLast()).toBe(false);
  });

  it("returns false when nothing to execute", () => {
    const q = new CommandQueue();
    expect(q.executeNext()).toBe(false);
  });

  it("tracks executed count", () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.enqueue(makeCommand(log, "a"));
    q.enqueue(makeCommand(log, "b"));
    q.executeAll();
    expect(q.executed()).toBe(2);
  });

  it("clears pending commands", () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.enqueue(makeCommand(log, "a"));
    q.clear();
    expect(q.pending()).toBe(0);
  });
});

describe("MacroCommand", () => {
  it("executes all sub-commands", () => {
    const log: string[] = [];
    const macro = new MacroCommand([makeCommand(log, "a"), makeCommand(log, "b")]);
    macro.execute();
    expect(log).toEqual(["exec:a", "exec:b"]);
  });

  it("undoes in reverse order", () => {
    const log: string[] = [];
    const macro = new MacroCommand([makeCommand(log, "a"), makeCommand(log, "b")]);
    macro.execute();
    log.length = 0;
    macro.undo();
    expect(log).toEqual(["undo:b", "undo:a"]);
  });
});

describe("ConditionalCommand", () => {
  it("executes then branch when true", () => {
    const log: string[] = [];
    const cmd = new ConditionalCommand(
      () => true,
      makeCommand(log, "then"),
      makeCommand(log, "else"),
    );
    cmd.execute();
    expect(log).toEqual(["exec:then"]);
  });

  it("executes else branch when false", () => {
    const log: string[] = [];
    const cmd = new ConditionalCommand(
      () => false,
      makeCommand(log, "then"),
      makeCommand(log, "else"),
    );
    cmd.execute();
    expect(log).toEqual(["exec:else"]);
  });
});
