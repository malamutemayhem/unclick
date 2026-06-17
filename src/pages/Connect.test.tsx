import { cleanup, render, screen } from "@testing-library/react";
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
});
