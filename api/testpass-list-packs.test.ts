import { describe, expect, it } from "vitest";
import { mapTestPassPackListRows, resolveTestPassAction } from "./testpass";

describe("list_packs action", () => {
  it("is resolvable from the query string like the other testpass actions", () => {
    expect(resolveTestPassAction("list_packs", undefined)).toBe("list_packs");
  });

  it("maps pack rows to the same summary shape as the admin pack list", () => {
    const rows = [
      {
        id: "pack-1",
        slug: "testpass-core",
        name: "TestPass Core v0",
        description: "Core MCP checks",
        yaml: { category: "mcp", items: [{ id: "MCP-001" }, { id: "MCP-002" }] },
        owner_user_id: null,
      },
      {
        id: "pack-2",
        slug: "my-pack",
        name: "My Pack",
        description: null,
        yaml: null,
        owner_user_id: "user-1",
      },
    ];

    expect(mapTestPassPackListRows(rows)).toEqual([
      {
        id: "pack-1",
        slug: "testpass-core",
        name: "TestPass Core v0",
        description: "Core MCP checks",
        check_count: 2,
        category: "mcp",
        is_system: true,
      },
      {
        id: "pack-2",
        slug: "my-pack",
        name: "My Pack",
        description: null,
        check_count: 0,
        category: "general",
        is_system: false,
      },
    ]);
  });
});
