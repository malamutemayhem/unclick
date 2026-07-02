import { describe, it, expect } from "vitest";
import { jwtDecode } from "./jwt-tool.js";

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

describe("jwt-tool", () => {
  it("decodes a JWT", async () => {
    const r = await jwtDecode({ token: SAMPLE_JWT }) as Record<string, unknown>;
    expect(r.header).toBeDefined();
    expect(r.payload).toBeDefined();
    const payload = r.payload as Record<string, unknown>;
    expect(payload.sub).toBe("1234567890");
    expect(payload.name).toBe("John Doe");
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects invalid format", async () => {
    const r = await jwtDecode({ token: "not.a.valid" }) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });

  it("rejects missing token", async () => {
    const r = await jwtDecode({}) as Record<string, unknown>;
    expect(r.error).toMatch(/token/i);
  });
});
