import { describe, it, expect } from "vitest";
import { httpCatImage } from "./httpcat-tool.js";

describe("httpcat-tool", () => {
  it("httpCatImage returns image URL for status code", async () => {
    const r = await httpCatImage({ status_code: 404 }) as Record<string, unknown>;
    expect(r.image_url).toBe("https://http.cat/404");
    expect(r.status_code).toBe(404);
    expect(r.unclick_meta).toBeDefined();
  });

  it("httpCatImage defaults to 200", async () => {
    const r = await httpCatImage({}) as Record<string, unknown>;
    expect(r.image_url).toBe("https://http.cat/200");
    expect(r.status_code).toBe(200);
  });
});
