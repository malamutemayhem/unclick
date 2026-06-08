import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import AdminAgentsPage from "./AdminAgents";
import {
  AI_SEAT_LOAD_OVERRIDE_STORAGE_KEY,
  buildSeatCapabilityNotes,
  buildSeatOverrideStoragePayload,
  buildSeatPerformanceScores,
  latestProfileCheckInAt,
  loadSeatOverridesFromStorage,
  mapProfilesToSeats,
  rankSeatsForRouting,
  profileMatchesSeat,
  unmatchedRecentProfiles,
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
    device: "Office laptop",
    status: "Ready",
    state: "Cycle-share capacity",
    load: 25,
    assigned: "General capacity",
    issue: "",
    routingPolicy: "auto",
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
    expect(screen.getByText("Performance monitor")).toBeInTheDocument();
    expect(screen.getByText("Cycle share")).toBeInTheDocument();
    expect(screen.getByText("Fungible mode")).toBeInTheDocument();
    expect(screen.queryByText("UnClick Workers")).not.toBeInTheDocument();
    expect(screen.queryByText("New Worker")).not.toBeInTheDocument();
    expect(screen.queryByText("Manual mode")).not.toBeInTheDocument();
    expect(screen.queryByText("Manual load")).not.toBeInTheDocument();
  });

  it("matches a live profile to a named physical seat", () => {
    expect(
      profileMatchesSeat(
        profile({ display_name: "Office laptop Codex" }),
        seat({ id: "office-laptop-seat", name: "Office laptop" }),
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

  it("keeps recent unmatched live seats visible beyond manual slots", () => {
    const windsurf = profile({
      agent_id: "cascade-windsurf-seat",
      display_name: "Cascade Windsurf",
      user_agent_hint: "windsurf/cascade",
      last_seen_at: "2026-05-09T10:54:57.440Z",
      current_status_updated_at: "2026-05-09T11:30:20.312Z",
    });
    const matched = profile({
      agent_id: "chatgpt-codex-worker2",
      last_seen_at: "2026-05-09T15:05:20.120Z",
    });

    expect(
      unmatchedRecentProfiles(
        [matched, windsurf],
        [matched],
        Date.parse("2026-05-09T15:10:00.000Z"),
      ).map((p) => p.agent_id),
    ).toEqual(["cascade-windsurf-seat"]);
  });

  it("persists load overrides and routing policy under the v1 storage key", () => {
    const payload = buildSeatOverrideStoragePayload([
      seat({ id: "seat-1", load: 77, routingPolicy: "prefer", assigned: "Build lane" }),
    ]);

    expect(Object.keys(payload)).toEqual(["seat-1"]);
    expect(payload["seat-1"].load).toBe(77);
    expect(payload["seat-1"].routingPolicy).toBe("prefer");
    expect(AI_SEAT_LOAD_OVERRIDE_STORAGE_KEY).toContain("load_overrides_v1");
  });

  it("loads sanitized v1 seat overrides before legacy manual slot data", () => {
    const storage = new Map<string, string>();
    const fakeStorage = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    };
    fakeStorage.setItem(
      AI_SEAT_LOAD_OVERRIDE_STORAGE_KEY,
      JSON.stringify({
        "seat-1": { load: 150, routingPolicy: "blocked", emoji: "🤖" },
      }),
    );

    const [loaded] = loadSeatOverridesFromStorage([seat({ emoji: "💻" })], fakeStorage);

    expect(loaded.load).toBe(100);
    expect(loaded.routingPolicy).toBe("blocked");
    expect(loaded.emoji).toBe("💻");
  });

  it("ranks routed seats by policy, live check-in, and load", () => {
    const now = Date.parse("2026-05-09T04:10:00.000Z");
    const ranked = rankSeatsForRouting(
      [
        seat({ id: "busy", name: "Busy", load: 90, routingPolicy: "auto" }),
        seat({ id: "preferred", name: "Preferred", load: 80, routingPolicy: "prefer" }),
        seat({ id: "blocked", name: "Blocked", load: 0, routingPolicy: "blocked" }),
      ],
      [profile({ agent_id: "preferred", display_name: "Preferred", last_seen_at: "2026-05-09T04:05:00.000Z" })],
      now,
    );

    expect(ranked.map((item) => item.id)).toEqual(["preferred", "busy"]);
  });

  it("scores seat performance from check-in freshness, missed tethers, load, and routing policy", () => {
    const now = Date.parse("2026-05-09T04:10:00.000Z");
    const scores = buildSeatPerformanceScores(
      [
        seat({ id: "live", name: "Live seat", load: 20, routingPolicy: "prefer" }),
        seat({ id: "missed", name: "Missed seat", load: 90, routingPolicy: "auto" }),
        seat({ id: "blocked", name: "Blocked seat", load: 10, routingPolicy: "blocked" }),
      ],
      [
        profile({
          agent_id: "live",
          display_name: "Live seat",
          last_seen_at: "2026-05-09T04:05:00.000Z",
          current_status: "Building one safe slice.",
        }),
        profile({
          agent_id: "missed",
          display_name: "Missed seat",
          last_seen_at: "2026-05-09T03:00:00.000Z",
          next_checkin_at: "2026-05-09T03:20:00.000Z",
        }),
      ],
      now,
    );

    expect(scores.map((item) => item.id)).toEqual(["live", "missed", "blocked"]);
    expect(scores[0].score).toBeGreaterThan(scores[1].score);
    expect(scores[1].reasons).toContain("missed check-in");
    expect(scores[2].status).toBe("blocked");
    expect(scores[2].reasons).toContain("blocked for routing");
  });

  it("builds deterministic seat capability notes for routing and reliability hints", () => {
    const now = Date.parse("2026-05-09T10:00:00.000Z");
    const notes = buildSeatCapabilityNotes(
      [
        seat({
          id: "codex-seat",
          name: "Codex Seat",
          provider: "Codex Desktop",
          routingPolicy: "auto",
          load: 20,
        }),
        seat({
          id: "claude-seat",
          name: "Claude Seat",
          provider: "Claude",
          routingPolicy: "auto",
          load: 35,
        }),
        seat({
          id: "windsurf-seat",
          name: "Windsurf Seat",
          provider: "Windsurf",
          isVirtual: true,
          routingPolicy: "auto",
          load: 10,
        }),
        seat({
          id: "blocked-seat",
          name: "Blocked Seat",
          provider: "Codex Desktop",
          routingPolicy: "blocked",
          load: 15,
        }),
      ],
      [
        profile({
          agent_id: "codex-seat",
          display_name: "Codex Seat",
          user_agent_hint: "codex-desktop",
          last_seen_at: "2026-05-09T09:55:00.000Z",
          current_status: "PASS: one safe slice is green.",
        }),
        profile({
          agent_id: "claude-seat",
          display_name: "Claude Seat",
          user_agent_hint: "claude-code",
          last_seen_at: "2026-05-09T07:30:00.000Z",
          next_checkin_at: "2026-05-09T08:00:00.000Z",
          current_status: "BLOCKER: waiting on decision",
        }),
        profile({
          agent_id: "windsurf-seat",
          display_name: "Windsurf Seat",
          user_agent_hint: "windsurf/cascade",
          last_seen_at: "2026-05-09T09:50:00.000Z",
        }),
        profile({
          agent_id: "blocked-seat",
          display_name: "Blocked Seat",
          user_agent_hint: "codex-desktop",
          last_seen_at: "2026-05-09T09:58:00.000Z",
          current_status: "PASS: still healthy",
        }),
        profile({
          agent_id: "github-action-queuepush",
          display_name: "QueuePush",
          user_agent_hint: "github-action",
          last_seen_at: "2026-05-09T09:59:00.000Z",
        }),
      ],
      now,
    );

    const codex = notes.find((item) => item.id === "codex-seat");
    expect(codex?.client).toBe("codex");
    expect(codex?.routingHint).toBe("build");
    expect(codex?.reliability).toBe("strong");

    const claude = notes.find((item) => item.id === "claude-seat");
    expect(claude?.client).toBe("claude");
    expect(claude?.routingHint).toBe("avoid");
    expect(claude?.reliability).toBe("risk");
    expect(claude?.notes).toContain("status reports blocker");

    const windsurf = notes.find((item) => item.id === "windsurf-seat");
    expect(windsurf?.client).toBe("windsurf");
    expect(windsurf?.routingHint).toBe("review");

    const blocked = notes.find((item) => item.id === "blocked-seat");
    expect(blocked?.routingHint).toBe("avoid");
    expect(blocked?.notes).toContain("blocked for routing");

    const queuepush = notes.find((item) => item.id === "github-action-queuepush");
    expect(queuepush?.source).toBe("live-profile");
    expect(queuepush?.client).toBe("github-action");
    expect(queuepush?.routingHint).toBe("observe");
  });
});
