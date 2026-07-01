import { describe, it, expect, vi, afterEach } from "vitest";
import { isReadOnlyEndpointId, internalMcpCall, buildChatTools, type ChatMemory } from "./chat-tools";

// A fake memory backend that records calls, so the memory tools can be tested
// without a real Supabase backend.
function fakeMemory(overrides: Partial<ChatMemory> = {}): ChatMemory & {
  searchCalls: Array<[string, number]>;
  saveCalls: Array<[string, string]>;
} {
  const searchCalls: Array<[string, number]> = [];
  const saveCalls: Array<[string, string]> = [];
  return {
    searchCalls,
    saveCalls,
    search: async (query: string, maxResults: number) => {
      searchCalls.push([query, maxResults]);
      return overrides.search ? overrides.search(query, maxResults) : [{ fact: "user likes dark mode" }];
    },
    save: async (fact: string, category: string) => {
      saveCalls.push([fact, category]);
      return overrides.save ? overrides.save(fact, category) : { id: "fact_1" };
    },
  };
}

function mcpJsonResponse(body: unknown) {
  return {
    ok: true,
    status: 200,
    text: async () => JSON.stringify(body),
  };
}

function mcpSseResponse(body: unknown) {
  return {
    ok: true,
    status: 200,
    text: async () => `event: message\ndata: ${JSON.stringify(body)}\n\n`,
  };
}

describe("isReadOnlyEndpointId", () => {
  it("allows clear read/list endpoints", () => {
    expect(isReadOnlyEndpointId("gmail.read")).toBe(true);
    expect(isReadOnlyEndpointId("drive.list")).toBe(true);
    expect(isReadOnlyEndpointId("dropbox.list")).toBe(true);
    expect(isReadOnlyEndpointId("gmail_search")).toBe(true);
    expect(isReadOnlyEndpointId("drive_search")).toBe(true);
    expect(isReadOnlyEndpointId("onedrive_list")).toBe(true);
    expect(isReadOnlyEndpointId("dropbox_list_folder")).toBe(true);
    expect(isReadOnlyEndpointId("dropbox_get_account")).toBe(true);
    expect(isReadOnlyEndpointId("memory.search_memory")).toBe(true);
    expect(isReadOnlyEndpointId("x.get_status")).toBe(true);
  });

  it("denies write/send endpoints", () => {
    expect(isReadOnlyEndpointId("gmail.send")).toBe(false);
    expect(isReadOnlyEndpointId("gmail_send")).toBe(false);
    expect(isReadOnlyEndpointId("dropbox.delete")).toBe(false);
    expect(isReadOnlyEndpointId("higgsfield_generate_image")).toBe(false);
    expect(isReadOnlyEndpointId("x.create_y")).toBe(false);
  });

  it("denies ambiguous endpoints (read-first is conservative)", () => {
    expect(isReadOnlyEndpointId("foo.bar")).toBe(false);
    expect(isReadOnlyEndpointId("attendance.check_in")).toBe(false);
    expect(isReadOnlyEndpointId("calendar.checkin")).toBe(false);
    expect(isReadOnlyEndpointId("")).toBe(false);
  });
});

