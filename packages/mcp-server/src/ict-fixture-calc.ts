export type IctFixtureType =
  | "bed_of_nails"
  | "vacuum_fixture"
  | "pneumatic_press"
  | "flying_probe_ict"
  | "boundary_scan";

interface IctFixtureData {
  testCoverage: number;
  testSpeed: number;
  fixtureLife: number;
  setupTime: number;
  ictCost: number;
  fixtureless: boolean;
  forHighVolume: boolean;
  contactMethod: string;
  bestUse: string;
}

const DATA: Record<IctFixtureType, IctFixtureData> = {
  bed_of_nails: {
    testCoverage: 9, testSpeed: 10, fixtureLife: 8, setupTime: 4, ictCost: 7,
    fixtureless: false, forHighVolume: true,
    contactMethod: "spring_loaded_pogo_pin_array_custom_fixture_plate_contact",
    bestUse: "high_volume_production_automotive_100_pct_in_circuit_test",
  },
  vacuum_fixture: {
    testCoverage: 9, testSpeed: 10, fixtureLife: 9, setupTime: 4, ictCost: 8,
    fixtureless: false, forHighVolume: true,
    contactMethod: "vacuum_hold_pcb_to_pin_plate_uniform_pressure_all_points",
    bestUse: "high_volume_thin_flex_board_warped_pcb_secure_contact",
  },
  pneumatic_press: {
    testCoverage: 8, testSpeed: 9, fixtureLife: 9, setupTime: 5, ictCost: 6,
    fixtureless: false, forHighVolume: true,
    contactMethod: "pneumatic_cylinder_press_down_probe_plate_heavy_board_hold",
    bestUse: "heavy_thick_board_power_supply_high_force_contact_required",
  },
  flying_probe_ict: {
    testCoverage: 7, testSpeed: 4, fixtureLife: 10, setupTime: 9, ictCost: 5,
    fixtureless: true, forHighVolume: false,
    contactMethod: "motorized_probe_arm_move_to_test_point_no_fixture_needed",
    bestUse: "prototype_low_volume_npi_no_fixture_cost_fast_program_change",
  },
  boundary_scan: {
    testCoverage: 6, testSpeed: 8, fixtureLife: 10, setupTime: 8, ictCost: 4,
    fixtureless: true, forHighVolume: false,
    contactMethod: "jtag_chain_digital_boundary_cell_test_no_physical_probe",
    bestUse: "bga_hidden_joint_digital_ic_cluster_test_jtag_chain_verify",
  },
};

function get(t: IctFixtureType): IctFixtureData {
  return DATA[t];
}

export const testCoverage = (t: IctFixtureType) => get(t).testCoverage;
export const testSpeed = (t: IctFixtureType) => get(t).testSpeed;
export const fixtureLife = (t: IctFixtureType) => get(t).fixtureLife;
export const setupTime = (t: IctFixtureType) => get(t).setupTime;
export const ictCost = (t: IctFixtureType) => get(t).ictCost;
export const fixtureless = (t: IctFixtureType) => get(t).fixtureless;
export const forHighVolume = (t: IctFixtureType) => get(t).forHighVolume;
export const contactMethod = (t: IctFixtureType) => get(t).contactMethod;
export const bestUse = (t: IctFixtureType) => get(t).bestUse;
export const ictFixtureTypes = (): IctFixtureType[] =>
  Object.keys(DATA) as IctFixtureType[];
