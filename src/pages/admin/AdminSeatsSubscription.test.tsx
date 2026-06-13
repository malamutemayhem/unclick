import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminSeatsSubscription from "./AdminSeatsSubscription";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "session-token" },
    user: { id: "user-1" },
    loading: false,
  }),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

afterEach(() => {
  localStorage.clear();
});

describe("AdminSeatsSubscription", () => {
  it("renders the subscription page heading", () => {
    render(
      <MemoryRouter>
        <AdminSeatsSubscription />
      </MemoryRouter>,
    );

    expect(screen.getByText("Subscriptions")).toBeInTheDocument();
  });

  it("shows connected platforms section", () => {
    render(
      <MemoryRouter>
        <AdminSeatsSubscription />
      </MemoryRouter>,
    );

    expect(screen.getByText("Connected platforms")).toBeInTheDocument();
  });

  it("shows config files section", () => {
    render(
      <MemoryRouter>
        <AdminSeatsSubscription />
      </MemoryRouter>,
    );

    expect(screen.getByText("Config files")).toBeInTheDocument();
  });
});
