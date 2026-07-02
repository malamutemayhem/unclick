import { afterEach, describe, expect, it, vi } from "vitest";
import { getSupabaseProject, listSupabaseOrganizations, listSupabaseProjects } from "./supabase-tool.js";

function jsonResponse(data: unknown, init: { status?: number } = {}): Response {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json" },
  });
}

describe("supabase connector read tools", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("lists projects with the connected Supabase token", async () => {
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      expect(String(input)).toBe("https://api.supabase.com/v1/projects");
      expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer sbp_test");
      return jsonResponse([
        {
          id: 1,
          ref: "abcdefghijklmnop",
          name: "UnClick",
          organization_id: "org-1",
          region: "ap-southeast-2",
          status: "ACTIVE_HEALTHY",
        },
      ]);
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await listSupabaseProjects({ access_token: "sbp_test" }) as Record<string, unknown>;

    expect(result.count).toBe(1);
    expect(result.projects).toEqual([
      expect.objectContaining({ ref: "abcdefghijklmnop", name: "UnClick" }),
    ]);
    expect(result.unclick_meta).toMatchObject({ source: "Supabase Management API" });
  });

  it("gets a project by project_ref", async () => {
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      expect(String(input)).toBe("https://api.supabase.com/v1/projects/abcdefghijklmnop");
      expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer sbp_test");
      return jsonResponse({ ref: "abcdefghijklmnop", name: "UnClick" });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await getSupabaseProject({
      access_token: "sbp_test",
      project_ref: "abcdefghijklmnop",
    }) as Record<string, unknown>;

    expect(result.project_ref).toBe("abcdefghijklmnop");
    expect(result.project).toMatchObject({ name: "UnClick" });
  });

  it("lists organizations", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse([
      { id: "org-1", slug: "creativelead", name: "Creative Lead" },
    ])));

    const result = await listSupabaseOrganizations({ access_token: "sbp_test" }) as Record<string, unknown>;

    expect(result.count).toBe(1);
    expect(result.organizations).toEqual([
      expect.objectContaining({ slug: "creativelead" }),
    ]);
  });

  it("returns a clear reconnect message for missing Supabase read access", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ error: "forbidden" }, { status: 403 })));

    const result = await listSupabaseProjects({ access_token: "sbp_test" }) as Record<string, unknown>;

    expect(result.error).toMatch(/Reconnect Supabase/i);
    expect(result.error).toMatch(/read access/i);
  });
});
