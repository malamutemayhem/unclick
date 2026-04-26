import { describe, it, expect } from "vitest";
import {
  normalizeAcceptHeader,
  type AcceptCarrier,
} from "../../api/lib/mcp-protocol";

// Regression coverage for testpass-core MCP-001/003/004 + RPC-002/004 +
// MCP-006. The MCP SDK's StreamableHTTPServerTransport rejects POSTs that
// lack both "application/json" and "text/event-stream" in Accept with
// HTTP 406 + JSON-RPC -32000 + id:null. That single SDK gate cascades
// into id-not-echoed and wrong-error-code symptoms downstream. Normalizing
// the inbound Accept before delegating to the SDK is the root-cause fix.
function reqWith(accept: string | string[] | undefined): AcceptCarrier {
  return { headers: { accept } };
}

describe("normalizeAcceptHeader", () => {
  it("appends text/event-stream when client sends only application/json (TestPass-core case)", () => {
    const req = reqWith("application/json");
    normalizeAcceptHeader(req);
    expect(req.headers.accept).toBe("application/json, text/event-stream");
  });

  it("appends application/json when client sends only text/event-stream", () => {
    const req = reqWith("text/event-stream");
    normalizeAcceptHeader(req);
    expect(req.headers.accept).toBe("text/event-stream, application/json");
  });

  it("leaves spec-strict Accept untouched", () => {
    const req = reqWith("application/json, text/event-stream");
    normalizeAcceptHeader(req);
    expect(req.headers.accept).toBe("application/json, text/event-stream");
  });

  it("leaves Accept untouched when both content types appear with q-values", () => {
    const req = reqWith("application/json;q=0.9, text/event-stream;q=0.8");
    normalizeAcceptHeader(req);
    expect(req.headers.accept).toBe(
      "application/json;q=0.9, text/event-stream;q=0.8",
    );
  });

  it("populates both content types when Accept is missing entirely", () => {
    const req = reqWith(undefined);
    normalizeAcceptHeader(req);
    expect(req.headers.accept).toBe("application/json, text/event-stream");
  });

  it("preserves wildcard Accept and adds the required content types", () => {
    const req = reqWith("*/*");
    normalizeAcceptHeader(req);
    expect(req.headers.accept).toBe(
      "*/*, application/json, text/event-stream",
    );
  });

  it("flattens array-shaped Accept headers (Node http.IncomingMessage edge case)", () => {
    const req = reqWith(["application/json", "text/plain"]);
    normalizeAcceptHeader(req);
    expect(req.headers.accept).toBe(
      "application/json, text/plain, text/event-stream",
    );
  });
});
