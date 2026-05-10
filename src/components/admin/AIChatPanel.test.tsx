import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AIChatPanel from "./AIChatPanel";

describe("AIChatPanel auth", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          channel_active: false,
          last_seen: null,
          client_info: null,
        }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it("uses the signed-in session token when no raw API key is saved", async () => {
    render(<AIChatPanel authToken="session-jwt-token" />);

    expect(screen.queryByText("Sign in to use the Orchestrator chat.")).not.toBeInTheDocument();
    expect(
      await screen.findByText(
        "Ask your agent anything. Connect Claude Code for a free bridge via your own session.",
      ),
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      "/api/memory-admin?action=admin_channel_status",
      {
        headers: { Authorization: "Bearer session-jwt-token" },
      },
    );
  });

  it("still asks the user to sign in when neither session nor API key is available", () => {
    render(<AIChatPanel />);

    expect(screen.getByText("Sign in to use the Orchestrator chat.")).toBeInTheDocument();
  });

  it("mirrors fallback AI assistant turns into Orchestrator continuity", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          channel_active: false,
          last_seen: null,
          client_info: null,
        }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ turn_id: "user-turn" }) })
      .mockResolvedValueOnce({
        ok: true,
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode('data: {"delta":"saved assistant reply"}\n\n'),
            );
            controller.close();
          },
        }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ turn_id: "assistant-turn" }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<AIChatPanel authToken="session-jwt-token" />);

    const input = await screen.findByPlaceholderText("Message the AI assistant...");
    fireEvent.change(input, { target: { value: "save this harmless turn" } });
    fireEvent.click(screen.getAllByRole("button").at(-1)!);

    expect(await screen.findByText("saved assistant reply")).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(4));

    const ingestCalls = fetchMock.mock.calls.filter(([url]) =>
      String(url).includes("admin_conversation_turn_ingest"),
    );
    expect(ingestCalls).toHaveLength(2);
    expect(JSON.parse(String(ingestCalls[0][1]?.body))).toMatchObject({
      role: "user",
      content: "save this harmless turn",
      source_app: "orchestrator-admin-ai-chat",
    });
    expect(JSON.parse(String(ingestCalls[1][1]?.body))).toMatchObject({
      role: "assistant",
      content: "saved assistant reply",
      source_app: "orchestrator-admin-ai-chat",
    });
  });
});
