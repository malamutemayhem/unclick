export interface WorldState {
  [key: string]: boolean;
}

export interface PlanAction {
  name: string;
  preconditions: WorldState;
  effects: WorldState;
  cost: number;
}

export class BehaviorPlanner {
  static satisfies(state: WorldState, conditions: WorldState): boolean {
    for (const [key, val] of Object.entries(conditions)) {
      if (state[key] !== val) return false;
    }
    return true;
  }

  static apply(state: WorldState, effects: WorldState): WorldState {
    return { ...state, ...effects };
  }

  static plan(
    initial: WorldState,
    goal: WorldState,
    actions: PlanAction[],
    maxDepth = 20,
  ): PlanAction[] | null {
    interface SearchNode {
      state: WorldState;
      actions: PlanAction[];
      cost: number;
    }

    const queue: SearchNode[] = [{ state: initial, actions: [], cost: 0 }];
    const visited = new Set<string>();
    visited.add(JSON.stringify(initial));

    while (queue.length > 0) {
      queue.sort((a, b) => a.cost - b.cost);
      const current = queue.shift()!;

      if (BehaviorPlanner.satisfies(current.state, goal)) {
        return current.actions;
      }

      if (current.actions.length >= maxDepth) continue;

      for (const action of actions) {
        if (!BehaviorPlanner.satisfies(current.state, action.preconditions)) continue;

        const newState = BehaviorPlanner.apply(current.state, action.effects);
        const key = JSON.stringify(newState);
        if (visited.has(key)) continue;
        visited.add(key);

        queue.push({
          state: newState,
          actions: [...current.actions, action],
          cost: current.cost + action.cost,
        });
      }
    }
    return null;
  }

  static heuristic(state: WorldState, goal: WorldState): number {
    let unsatisfied = 0;
    for (const [key, val] of Object.entries(goal)) {
      if (state[key] !== val) unsatisfied++;
    }
    return unsatisfied;
  }

  static planAStar(
    initial: WorldState,
    goal: WorldState,
    actions: PlanAction[],
    maxDepth = 20,
  ): PlanAction[] | null {
    interface SearchNode {
      state: WorldState;
      actions: PlanAction[];
      cost: number;
      estimate: number;
    }

    const queue: SearchNode[] = [{
      state: initial,
      actions: [],
      cost: 0,
      estimate: BehaviorPlanner.heuristic(initial, goal),
    }];
    const visited = new Set<string>();
    visited.add(JSON.stringify(initial));

    while (queue.length > 0) {
      queue.sort((a, b) => (a.cost + a.estimate) - (b.cost + b.estimate));
      const current = queue.shift()!;

      if (BehaviorPlanner.satisfies(current.state, goal)) {
        return current.actions;
      }

      if (current.actions.length >= maxDepth) continue;

      for (const action of actions) {
        if (!BehaviorPlanner.satisfies(current.state, action.preconditions)) continue;

        const newState = BehaviorPlanner.apply(current.state, action.effects);
        const key = JSON.stringify(newState);
        if (visited.has(key)) continue;
        visited.add(key);

        queue.push({
          state: newState,
          actions: [...current.actions, action],
          cost: current.cost + action.cost,
          estimate: BehaviorPlanner.heuristic(newState, goal),
        });
      }
    }
    return null;
  }

  static reachable(initial: WorldState, actions: PlanAction[]): WorldState[] {
    const states: WorldState[] = [];
    const visited = new Set<string>();
    const queue: WorldState[] = [initial];
    visited.add(JSON.stringify(initial));

    while (queue.length > 0) {
      const current = queue.shift()!;
      states.push(current);

      for (const action of actions) {
        if (!BehaviorPlanner.satisfies(current, action.preconditions)) continue;
        const next = BehaviorPlanner.apply(current, action.effects);
        const key = JSON.stringify(next);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push(next);
        }
      }
    }
    return states;
  }
}
