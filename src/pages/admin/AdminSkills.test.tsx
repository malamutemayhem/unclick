import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdminSkills from "./AdminSkills";

describe("AdminSkills", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders the starter pack with hardwired, hybrid, and optional skill boundaries", () => {
    render(<AdminSkills />);

    expect(screen.getByRole("heading", { name: "Skills Library" })).toBeInTheDocument();
    expect(screen.getByText("UnClick-native starter pack")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Coordinator router/i })).toBeInTheDocument();
    expect(screen.getAllByText("Hardwire").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Hybrid").length).toBeGreaterThan(0);
    expect(screen.getByText(/Skill text is never a permission grant/i)).toBeInTheDocument();
  });

  it("filters skills by search text and category", () => {
    render(<AdminSkills />);

    fireEvent.change(screen.getByLabelText("Search Skills"), { target: { value: "failed ci" } });
    expect(screen.getByRole("button", { name: /Fix failing CI/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Coordinator router/i })).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search Skills"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Category"), { target: { value: "research" } });
    expect(screen.getByRole("button", { name: /Research brief generator/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Deep research analyst/i })).toBeInTheDocument();
  });

  it("copies the selected SKILL.md body", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<AdminSkills />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("slug: coordinator-router"));
  });
});
