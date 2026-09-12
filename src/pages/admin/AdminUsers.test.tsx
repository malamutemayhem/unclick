// Render proof for the User Management table. The behaviours worth pinning:
// real accounts render as rows, the GOD account is visibly protected (no
// destructive actions offered, ever), env-sourced superusers explain why
// they cannot be demoted from the UI, and a normal account exposes the full
// action set including the typed-email delete confirm.

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AdminUsers from "./AdminUsers";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "test-session-token" },
    user: { email: "chris@example.com" },
    loading: false,
  }),
}));

const FIXTURE = {
  users: [
    {
      id: "god-1",
      email: "creativelead@malamutemayhem.com",
      provider: "email",
      created_at: "2026-01-01T00:00:00Z",
      last_sign_in_at: "2026-08-01T00:00:00Z",
      confirmed: true,
      role: "god",
      role_source: "god",
      suspended: false,
      key: { prefix: "uc_god12", tier: "unlimited", active: true, usage_count: 999, last_used_at: "2026-08-01T00:00:00Z" },
      worker_keys: 2,
      any_key_active: true,
    },
    {
      id: "env-1",
      email: "envadmin@example.com",
      provider: "google",
      created_at: "2026-02-01T00:00:00Z",
      last_sign_in_at: null,
      confirmed: true,
      role: "superuser",
      role_source: "env",
      suspended: false,
      key: { prefix: "uc_env12", tier: "free", active: true, usage_count: 10, last_used_at: null },
      worker_keys: 0,
      any_key_active: true,
    },
    {
      id: "normal-1",
      email: "normal@example.com",
      provider: "email",
      created_at: "2026-03-01T00:00:00Z",
      last_sign_in_at: "2026-07-01T00:00:00Z",
      confirmed: false,
      role: "user",
      role_source: null,
      suspended: false,
      key: { prefix: "uc_norm12", tier: "free", active: true, usage_count: 3, last_used_at: null },
      worker_keys: 0,
      any_key_active: true,
    },
  ],
  total: 3,
  truncated: false,
  caller: { id: "caller-1", email: "chris@example.com", role: "superuser" },
};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("system-connectors")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            viewer: { role: "god", can_update: true },
            connectors: [],
          }),
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => FIXTURE,
      };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderPage() {
  render(React.createElement(MemoryRouter, null, React.createElement(AdminUsers)));
}

async function waitForRows() {
  await waitFor(() =>
    expect(screen.getByText("creativelead@malamutemayhem.com")).toBeInTheDocument(),
  );
}

describe("AdminUsers", () => {
  it("renders every account as a row with role pills", async () => {
    renderPage();
    await waitForRows();

    expect(screen.getByRole("heading", { name: "User Management" })).toBeInTheDocument();
    expect(screen.getByText("envadmin@example.com")).toBeInTheDocument();
    expect(screen.getByText("normal@example.com")).toBeInTheDocument();
    // "GOD" also appears as a filter <option>; assert the row pill span.
    expect(screen.getByText("GOD", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("3 accounts - 2 superusers")).toBeInTheDocument();
  });

  it("protects the GOD account: expanding it offers no actions", async () => {
    renderPage();
    await waitForRows();

    fireEvent.click(screen.getByText("creativelead@malamutemayhem.com"));
    expect(await screen.findByText(/GOD account - protected/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /delete user/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /make superuser/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /suspend/i })).not.toBeInTheDocument();
  });

  it("explains that env superusers demote via ADMIN_EMAILS, not a button", async () => {
    renderPage();
    await waitForRows();

    fireEvent.click(screen.getByText("envadmin@example.com"));
    expect(await screen.findByText("Superuser via env")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /remove superuser/i })).not.toBeInTheDocument();
  });

  it("offers the full action set on a normal account, with typed-email delete", async () => {
    renderPage();
    await waitForRows();

    fireEvent.click(screen.getByText("normal@example.com"));
    expect(await screen.findByRole("button", { name: /make superuser/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /revoke keys/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^suspend$/i })).toBeInTheDocument();

    // Arm the delete: the confirm button stays disabled until the typed
    // email matches exactly.
    fireEvent.click(screen.getByRole("button", { name: /delete user/i }));
    const confirmInput = await screen.findByLabelText("Confirm email to delete");
    const deleteButton = screen.getByRole("button", { name: /delete forever/i });
    expect(deleteButton).toBeDisabled();

    fireEvent.change(confirmInput, { target: { value: "wrong@example.com" } });
    expect(deleteButton).toBeDisabled();

    fireEvent.change(confirmInput, { target: { value: "normal@example.com" } });
    expect(deleteButton).not.toBeDisabled();
  });

  it("filters rows by search query", async () => {
    renderPage();
    await waitForRows();

    fireEvent.change(screen.getByPlaceholderText(/search users/i), {
      target: { value: "normal" },
    });
    expect(screen.getByText("normal@example.com")).toBeInTheDocument();
    expect(screen.queryByText("envadmin@example.com")).not.toBeInTheDocument();
  });
});
