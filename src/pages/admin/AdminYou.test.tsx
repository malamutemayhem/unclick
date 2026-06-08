import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AdminYou from "./AdminYou";

vi.mock("@/lib/auth", () => {
  const session = { access_token: "test-session-token" };
  const user = {
    email: "owner@example.com",
    created_at: "2026-01-01T00:00:00.000Z",
    app_metadata: { provider: "email" },
  };

  return {
    useSession: () => ({
      session,
      user,
      loading: false,
    }),
    signOut: vi.fn(),
  };
});

function renderPage() {
  render(
    <MemoryRouter initialEntries={["/admin/you"]}>
      <AdminYou />
    </MemoryRouter>,
  );
}

function stubFetch(generatedKey: string | null) {
  const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("admin_profile")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              user_id: "user-1",
              email: "owner@example.com",
              tier: "free",
              needs_key: false,
              generated_api_key: generatedKey,
              api_key: {
                prefix: "uc_test",
                tier: "free",
                is_active: true,
                usage_count: 0,
                last_used_at: null,
              },
            }),
        });
      }
      if (url.includes("auth_device_list")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] }),
        });
      }
      if (url.includes("admin_check_connection")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              connected: true,
              context_count: 1,
              fact_count: 1,
            }),
        });
      }
      if (url.includes("about_you_update")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              about_you: { text: "I run a studio.", updated_at: "2026-06-08T00:00:00.000Z" },
            }),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(window, "fetch", {
    value: fetchMock,
    configurable: true,
  });
}

async function waitForInitialAdminYouFetches() {
  const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("admin_profile"), expect.any(Object));
  });
  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("auth_device_list"), expect.any(Object));
  });
}

describe("AdminYou API key card", () => {
  beforeEach(() => {
    localStorage.clear();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shows clear copy actions when the raw API key is available", async () => {
    stubFetch("uc_test_1234567890");

    renderPage();

    expect(await screen.findByRole("button", { name: /Copy API key/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Copy MCP URL/i })).toBeInTheDocument();
    expect(screen.getByText(/Copy it now or copy the ready-made MCP URL/i)).toBeInTheDocument();
    await waitForInitialAdminYouFetches();
  });

  it("explains why an old key cannot be copied after the raw value is gone", async () => {
    stubFetch(null);

    renderPage();

    expect(await screen.findByText(/stores only a hash after setup/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create new copyable key/i })).toBeInTheDocument();
    await waitForInitialAdminYouFetches();
  });

  it("shows the section nav and active My Data controls", async () => {
    stubFetch("uc_test_1234567890");

    renderPage();

    // The compact nav strip doubles as the at-a-glance setup status.
    expect(await screen.findByRole("link", { name: /About You/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /AI Style/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /My Data/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Download Memory/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download Sessions & Orchestrator/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download Preferences/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download Export All/i })).toBeInTheDocument();
    expect(screen.getByText(/No file staged yet/i)).toBeInTheDocument();

    const fileInput = screen.getByLabelText(/Choose data file/i);
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["# Notes"], "notes.md", { type: "text/markdown" })],
      },
    });

    expect(await screen.findByText(/Markdown notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Suggest categories/i)).toBeInTheDocument();
    await waitForInitialAdminYouFetches();
  });

  it("renders About You and AI Style as every-session sections", async () => {
    stubFetch("uc_test_1234567890");

    renderPage();

    expect(await screen.findByRole("heading", { name: /About You/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /AI Style/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/About you and your business/i)).toBeInTheDocument();
    // Both identity surfaces advertise that they load into every session.
    expect(screen.getAllByText(/Applied every session/i).length).toBeGreaterThanOrEqual(2);
    await waitForInitialAdminYouFetches();
  });

  it("saves About You through the about_you_update endpoint", async () => {
    stubFetch("uc_test_1234567890");

    renderPage();

    const textarea = await screen.findByLabelText(/About you and your business/i);
    fireEvent.change(textarea, { target: { value: "I run a studio." } });
    fireEvent.click(screen.getByRole("button", { name: /Save About You/i }));

    await waitFor(() => {
      const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("about_you_update"),
        expect.objectContaining({ method: "POST" }),
      );
    });
    await waitForInitialAdminYouFetches();
  });
});
