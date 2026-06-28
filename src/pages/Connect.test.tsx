import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Connect from "./Connect";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav>Navbar</nav>,
}));

vi.mock("@/components/Footer", () => ({
  default: () => <footer>Footer</footer>,
}));

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/connect/:platform" element={<Connect />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  localStorage.setItem("unclick_api_key", "uc_test_account_key");
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe("Connect page OAuth-first app setup", () => {
  it("shows Vercel login as the primary action and hides token save by default", () => {
    renderAt("/connect/vercel");

    expect(screen.getByText("Account login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue to Vercel login" })).toBeInTheDocument();
    expect(screen.getByText("Use a token instead")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Save credentials" })).not.toBeInTheDocument();
  });

  it("shows Supabase as OAuth login setup, not a missing app", () => {
    renderAt("/connect/supabase");

    expect(screen.getByRole("heading", { name: "Connect Supabase" })).toBeInTheDocument();
    expect(screen.getByText("Account login")).toBeInTheDocument();
    expect(screen.getByText("Sign in with Supabase")).toBeInTheDocument();
    expect(screen.getByText("Use a token instead")).toBeInTheDocument();
  });

  it("shows Google Drive login as the primary action", () => {
    renderAt("/connect/google-drive");

    expect(screen.getByRole("heading", { name: "Connect Google Drive" })).toBeInTheDocument();
    expect(screen.getByText("Account login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue to Google Drive login" })).toBeInTheDocument();
    expect(screen.getByText("Use a token instead")).toBeInTheDocument();
  });

  it("keeps the token fallback visible when Supabase login setup is pending", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({
      error: "Supabase login is not switched on yet.",
      setup_pending: true,
      provider: "supabase",
      missing: "client_id",
      missing_fields: ["client_id", "client_secret"],
    }), { status: 503, headers: { "Content-Type": "application/json" } })));

    renderAt("/connect/supabase");
    fireEvent.click(screen.getByRole("button", { name: "Continue to Supabase login" }));

    await waitFor(() => {
      expect(screen.getByText(/missing client ID and client secret/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole("heading", { name: "Connection failed" })).not.toBeInTheDocument();
    expect(screen.getByText("Use a token instead")).toBeInTheDocument();
  });
});
