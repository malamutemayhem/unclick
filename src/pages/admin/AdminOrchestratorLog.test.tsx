import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminOrchestratorLog from "./AdminOrchestratorLog";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "session-token" },
    user: { id: "user-1" },
    loading: false,
  }),
}));

const logPayload = {
  generated_at: "2026-06-10T12:00:00.000Z",
  schema_version: 1,
  query: null,
  limit: 120,
  include_raw: false,
  visibility: {
    access: "Private to the signed-in owner or a holder of this tenant's UnClick API key.",
    screen_preview: "On-screen previews redact secret-shaped values and billing-like numbers.",
    download: "Call with include_raw=1 to download loaded source rows.",
    storage: "Current records live in tenant-scoped Supabase tables.",
  },
  source_counts: {
    conversation_turn: 1,
  },
  records: [
    {
      source_kind: "conversation_turn",
      source_id: "turn-1",
      created_at: "2026-06-10T11:58:00.000Z",
      label: "user conversation turn",
      visibility: "private",
      storage: "supabase_postgres",
      preview: "Chris asked to download the raw log.",
    },
  ],
};

describe("AdminOrchestratorLog", () => {
  beforeEach(() => {
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      json: async () => logPayload,
    })));
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:log"),
      revokeObjectURL: vi.fn(),
    });
  });

  it("shows owner visibility and downloads the raw log bundle", async () => {
    render(<AdminOrchestratorLog />);

    expect(await screen.findByText("Log")).toBeInTheDocument();
    expect(screen.getByText(/Private to the signed-in owner/i)).toBeInTheDocument();
    expect(screen.getByText("Chris asked to download the raw log.")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Download JSON"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("include_raw=1"),
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: "Bearer session-token" }),
        }),
      );
    });
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:log");
  });
});
