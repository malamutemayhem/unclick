import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AdminSkills from "./AdminSkills";

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminSkills />
    </MemoryRouter>,
  );
}

function rowOf(name: string): HTMLElement {
  return screen.getByText(name).closest('[role="button"]') as HTMLElement;
}

describe("AdminSkills", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders the Apps-style header, intro, and the recommended grouping", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByText(/playbooks your agents can run/i)).toBeInTheDocument();
    expect(screen.getByText(/never a permission grant/i)).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getByText("Optional")).toBeInTheDocument();
    expect(screen.getByText("Coordinator router")).toBeInTheDocument();
  });

  it("expands a skill row to show its SKILL.md text", () => {
    renderPage();
    fireEvent.click(rowOf("Coordinator router"));
    expect(screen.getByText("SKILL.md")).toBeInTheDocument();
    expect(screen.getByText(/Declare the source of truth before execution/i)).toBeInTheDocument();
  });

  it("turns a skill off and persists the choice to localStorage", () => {
    renderPage();
    // All on by default.
    const off = screen.getByLabelText("Turn Coordinator router off");
    fireEvent.click(off);
    // Now reads as on-able, and the disabled set is saved.
    expect(screen.getByLabelText("Turn Coordinator router on")).toBeInTheDocument();
    expect(window.localStorage.getItem("unclick.skills.disabled.v1")).toContain("coordinator-router");
  });

  it("turns all skills off from the bulk control", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /turn all off/i }));
    expect(screen.getByLabelText("Turn Coordinator router on")).toBeInTheDocument();
  });

  it("copies the selected SKILL.md body", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    renderPage();
    fireEvent.click(rowOf("Coordinator router"));
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("slug: coordinator-router"));
  });
});
