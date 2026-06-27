import { describe, it, expect } from "vitest";
import { Aggregate, EventStore, Projection, createEvent, createCommand } from "../cqrs.js";

describe("CQRS", () => {
  interface BankState { balance: number; owner: string }

  function createBank(id: string): Aggregate<BankState> {
    const agg = new Aggregate<BankState>(id, { balance: 0, owner: "" });

    agg.onEvent("Deposited", (state, event) => ({
      ...state,
      balance: state.balance + (event.payload.amount as number),
    }));

    agg.onEvent("Withdrawn", (state, event) => ({
      ...state,
      balance: state.balance - (event.payload.amount as number),
    }));

    agg.onEvent("Created", (state, event) => ({
      ...state,
      owner: event.payload.owner as string,
    }));

    agg.onCommand("Deposit", (state, cmd) => [
      createEvent("Deposited", cmd.aggregateId, { amount: cmd.payload.amount }),
    ]);

    agg.onCommand("Withdraw", (state, cmd) => {
      if ((cmd.payload.amount as number) > state.balance) {
        throw new Error("Insufficient funds");
      }
      return [createEvent("Withdrawn", cmd.aggregateId, { amount: cmd.payload.amount })];
    });

    return agg;
  }

  it("executes commands and applies events", () => {
    const bank = createBank("acc-1");
    bank.execute(createCommand("Deposit", "acc-1", { amount: 100 }));
    expect(bank.state.balance).toBe(100);
    expect(bank.version).toBe(1);
  });

  it("accumulates multiple commands", () => {
    const bank = createBank("acc-1");
    bank.execute(createCommand("Deposit", "acc-1", { amount: 100 }));
    bank.execute(createCommand("Deposit", "acc-1", { amount: 50 }));
    bank.execute(createCommand("Withdraw", "acc-1", { amount: 30 }));
    expect(bank.state.balance).toBe(120);
    expect(bank.version).toBe(3);
  });

  it("rejects invalid commands", () => {
    const bank = createBank("acc-1");
    bank.execute(createCommand("Deposit", "acc-1", { amount: 50 }));
    expect(() =>
      bank.execute(createCommand("Withdraw", "acc-1", { amount: 100 }))
    ).toThrow("Insufficient funds");
  });

  it("replays events to rebuild state", () => {
    const bank = createBank("acc-1");
    bank.execute(createCommand("Deposit", "acc-1", { amount: 100 }));
    bank.execute(createCommand("Withdraw", "acc-1", { amount: 30 }));
    const events = bank.events;

    const bank2 = createBank("acc-1");
    bank2.replay(events);
    expect(bank2.state.balance).toBe(70);
  });

  it("creates and restores snapshots", () => {
    const bank = createBank("acc-1");
    bank.execute(createCommand("Deposit", "acc-1", { amount: 100 }));
    const snap = bank.snapshot();
    bank.execute(createCommand("Deposit", "acc-1", { amount: 50 }));
    bank.restore(snap);
    expect(bank.state.balance).toBe(100);
  });
});

describe("EventStore", () => {
  it("stores and retrieves events", () => {
    const store = new EventStore();
    store.append("agg-1", [createEvent("Created", "agg-1", {})]);
    store.append("agg-1", [createEvent("Updated", "agg-1", {})]);
    expect(store.getStream("agg-1")).toHaveLength(2);
  });

  it("tracks counts", () => {
    const store = new EventStore();
    store.append("a", [createEvent("E1", "a", {})]);
    store.append("b", [createEvent("E2", "b", {})]);
    expect(store.streamCount()).toBe(2);
    expect(store.eventCount()).toBe(2);
  });

  it("subscribes to events", () => {
    const store = new EventStore();
    const received: string[] = [];
    store.subscribe((e) => received.push(e.type));
    store.append("a", [createEvent("Test", "a", {})]);
    expect(received).toEqual(["Test"]);
  });

  it("returns empty for unknown stream", () => {
    const store = new EventStore();
    expect(store.getStream("unknown")).toEqual([]);
  });
});

describe("Projection", () => {
  it("builds read model from events", () => {
    const proj = new Projection<number>(0);
    proj.on("Deposited", (state, event) => state + (event.payload.amount as number));
    proj.on("Withdrawn", (state, event) => state - (event.payload.amount as number));

    proj.apply(createEvent("Deposited", "a", { amount: 100 }));
    proj.apply(createEvent("Withdrawn", "a", { amount: 30 }));
    expect(proj.state).toBe(70);
  });

  it("replays all events", () => {
    const proj = new Projection<string[]>([]);
    proj.on("Added", (state, event) => [...state, event.payload.item as string]);

    proj.replay([
      createEvent("Added", "a", { item: "x" }),
      createEvent("Added", "a", { item: "y" }),
    ]);
    expect(proj.state).toEqual(["x", "y"]);
  });

  it("resets state", () => {
    const proj = new Projection<number>(10);
    proj.reset(0);
    expect(proj.state).toBe(0);
  });
});
