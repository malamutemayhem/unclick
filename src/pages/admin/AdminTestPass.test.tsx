import { describe, expect, it } from "vitest";
import {
  buildTestPassEditorRunBody,
  coerceSavedTestPassPackDetail,
} from "./AdminTestPass";

describe("AdminTestPass editor helpers", () => {
  it("runs the loaded pack by id instead of silently falling back to the core pack", () => {
    const body = buildTestPassEditorRunBody({
      targetUrl: "https://example.test/mcp",
      profile: "standard",
      loadedPack: { id: "6fd6d837-7f36-49ab-9107-a758cb1e4eea" },
    });

    expect(body).toEqual({
      action: "run",
      target_url: "https://example.test/mcp",
      profile: "standard",
      pack_id: "6fd6d837-7f36-49ab-9107-a758cb1e4eea",
    });
    expect("pack_slug" in body).toBe(false);
  });

  it("uses the core pack only before the editor has a saved or loaded pack", () => {
    expect(
      buildTestPassEditorRunBody({
        targetUrl: "https://example.test/mcp",
        profile: "smoke",
        loadedPack: null,
      }),
    ).toEqual({
      action: "run",
      target_url: "https://example.test/mcp",
      profile: "smoke",
      pack_slug: "testpass-core",
    });
  });

  it("hydrates a saved pack so the next run uses that pack immediately", () => {
    expect(
      coerceSavedTestPassPackDetail({
        id: "6fd6d837-7f36-49ab-9107-a758cb1e4eea",
        slug: "custom-mcp-pack",
        yaml: { id: "custom-mcp-pack", items: [] },
        owner_user_id: "user-1",
      }),
    ).toEqual({
      id: "6fd6d837-7f36-49ab-9107-a758cb1e4eea",
      slug: "custom-mcp-pack",
      yaml: { id: "custom-mcp-pack", items: [] },
      is_system: false,
    });
  });
});
