import { describe, it, expect } from "vitest";
import { SecretSharing } from "../secret-sharing.js";

describe("SecretSharing", () => {
  it("splits and reconstructs secret", () => {
    const secret = 42;
    const shares = SecretSharing.split(secret, 5, 3);
    expect(shares.length).toBe(5);
    const recovered = SecretSharing.reconstruct(shares.slice(0, 3), 3);
    expect(recovered).toBe(secret);
  });

  it("any k shares can reconstruct", () => {
    const secret = 1234;
    const shares = SecretSharing.split(secret, 5, 3);
    const combo1 = [shares[0], shares[1], shares[2]];
    const combo2 = [shares[2], shares[3], shares[4]];
    expect(SecretSharing.reconstruct(combo1, 3)).toBe(secret);
    expect(SecretSharing.reconstruct(combo2, 3)).toBe(secret);
  });

  it("verify checks reconstruction", () => {
    const secret = 100;
    const shares = SecretSharing.split(secret, 4, 2);
    expect(SecretSharing.verify(shares, 2, secret)).toBe(true);
    expect(SecretSharing.verify(shares, 2, 999)).toBe(false);
  });

  it("threshold must be at least 2", () => {
    expect(() => SecretSharing.split(42, 3, 1)).toThrow();
  });

  it("threshold cannot exceed total", () => {
    expect(() => SecretSharing.split(42, 2, 5)).toThrow();
  });

  it("shares have unique x values", () => {
    const shares = SecretSharing.split(77, 5, 3);
    const xs = shares.map(s => s[0]);
    expect(new Set(xs).size).toBe(5);
  });

  it("works with zero secret", () => {
    const shares = SecretSharing.split(0, 3, 2);
    expect(SecretSharing.reconstruct(shares, 2)).toBe(0);
  });
});
