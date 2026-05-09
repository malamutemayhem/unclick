import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import AdminAgentsPage from "./AdminAgents";
import {
  latestProfileCheckInAt,
  mapProfilesToSeats,
  profileMatchesSeat,
  type AISeat,
  type FishbowlProfile,
} from "./AdminAgentsSeatUtils";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null, user: null, loading: false }),
}));

function seat(patch: Partial<AISeat>): AISeat {
  return {
    id: "seat-1",
    name: "AI Seat 1",
    emoji: "💻",
    provider: "Codex Desktop",
    device: "Chris laptop",
    status: "Ready",
    state: "Manual slot",
    load: 25,
    assigned: "General capacity",
    issue: "",
    ...patch,
  };
}

function profile(patch: Partial<FishbowlProfile>): FishbowlProfile {
  return {
    agent_id: "chatgpt-codex-seat",
    emoji: "🤖",
    display_name: "ChatGPT Codex",
    user_agent_hint: "codex-desktop",
    created_at: "2026-05-09T00:00:00.000Z",
    last_seen_at: "2026-05-09T01:00:00.000Z",
    current_status: null,
    current_status_updated_at: null,
    next_checkin_at: null,
    ...patch,
  };
}

describe("AdminAgents seat check-ins", () => {
  it("shows Seats without the old Workers section", () => {
    render(React.createElement(AdminAgentsPage));

    expect(screen.getByRole("heading", { name: "Seats" })).toBeInTheDocument();
    expect(screen.getByText("AI Seats")).toBeInTheDocument();
    expect(screen.queryByText("UnClick Workers")).not.toBeInTheDocument();
    expect(screen.queryByText("New Worker")).not.toBeInTheDocument();
  });

  it("matches a live profile to a named physical seat", () => {
    expect(
      profileMatchesSeat(
        profile({ display_name: "Chris laptop Codex" }),
        seat({ id: "chris-laptop-seat", name: "Chris laptop" }),
      ),
    ).toBe(true);
  });

  it("falls back to recent profiles for physical seats but skips virtual fallback seats", () => {
    const profiles = [
      profile({ agent_id: "first-seat", last_seen_at: "2026-05-09T03:00:00.000Z" }),
      profile({ agent_id: "second-seat", last_seen_at: "2026-05-09T02:00:00.000Z" }),
    ];
    const mapped = mapProfilesToSeats(
      [
        seat({ id: "slot-a", name: "AI Seat 1", provider: "Unknown AI", device: "Unknown device" }),
        seat({ id: "slot-b", name: "AI Seat 2", provider: "Unknown AI", device: "Unknown device" }),
        seat({ id: "virtual", name: "Virtual review", provider: "Virtual", device: "Fallback", isVirtual: true }),
      ],
      profiles,
    );

    expect(mapped.get("slot-a")?.agent_id).toBe("first-seat");
    expect(mapped.get("slot-b")?.agent_id).toBe("second-seat");
    expect(mapped.has("virtual")).toBe(false);
  });

  it("uses status pulse time when a profile has not written last_seen_at", () => {
    expect(
      latestProfileCheckInAt(
        profile({
          last_seen_at: null,
          current_status_updated_at: "2026-05-09T04:00:00.000Z",
        }),
      ),
    ).toBe("2026-05-09T04:00:00.000Z");
  });
});
