import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import RecycleBinTab from "./RecycleBinTab";

function jsonResponse(body: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  } as Response);
}

const recycleData = {
  data: {
    facts: [
      {
        id: "fact-1",
        fact: "User prefers simple English updates.",
        category: "preference",
        decay_tier: "hot",
        created_at: "2026-06-07T00:00:00.000Z",
        archived_at: "2026-06-08T00:00:00.000Z",
        decay_reason: "user-deleted",
      },
    ],
    sessions: [
      {
        id: "session-row-1",
        session_id: "chat-1",
        platform: "Codex",
        summary: "Discussed Memory recycle bin behavior.",
        topics: ["memory", "admin"],
        created_at: "2026-06-07T00:00:00.000Z",
        archived_at: "2026-06-08T00:00:00.000Z",
        archive_reason: "user-deleted",
      },
    ],
  },
};

describe("RecycleBinTab", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("lists archived facts and sessions and restores a fact", async () => {
    const calls: Array<{ url: string; body?: unknown }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : undefined });
        if (url.includes("admin_memory_recycle_bin")) return jsonResponse(recycleData);
        return jsonResponse({ success: true });
      }),
    );

    render(<RecycleBinTab apiKey="test-token" />);

    expect(await screen.findByText("User prefers simple English updates.")).toBeInTheDocument();
    expect(screen.getByText("Discussed Memory recycle bin behavior.")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /Restore/i })[0]);

    await waitFor(() => {
      expect(calls.some((call) => call.url.includes("action=restore_fact"))).toBe(true);
    });
    expect(calls.find((call) => call.url.includes("action=restore_fact"))?.body).toEqual({ fact_id: "fact-1" });
  });

  it("requires confirmation before emptying the recycle bin", async () => {
    const calls: Array<{ url: string; body?: unknown }> = [];
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        calls.push({ url, body: init?.body ? JSON.parse(String(init.body)) : undefined });
        if (url.includes("admin_memory_recycle_bin")) return jsonResponse(recycleData);
        if (url.includes("empty_memory_recycle_bin")) {
          return jsonResponse({ success: true, deleted: { facts: 1, sessions: 1 } });
        }
        return jsonResponse({ success: true });
      }),
    );

    render(<RecycleBinTab apiKey="test-token" />);

    fireEvent.click(await screen.findByRole("button", { name: /Empty bin/i }));

    await waitFor(() => {
      expect(calls.some((call) => call.url.includes("action=empty_memory_recycle_bin"))).toBe(true);
    });
    expect(calls.find((call) => call.url.includes("action=empty_memory_recycle_bin"))?.body).toEqual({
      confirm: "EMPTY",
    });
    expect(await screen.findByText("Recycle bin is empty")).toBeInTheDocument();
  });
});
