import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConnectAppModal } from "./ConnectAppModal";
import type { AppEntry } from "@/lib/appCatalog";

const APP: AppEntry = {
  slug: "alphavantage",
  name: "Alpha Vantage",
  category: "Markets & crypto",
  blurb: "Stocks and FX.",
  domain: null,
  network: "online",
  toolCount: 1,
  tools: [{ name: "stock_quote", description: "Get a stock quote." }],
  level: 5,
  hardened: true,
};

const CONNECTOR = { id: "alphavantage", auth_type: "api_key" as const, setup_url: null };
const HIGGSFIELD_APP: AppEntry = {
  ...APP,
  slug: "higgsfield",
  name: "Higgsfield",
  category: "AI",
  blurb: "Create images, video, characters, and campaign assets.",
  domain: "higgsfield.ai",
  tools: [{ name: "higgsfield_generate_image", description: "Generate an image." }],
  toolCount: 1,
};
const SUPABASE_APP: AppEntry = {
  ...APP,
  slug: "supabase",
  name: "Supabase",
  category: "Developer & infra",
  blurb: "Connect a Supabase project.",
  domain: "supabase.com",
  tools: [],
  toolCount: 0,
};

function renderModal(overrides: Partial<Parameters<typeof ConnectAppModal>[0]> = {}) {
  return render(
    <ConnectAppModal
      app={APP}
      connector={CONNECTOR}
      accessToken="session-token"
      onClose={() => {}}
      onSaved={() => {}}
      {...overrides}
    />,
  );
}

