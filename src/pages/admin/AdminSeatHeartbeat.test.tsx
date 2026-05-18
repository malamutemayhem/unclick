import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import AdminSeatHeartbeatPage, {
  buildHeartbeatSchedulePrompt,
  HEARTBEAT_CONNECTION_PROMPT,
  HEARTBEAT_SOURCE_OF_TRUTH,
} from "./AdminSeatHeartbeat";

describe("AdminSeatHeartbeatPage", () => {
  it("shows one scheduler copy area and a discreet policy transparency area", () => {
    render(React.createElement(AdminSeatHeartbeatPage));

    expect(screen.getByRole("heading", { name: "Heartbeat Master" })).toBeInTheDocument();
    expect(screen.getByText("❤️ UnClick Heartbeat")).toBeInTheDocument();
    expect(screen.getByText("Policy transparency")).toBeInTheDocument();
    expect(screen.getByText("This is not copy-paste text. It explains why the small scheduler copy above is enough.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Public default heartbeat policy")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Base schedule message")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Heartbeat cadence")).toHaveValue("7");
    expect(screen.getByLabelText("Heartbeat schedule message preview")).toHaveValue(
      buildHeartbeatSchedulePrompt("7"),
    );
    expect(HEARTBEAT_SOURCE_OF_TRUTH).toHaveLength(4);
    expect(HEARTBEAT_CONNECTION_PROMPT).toContain("scheduled heartbeat seat");
    expect(HEARTBEAT_CONNECTION_PROMPT).toContain("heartbeat_protocol first");
    expect(HEARTBEAT_CONNECTION_PROMPT).toContain("commonsensepass_protocol");
    expect(HEARTBEAT_CONNECTION_PROMPT).toContain("unclick-heartbeat-seat");
    expect(HEARTBEAT_CONNECTION_PROMPT).toContain("stay quiet for routine healthy checks");
    expect(HEARTBEAT_CONNECTION_PROMPT.length).toBeLessThan(700);
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
    const prompt = buildHeartbeatSchedulePrompt("7");

    expect(prompt).toContain("Schedule ❤️ UnClick Heartbeat every 7 min");
    expect(prompt).not.toMatch(/Bearer\s+[A-Za-z0-9._-]+/i);
    expect(prompt).not.toMatch(/sk-[A-Za-z0-9]{20,}/i);
    expect(prompt).not.toMatch(/[A-Za-z0-9+/]{32,}={0,2}/);
    expect(prompt).not.toMatch(/ignore (all )?(previous|prior) instructions/i);
    expect(prompt).not.toMatch(/developer mode|jailbreak/i);
  });
});
