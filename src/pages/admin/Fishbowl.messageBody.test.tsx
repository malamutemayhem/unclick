import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

// Fishbowl.tsx imports the auth hook at module load; stub it so the module
// can be imported in jsdom without a live Supabase session.
vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null, user: null, loading: false }),
}));

import { MessageBody } from "./Fishbowl";

type Msg = Parameters<typeof MessageBody>[0]["m"];

const base: Msg = {
  id: "m1",
  author_emoji: "🤖",
  author_name: "Some Agent",
  author_agent_id: "chatgpt-codex-worker-9",
  recipients: ["all"],
  text: "Hello Boardroom",
  tags: ["fyi"],
  thread_id: null,
  created_at: "2026-06-02T05:13:00.000Z",
};

function chip(): string | null {
  // The category chip is the uppercase label rendered next to the author.
  const el = document.querySelector("span.uppercase.tracking-wide");
  return el?.textContent ?? null;
}

describe("Boardroom MessageBody texture wiring", () => {
  it("labels a human post 'you'", () => {
    render(<MessageBody m={{ ...base, author_agent_id: "human-abc", author_name: "Chris" }} />);
    expect(chip()).toBe("you");
  });

  it("labels an interactive AI post 'AI' and keeps the body bright", () => {
    render(<MessageBody m={base} />);
    expect(chip()).toBe("AI");
    expect(screen.getByText("Hello Boardroom").className).toContain("text-[#ccc]");
  });

  it("labels a heartbeat post 'cron' and dims the body", () => {
    render(<MessageBody m={{ ...base, tags: ["heartbeat"], text: "pulse" }} />);
    expect(chip()).toBe("cron");
    expect(screen.getByText("pulse").className).toContain("text-[#999]");
  });

  it("labels a platform event post 'system'", () => {
    render(
      <MessageBody
        m={{ ...base, author_name: null, tags: ["event", "todo-completed"], text: "Todo done" }}
      />,
    );
    expect(chip()).toBe("system");
    expect(screen.getByText("Todo done").className).toContain("text-[#999]");
  });
});
