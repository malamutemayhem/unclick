import { describe, expect, it } from "vitest";

import { CONNECTORS } from "@/lib/connectors";

describe("Passport core connectors", () => {
  it("registers core apps for /connect routes", () => {
    expect(CONNECTORS.github?.name).toBe("GitHub");
    expect(CONNECTORS.vercel?.name).toBe("Vercel");
    expect(CONNECTORS.supabase?.name).toBe("Supabase");
    expect(CONNECTORS.higgsfield?.name).toBe("Higgsfield");
  });

  it("keeps secret fields marked as secret", () => {
    expect(CONNECTORS.github.credentialFields.find((field) => field.key === "api_key")?.secret).toBe(true);
    expect(CONNECTORS.vercel.credentialFields.find((field) => field.key === "api_key")?.secret).toBe(true);
    expect(CONNECTORS.supabase.credentialFields.find((field) => field.key === "access_token")?.secret).toBe(true);
  });

  it("keeps Vercel and Supabase UnClick connections separate from hosted MCP sign-ins", () => {
    expect(CONNECTORS.vercel.description).toContain("hosted MCP is a separate sign-in");
    expect(CONNECTORS.supabase.description).toContain("hosted MCP is a separate developer sign-in");
    expect(CONNECTORS.vercel.credentialFields.find((field) => field.key === "api_key")?.label).toContain("fallback");
    expect(CONNECTORS.supabase.credentialFields.find((field) => field.key === "access_token")?.label).toContain("fallback");
  });

  it("uses OAuth login for GitHub with manual token as fallback", () => {
    expect(CONNECTORS.github.authType).toBe("oauth2");
    expect(CONNECTORS.github.authUrl).toBe("https://github.com/login/oauth/authorize");
    expect(CONNECTORS.github.tokenUrl).toBe("https://github.com/login/oauth/access_token");
    expect(CONNECTORS.github.scopes).toEqual(expect.arrayContaining(["repo", "workflow"]));
    expect(CONNECTORS.github.credentialFields.find((field) => field.key === "api_key")?.label).toContain("fallback");
  });

  it("uses OAuth login for Vercel and Supabase with manual tokens only as fallback", () => {
    expect(CONNECTORS.vercel.authType).toBe("oauth2");
    expect(CONNECTORS.vercel.authUrl).toBe("https://vercel.com/oauth/authorize");
    expect(CONNECTORS.vercel.tokenUrl).toBe("https://api.vercel.com/login/oauth/token");
    expect(CONNECTORS.vercel.scopes).toEqual(expect.arrayContaining(["openid", "offline_access"]));

    expect(CONNECTORS.supabase.authType).toBe("oauth2");
    expect(CONNECTORS.supabase.authUrl).toBe("https://api.supabase.com/v1/oauth/authorize");
    expect(CONNECTORS.supabase.tokenUrl).toBe("https://api.supabase.com/v1/oauth/token");
    expect(CONNECTORS.supabase.scopes).toEqual([]);
  });

  it("uses OAuth login for Higgsfield MCP with token fallback", () => {
    expect(CONNECTORS.higgsfield.authType).toBe("oauth2");
    expect(CONNECTORS.higgsfield.authUrl).toBe("https://mcp.higgsfield.ai/oauth2/authorize");
    expect(CONNECTORS.higgsfield.tokenUrl).toBe("https://mcp.higgsfield.ai/oauth2/token");
    expect(CONNECTORS.higgsfield.scopes).toEqual(expect.arrayContaining(["openid", "email", "offline_access"]));
    expect(CONNECTORS.higgsfield.credentialFields.find((field) => field.key === "access_token")?.secret).toBe(true);
  });
});
