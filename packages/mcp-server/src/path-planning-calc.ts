export type PathPlanning =
  | "astar_grid_heuristic"
  | "rrt_star_sampling"
  | "dwa_dynamic_window"
  | "potential_field_virtual"
  | "lattice_state_graph";

const DATA: Record<PathPlanning, {
  optimality: number; speed: number; dynamicObs: number;
  smoothness: number; ppCost: number; anytime: boolean;
  forManipulator: boolean; search: string; bestUse: string;
}> = {
  astar_grid_heuristic: {
    optimality: 10, speed: 7, dynamicObs: 3,
    smoothness: 4, ppCost: 2, anytime: false,
    forManipulator: false, search: "admissible_heuristic_expand",
    bestUse: "2d_grid_map_shortest_path",
  },
  rrt_star_sampling: {
    optimality: 8, speed: 6, dynamicObs: 5,
    smoothness: 7, ppCost: 4, anytime: true,
    forManipulator: true, search: "random_tree_rewire_converge",
    bestUse: "high_dof_arm_motion_plan",
  },
  dwa_dynamic_window: {
    optimality: 5, speed: 10, dynamicObs: 10,
    smoothness: 8, ppCost: 3, anytime: false,
    forManipulator: false, search: "velocity_space_admissible_arc",
    bestUse: "mobile_robot_reactive_nav",
  },
  potential_field_virtual: {
    optimality: 3, speed: 9, dynamicObs: 8,
    smoothness: 9, ppCost: 1, anytime: false,
    forManipulator: false, search: "attract_repel_gradient_descent",
    bestUse: "simple_obstacle_avoidance_demo",
  },
  lattice_state_graph: {
    optimality: 9, speed: 5, dynamicObs: 4,
    smoothness: 10, ppCost: 5, anytime: true,
    forManipulator: false, search: "precomputed_motion_primitive",
    bestUse: "autonomous_vehicle_lane_plan",
  },
};

const get = (t: PathPlanning) => DATA[t];

export const optimality = (t: PathPlanning) => get(t).optimality;
export const speed = (t: PathPlanning) => get(t).speed;
export const dynamicObs = (t: PathPlanning) => get(t).dynamicObs;
export const smoothness = (t: PathPlanning) => get(t).smoothness;
export const ppCost = (t: PathPlanning) => get(t).ppCost;
export const anytime = (t: PathPlanning) => get(t).anytime;
export const forManipulator = (t: PathPlanning) => get(t).forManipulator;
export const search = (t: PathPlanning) => get(t).search;
export const bestUse = (t: PathPlanning) => get(t).bestUse;
export const pathPlannings = (): PathPlanning[] => Object.keys(DATA) as PathPlanning[];
