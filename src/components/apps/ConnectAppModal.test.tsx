import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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

  it("puts Higgsfield account login before the API key fallback", () => {
    renderModal({
      app: HIGGSFIELD_APP,
      connector: { id: "higgsfield", auth_type: "api_key", setup_url: null, supports_hosted_mcp_connection: true },
    });
    expect(screen.getByText(/use your higgsfield account login/i)).toBeInTheDocument();
    expect(screen.getByText(/not the old unclick vault path/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open higgsfield mcp login guide/i })).toHaveAttribute(
      "href",
      "https://higgsfield.ai/mcp",
    );
    expect(screen.getByRole("button", { name: /higgsfield login not switched on yet/i })).toBeDisabled();
    expect(screen.getByText(/api key fallback/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /where do i get my api key/i })).toHaveAttribute(
      "href",
      "https://cloud.higgsfield.ai/api-keys",
    );
    expect(screen.getByRole("button", { name: /test api key/i })).toBeInTheDocument();
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
    expect(onStartManagedConnection).toHaveBeenCalled();
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
    expect(onDisconnect).toHaveBeenCalled();
  });
});