describe("internalMcpCall", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("POSTs a JSON-RPC tools/call with the bearer and returns the extracted text", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      mcpJsonResponse({
        result: { content: [{ type: "text", text: "hello world" }] },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const out = await internalMcpCall("https://example.test", "uc_abc", "unclick_search", {
      query: "gmail",
    });

    expect(out).toBe("hello world");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://example.test/api/mcp");
    expect(init.method).toBe("POST");
    expect(init.headers.Authorization).toBe("Bearer uc_abc");
    expect(init.headers.Accept).toBe("application/json, text/event-stream");
    expect(init.headers["Content-Type"]).toBe("application/json");
    const body = JSON.parse(init.body);
    expect(body.jsonrpc).toBe("2.0");
    expect(body.method).toBe("tools/call");
    expect(body.params.name).toBe("unclick_search");
    expect(body.params.arguments).toEqual({ query: "gmail" });
  });

  it("parses an MCP event-stream tools/call response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      mcpSseResponse({
        result: { content: [{ type: "text", text: "gmail, dropbox" }] },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const out = await internalMcpCall("https://example.test", "uc_abc", "unclick_search", {
      query: "gmail",
    });

    expect(out).toBe("gmail, dropbox");
  });

  it("returns a tool error string on a non-ok response (does not throw)", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500, text: async () => "" });
    vi.stubGlobal("fetch", fetchMock);

    const out = await internalMcpCall("https://example.test", "uc_abc", "unclick_call", {});
    expect(out).toMatch(/^tool error:/);
    expect(out).toContain("500");
  });

  it("returns a tool error string on a thrown fetch (does not throw)", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);

    const out = await internalMcpCall("https://example.test", "uc_abc", "unclick_call", {});
    expect(out).toMatch(/^tool error:/);
  });

  it("returns a tool error without calling fetch when origin or bearer is missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    expect(await internalMcpCall("", "uc_abc", "unclick_call", {})).toMatch(/^tool error:/);
    expect(await internalMcpCall("https://example.test", "", "unclick_call", {})).toMatch(/^tool error:/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("memory tools (direct, no connector key needed)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("search_memory runs against the memory backend, not /api/mcp", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const mem = fakeMemory();

    const tools = buildChatTools({ origin: "https://example.test", connectorKey: null, memory: mem });
    const search = tools.search_memory as { execute: (args: unknown) => Promise<string> };
    const out = await search.execute({ query: "theme preference", max_results: 5 });

    expect(mem.searchCalls).toEqual([["theme preference", 5]]);
    expect(out).toContain("dark mode");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("search_memory reports nothing found on an empty result", async () => {
    const mem = fakeMemory({ search: async () => [] });
    const tools = buildChatTools({ origin: "https://example.test", connectorKey: null, memory: mem });
    const search = tools.search_memory as { execute: (args: unknown) => Promise<string> };
    const out = await search.execute({ query: "nothing here" });
    expect(out).toMatch(/no matching memory/i);
  });

  it("save_memory writes to the user's own memory and confirms", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const mem = fakeMemory();

    const tools = buildChatTools({ origin: "https://example.test", connectorKey: null, memory: mem });
    const save = tools.save_memory as { execute: (args: unknown) => Promise<string> };
    const out = await save.execute({ fact: "Prefers TypeScript", category: "preference" });

    expect(mem.saveCalls).toEqual([["Prefers TypeScript", "preference"]]);
    expect(out).toMatch(/saved to memory/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("save_memory defaults the category and refuses an empty fact", async () => {
    const mem = fakeMemory();
    const tools = buildChatTools({ origin: "https://example.test", connectorKey: null, memory: mem });
    const save = tools.save_memory as { execute: (args: unknown) => Promise<string> };

    await save.execute({ fact: "likes pour-over coffee" });
    expect(mem.saveCalls).toEqual([["likes pour-over coffee", "general"]]);

    const empty = await save.execute({ fact: "   " });
    expect(empty).toMatch(/^tool error:/);
    expect(mem.saveCalls).toHaveLength(1); // empty fact never reached the backend
  });

  it("search_memory returns a tool error (never throws) when the backend fails", async () => {
    const mem = fakeMemory({
      search: async () => {
        throw new Error("backend down");
      },
    });
    const tools = buildChatTools({ origin: "https://example.test", connectorKey: null, memory: mem });
    const search = tools.search_memory as { execute: (args: unknown) => Promise<string> };
    const out = await search.execute({ query: "x" });
    expect(out).toMatch(/^tool error:/);
  });
});

describe("connector tools (require a validated connector key)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("degrade gracefully without a connector key and never call /api/mcp", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const tools = buildChatTools({ origin: "https://example.test", connectorKey: null, memory: fakeMemory() });

    const find = tools.find_tools as { execute: (args: unknown) => Promise<string> };
    const info = tools.tool_info as { execute: (args: unknown) => Promise<string> };
    const call = tools.call_tool as { execute: (args: unknown) => Promise<string> };

    expect(await find.execute({ query: "gmail" })).toMatch(/You page/i);
    expect(await info.execute({ tool: "gmail" })).toMatch(/You page/i);
    expect(await call.execute({ endpoint_id: "gmail.read", params: {} })).toMatch(/You page/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("call_tool refuses a write endpoint even WITH a connector key (read-first, unconditional)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const tools = buildChatTools({ origin: "https://example.test", connectorKey: "uc_abc", memory: fakeMemory() });
    const callTool = tools.call_tool as { execute: (args: unknown) => Promise<string> };
    const out = await callTool.execute({ endpoint_id: "gmail.send", params: {} });

    expect(out).toMatch(/read-first mode/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("call_tool allows a read endpoint through to the internal mcp call with the connector key", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      mcpJsonResponse({ result: { content: [{ type: "text", text: "inbox: 3 unread" }] } }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const tools = buildChatTools({ origin: "https://example.test", connectorKey: "uc_abc", memory: fakeMemory() });
    const callTool = tools.call_tool as { execute: (args: unknown) => Promise<string> };
    const out = await callTool.execute({ endpoint_id: "gmail.read", params: { limit: 5 } });

    expect(out).toBe("inbox: 3 unread");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const init = fetchMock.mock.calls[0][1];
    expect(init.headers.Authorization).toBe("Bearer uc_abc");
    const body = JSON.parse(init.body);
    expect(body.params.name).toBe("unclick_call");
    expect(body.params.arguments).toEqual({ endpoint_id: "gmail.read", params: { limit: 5 } });
  });

  it("call_tool allows live snake-case read connector IDs through", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      mcpJsonResponse({ result: { content: [{ type: "text", text: "dropbox folders" }] } }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const tools = buildChatTools({ origin: "https://example.test", connectorKey: "uc_abc", memory: fakeMemory() });
    const callTool = tools.call_tool as { execute: (args: unknown) => Promise<string> };
    const out = await callTool.execute({ endpoint_id: "dropbox_list_folder", params: { path: "" } });

    expect(out).toBe("dropbox folders");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.params.arguments).toEqual({ endpoint_id: "dropbox_list_folder", params: { path: "" } });
  });

  it("find_tools forwards the query to unclick_search with the connector key", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      mcpJsonResponse({ result: { content: [{ type: "text", text: "gmail, gmail_search" }] } }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const tools = buildChatTools({ origin: "https://example.test", connectorKey: "uc_abc", memory: fakeMemory() });
    const find = tools.find_tools as { execute: (args: unknown) => Promise<string> };
    const out = await find.execute({ query: "read my email" });

    expect(out).toContain("gmail");
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.params.name).toBe("unclick_search");
    expect(body.params.arguments).toEqual({ query: "read my email", category: undefined });
  });
});
