import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Index from "./Index";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/FadeIn", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true };
});

afterEach(cleanup);

describe("the live homepage (BubbleHome)", () => {
  it("renders the bubble headline and keeps the install path", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/One\s?bubble\./);
    expect(document.getElementById("install")).not.toBeNull();
  });

  it("speaks plainly: no internal product jargon on the homepage", () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    const main = container.querySelector("main");
    expect(main?.textContent ?? "").not.toMatch(/ScopeGate|Orchestrator|XGate|XPass/);
  });

  it("stays indexable: the live page never carries a noindex tag", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots).toBeNull();
  });
});
