import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import AdminSeatHeartbeatPage, {
  buildHeartbeatSchedulePrompt,
  HEARTBEAT_MASTER_PROMPT,
  HEARTBEAT_SHORTCUT_PROMPT,
  HEARTBEAT_SOURCE_OF_TRUTH,
} from "./AdminSeatHeartbeat";

describe("AdminSeatHeartbeatPage", () => {
  it("shows one scheduler copy area and a discreet policy transparency area", () => {
    render(React.createElement(AdminSeatHeartbeatPage));

    expect(screen.getByRole("heading", { name: "Heartbeat Master" })).toBeInTheDocument();
    expect(screen.getByText("❤️ UnClick Heartbeat")).toBeInTheDocument();
    expect(screen.getByText("MASTER induction")).toBeInTheDocument();
    expect(screen.getByText("This is the runtime policy an AI seat reads after the shortcut opens the door.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Public default heartbeat policy")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Base schedule message")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Heartbeat cadence")).toHaveValue("10");
    expect(screen.getByLabelText("Heartbeat schedule message preview")).toHaveValue(
      buildHeartbeatSchedulePrompt("10"),
    );
    expect(screen.getByLabelText("Heartbeat MASTER induction")).toHaveValue(HEARTBEAT_MASTER_PROMPT);
    expect(HEARTBEAT_SOURCE_OF_TRUTH).toHaveLength(4);
    expect(HEARTBEAT_SHORTCUT_PROMPT).toContain("https://unclick.world/admin/agents/heartbeat");
    expect(HEARTBEAT_SHORTCUT_PROMPT).toContain("unclick-builder-tether-seat");
    expect(HEARTBEAT_SHORTCUT_PROMPT).not.toContain("Do not build");
    expect(HEARTBEAT_SHORTCUT_PROMPT.length).toBeLessThan(220);
    expect(HEARTBEAT_MASTER_PROMPT).toContain("builder-capable tether");
    expect(HEARTBEAT_MASTER_PROMPT).toContain("Boardroom Jobs are the work source");
    expect(HEARTBEAT_MASTER_PROMPT).toContain("NudgeOnly is not the executor");
    expect(HEARTBEAT_MASTER_PROMPT).toContain("do not stop there");
    expect(HEARTBEAT_MASTER_PROMPT).toContain("JobSmith is a separate CV and cover-letter tool");
  });

  it("updates the schedule message when cadence changes", () => {
    render(React.createElement(AdminSeatHeartbeatPage));

    fireEvent.change(screen.getByLabelText("Heartbeat cadence"), { target: { value: "30" } });

    expect(screen.getByLabelText("Heartbeat schedule message preview")).toHaveValue(
      buildHeartbeatSchedulePrompt("30"),
    );
    const preview = screen.getByLabelText("Heartbeat schedule message preview") as HTMLTextAreaElement;
    expect(preview.value).toContain("every 30 min");
  });

  it("keeps copied schedule text free of secret-shaped values and role override phrasing", () => {
    const prompt = buildHeartbeatSchedulePrompt("10");

    expect(prompt).toContain("Schedule ❤️ UnClick Action Heartbeat every 10 min");
    expect(prompt).toContain("Load MASTER from https://unclick.world/admin/agents/heartbeat");
    expect(prompt).not.toContain("Do not build");
    expect(prompt).not.toContain("unclick-heartbeat-seat");
    expect(prompt).not.toMatch(/Bearer\s+[A-Za-z0-9._-]+/i);
    expect(prompt).not.toMatch(/sk-[A-Za-z0-9]{20,}/i);
    expect(prompt).not.toMatch(/[A-Za-z0-9+/]{32,}={0,2}/);
    expect(prompt).not.toMatch(/ignore (all )?(previous|prior) instructions/i);
    expect(prompt).not.toMatch(/developer mode|jailbreak/i);
  });
});
