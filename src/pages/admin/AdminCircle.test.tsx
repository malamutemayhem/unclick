import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "test-session-token" },
    user: { email: "owner@example.com" },
    loading: false,
  }),
}));

const circleFixture = {
  me: { id: "me", email: "owner@example.com" },
  sharing_count: 1,
  links: [
    {
      id: "link-1",
      status: "accepted",
      direction: "linked",
      person: { user_id: "them", email: "alex@example.com", display_name: "Alex", avatar_url: null },
      created_at: "2026-06-19T00:00:00.000Z",
      accepted_at: "2026-06-19T00:01:00.000Z",
      permissions: {
        shared_memory: {
          give_enabled: true,
          give_accepted: true,
          give_active: true,
          receive_enabled: false,
          receive_offered: true,
          receive_active: false,
        },
        shared_orchestrator: {
          give_enabled: false,
          give_accepted: false,
          give_active: false,
          receive_enabled: false,
          receive_offered: false,
          receive_active: false,
        },
      },
    },
  ],
  audit: [
    {
      id: "audit-1",
      action: "permission_enabled",
      permission: "shared_memory",
      created_at: "2026-06-19T00:02:00.000Z",
    },
  ],
};

async function renderAdminCircle() {
  const { default: AdminCircle } = await import("./AdminCircle");
  render(
    <MemoryRouter>
      <AdminCircle />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { name: "Circle" });
  await screen.findByText("Alex");
}

function stubCircleFetch() {
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/account-links?action=list")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(circleFixture),
        });
      }
      if (url.includes("/api/account-links?action=") && init?.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
      }
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Unexpected request" }),
      });
    }),
  );
}

describe("AdminCircle", () => {
  beforeEach(() => {
    vi.resetModules();
    stubCircleFetch();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders linked people, permission matrix, key, and audit rows", async () => {
    await renderAdminCircle();

    expect(screen.getByText("Permissions")).toBeInTheDocument();
    expect(screen.getByText("Memory Bundle")).toBeInTheDocument();
    expect(screen.getByText("Handshake, two-way shared")).toBeInTheDocument();
    expect(screen.getByText("Permission Enabled")).toBeInTheDocument();
  });

  it("sends invites with the signed-in session", async () => {
    await renderAdminCircle();

    fireEvent.change(screen.getByLabelText("Circle invite email"), {
      target: { value: "friend@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add to Circle/i }));

    await waitFor(() => {
      const inviteCall = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.find(([url]) =>
        String(url).includes("action=invite"),
      );
      expect(inviteCall).toBeTruthy();
      expect(inviteCall?.[1]).toEqual(
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({ Authorization: "Bearer test-session-token" }),
          body: JSON.stringify({ email: "friend@example.com" }),
        }),
      );
    });
  });

  it("sends explicit permission direction changes", async () => {
    await renderAdminCircle();

    fireEvent.click(screen.getByRole("button", { name: "Share my Orchestrator with Alex" }));

    await waitFor(() => {
      const permissionCall = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.find(([url]) =>
        String(url).includes("action=set_permission"),
      );
      expect(permissionCall).toBeTruthy();
      expect(permissionCall?.[1]).toEqual(
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({ Authorization: "Bearer test-session-token" }),
          body: JSON.stringify({
            link_id: "link-1",
            permission: "shared_orchestrator",
            direction: "give",
            enabled: true,
          }),
        }),
      );
    });
  });
});
