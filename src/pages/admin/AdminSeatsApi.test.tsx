import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdminSeatsApi from "./AdminSeatsApi";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "session-token" },
    user: { id: "user-1" },
    loading: false,
  }),
}));

function jsonResponse(body: unknown, status = 200) {
  return Promise.resolve(new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  }));
}

function credential(patch: Record<string, unknown>) {
  return {
    id: "cred-1",
    platform: "openai",
    label: null,
    is_valid: true,
    health_status: "healthy",
    last_tested_at: "2026-06-09T00:00:00.000Z",
    last_used_at: null,
    last_rotated_at: "2026-06-01T00:00:00.000Z",
    expires_at: null,
    created_at: "2026-06-01T00:00:00.000Z",
    updated_at: "2026-06-01T00:00:00.000Z",
    owner_email: "user@example.com",
    used_by: ["AI features"],
    expected_fields: [{ name: "api_key", label: "OpenAI API key", secret: true }],
    supports_connection_test: true,
    rotation_note: "Rotate from the provider, then retest.",
    connector: { id: "openai", name: "OpenAI", category: "AI", icon: null },
    ...patch,
  };
}

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminSeatsApi />
    </MemoryRouter>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("AdminSeatsApi", () => {
  it("shows only AI provider credentials from Passport", async () => {
    const fetchMock = vi.fn(() => jsonResponse({
      data: [
        credential({ platform: "openai", connector: { id: "openai", name: "OpenAI", category: "AI", icon: null } }),
        credential({ id: "github-1", platform: "github", connector: { id: "github", name: "GitHub", category: "Dev Tools", icon: null } }),
      ],
    }));
    vi.stubGlobal("fetch", fetchMock);

    renderPage();

    expect(await screen.findByText("OpenAI")).toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
    expect(screen.getByText("Active providers")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/backstagepass?action=list", {
      headers: { Authorization: "Bearer session-token" },
    });
  });

  it("reveals an AI provider key through BackstagePass", async () => {
    localStorage.setItem("unclick_api_key", "uc_test_key");
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("action=list")) return jsonResponse({ data: [credential({})] });
      if (url.includes("action=reveal")) return jsonResponse({ values: { api_key: "sk-test-value" } });
      return jsonResponse({ error: "unexpected" }, 500);
    });
    vi.stubGlobal("fetch", fetchMock);

    renderPage();

    await screen.findByText("OpenAI");
    fireEvent.click(screen.getByRole("button", { name: "Reveal values" }));

    expect(await screen.findByText("sk-t********alue")).toBeInTheDocument();
    const revealCall = fetchMock.mock.calls.find(([input]) => String(input).includes("action=reveal"));
    expect(revealCall?.[1]).toMatchObject({
      method: "POST",
      body: JSON.stringify({ id: "cred-1", api_key: "uc_test_key" }),
    });
  });

  it("adds an AI provider through BackstagePass add", async () => {
    localStorage.setItem("unclick_api_key", "uc_test_key");
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("action=list")) return jsonResponse({ data: [] });
      if (url.includes("action=add")) return jsonResponse({ id: "new-1", added: true }, 201);
      return jsonResponse({ error: "unexpected" }, 500);
    });
    vi.stubGlobal("fetch", fetchMock);

    renderPage();

    await screen.findByText("No AI provider API keys yet");
    fireEvent.click(screen.getAllByRole("button", { name: "Add provider" })[0]);

    const dialog = screen.getByRole("dialog", { name: "Add AI provider" });
    fireEvent.change(within(dialog).getByLabelText("Provider"), { target: { value: "openai" } });
    fireEvent.change(within(dialog).getByLabelText("API key"), { target: { value: "sk-new" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Add provider" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      "/api/backstagepass?action=add",
      expect.objectContaining({ method: "POST" }),
    ));
    const addCall = fetchMock.mock.calls.find(([input]) => String(input).includes("action=add"));
    expect(JSON.parse(String(addCall?.[1]?.body))).toEqual({
      platform: "openai",
      label: null,
      api_key: "uc_test_key",
      values: { api_key: "sk-new" },
    });
  });
});
