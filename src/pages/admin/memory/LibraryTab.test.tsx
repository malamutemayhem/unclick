import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LibraryTab from "./LibraryTab";

function jsonResponse(body: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  } as Response);
}

const docs = [
  {
    id: "doc-product",
    slug: "memory-taxonomy-07-projects-and-products",
    title: "Projects memory snapshot",
    category: "07 Projects & Products",
    tags: ["source:fact", "roadmap"],
    version: 2,
    updated_at: "2026-05-14T03:00:00.000Z",
    decay_tier: "warm",
  },
  {
    id: "doc-memory",
    slug: "memory-taxonomy-15-data-and-memory",
    title: "Data memory snapshot",
    category: "15 Data & Memory",
    tags: ["source:session"],
    version: 1,
    updated_at: "2026-05-14T02:00:00.000Z",
    decay_tier: "hot",
  },
  {
    id: "doc-product-older",
    slug: "project-follow-up",
    title: "Project follow-up",
    category: "07 Projects & Products",
    tags: ["source:session"],
    version: 1,
    updated_at: "2026-05-14T01:00:00.000Z",
    decay_tier: "cold",
  },
];

describe("LibraryTab", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("method=list")) return jsonResponse({ data: docs });
        if (url.includes("method=view")) return jsonResponse({ data: { content: "Sources: fact:doc-memory" } });
        if (url.includes("method=history")) return jsonResponse({ data: [] });
        return jsonResponse({});
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders existing library docs under deterministic taxonomy shelves", async () => {
    render(React.createElement(LibraryTab, { apiKey: "test-key" }));

    await screen.findByText("07 Projects & Products");

    expect(screen.getByText("15 Data & Memory")).toBeInTheDocument();
    expect(screen.getByText("Projects memory snapshot")).toBeInTheDocument();
    expect(screen.getByText("Project follow-up")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /07 Projects & Products/i }));

    await waitFor(() => {
      expect(screen.queryByText("Projects memory snapshot")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Data memory snapshot")).toBeInTheDocument();
  });

  it("previews a snapshot refresh as a dry-run, then commits writes only after explicit Apply", async () => {
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        requests.push({ url, init });
        if (url.includes("method=list")) return jsonResponse({ data: docs });
        if (url.includes("method=refresh")) {
          const body = JSON.parse((init?.body as string) ?? "{}");
          if (body.commit === true) {
            return jsonResponse({
              data: {
                dry_run: false,
                commit: true,
                source_count: 4,
                snapshot_count: 3,
                written_count: 3,
                fact_count: 3,
                session_count: 1,
              },
            });
          }
          return jsonResponse({
            data: {
              dry_run: true,
              commit: false,
              source_count: 4,
              snapshot_count: 3,
              written_count: 0,
              fact_count: 3,
              session_count: 1,
            },
          });
        }
        return jsonResponse({});
      }),
    );

    render(React.createElement(LibraryTab, { apiKey: "test-key" }));
    await screen.findByText("07 Projects & Products");

    fireEvent.click(screen.getByRole("button", { name: /Preview snapshot refresh/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Plan: 3 snapshots from 3 facts, 1 sessions \(dry run\)/i)
      ).toBeInTheDocument();
    });

    const refreshCallsBeforeApply = requests.filter((r) => r.url.includes("method=refresh"));
    expect(refreshCallsBeforeApply).toHaveLength(1);
    const previewBody = JSON.parse((refreshCallsBeforeApply[0].init?.body as string) ?? "{}");
    expect(previewBody.commit).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: /Apply refresh to Library/i }));

    await waitFor(() => {
      const commitCalls = requests.filter(
        (r) => r.url.includes("method=refresh") && JSON.parse((r.init?.body as string) ?? "{}").commit === true,
      );
      expect(commitCalls).toHaveLength(1);
    });
  });
});
