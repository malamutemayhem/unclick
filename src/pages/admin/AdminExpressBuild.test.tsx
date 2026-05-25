import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AdminExpressBuild from "./AdminExpressBuild";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "test-session-token" },
    user: { email: "admin@example.com" },
    loading: false,
  }),
}));

const draft = {
  id: "11111111-1111-4111-8111-111111111111",
  job_name_mirror: "Proof Ledger v2",
  official_todo_id: null,
  short_description: "Manual draft for structured evidence.",
  brief_markdown: "# Intake\nChris wants proof types.",
  supplied_code: "export const proof = true;",
  supplied_code_status: "partial",
  express_status: "draft",
  created_by_agent_id: "chat-seat",
  source_chat_session_id: "session-1",
  created_at: "2026-05-20T00:00:00Z",
  updated_at: "2026-05-20T00:00:00Z",
};

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/admin/autopilot/expressbuild"]}>
      <AdminExpressBuild />
    </MemoryRouter>,
  );
}

describe("AdminExpressBuild", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes("expressroom_list_drafts")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ drafts: [draft] }),
          });
        }
        if (url.includes("expressroom_create_draft")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ draft }),
          });
        }
        if (url.includes("expressroom_promote_to_todo")) {
          const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                draft: { ...draft, official_todo_id: "22222222-2222-4222-8222-222222222222", express_status: "inserted" },
                todo: { id: "22222222-2222-4222-8222-222222222222", title: "Manual DraftRoom integration: Proof Ledger v2" },
                request: body,
              }),
          });
        }
        return Promise.resolve({ ok: false, json: () => Promise.resolve({ error: "unexpected fetch" }) });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("explains that DraftRoom is a Manual front-of-line draft lane under AutoPilot", async () => {
    renderPage();

    expect(screen.getByRole("heading", { name: "DraftRoom" })).toBeInTheDocument();
    expect(screen.getByText("Manual DraftRoom")).toBeInTheDocument();
    expect(screen.getAllByText(/first station in the UnClick build line/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/warm smart chat seat should build or fit/i)).toBeInTheDocument();
    expect(screen.getByText(/Do not claim DONE from DraftRoom/i)).toBeInTheDocument();
    expect(screen.getAllByText(/build or fit the smallest safe draft/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/exact blocker and next build step/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Manual draft alarm bells")).toBeInTheDocument();
    expect(screen.getAllByText(/Supplied code is untrusted/i).length).toBeGreaterThan(0);
    expect(await screen.findByText("Proof Ledger v2")).toBeInTheDocument();
  });

  it("captures the required Manual draft fields", async () => {
    renderPage();

    fireEvent.change(screen.getByLabelText("Job name mirror"), { target: { value: "Worker Registry score panel" } });
    fireEvent.change(screen.getByLabelText("Short description"), { target: { value: "Build a small score panel." } });
    fireEvent.change(screen.getByLabelText("Detailed intake brief"), { target: { value: "Chris asked for a ranked worker score table." } });
    fireEvent.change(screen.getByLabelText("Supplied code"), { target: { value: "export const score = 88;" } });
    fireEvent.change(screen.getByLabelText("Code state"), { target: { value: "complete" } });

    fireEvent.click(screen.getByRole("button", { name: /Save Manual draft/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/memory-admin?action=expressroom_create_draft",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("Worker Registry score panel"),
        }),
      );
    });
  });

  it("inserts a Manual draft into the official Jobs Board", async () => {
    renderPage();

    const row = await screen.findByText("Proof Ledger v2");
    const tableRow = row.closest("tr");
    expect(tableRow).not.toBeNull();

    fireEvent.click(within(tableRow as HTMLTableRowElement).getByRole("button", { name: /Insert to Jobs/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/memory-admin?action=expressroom_promote_to_todo",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("11111111-1111-4111-8111-111111111111"),
        }),
      );
    });
  });
});