describe("ConnectAppModal", () => {
  beforeEach(() => {
    localStorage.setItem("unclick_api_key", "uk_test_key");
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("explains the proof-first contract and uses the registry's credential label", () => {
    renderModal();
    expect(screen.getByText(/tested first; if the platform accepts it/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/paste api key here/i)).toBeInTheDocument();
    // Setup link comes from the generated CONNECTOR_SETUP registry.
    expect(screen.getByRole("link", { name: /where do i get my api key/i })).toHaveAttribute(
      "href",
      "https://www.alphavantage.co/support/#api-key",
    );
  });

  it("shows a proven green state only when the server reports ok: true", async () => {
    const onSaved = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ok: true, message: "Credential verified in 120ms." }),
        }),
      ),
    );
    renderModal({ onSaved });
    fireEvent.change(screen.getByPlaceholderText(/paste api key here/i), { target: { value: "demo-key" } });
    fireEvent.click(screen.getByRole("button", { name: /test and connect/i }));
    expect(await screen.findByText(/connected, live-tested/i)).toBeInTheDocument();
    expect(onSaved).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      "/api/memory-admin?action=admin_connect_app",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("reports an honest unproven save when no live test exists (ok: null)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ok: null, message: "no probe" }),
        }),
      ),
    );
    renderModal();
    fireEvent.change(screen.getByPlaceholderText(/paste api key here/i), { target: { value: "demo-key" } });
    fireEvent.click(screen.getByRole("button", { name: /test and connect/i }));
    expect(await screen.findByText(/marked as added/i)).toBeInTheDocument();
  });

  it("presents Higgsfield hosted MCP as a connect login", async () => {
    const onStartHostedMcpLogin = vi.fn(() => Promise.resolve());
    renderModal({
      app: HIGGSFIELD_APP,
      connector: { id: "higgsfield", auth_type: "api_key", setup_url: null, supports_hosted_mcp_connection: true },
      onStartHostedMcpLogin,
    });
    expect(screen.getByRole("heading", { name: /connect higgsfield/i })).toBeInTheDocument();
    expect(screen.getByText(/connect with higgsfield/i)).toBeInTheDocument();
    expect(screen.getByText(/opens a higgsfield sign-in window/i)).toBeInTheDocument();
    expect(screen.getByText(/no cloud api key is needed for this mcp login path/i)).toBeInTheDocument();
    expect(screen.queryByText(/vault/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /connect higgsfield/i }));
    await waitFor(() => expect(onStartHostedMcpLogin).toHaveBeenCalled());
    expect(screen.getByRole("link", { name: /higgsfield mcp guide/i })).toHaveAttribute(
      "href",
      "https://higgsfield.ai/mcp",
    );
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(screen.getByText(/cloud api key option/i)).toBeInTheDocument();
    expect(screen.getByText(/prefer higgsfield cloud api billing instead of the account sign-in/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /where do i get my cloud api key/i })).toHaveAttribute(
      "href",
      "https://cloud.higgsfield.ai/api-keys",
    );
    expect(screen.getByRole("button", { name: /test api key/i })).toBeInTheDocument();
  });

  it("presents saved Higgsfield hosted MCP access as manageable before live proof", async () => {
    const onStartHostedMcpLogin = vi.fn(() => Promise.resolve());
    const onDisconnect = vi.fn(() => Promise.resolve());
    renderModal({
      app: HIGGSFIELD_APP,
      connector: {
        id: "higgsfield",
        auth_type: "api_key",
        setup_url: null,
        supports_hosted_mcp_connection: true,
        credential: { is_valid: true, last_tested_at: null, connection_state: "untested" },
      },
      isConnected: false,
      statusLabel: "Connected",
      onStartHostedMcpLogin,
      onDisconnect,
    });

    expect(screen.getByRole("heading", { name: /manage higgsfield/i })).toBeInTheDocument();
    expect(screen.getAllByText(/connected/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/higgsfield is connected in unclick/i)).toBeInTheDocument();
    expect(screen.getByText(/can use this connection across your devices/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reconnect higgsfield/i }));
    await waitFor(() => expect(onStartHostedMcpLogin).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("button", { name: /disconnect/i }));
    await waitFor(() => expect(onDisconnect).toHaveBeenCalled());
  });

  it("keeps a Reconnect path for a live-connected hosted MCP login that may have expired", async () => {
    const onStartHostedMcpLogin = vi.fn(() => Promise.resolve());
    renderModal({
      app: HIGGSFIELD_APP,
      connector: {
        id: "higgsfield",
        auth_type: "api_key",
        setup_url: null,
        supports_hosted_mcp_connection: true,
        credential: { is_valid: true, last_tested_at: "2026-06-20T00:00:00.000Z", connection_state: "connected" },
      },
      isConnected: true,
      statusLabel: "Connected",
      onStartHostedMcpLogin,
    });

    // The honest "Connected" badge still surfaces a way to re-auth.
    expect(screen.getByText(/login expired or switching accounts/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reconnect higgsfield/i }));
    await waitFor(() => expect(onStartHostedMcpLogin).toHaveBeenCalled());
  });

  it("routes Supabase users to login instead of a key form", () => {
    renderModal({
      app: SUPABASE_APP,
      connector: { id: "supabase", auth_type: "oauth2", setup_url: null },
    });
    expect(screen.getByText(/connects with a provider sign-in instead of a pasted key/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue to supabase login/i })).toHaveAttribute(
      "href",
      "/connect/supabase",
    );
    expect(screen.queryByPlaceholderText(/paste/i)).not.toBeInTheDocument();
  });

  it("surfaces a rejection and stores nothing when the platform refuses the key", async () => {
    const onSaved = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ok: false, message: "Credential rejected by alphavantage (HTTP 401)." }),
        }),
      ),
    );
    renderModal({ onSaved });
    fireEvent.change(screen.getByPlaceholderText(/paste api key here/i), { target: { value: "bad-key" } });
    fireEvent.click(screen.getByRole("button", { name: /test and connect/i }));
    expect(await screen.findByText(/credential rejected/i)).toBeInTheDocument();
    expect(onSaved).not.toHaveBeenCalled();
  });

  it("asks for the UnClick API key when it is not cached in this browser", async () => {
    localStorage.clear();
    renderModal();
    fireEvent.change(screen.getByPlaceholderText(/paste api key here/i), { target: { value: "demo-key" } });
    fireEvent.click(screen.getByRole("button", { name: /test and connect/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/not cached in this browser/i);
  });

  it("routes OAuth platforms to the login flow instead of a key field", () => {
    renderModal({ connector: { id: "github", auth_type: "oauth2", setup_url: null } });
    expect(screen.getByRole("link", { name: /continue to alpha vantage login/i })).toHaveAttribute(
      "href",
      "/connect/alphavantage",
    );
    expect(screen.queryByPlaceholderText(/paste/i)).not.toBeInTheDocument();
  });

  it("uses the managed connection path when the broker is available", async () => {
    const onStartManagedConnection = vi.fn(() => Promise.resolve());
    renderModal({
      connector: { id: "alphavantage", auth_type: "api_key", setup_url: null, supports_managed_connection: true },
      onStartManagedConnection,
    });
    expect(screen.getByText(/work on every pc signed into unclick/i)).toBeInTheDocument();
    expect(screen.getByText(/managed connection provider handles the sensitive access/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/paste/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /connect alpha vantage/i }));
    await waitFor(() => expect(onStartManagedConnection).toHaveBeenCalled());
  });

  it("offers reconnect and disconnect for an existing OAuth connection", async () => {
    const onDisconnect = vi.fn(() => Promise.resolve());
    renderModal({
      connector: { id: "github", auth_type: "oauth2", setup_url: null },
      isConnected: true,
      statusLabel: "Connected",
      onDisconnect,
    });
    expect(screen.getByText(/Alpha Vantage is available/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /reconnect alpha vantage/i })).toHaveAttribute(
      "href",
      "/connect/alphavantage",
    );
    fireEvent.click(screen.getByRole("button", { name: /disconnect/i }));
    await waitFor(() => expect(onDisconnect).toHaveBeenCalled());
  });

  it("still offers disconnect when saved access is shown as connected", async () => {
    const onDisconnect = vi.fn(() => Promise.resolve());
    renderModal({
      connector: {
        id: "alphavantage",
        auth_type: "api_key",
        setup_url: null,
        credential: { is_valid: true, last_tested_at: null, connection_state: "untested" },
      },
      isConnected: false,
      statusLabel: "Connected",
      onDisconnect,
    });

    expect(screen.getByRole("heading", { name: /manage alpha vantage/i })).toBeInTheDocument();
    expect(screen.queryByText(/alpha vantage is available/i)).not.toBeInTheDocument();
    expect(screen.getByText(/alpha vantage is connected in unclick/i)).toBeInTheDocument();
    expect(screen.getByText(/can use this connection across your devices/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /disconnect/i }));
    await waitFor(() => expect(onDisconnect).toHaveBeenCalled());
  });
});
