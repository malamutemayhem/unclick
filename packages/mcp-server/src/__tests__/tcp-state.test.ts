import { describe, it, expect } from "vitest";
import { TcpStateMachine } from "../tcp-state.js";

describe("TcpStateMachine", () => {
  it("starts in CLOSED state", () => {
    const sm = new TcpStateMachine();
    expect(sm.getState()).toBe("CLOSED");
    expect(sm.isClosed()).toBe(true);
  });

  it("performs three-way handshake (active open)", () => {
    const sm = new TcpStateMachine();
    expect(sm.transition("ACTIVE_OPEN")).toBe(true);
    expect(sm.getState()).toBe("SYN_SENT");
    expect(sm.transition("SYN_ACK")).toBe(true);
    expect(sm.getState()).toBe("ESTABLISHED");
    expect(sm.isConnected()).toBe(true);
  });

  it("performs passive open flow", () => {
    const sm = new TcpStateMachine();
    sm.transition("PASSIVE_OPEN");
    expect(sm.getState()).toBe("LISTEN");
    sm.transition("SYN");
    expect(sm.getState()).toBe("SYN_RECEIVED");
    sm.transition("ACK");
    expect(sm.getState()).toBe("ESTABLISHED");
  });

  it("closes connection gracefully", () => {
    const sm = TcpStateMachine.simulateHandshake();
    sm.transition("CLOSE");
    expect(sm.getState()).toBe("FIN_WAIT_1");
    sm.transition("ACK");
    expect(sm.getState()).toBe("FIN_WAIT_2");
    sm.transition("FIN");
    expect(sm.getState()).toBe("TIME_WAIT");
    sm.transition("TIMEOUT");
    expect(sm.getState()).toBe("CLOSED");
  });

  it("rejects invalid transitions", () => {
    const sm = new TcpStateMachine();
    expect(sm.transition("ACK")).toBe(false);
    expect(sm.getState()).toBe("CLOSED");
  });

  it("tracks history", () => {
    const sm = TcpStateMachine.simulateHandshake();
    expect(sm.getHistory().length).toBe(2);
  });

  it("lists valid events for current state", () => {
    const sm = new TcpStateMachine();
    const events = sm.validEvents();
    expect(events).toContain("PASSIVE_OPEN");
    expect(events).toContain("ACTIVE_OPEN");
  });

  it("resets to CLOSED", () => {
    const sm = TcpStateMachine.simulateHandshake();
    sm.reset();
    expect(sm.isClosed()).toBe(true);
  });

  it("lists all states", () => {
    expect(TcpStateMachine.allStates().length).toBe(11);
  });

  it("handles close-wait flow", () => {
    const sm = TcpStateMachine.simulateHandshake();
    sm.transition("FIN");
    expect(sm.getState()).toBe("CLOSE_WAIT");
    sm.transition("CLOSE");
    expect(sm.getState()).toBe("LAST_ACK");
    sm.transition("ACK");
    expect(sm.getState()).toBe("CLOSED");
  });
});
