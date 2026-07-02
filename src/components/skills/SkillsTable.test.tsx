import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SkillsTable } from "./SkillsTable";
import { parseSkillMarkdown, type SkillPackage } from "@/lib/skillLibrary";

const RECOMMENDED = parseSkillMarkdown(`---
name: Coordinator router
slug: coordinator-router
version: 1.0.0
description: Routes a request to the right worker lane.
category: agent-orchestration
tags: [routing]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick rail.
unclick_usefulness: 5
unclick_native: hardwired
required_worker_roles: [Coordinator]
required_mcp_tools: []
required_apps: []
---

# Coordinator router

Route the work and refuse to mark done without proof.
`);

const OPTIONAL = parseSkillMarkdown(`---
name: Deep research analyst
slug: deep-research-analyst
version: 1.0.0
description: Runs a deeper research pass across sources.
category: research
tags: [research]
safety_level: safe
source_kind: original
source_license: UnClick original
reuse: Original UnClick workflow.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Researcher]
required_mcp_tools: [web.search]
required_apps: []
---

# Deep research analyst

Gather primary sources and compare conflicting claims.
`);

const SKILLS: SkillPackage[] = [RECOMMENDED, OPTIONAL];

function rowOf(name: string): HTMLElement {
  return screen.getByText(name).closest('[role="button"]') as HTMLElement;
}

afterEach(cleanup);

describe("SkillsTable", () => {
  it("groups skills into Recommended and Optional (no hardwired/hybrid jargon)", () => {
    render(<SkillsTable skills={SKILLS} />);
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getByText("Optional")).toBeInTheDocument();
    expect(screen.getByText("Coordinator router")).toBeInTheDocument();
    expect(screen.getByText("Deep research analyst")).toBeInTheDocument();
    // The old mode taxonomy must not leak into the UI.
    expect(screen.queryByText("Hardwire")).not.toBeInTheDocument();
    expect(screen.queryByText("Hybrid")).not.toBeInTheDocument();
  });

  it("searches across names and bodies", () => {
    render(<SkillsTable skills={SKILLS} />);
    fireEvent.change(screen.getByLabelText("Search skills"), { target: { value: "conflicting claims" } });
    expect(screen.getByText("Deep research analyst")).toBeInTheDocument();
    expect(screen.queryByText("Coordinator router")).not.toBeInTheDocument();
  });

  it("filters by category chip", () => {
    render(<SkillsTable skills={SKILLS} />);
    fireEvent.click(screen.getByRole("button", { name: "Research" }));
    expect(screen.getByText("Deep research analyst")).toBeInTheDocument();
    expect(screen.queryByText("Coordinator router")).not.toBeInTheDocument();
  });

  it("fires per-skill and bulk toggle callbacks (all on by default)", () => {
    const onToggle = vi.fn();
    const onToggleAll = vi.fn();
    render(
      <SkillsTable
        skills={SKILLS}
        enabled={{ "coordinator-router": false }}
        onToggle={onToggle}
        onToggleAll={onToggleAll}
      />,
    );
    // Coordinator off in props -> "Turn ... on"; research on -> "Turn ... off".
    expect(screen.getByLabelText("Turn Coordinator router on")).toBeInTheDocument();
    expect(screen.getByLabelText("Turn Deep research analyst off")).toBeInTheDocument();

    fireEvent.click(within(rowOf("Coordinator router")).getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith("coordinator-router", true);

    fireEvent.click(screen.getByRole("button", { name: /turn all off/i }));
    expect(onToggleAll).toHaveBeenCalledWith(false);
  });

  it("expands a row to reveal the SKILL.md and copies it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<SkillsTable skills={SKILLS} />);
    fireEvent.click(rowOf("Coordinator router"));

    expect(screen.getByText("SKILL.md")).toBeInTheDocument();
    expect(screen.getByText(/Route the work and refuse to mark done without proof/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("slug: coordinator-router"));
  });

  it("reveals provenance and hash only behind Show details", () => {
    render(<SkillsTable skills={SKILLS} />);
    fireEvent.click(rowOf("Coordinator router"));
    expect(screen.queryByText("Provenance")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Show skill details"));
    expect(screen.getByText("Provenance")).toBeInTheDocument();
    expect(screen.getByText(/^skill-fnv1a-/)).toBeInTheDocument();
  });
});
