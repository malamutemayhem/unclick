import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import HomePreview from "./HomePreview";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/FadeIn", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

// Force the reduced-motion path so the page renders complete and the
// test never races the typing or scroll-linked animation.
vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true };
});

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/home-preview"]}>
      <HomePreview />
    </MemoryRouter>,
  );
}

describe("HomePreview", () => {
  it("keeps the brand headline and the install path", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Every tool\.\s*One install\./,
    );
    expect(screen.getAllByText("Get started").length).toBeGreaterThan(0);
    // The live install section ships unchanged on the preview.
    expect(document.getElementById("install")).not.toBeNull();
  });

  it("runs one ask through all five stations", () => {
    renderPage();
    expect(screen.getAllByText(/Chase that overdue invoice/).length).toBeGreaterThan(0);
    for (const headline of [
      "It already knows how you work.",
      "Nothing moves without a yes.",
      "Every app you already use.",
      "Every job leaves with a receipt.",
      "It queues the next one itself.",
    ]) {
      expect(screen.getByText(headline)).toBeInTheDocument();
    }
  });

  it("speaks plainly: no endpoint ids or internal product jargon in the run", () => {
    renderPage();
    const run = document.querySelector('[aria-label="One ask travelling the UnClick rails"]');
    const text = run?.textContent ?? "";
    expect(text).not.toMatch(/xero_invoices|email_send|post_message|_/);
    expect(text).not.toMatch(/XGate|XPass|ScopeGate|Orchestrator/i);
  });

  it("lands on the collective moat statement", () => {
    renderPage();
    expect(screen.getByText("Each piece is replaceable.")).toBeInTheDocument();
    expect(screen.getByText("The system isn't.")).toBeInTheDocument();
  });

  it("ships no invented latency or token claims in page copy", () => {
    const { container } = renderPage();
    expect(container.textContent).not.toMatch(/~[\d,]+ms|~[\d,]+ tokens/);
  });

  it("ships no pricing or free-tier talk of its own", () => {
    // The shared InstallSection and FAQ own their copy; this guards the
    // demo's own sections while the beta-neutral lane (#1453) is open.
    renderPage();
    const main = document.querySelector("main");
    const isShared = (el: Element) =>
      el.id === "install" ||
      el.id === "faq" ||
      el.querySelector("#install") !== null ||
      el.querySelector("#faq") !== null;
    const ownSections = Array.from(main?.children ?? []).filter((el) => !isShared(el));
    const text = ownSections.map((el) => el.textContent ?? "").join(" ");
    expect(text).not.toMatch(/free|credit card|pricing plan/i);
  });

  it("marks the preview noindex while it is a design sample", () => {
    renderPage();
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("noindex");
  });
});
