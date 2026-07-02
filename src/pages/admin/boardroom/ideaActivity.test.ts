import { describe, expect, it } from "vitest";
import {
  IDEA_STALE_AFTER_MS,
  ageLabel,
  ideaBucket,
  partitionIdeas,
  type IdeaActivity,
  type IdeaStatus,
} from "./ideaActivity";

const NOW = Date.parse("2026-06-02T00:00:00Z");

const daysAgo = (n: number) => new Date(NOW - n * 24 * 60 * 60 * 1000).toISOString();

const idea = (status: IdeaStatus, updatedDaysAgo: number): IdeaActivity => ({
  status,
  created_at: daysAgo(updatedDaysAgo + 1),
  updated_at: daysAgo(updatedDaysAgo),
});

describe("idea activity buckets", () => {
  it("keeps recently touched open ideas active", () => {
    expect(ideaBucket(idea("proposed", 1), NOW)).toBe("active");
    expect(ideaBucket(idea("voting", 5), NOW)).toBe("active");
  });

  it("marks open ideas that have gone quiet as stale", () => {
    expect(ideaBucket(idea("proposed", 22), NOW)).toBe("stale");
    expect(ideaBucket(idea("voting", 60), NOW)).toBe("stale");
  });

  it("treats locked, parked, and rejected ideas as resolved regardless of age", () => {
    expect(ideaBucket(idea("locked", 1), NOW)).toBe("resolved");
    expect(ideaBucket(idea("parked", 100), NOW)).toBe("resolved");
    expect(ideaBucket(idea("rejected", 0), NOW)).toBe("resolved");
  });

  it("uses a three-week staleness boundary", () => {
    const justInside = new Date(NOW - IDEA_STALE_AFTER_MS + 1000).toISOString();
    const justOutside = new Date(NOW - IDEA_STALE_AFTER_MS - 1000).toISOString();
    expect(ideaBucket({ status: "voting", created_at: justInside, updated_at: justInside }, NOW)).toBe(
      "active",
    );
    expect(
      ideaBucket({ status: "voting", created_at: justOutside, updated_at: justOutside }, NOW),
    ).toBe("stale");
  });

  it("partitions a mixed list into the three buckets", () => {
    const ideas = [
      idea("voting", 2), // active
      idea("proposed", 40), // stale
      idea("locked", 3), // resolved
      idea("rejected", 90), // resolved
    ];
    const parts = partitionIdeas(ideas, NOW);
    expect(parts.active).toHaveLength(1);
    expect(parts.stale).toHaveLength(1);
    expect(parts.resolved).toHaveLength(2);
  });
});

describe("ageLabel", () => {
  it("renders plain-English relative ages", () => {
    expect(ageLabel(daysAgo(0), NOW)).toBe("just now");
    expect(ageLabel(new Date(NOW - 5 * 60 * 1000).toISOString(), NOW)).toBe("5m ago");
    expect(ageLabel(new Date(NOW - 3 * 60 * 60 * 1000).toISOString(), NOW)).toBe("3h ago");
    expect(ageLabel(daysAgo(4), NOW)).toBe("4d ago");
    expect(ageLabel(daysAgo(45), NOW)).toBe("1mo ago");
    expect(ageLabel(daysAgo(800), NOW)).toBe("2y ago");
  });

  it("returns an empty string for missing or invalid input", () => {
    expect(ageLabel(null, NOW)).toBe("");
    expect(ageLabel("not-a-date", NOW)).toBe("");
  });
});
