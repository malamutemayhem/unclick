import { afterEach, describe, expect, it, vi } from "vitest";
import { giteaAction } from "./gitea-tool.js";
import { runWithRequestContext } from "./memory/request-context.js";

const envKeys = ["UNCLICK_API_URL", "UNCLICK_AI_KEY_SECRET", "UNCLICK_LOGIN_CONNECT_ENABLED"] as const;
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

afterEach(() => {
  vi.unstubAllGlobals();
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

describe("gitea_action", () => {
  it("uses the server-held master only in a scoped Superuser request", async () => {
    process.env.UNCLICK_API_URL = "https://unclick.world";
    process.env.UNCLICK_AI_KEY_SECRET = "test-only-server-secret";
    process.env.UNCLICK_LOGIN_CONNECT_ENABLED = "true";
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/api/system-connectors")) {
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
      { apiKey: "uc_superuser", isSuperuser: true },
      () => giteaAction("get_repo", { owner: "example", repo: "unclick" }),
    );

    expect(result).toEqual({ full_name: "example/unclick" });
  });
});
