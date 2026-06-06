import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AdminControlTower from "./AdminControlTower";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "test-token" },
    user: { email: "admin@example.com" },
    loading: false,
  }),
}));

function statValue(label: string): string {
  const labelNode = screen.getByText(label);
  const tile = labelNode.closest(".rounded-lg");
  return tile?.textContent ?? "";
}

describe("AdminControlTower", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("fishbowl_admin_claim")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ profile: { agent_id: "admin-seat" } }),
          });
        }
        if (url.includes("fishbowl_list_todos")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                todos: [
                  {
                    id: "job-homepage-proof",
                    title: "Fix homepage proof",
                    description: "Needs browser screenshot and UIPass judgment.",
                    status: "open",
                    priority: "urgent",
                    assigned_to_agent_id: null,
                    updated_at: "2026-06-07T08:00:00.000Z",
                    proof_state: "missing",
                  },
                ],
              }),
          });
        }
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("loads Boardroom Jobs into Control Tower lanes and shows the Master Copy Box", async () => {
    render(
      <MemoryRouter>
        <AdminControlTower />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Big-job coordination" })).toBeInTheDocument();
    expect(await screen.findByText("Fix homepage proof")).toBeInTheDocument();

    const copyBox = screen.getByLabelText("Master Copy Box") as HTMLTextAreaElement;
    expect(copyBox.value).toContain("CONTROL TOWER JOB");
    expect(copyBox.value).toContain("Boardroom Jobs");
    expect(copyBox.value).toContain("I am Worker X of Y");
    expect(screen.getByText(/I am Worker 1 of/)).toBeInTheDocument();
  });

  it("shows duplicate and redaction counts for messy pasted updates", async () => {
    render(
      <MemoryRouter>
        <AdminControlTower />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Paste intake"), {
      target: {
        value: [
          "Decision: use Boardroom Jobs as source truth.",
          "Decision: use Boardroom Jobs as source truth.",
          "BLOCKER: missing screenshot proof",
          "api_key: sk-thisShouldBeRedacted123456789",
        ].join("\n"),
      },
    });

    await waitFor(() => expect(statValue("Duplicates")).toContain("1"));
    expect(statValue("Redacted")).toContain("1");
    expect(statValue("Blockers")).toContain("1");
  });
});
