import { afterEach, describe, expect, it, vi } from "vitest";

import {
  jiraSearchIssues,
  jiraGetIssue,
  jiraCreateIssue,
} from "./jira-tool.js";

const CREDS = { site: "acme", email: "me@acme.com", api_token: "t" };

// L2 resilience + L3 memory-default + L5 stamp contract for the Jira connector.
describe("jira connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) })));
    await expect(jiraSearchIssues({ ...CREDS })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(jiraSearchIssues({ ...CREDS })).rejects.toThrow(/timed out/i);
  });

  it("returns a not-connected card when credentials are missing", async () => {
    vi.stubEnv("JIRA_SITE", ""); vi.stubEnv("JIRA_EMAIL", ""); vi.stubEnv("JIRA_API_TOKEN", "");
    const result = await jiraSearchIssues({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("validates required params before calling the API", async () => {
    const result = await jiraGetIssue({ ...CREDS }) as Record<string, unknown>;
    expect(result.error).toMatch(/issue_key is required/i);
  });

  it("normalizes a full site URL to the atlassian.net host", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ issues: [] }) }));
    vi.stubGlobal("fetch", fetchMock);
    await jiraSearchIssues({ ...CREDS, site: "https://acme.atlassian.net/jira" });
    const [url] = fetchMock.mock.calls[0] as unknown as [string];
    expect(String(url)).toMatch(/^https:\/\/acme\.atlassian\.net\/rest\/api\/3\/search/);
  });
});

describe("jira source stamping + memory default (L5 / L3)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("stamps source on a search result", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ issues: [{ key: "ENG-1" }] }) })));
    const result = await jiraSearchIssues({ ...CREDS, jql: "project = ENG" }) as Record<string, any>;
    expect(result.unclick_meta.source).toBe("Jira Cloud REST API v3");
  });

  it("surfaces a project_key filled from memory as defaults_used", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 201, json: async () => ({ key: "ENG-42" }) })));
    const result = await jiraCreateIssue({
      ...CREDS,
      project_key: "ENG",
      summary: "Ship it",
      __unclick_memory_defaults: ["memory.project_key"],
    }) as Record<string, any>;
    expect(result.unclick_meta.defaults_used).toContain("memory.project_key");
  });
});
