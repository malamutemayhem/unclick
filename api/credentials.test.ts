import { describe, expect, it } from "vitest";

import handler from "./credentials";

function createResponse() {
  const response = {
    headers: {} as Record<string, string>,
    statusCode: 200,
    ended: false,
    setHeader(name: string, value: string) {
      this.headers[name] = value;
      return this;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      return body;
    },
    end() {
      this.ended = true;
      return this;
    },
  };

  return response;
}

describe("credentials API cache headers", () => {
  it("forbids browser, CDN, and Vercel CDN caching before any response path returns", async () => {
    const res = createResponse();

    await handler({ method: "OPTIONS", headers: {} } as never, res as never);

    expect(res.statusCode).toBe(204);
    expect(res.ended).toBe(true);
    expect(res.headers["Cache-Control"]).toBe("private, no-store, max-age=0, must-revalidate");
    expect(res.headers["CDN-Cache-Control"]).toBe("no-store");
    expect(res.headers["Vercel-CDN-Cache-Control"]).toBe("no-store");
  });
});
