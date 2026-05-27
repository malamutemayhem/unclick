import type { VercelRequest, VercelResponse } from "@vercel/node";
import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "./sloppass.js";

const ORIGINAL_SUPABASE_URL = process.env.SUPABASE_URL;
const ORIGINAL_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ORIGINAL_FETCH = globalThis.fetch;

function restoreEnvValue(key: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[key];
  } else {
    process.env[key] = value;
  }
}

function createResponse() {
  return {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: "",
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    setHeader(key: string, value: string) {
      this.headers[key] = value;
      return this;
    },
    end(body?: string) {
      this.body = body ?? "";
      return this;
    },
  };
}

async function callHandler(params: {
  body?: unknown;
  method?: string;
  action?: string;
  authorization?: string | string[];
}) {
  const response = createResponse();
  await handler(
    {
      method: params.method ?? "POST",
      query: { action: params.action ?? "run" },
      headers: { authorization: params.authorization },
      body: params.body,
    } as unknown as VercelRequest,
    response as unknown as VercelResponse,
  );
  return response;
}

function installValidAuthFetch() {
  globalThis.fetch = vi.fn(async (url: string | URL | Request) => {
    if (String(url).includes("/rest/v1/api_keys")) {
      return new Response(JSON.stringify([{ user_id: "user_123" }]), { status: 200 });
    }
    return new Response(JSON.stringify({ id: "user_123" }), { status: 200 });
  }) as unknown as typeof fetch;
}

describe("SlopPass API", () => {
  afterEach(() => {
    restoreEnvValue("SUPABASE_URL", ORIGINAL_SUPABASE_URL);
    restoreEnvValue("SUPABASE_SERVICE_ROLE_KEY", ORIGINAL_SERVICE_KEY);
    globalThis.fetch = ORIGINAL_FETCH;
    vi.restoreAllMocks();
  });

  it("requires a bearer token after server env is configured", async () => {
    process.env.SUPABASE_URL = "https://supabase.example.test";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test";

    const response = await callHandler({ body: {} });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body)).toEqual({ error: "Missing Bearer token" });
  });

  it("runs SlopPass from API-key auth without returning raw source text", async () => {
    process.env.SUPABASE_URL = "https://supabase.example.test";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test";
    installValidAuthFetch();

    const response = await callHandler({
      authorization: ["Bearer uc_test"],
      body: JSON.stringify({
        target: { kind: "diff", label: "api dogfood", ref: "abc123" },
        diff: [
          "diff --git a/src/api-example.ts b/src/api-example.ts",
          "--- a/src/api-example.ts",
          "+++ b/src/api-example.ts",
          "@@ -20,6 +20,7 @@ export function apiExample(input: string) {",
          "+const token = 'super-secret-token-12345';",
          "+const value: any = eval(input);",
        ].join("\n"),
        target_sha: "abc123",
      }),
    });

    const body = JSON.parse(response.body) as {
      pass: string;
      verdict: string;
      reports: { markdown: string };
      result: { findings: Array<{ evidence: string }> };
    };

    expect(response.statusCode).toBe(200);
    expect(body.pass).toBe("sloppass");
    expect(body.verdict).toBe("fail");
    expect(body.reports.markdown).toContain("Build-fix prompt");
    expect(JSON.stringify(body)).not.toContain("super-secret-token-12345");
    expect(body.result.findings).toContainEqual(
      expect.objectContaining({ evidence: "[redacted-secret-like-literal]" }),
    );
  });

  it("rejects invalid JSON string bodies", async () => {
    process.env.SUPABASE_URL = "https://supabase.example.test";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test";
    installValidAuthFetch();

    const response = await callHandler({
      authorization: "Bearer uc_test",
      body: "{not valid",
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ error: "Invalid JSON body" });
  });
});
