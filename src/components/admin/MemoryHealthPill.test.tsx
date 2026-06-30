import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MemoryHealthPill from "./MemoryHealthPill";

const mockUseSession = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  useSession: () => mockUseSession(),
}));

function okHealth() {
  return {
    ok: true,
    json: async () => ({
      connected: true,
      configured: true,
      has_context: true,
      context_count: 10,
      fact_count: 20,
      last_session: "2026-06-30T00:00:00.000Z",
      last_used_at: null,
    }),
  };
}

describe("MemoryHealthPill", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okHealth()));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("uses the signed-in session before a stale browser API key", async () => {
    window.localStorage.setItem("unclick_api_key", "uc_stale_other_account");
    mockUseSession.mockReturnValue({
      session: { access_token: "current-session-token" },
      user: { email: "creativelead@malamutemayhem.com" },
      loading: false,
    });

    render(<MemoryHealthPill />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/memory-admin?action=admin_check_connection", {
        headers: { Authorization: "Bearer current-session-token" },
      });
    });
  });

  it("falls back to the stored API key when there is no signed-in session", async () => {
    window.localStorage.setItem("unclick_api_key", "uc_saved_key");
    mockUseSession.mockReturnValue({
      session: null,
      user: null,
      loading: false,
    });

    render(<MemoryHealthPill />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/memory-admin?action=admin_check_connection&api_key=uc_saved_key",
      );
    });
  });
});
