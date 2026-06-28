export type XGateControlMode = "off" | "watch" | "block";
export type XGateMasterMode = XGateControlMode | "custom";
export type XGatePresetId = "backbone-watch" | "backbone-block";

export interface XGateProductConfig {
  id: string;
  name: string;
  summary: string;
  defaultMode: XGateControlMode;
}

export interface XGatePresetConfig {
  id: XGatePresetId;
  label: string;
  detail: string;
  trendSlopGateMode: XGateControlMode;
}

export const XGATE_MODE_COPY: Record<XGateControlMode, { label: string; detail: string }> = {
  off: {
    label: "Off",
    detail: "Dormant. No checks, no warnings, no notes.",
  },
  watch: {
    label: "Watch",
    detail: "Watches everything and logs it. Never blocks.",
  },
  block: {
    label: "Block",
    detail: "Enforces the gate before risky work or weak answers leave UnClick.",
  },
};

export const XGATE_PRODUCT_CONFIGS: XGateProductConfig[] = [
  {
    id: "CommandGate",
    name: "CommandGate",
    summary: "Shell and command actions routed through UnClick.",
    defaultMode: "block",
  },
  {
    id: "GitGate",
    name: "GitGate",
    summary: "Branch protection, force pushes, reset, clean, and history risk.",
    defaultMode: "block",
  },
  {
    id: "DataGate",
    name: "DataGate",
    summary: "Destructive SQL, migrations, tenant filters, and database writes.",
    defaultMode: "block",
  },
  {
    id: "SecretGate",
    name: "SecretGate",
    summary: "Credentials, tokens, private keys, and outbound secret exposure.",
    defaultMode: "block",
  },
  {
    id: "TrendSlopGate",
    name: "TrendSlopGate",
    summary: "Over-agreeable, generic, fashionable, or poorly grounded AI advice.",
    defaultMode: "watch",
  },
  {
    id: "ShipGate",
    name: "ShipGate",
    summary: "Deploy, publish, rollback, DNS, and production-affecting actions.",
    defaultMode: "block",
  },
  {
    id: "ScopeGate",
    name: "ScopeGate",
    summary: "Writes outside the active ScopePack or owned file set.",
    defaultMode: "block",
  },
  {
    id: "SpendGate",
    name: "SpendGate",
    summary: "Estimated model, API, infrastructure, and third-party spend.",
    defaultMode: "watch",
  },
  {
    id: "KillGate",
    name: "KillGate",
    summary: "Global stop, unsafe autonomy, and emergency hold conditions.",
    defaultMode: "block",
  },
];

export const XGATE_PRESETS: XGatePresetConfig[] = [
  {
    id: "backbone-watch",
    label: "Backbone Watch",
    detail: "Keeps TrendSlopGate watching and logging without blocking.",
    trendSlopGateMode: "watch",
  },
  {
    id: "backbone-block",
    label: "Backbone Block",
    detail: "Lets TrendSlopGate rewrite, ask, or deny the narrow high-confidence cases.",
    trendSlopGateMode: "block",
  },
];

export function defaultXGateModes(
  products: XGateProductConfig[] = XGATE_PRODUCT_CONFIGS,
): Record<string, XGateControlMode> {
  return Object.fromEntries(products.map((product) => [product.id, product.defaultMode]));
}

export function resolveMasterXGateMode(
  modes: Record<string, XGateControlMode>,
  products: XGateProductConfig[] = XGATE_PRODUCT_CONFIGS,
): XGateMasterMode {
  const values = products.map((product) => modes[product.id] ?? product.defaultMode);
  const first = values[0];

  if (!first) return "custom";
  return values.every((value) => value === first) ? first : "custom";
}

export function applyMasterXGateMode(
  mode: XGateControlMode,
  products: XGateProductConfig[] = XGATE_PRODUCT_CONFIGS,
): Record<string, XGateControlMode> {
  return Object.fromEntries(products.map((product) => [product.id, mode]));
}

export function setIndividualXGateMode(
  modes: Record<string, XGateControlMode>,
  gateId: string,
  mode: XGateControlMode,
): Record<string, XGateControlMode> {
  return { ...modes, [gateId]: mode };
}

export function applyXGatePreset(
  presetId: XGatePresetId,
  currentModes: Record<string, XGateControlMode> = defaultXGateModes(),
): Record<string, XGateControlMode> {
  const preset = XGATE_PRESETS.find((item) => item.id === presetId);
  if (!preset) return currentModes;

  return {
    ...currentModes,
    TrendSlopGate: preset.trendSlopGateMode,
  };
}
