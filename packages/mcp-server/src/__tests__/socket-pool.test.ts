import { describe, it, expect } from "vitest";
import { SocketPool } from "../socket-pool.js";

describe("SocketPool", () => {
  it("acquires a new socket", () => {
    const pool = new SocketPool();
    const sock = pool.acquire("example.com", 443)!;
    expect(sock).not.toBeNull();
    expect(sock.host).toBe("example.com");
    expect(sock.port).toBe(443);
    expect(sock.state).toBe("active");
  });

  it("reuses idle socket", () => {
    const pool = new SocketPool();
    const s1 = pool.acquire("example.com", 443)!;
    pool.release(s1.id);
    const s2 = pool.acquire("example.com", 443)!;
    expect(s2.id).toBe(s1.id);
    expect(s2.useCount).toBe(2);
  });

  it("release makes socket idle", () => {
    const pool = new SocketPool();
    const sock = pool.acquire("example.com", 443)!;
    expect(pool.release(sock.id)).toBe(true);
    expect(pool.idleSockets).toBe(1);
    expect(pool.activeSockets).toBe(0);
  });

  it("close removes socket", () => {
    const pool = new SocketPool();
    const sock = pool.acquire("example.com", 443)!;
    expect(pool.close(sock.id)).toBe(true);
    expect(pool.totalSockets).toBe(0);
  });

  it("respects maxPerHost limit", () => {
    const pool = new SocketPool(2, 100);
    pool.acquire("example.com", 443);
    pool.acquire("example.com", 443);
    expect(pool.acquire("example.com", 443)).toBeNull();
  });

  it("respects maxTotal limit", () => {
    const pool = new SocketPool(10, 2);
    pool.acquire("a.com", 80);
    pool.acquire("b.com", 80);
    expect(pool.acquire("c.com", 80)).toBeNull();
  });

  it("evictIdle removes stale sockets", () => {
    const pool = new SocketPool(6, 50, 1000);
    const sock = pool.acquire("example.com", 443, 0)!;
    pool.release(sock.id, 0);
    const evicted = pool.evictIdle(2000);
    expect(evicted).toBe(1);
    expect(pool.totalSockets).toBe(0);
  });

  it("evictIdle keeps fresh sockets", () => {
    const pool = new SocketPool(6, 50, 10000);
    const now = Date.now();
    const sock = pool.acquire("example.com", 443, now)!;
    pool.release(sock.id);
    expect(pool.evictIdle(now + 1000)).toBe(0);
    expect(pool.totalSockets).toBe(1);
  });

  it("getHostStats reports counts", () => {
    const pool = new SocketPool();
    pool.acquire("example.com", 443);
    const s2 = pool.acquire("example.com", 443)!;
    pool.release(s2.id);
    const stats = pool.getHostStats("example.com", 443);
    expect(stats.total).toBe(2);
    expect(stats.active).toBe(1);
    expect(stats.idle).toBe(1);
  });

  it("getSocket returns info", () => {
    const pool = new SocketPool();
    const sock = pool.acquire("example.com", 443)!;
    expect(pool.getSocket(sock.id)).not.toBeNull();
    expect(pool.getSocket(999)).toBeNull();
  });

  it("closeAll empties pool", () => {
    const pool = new SocketPool();
    pool.acquire("a.com", 80);
    pool.acquire("b.com", 80);
    pool.closeAll();
    expect(pool.totalSockets).toBe(0);
  });

  it("list returns all sockets", () => {
    const pool = new SocketPool();
    pool.acquire("a.com", 80);
    pool.acquire("b.com", 80);
    expect(pool.list()).toHaveLength(2);
  });

  it("release returns false for non-active", () => {
    const pool = new SocketPool();
    const sock = pool.acquire("a.com", 80)!;
    pool.release(sock.id);
    expect(pool.release(sock.id)).toBe(false);
  });
});
