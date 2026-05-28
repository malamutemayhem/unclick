import type { FlowPassFixture, FlowPassRunInput } from "./schema.js";

export const FLOWPASS_INTERNAL_DOGFOOD_FIXTURE: FlowPassFixture = {
  route_status: 200,
  page_title: "UnClick FlowPass dogfood journey",
  text:
    "Start the FlowPass journey, fill the public fixture form, recover from invalid input, complete the run, and keep the proof receipt.",
  source_url: "https://unclick.world/flowpass",
  links: [
    { label: "Start FlowPass", href: "/flowpass/start", role: "link", primary: true },
    { label: "Continue to proof", href: "/flowpass/proof", role: "link" },
    { label: "Back to dashboard", href: "/admin", role: "link" },
  ],
  buttons: [
    { label: "Run fixture journey", role: "button", primary: true },
  ],
  forms: [
    {
      name: "FlowPass fixture form",
      action: "/api/flowpass/fixture",
      fields: ["email", "journey_name", "target_url"],
      required_fields: ["email", "target_url"],
      submit_label: "Run fixture journey",
    },
  ],
  success_signals: ["Journey complete. Receipt flowpass_fixture_001 created."],
  failure_signals: ["Invalid target URL. Fix the URL and try again."],
  handoff_signals: ["Receipt flowpass_fixture_001 links the run, evidence, and next action."],
  network_events: [
    { method: "GET", url: "/flowpass", status: 200 },
    { method: "POST", url: "/api/flowpass/fixture", status: 200 },
  ],
  console_errors: [],
  performance_ms: 1180,
  accessibility_notes: ["Public fixture labels and primary action names are present."],
  side_channels: [
    {
      kind: "api",
      label: "Fixture receipt API",
      status: "observed",
      summary: "The fixture run returns a receipt id without touching production data.",
    },
  ],
  screenshots: [
    { label: "FlowPass fixture journey ready state", path: "public/dogfood/flowpass-fixture.png" },
  ],
};

export const FLOWPASS_INTERNAL_DOGFOOD_INPUT: FlowPassRunInput = {
  target_url: "https://unclick.world/flowpass",
  generated_at: "2026-05-28T00:00:00.000Z",
  mode: "fixture",
  profile: "standard",
  journey_id: "flowpass-internal-dogfood",
  journey_name: "FlowPass internal dogfood journey",
  journey_kind: "onboarding",
  fixture: FLOWPASS_INTERNAL_DOGFOOD_FIXTURE,
  notes: [
    "Internal dogfood fixture for FlowPass package, MCP, and XPass receipt proof.",
  ],
};
