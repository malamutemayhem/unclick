import { describe, expect, it } from "vitest";

import { CONNECTORS } from "@/lib/connectors";

describe("Passport core connectors", () => {
  it("registers core apps for /connect routes", () => {
    expect(CONNECTORS.github?.name).toBe("GitHub");
    expect(CONNECTORS.vercel?.name).toBe("Vercel");
    expect(CONNECTORS.supabase?.name).toBe("Supabase");
    expect(CONNECTORS.higgsfield?.name).toBe("Higgsfield");
    expect(CONNECTORS.gmail?.name).toBe("Gmail");
    expect(CONNECTORS["google-drive"]?.name).toBe("Google Drive");
    expect(CONNECTORS.dropbox?.name).toBe("Dropbox");
    expect(CONNECTORS.onedrive?.name).toBe("OneDrive");
  });

  it("keeps secret fields marked as secret", () => {
    expect(CONNECTORS.github.credentialFields.find((field) => field.key === "api_key")?.secret).toBe(true);
    expect(CONNECTORS.vercel.credentialFields.find((field) => field.key === "api_key")?.secret).toBe(true);
    expect(CONNECTORS.supabase.credentialFields.find((field) => field.key === "access_token")?.secret).toBe(true);
    expect(CONNECTORS.gmail.credentialFields.find((field) => field.key === "access_token")?.secret).toBe(true);
    expect(CONNECTORS["google-drive"].credentialFields.find((field) => field.key === "access_token")?.secret).toBe(true);
    expect(CONNECTORS.dropbox.credentialFields.find((field) => field.key === "access_token")?.secret).toBe(true);
    expect(CONNECTORS.onedrive.credentialFields.find((field) => field.key === "access_token")?.secret).toBe(true);
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

  it("uses OAuth login for mail and file apps with token fallback", () => {
    expect(CONNECTORS.gmail.authType).toBe("oauth2");
    expect(CONNECTORS.gmail.authUrl).toBe("https://accounts.google.com/o/oauth2/v2/auth");
    expect(CONNECTORS.gmail.tokenUrl).toBe("https://oauth2.googleapis.com/token");
    expect(CONNECTORS.gmail.scopes).toEqual(expect.arrayContaining(["https://www.googleapis.com/auth/gmail.readonly"]));
    expect(CONNECTORS.gmail.credentialFields.find((field) => field.key === "access_token")?.label).toContain("fallback");

    expect(CONNECTORS["google-drive"].authType).toBe("oauth2");
    expect(CONNECTORS["google-drive"].scopes).toEqual(expect.arrayContaining(["https://www.googleapis.com/auth/drive.readonly"]));
    expect(CONNECTORS["google-drive"].credentialFields.find((field) => field.key === "access_token")?.label).toContain("fallback");

    expect(CONNECTORS.dropbox.authType).toBe("oauth2");
    expect(CONNECTORS.dropbox.authUrl).toBe("https://www.dropbox.com/oauth2/authorize");
    expect(CONNECTORS.dropbox.scopes).toEqual(expect.arrayContaining(["files.metadata.read", "files.content.read"]));

    expect(CONNECTORS.onedrive.authType).toBe("oauth2");
    expect(CONNECTORS.onedrive.authUrl).toBe("https://login.microsoftonline.com/common/oauth2/v2.0/authorize");
    expect(CONNECTORS.onedrive.scopes).toEqual(expect.arrayContaining(["Files.Read", "offline_access"]));
  });
});
