import { describe, expect, it } from "vitest";
import {
  buildMcpRequest,
  buildSaveFactRpc,
  composeFact,
  DEFAULT_MCP_ENDPOINT,
  FACT_MAX_LEN,
} from "./memory.js";

describe("composeFact", () => {
  it("trims and appends the source", () => {
    expect(composeFact({ fact: "  remember this  ", sourceUrl: "https://x.test/p" })).toBe(
      "remember this\n\nSource: https://x.test/p",
    );
  });

  it("throws on empty", () => {
    expect(() => composeFact({ fact: "   " })).toThrow();
  });

  it("caps at the fact length limit", () => {
    const long = "a".repeat(FACT_MAX_LEN + 500);
    expect(composeFact({ fact: long }).length).toBe(FACT_MAX_LEN);
  });
});

describe("buildSaveFactRpc", () => {
  it("builds a tools/call for save_fact with a default category", () => {
    const rpc = buildSaveFactRpc({ fact: "hello" });
    expect(rpc.method).toBe("tools/call");
    expect(rpc.params.name).toBe("save_fact");
    expect(rpc.params.arguments.category).toBe("general");
    expect(rpc.params.arguments.fact).toBe("hello");
  });

  it("respects an explicit category", () => {
    const rpc = buildSaveFactRpc({ fact: "x", category: "decision" });
    expect(rpc.params.arguments.category).toBe("decision");
  });
});

describe("buildMcpRequest", () => {
  it("puts the key only in the Authorization header", () => {
    const req = buildMcpRequest(DEFAULT_MCP_ENDPOINT, "uc_test_key", buildSaveFactRpc({ fact: "x" }));
    expect(req.url).toBe(DEFAULT_MCP_ENDPOINT);
    expect(req.method).toBe("POST");
    expect(req.headers.authorization).toBe("Bearer uc_test_key");
    expect(req.headers["content-type"]).toBe("application/json");
    expect(req.body).not.toContain("uc_test_key");
  });

  it("requires endpoint and apiKey", () => {
    expect(() => buildMcpRequest("", "k", {})).toThrow();
    expect(() => buildMcpRequest("https://e", "", {})).toThrow();
  });
});
