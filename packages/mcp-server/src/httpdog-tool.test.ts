import { describe, it, expect } from "vitest";
import { httpDogImage } from "./httpdog-tool.js";

describe("httpdog-tool", () => {
  it("returns dog image URL for valid status code", async () => {
    const r = await httpDogImage({ status_code: 404 }) as Record<string, unknown>;
    expect(r.image_url).toBe("https://http.dog/404.jpg");
    expect(r.status_code).toBe(404);
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects invalid status code", async () => {
    const r = await httpDogImage({ status_code: 999 }) as Record<string, unknown>;
    expect(r.error).toMatch(/status_code/i);
  });
});
