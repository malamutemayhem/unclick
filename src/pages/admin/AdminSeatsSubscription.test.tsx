import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdminSeatsSubscription, {
  buildEconomicsTips,
  calculateMonthlyLocalCompute,
} from "./AdminSeatsSubscription";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "session-token" },
    user: { id: "user-1" },
    loading: false,
  }),
}));

afterEach(() => {
  localStorage.clear();
});

describe("AdminSeatsSubscription economics", () => {
  it("calculates local compute from hardware amortization and power", () => {
    expect(calculateMonthlyLocalCompute({
      hardwareCost: 900,
      amortizationMonths: 24,
      averageWatts: 260,
      hoursPerDay: 6,
      electricityRate: 0.28,
    })).toEqual({
      hardwareAmortization: 37.5,
      electricityCost: 13.1,
      kilowattHours: 46.8,
      total: 50.6,
    });
  });

  it("builds actionable tips across API, local, and subscription tiers", () => {
    const tips = buildEconomicsTips(
      {
        monthlySpend: 120,
        embeddingSpend: 32,
        batchEligibleSpend: 40,
        sourceLabel: "test",
      },
      50,
      {
        planName: "Claude Max",
        monthlyPrice: 100,
        programmaticCredit: 100,
        programmaticUsed: 42,
      },
    );

    expect(tips.join(" ")).toContain("Nomic Embed");
    expect(tips.join(" ")).toContain("leaving $58");
    expect(tips.join(" ")).toContain("could save about $20");
  });

  it("renders the unified monthly cost view and updates local estimates", () => {
    localStorage.setItem("unclick_seats_api_spend_v1", JSON.stringify({
      monthlySpend: 120,
      embeddingSpend: 32,
      batchEligibleSpend: 40,
    }));

    render(<AdminSeatsSubscription />);

    expect(screen.getByRole("heading", { name: "Subscription compute" })).toBeInTheDocument();
    expect(screen.getByText("Your compute at a glance")).toBeInTheDocument();
    expect(screen.getByText("$120")).toBeInTheDocument();
    expect(screen.getByText("$32 embeddings, $40 batch-ready")).toBeInTheDocument();
    expect(screen.getByText(/Loaded from unclick_seats_api_spend_v1/)).toBeInTheDocument();
    expect(screen.getByText(/API embeddings are costing \$32\/mo/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Hardware cost"), { target: { value: "1200" } });

    expect(screen.getByText("$50 hardware, $13.10 electricity")).toBeInTheDocument();
  });
});
