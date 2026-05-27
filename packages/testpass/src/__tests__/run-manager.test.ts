import { jest } from "@jest/globals";
import { createRun, listRunFailures } from "../run-manager.js";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockRestResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe("listRunFailures", () => {
  it("returns compact safe failure details for CI comments", async () => {
    const fetchMock = jest.fn(async () => mockRestResponse([
      {
        check_id: "MCP-007",
        title: "tools/list returns tool metadata",
        category: "mcp-lifecycle",
        severity: "critical",
        on_fail_comment: "  Missing tool description.  ".repeat(20),
      },
    ]));
    globalThis.fetch = fetchMock as typeof fetch;

    const failures = await listRunFailures(
      { supabaseUrl: "https://example.supabase.co", serviceRoleKey: "service-role" },
      "run-123",
      50,
    );

    expect(failures).toHaveLength(1);
    expect(failures[0]).toMatchObject({
      check_id: "MCP-007",
      title: "tools/list returns tool metadata",
      category: "mcp-lifecycle",
      severity: "critical",
    });
    expect(failures[0].on_fail_comment?.length).toBeLessThanOrEqual(240);
    const calls = fetchMock.mock.calls as unknown as Array<[unknown]>;
    const firstUrl = String(calls[0]?.[0]);
    expect(firstUrl).toContain("verdict=eq.fail");
    expect(firstUrl).toContain("limit=20");
  });
});

describe("run-manager", () => {
  it("persists pack_name when a run is created with a pack label", async () => {
    const fetchMock = jest.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
      expect(body.pack_id).toBe("pack-id-1");
      expect(body.pack_name).toBe("TestPass Core");
      return {
        ok:     true,
        status: 200,
        text:   async () => JSON.stringify([{ id: "run-id-1" }]),
      } as Response;
    });
    globalThis.fetch = fetchMock as typeof fetch;

    const result = await createRun(
      { supabaseUrl: "https://supabase.test", serviceRoleKey: "service-key" },
      {
        packId: "pack-id-1",
        packName: "TestPass Core",
        target: { type: "url", url: "https://unclick.world/api/mcp" },
        profile: "smoke",
        actorUserId: "user-1",
      },
    );

    expect(result.id).toBe("run-id-1");
    expect(result.was_duplicate).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns was_duplicate=false when no task_id is supplied", async () => {
    const fetchMock = jest.fn(async (_url: string, _init?: RequestInit) => ({
      ok: true,
      status: 201,
      text: async () => JSON.stringify([{ id: "run-fresh" }]),
    } as Response));
    globalThis.fetch = fetchMock as typeof fetch;

    const result = await createRun(
      { supabaseUrl: "https://supabase.test", serviceRoleKey: "service-key" },
      {
        packId: "pack-id-1",
        target: { type: "url", url: "https://example.com" },
        profile: "smoke",
        actorUserId: "user-1",
      },
    );

    expect(result.was_duplicate).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns was_duplicate=true when the same task_id collides with an existing row", async () => {
    const taskId = "550e8400-e29b-51d4-a716-446655440000";
    let call = 0;
    const fetchMock = jest.fn(async (url: string, init?: RequestInit) => {
      call++;
      if (call === 1) {
        const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
        expect(body.task_id).toBe(taskId);
        return {
          ok: false,
          status: 409,
          text: async () =>
            JSON.stringify({ code: "23505", message: "duplicate key value violates unique constraint" }),
        } as Response;
      }
      expect(url).toContain(`task_id=eq.${taskId}`);
      expect(url).toContain("actor_user_id=eq.user-1");
      return {
        ok: true,
        status: 200,
        json: async () => [{ id: "existing-run-id" }],
      } as unknown as Response;
    });
    globalThis.fetch = fetchMock as typeof fetch;

    const result = await createRun(
      { supabaseUrl: "https://supabase.test", serviceRoleKey: "service-key" },
      {
        packId: "pack-id-1",
        target: { type: "url", url: "https://example.com" },
        profile: "smoke",
        actorUserId: "user-1",
        taskId,
      },
    );

    expect(result.id).toBe("existing-run-id");
    expect(result.was_duplicate).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("creates two distinct rows when two different task_ids are submitted", async () => {
    const taskA = "aaaaaaaa-aaaa-5aaa-aaaa-aaaaaaaaaaaa";
    const taskB = "bbbbbbbb-bbbb-5bbb-9bbb-bbbbbbbbbbbb";
    const fetchMock = jest.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
      const id = body.task_id === taskA ? "run-a" : body.task_id === taskB ? "run-b" : "run-other";
      return {
        ok: true,
        status: 201,
        text: async () => JSON.stringify([{ id }]),
      } as Response;
    });
    globalThis.fetch = fetchMock as typeof fetch;

    const config = { supabaseUrl: "https://supabase.test", serviceRoleKey: "service-key" };
    const a = await createRun(config, {
      packId: "pack-id-1",
      target: { type: "url", url: "https://example.com" },
      profile: "smoke",
      actorUserId: "user-1",
      taskId: taskA,
    });
    const b = await createRun(config, {
      packId: "pack-id-1",
      target: { type: "url", url: "https://example.com" },
      profile: "smoke",
      actorUserId: "user-1",
      taskId: taskB,
    });

    expect(a.id).toBe("run-a");
    expect(a.was_duplicate).toBe(false);
    expect(b.id).toBe("run-b");
    expect(b.was_duplicate).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
