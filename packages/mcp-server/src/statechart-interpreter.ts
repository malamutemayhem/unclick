export type StateId = string;
export type EventType = string;

export interface Transition {
  event: EventType;
  target: StateId;
  guard?: (context: Record<string, unknown>) => boolean;
  action?: (context: Record<string, unknown>) => void;
}

export interface StateNode {
  id: StateId;
  transitions: Transition[];
  onEntry?: (context: Record<string, unknown>) => void;
  onExit?: (context: Record<string, unknown>) => void;
  children?: Map<StateId, StateNode>;
  initial?: StateId;
  final?: boolean;
}

export interface StatechartConfig {
  id: string;
  initial: StateId;
  states: Map<StateId, StateNode>;
  context: Record<string, unknown>;
}

export interface StatechartInstance {
  config: StatechartConfig;
  current: StateId;
  context: Record<string, unknown>;
  history: Array<{ from: StateId; event: EventType; to: StateId }>;
  done: boolean;
}

export function createStatechart(config: StatechartConfig): StatechartInstance {
  const instance: StatechartInstance = {
    config,
    current: config.initial,
    context: { ...config.context },
    history: [],
    done: false,
  };

  const initialState = config.states.get(config.initial);
  if (initialState?.onEntry) {
    initialState.onEntry(instance.context);
  }

  return instance;
}

export function send(instance: StatechartInstance, event: EventType): boolean {
  if (instance.done) return false;

  const state = instance.config.states.get(instance.current);
  if (!state) return false;

  for (const t of state.transitions) {
    if (t.event !== event) continue;
    if (t.guard && !t.guard(instance.context)) continue;

    const from = instance.current;

    if (state.onExit) state.onExit(instance.context);
    if (t.action) t.action(instance.context);

    instance.current = t.target;
    instance.history.push({ from, event, to: t.target });

    const targetState = instance.config.states.get(t.target);
    if (targetState?.onEntry) targetState.onEntry(instance.context);
    if (targetState?.final) instance.done = true;

    return true;
  }

  return false;
}

export function matches(instance: StatechartInstance, stateId: StateId): boolean {
  return instance.current === stateId;
}

export function canSend(instance: StatechartInstance, event: EventType): boolean {
  if (instance.done) return false;
  const state = instance.config.states.get(instance.current);
  if (!state) return false;
  return state.transitions.some((t) => t.event === event && (!t.guard || t.guard(instance.context)));
}

export function availableEvents(instance: StatechartInstance): EventType[] {
  if (instance.done) return [];
  const state = instance.config.states.get(instance.current);
  if (!state) return [];
  return state.transitions
    .filter((t) => !t.guard || t.guard(instance.context))
    .map((t) => t.event);
}

export function reset(instance: StatechartInstance): void {
  instance.current = instance.config.initial;
  instance.context = { ...instance.config.context };
  instance.history = [];
  instance.done = false;
  const initialState = instance.config.states.get(instance.config.initial);
  if (initialState?.onEntry) initialState.onEntry(instance.context);
}

export function stateNode(
  id: StateId,
  transitions: Transition[],
  opts?: { onEntry?: (ctx: Record<string, unknown>) => void; onExit?: (ctx: Record<string, unknown>) => void; final?: boolean },
): StateNode {
  return { id, transitions, ...opts };
}
