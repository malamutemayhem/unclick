import { describe, it, expect } from "vitest";
import { TCPConnection, SlidingWindow } from "../tcp-sim.js";

describe("TCPConnection", () => {
  it("three-way handshake", () => {
    const client = new TCPConnection(5000, 80);
    const server = new TCPConnection(80, 5000);
    server.listen();

    const syn = client.initiateHandshake();
    expect(client.state).toBe("SYN_SENT");
    expect(syn.flags.syn).toBe(true);

    const synAck = server.handleSegment(syn);
    expect(server.state).toBe("SYN_RECEIVED");
    expect(synAck).not.toBeNull();

    const ack = client.handleSegment(synAck!);
    expect(client.state).toBe("ESTABLISHED");

    server.handleSegment(ack!);
    expect(server.state).toBe("ESTABLISHED");
  });

  it("sends and receives data", () => {
    const client = new TCPConnection(5000, 80);
    const server = new TCPConnection(80, 5000);
    server.listen();

    const syn = client.initiateHandshake();
    const synAck = server.handleSegment(syn)!;
    const ack = client.handleSegment(synAck)!;
    server.handleSegment(ack!);

    const dataSeg = client.send([72, 101, 108, 108, 111]);
    server.handleSegment(dataSeg);
    const received = server.read();
    expect(received).toEqual([72, 101, 108, 108, 111]);
  });

  it("graceful close", () => {
    const client = new TCPConnection(5000, 80);
    const server = new TCPConnection(80, 5000);
    server.listen();

    const syn = client.initiateHandshake();
    const synAck = server.handleSegment(syn)!;
    client.handleSegment(synAck);
    server.handleSegment({ srcPort: 5000, dstPort: 80, seq: 0, ack: 0, flags: { ack: true }, data: [], window: 65535 });

    const fin = client.close();
    expect(client.state).toBe("FIN_WAIT_1");

    const finAck = server.handleSegment(fin);
    expect(server.state).toBe("CLOSE_WAIT");

    const serverFin = server.close();
    expect(server.state).toBe("LAST_ACK");

    const lastAck = client.handleSegment(serverFin);
    expect(client.state).toBe("TIME_WAIT");

    server.handleSegment(lastAck!);
    expect(server.state).toBe("CLOSED");
  });

  it("starts in CLOSED state", () => {
    const conn = new TCPConnection(1234, 80);
    expect(conn.state).toBe("CLOSED");
  });
});

describe("SlidingWindow", () => {
  it("sends within window", () => {
    const sw = new SlidingWindow(3);
    expect(sw.send()).toBe(0);
    expect(sw.send()).toBe(1);
    expect(sw.send()).toBe(2);
    expect(sw.canSend()).toBe(false);
  });

  it("ack advances base", () => {
    const sw = new SlidingWindow(3);
    sw.send(); sw.send(); sw.send();
    const advanced = sw.acknowledge(0);
    expect(advanced).toEqual([0]);
    expect(sw.canSend()).toBe(true);
  });

  it("out-of-order ack", () => {
    const sw = new SlidingWindow(4);
    sw.send(); sw.send(); sw.send();
    sw.acknowledge(2);
    expect(sw.currentBase).toBe(0);
    sw.acknowledge(0);
    expect(sw.currentBase).toBe(1);
    sw.acknowledge(1);
    expect(sw.currentBase).toBe(3);
  });

  it("tracks unacked count", () => {
    const sw = new SlidingWindow(5);
    sw.send(); sw.send();
    expect(sw.unackedCount).toBe(2);
    sw.acknowledge(0);
    expect(sw.unackedCount).toBe(1);
  });
});
