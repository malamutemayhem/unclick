import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import MemoryActivityTab from "./MemoryActivityTab";

type ActivityResponse = ReturnType<typeof makeActivity>;

function makeActivity(topFactCount: number) {
  const topFacts = Array.from({ length: topFactCount }, (_, index) => ({
    id: `fact-${index + 1}`,
    fact: `fact ${index + 1}`,
    category: "technical",
    access_count: topFactCount - index,
    decay_tier: "hot",
    recall_signal: "top-of-mind",
    recall_note: "Human-facing recall",
  }));

  return {
    facts_by_day: {},
    storage: {
      business_context: 0,
      knowledge_library: 0,
      session_summaries: 0,
      extracted_facts: topFactCount,
      conversation_log: 0,
      code_dumps: 0,
      total: topFactCount,
    },
    recent_decay: [],
    recall_diagnostics: {
      inspected_top_facts: topFactCount,
      inspected_top_of_mind_candidates: topFactCount,
      background_heavy_count: 0,
      background_heavy_candidate_count: 0,
    },
    top_of_mind_facts: topFacts.slice(0, 10),
    top_facts: topFacts,
  };
}

describe("MemoryActivityTab", () => {
  const fetchCalls: string[] = [];
  let activityFactory: (topFactCount: number) => ActivityResponse = makeActivity;

  beforeEach(() => {
    fetchCalls.length = 0;
    activityFactory = makeActivity;
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        fetchCalls.push(url);
        const topFactCount = url.includes("top_facts_limit=110") ? 110 : 10;

        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(activityFactory(topFactCount)),
        });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("loads more accessed facts on request", async () => {
    render(<MemoryActivityTab apiKey="test-token" />);

    await screen.findByText("Most Accessed Facts");

    expect(fetchCalls[0]).toContain("top_facts_limit=10");
    expect(screen.getAllByText("fact 10").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /Show 100 more/i }));

    await waitFor(() => {
      expect(fetchCalls.some((url) => url.includes("top_facts_limit=110"))).toBe(true);
    });
    expect(await screen.findByText("fact 110")).toBeInTheDocument();
  });

  it("separates top of mind facts from background-heavy access counts", async () => {
    activityFactory = () => {
      const backgroundFact = {
        id: "static-profile",
        fact: "User prefers concise worker updates",
        category: "preference",
        access_count: 2080,
        decay_tier: "hot",
        recall_signal: "background-heavy",
        recall_note: "Startup or heartbeat reads",
      };
      const activeFact = {
        id: "active-project",
        fact: "PR #898 added the Recall Check see more path",
        category: "technical",
        access_count: 42,
        decay_tier: "hot",
        recall_signal: "top-of-mind",
        recall_note: "Human-facing recall",
      };

      return {
        ...makeActivity(2),
        recall_diagnostics: {
          inspected_top_facts: 2,
          inspected_top_of_mind_candidates: 2,
          background_heavy_count: 1,
          background_heavy_candidate_count: 1,
        },
        top_of_mind_facts: [activeFact],
        top_facts: [backgroundFact, activeFact],
      };
    };

    render(<MemoryActivityTab apiKey="test-token" />);

    await screen.findByText("Top of Mind");

    expect(screen.getAllByText("PR #898 added the Recall Check see more path").length).toBeGreaterThan(0);
    expect(screen.getByText("Background-heavy")).toBeInTheDocument();
    expect(screen.getByText("Startup or heartbeat reads")).toBeInTheDocument();
  });

  it("keeps Top of Mind useful when raw Most Accessed is all background-heavy", async () => {
    activityFactory = () => {
      const backgroundFacts = Array.from({ length: 10 }, (_, index) => ({
        id: `static-profile-${index + 1}`,
        fact: `User profile preference ${index + 1}`,
        category: "preference",
        access_count: 2080 - index,
        decay_tier: "hot",
        recall_signal: "background-heavy" as const,
        recall_note: "Startup or heartbeat reads",
      }));
      const activeFact = {
        id: "active-project",
        fact: "PR #997 made FidelityCopy receipts green",
        category: "technical",
        access_count: 42,
        decay_tier: "hot",
        recall_signal: "top-of-mind" as const,
        recall_note: "Human-facing recall",
      };

      return {
        ...makeActivity(10),
        recall_diagnostics: {
          inspected_top_facts: 10,
          inspected_top_of_mind_candidates: 11,
          background_heavy_count: 10,
          background_heavy_candidate_count: 10,
        },
        top_of_mind_facts: [activeFact],
        top_facts: backgroundFacts,
      };
    };

    render(<MemoryActivityTab apiKey="test-token" />);

    await screen.findByText("Top of Mind");

    expect(screen.getByText("PR #997 made FidelityCopy receipts green")).toBeInTheDocument();
    expect(screen.getAllByText("Background-heavy")).toHaveLength(10);
  });

  it("labels zero-count facts as new instead of showing misleading 0x counters", async () => {
    activityFactory = () => {
      const zeroFact = {
        id: "fresh-memory",
        fact: "Fresh saved fact has not been searched yet",
        category: "technical",
        access_count: 0,
        decay_tier: "hot",
        recall_signal: "top-of-mind" as const,
        recall_note: "Human-facing recall",
      };

      return {
        ...makeActivity(1),
        recall_diagnostics: {
          inspected_top_facts: 1,
          inspected_top_of_mind_candidates: 1,
          background_heavy_count: 0,
          background_heavy_candidate_count: 0,
          zero_access_count: 1,
          zero_access_candidate_count: 1,
        },
        top_of_mind_facts: [zeroFact],
        top_facts: [zeroFact],
      };
    };

    render(<MemoryActivityTab apiKey="test-token" />);

    await screen.findByText("Recall Counter Meaning");

    expect(screen.getByText("Current sample: 1 of 1 most-accessed facts have no targeted recall count yet.")).toBeInTheDocument();
    expect(screen.getAllByText("new").length).toBeGreaterThan(0);
    expect(screen.queryByText("0x")).not.toBeInTheDocument();
  });
});
