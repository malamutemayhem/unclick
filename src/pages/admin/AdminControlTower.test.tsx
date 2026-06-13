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
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn((input: RequestInfo | URL) => {
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
      if (url.includes("fishbowl_comment_on")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ comment: { id: "comment-1" } }),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
    vi.stubGlobal("fetch", fetchMock);
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
    expect(screen.getAllByText(/I am Worker 1 of/).length).toBeGreaterThan(0);
  });

  it("posts the next worker claim as a Boardroom receipt", async () => {
    render(
      <MemoryRouter>
        <AdminControlTower />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Fix homepage proof")).toBeInTheDocument();
    const claimReceipt = screen.getByLabelText("Claim receipt") as HTMLTextAreaElement;
    expect(claimReceipt.value).toContain("CONTROLTOWER_LANE_CLAIM v1");
    expect(claimReceipt.value).toContain("Boardroom job: job-homepage-proof");

    fireEvent.click(screen.getByRole("button", { name: /Post to Boardroom/i }));

    await screen.findByText("Claim posted to Boardroom.");
    const commentCall = fetchMock.mock.calls.find(([input]) => String(input).includes("fishbowl_comment_on"));
    expect(commentCall).toBeDefined();

    const body = JSON.parse(String((commentCall?.[1] as RequestInit | undefined)?.body));
    expect(body).toMatchObject({
      agent_id: "admin-seat",
      target_kind: "todo",
      target_id: "job-homepage-proof",
    });
    expect(body.text).toContain("CONTROLTOWER_LANE_CLAIM v1");
    expect(body.text).toContain("Worker: admin-seat as Worker 1 of");
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
