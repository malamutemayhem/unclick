import { afterEach, describe, expect, it, vi } from "vitest";
import { giteaAction } from "./gitea-tool.js";
import { runWithRequestContext } from "./memory/request-context.js";

const envKeys = [
  "UNCLICK_API_URL",
  "UNCLICK_AI_KEY_SECRET",
  "UNCLICK_LOGIN_CONNECT_ENABLED",
  "UNCLICK_MCP_SESSION_TOKEN",
] as const;
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

afterEach(() => {
  vi.unstubAllGlobals();
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

describe("gitea_action", () => {
  it("uses the server-held master for a public-paired Superuser even when personal login connectors are disabled", async () => {
    process.env.UNCLICK_API_URL = "https://unclick.world";
    process.env.UNCLICK_AI_KEY_SECRET = "test-only-server-secret";
    delete process.env.UNCLICK_LOGIN_CONNECT_ENABLED;
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/system-connectors")) {
        expect(init?.headers).toMatchObject({
          Authorization: "Bearer public-pair-session-token",
          "X-UnClick-System-Connector-Broker": "test-only-server-secret",
        });
        return new Response(JSON.stringify({
          credentials: { base_url: "https://git.example.test", access_token: "test-only-master-token" },
        }), { status: 200 });
      }
      if (url.includes("/api/credentials")) return new Response("{}", { status: 404 });
      if (url.includes("git.example.test/api/v1/repos/example/unclick")) {
        return new Response(JSON.stringify({ full_name: "example/unclick" }), { status: 200 });
      }
      return new Response("{}", { status: 404 });
    }));

    const result = await runWithRequestContext(
      { sessionToken: "public-pair-session-token", isSuperuser: true },
      () => giteaAction("get_repo", { owner: "example", repo: "unclick" }),
    );

    expect(result).toEqual({ full_name: "example/unclick" });
  });
});
