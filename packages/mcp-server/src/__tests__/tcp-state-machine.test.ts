import { describe, it, expect } from "vitest";
import {
  TCPConnection,
  clientHandshake,
  serverHandshake,
  getValidEvents,
} from "../tcp-state-machine.js";

describe("TCPConnection", () => {
  it("starts in CLOSED", () => {
    const conn = new TCPConnection();
    expect(conn.state).toBe("CLOSED");
    expect(conn.isClosed).toBe(true);
  });

  it("client three-way handshake", () => {
    const conn = new TCPConnection();
    expect(conn.handle("ACTIVE_OPEN")).toBe(true);
    expect(conn.state).toBe("SYN_SENT");
    expect(conn.handle("SYN_ACK")).toBe(true);
    expect(conn.state).toBe("ESTABLISHED");
    expect(conn.isOpen).toBe(true);
  });

  it("server three-way handshake", () => {
    const conn = new TCPConnection();
    conn.handle("PASSIVE_OPEN");
    expect(conn.state).toBe("LISTEN");
    conn.handle("SYN");
    expect(conn.state).toBe("SYN_RECEIVED");
    conn.handle("ACK");
    expect(conn.state).toBe("ESTABLISHED");
  });

  it("active close from ESTABLISHED", () => {
    const conn = clientHandshake();
    conn.handle("CLOSE");
    expect(conn.state).toBe("FIN_WAIT_1");
    conn.handle("ACK");
    expect(conn.state).toBe("FIN_WAIT_2");
    conn.handle("FIN");
    expect(conn.state).toBe("TIME_WAIT");
    conn.handle("TIMEOUT");
    expect(conn.state).toBe("CLOSED");
  });

  it("passive close from ESTABLISHED", () => {
    const conn = clientHandshake();
    conn.handle("FIN");
    expect(conn.state).toBe("CLOSE_WAIT");
    conn.handle("CLOSE");
    expect(conn.state).toBe("LAST_ACK");
    conn.handle("ACK");
    expect(conn.state).toBe("CLOSED");
  });

  it("simultaneous close", () => {
    const conn = clientHandshake();
    conn.handle("CLOSE");
    expect(conn.state).toBe("FIN_WAIT_1");
    conn.handle("FIN");
    expect(conn.state).toBe("CLOSING");
    conn.handle("ACK");
    expect(conn.state).toBe("TIME_WAIT");
  });

  it("rejects invalid transitions", () => {
    const conn = new TCPConnection();
    expect(conn.handle("ACK")).toBe(false);
    expect(conn.state).toBe("CLOSED");
  });

  it("RST from any state goes to CLOSED", () => {
    const conn = clientHandshake();
    expect(conn.state).toBe("ESTABLISHED");
    conn.handle("RST");
    expect(conn.state).toBe("CLOSED");
  });

  it("isClosing detects closing states", () => {
    const conn = clientHandshake();
    expect(conn.isClosing).toBe(false);
    conn.handle("CLOSE");
    expect(conn.isClosing).toBe(true);
  });

  it("getHistory tracks transitions", () => {
    const conn = new TCPConnection();
    conn.handle("ACTIVE_OPEN");
    conn.handle("SYN_ACK");
    const history = conn.getHistory();
    expect(history).toHaveLength(2);
    expect(history[0].from).toBe("CLOSED");
    expect(history[0].to).toBe("SYN_SENT");
  });

  it("reset clears state", () => {
    const conn = clientHandshake();
    conn.reset();
    expect(conn.state).toBe("CLOSED");
    expect(conn.getHistory()).toHaveLength(0);
  });
});

describe("clientHandshake", () => {
  it("returns ESTABLISHED connection", () => {
    const conn = clientHandshake();
    expect(conn.state).toBe("ESTABLISHED");
  });
});

describe("serverHandshake", () => {
  it("returns ESTABLISHED connection", () => {
    const conn = serverHandshake();
    expect(conn.state).toBe("ESTABLISHED");
  });
});

describe("getValidEvents", () => {
  it("CLOSED has PASSIVE_OPEN and ACTIVE_OPEN", () => {
    const events = getValidEvents("CLOSED");
    expect(events).toContain("PASSIVE_OPEN");
    expect(events).toContain("ACTIVE_OPEN");
  });

  it("ESTABLISHED has CLOSE and FIN", () => {
    const events = getValidEvents("ESTABLISHED");
    expect(events).toContain("CLOSE");
    expect(events).toContain("FIN");
  });

  it("TIME_WAIT only has TIMEOUT", () => {
    const events = getValidEvents("TIME_WAIT");
    expect(events).toEqual(["TIMEOUT"]);
  });
});
