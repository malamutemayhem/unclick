export type TestFixtureType =
  | "bed_of_nails_ict"
  | "vacuum_clamp_hold"
  | "spring_probe_pogo"
  | "flying_probe_flex"
  | "boundary_scan_jtag";

const DATA: Record<TestFixtureType, {
  coverage: number; throughput: number; setupCost: number;
  flexibility: number; accuracy: number; contactBased: boolean;
  forNpi: boolean; probeType: string; bestUse: string;
}> = {
  bed_of_nails_ict: { coverage: 10, throughput: 10, setupCost: 9, flexibility: 2, accuracy: 9, contactBased: true, forNpi: false, probeType: "fixed_spring_probe_array", bestUse: "high_vol_production_test" },
  vacuum_clamp_hold: { coverage: 8, throughput: 8, setupCost: 7, flexibility: 3, accuracy: 8, contactBased: true, forNpi: false, probeType: "vacuum_sealed_probe", bestUse: "double_side_board_test" },
  spring_probe_pogo: { coverage: 7, throughput: 7, setupCost: 5, flexibility: 5, accuracy: 7, contactBased: true, forNpi: false, probeType: "pogo_pin_receptacle", bestUse: "functional_test_interface" },
  flying_probe_flex: { coverage: 6, throughput: 3, setupCost: 1, flexibility: 10, accuracy: 8, contactBased: true, forNpi: true, probeType: "motorized_moving_probe", bestUse: "prototype_low_volume_test" },
  boundary_scan_jtag: { coverage: 5, throughput: 6, setupCost: 3, flexibility: 8, accuracy: 9, contactBased: false, forNpi: true, probeType: "jtag_chain_connector", bestUse: "bga_no_access_test" },
};

const get = (t: TestFixtureType) => DATA[t];

export const coverage = (t: TestFixtureType) => get(t).coverage;
export const throughput = (t: TestFixtureType) => get(t).throughput;
export const setupCost = (t: TestFixtureType) => get(t).setupCost;
export const flexibility = (t: TestFixtureType) => get(t).flexibility;
export const accuracy = (t: TestFixtureType) => get(t).accuracy;
export const contactBased = (t: TestFixtureType) => get(t).contactBased;
export const forNpi = (t: TestFixtureType) => get(t).forNpi;
export const probeType = (t: TestFixtureType) => get(t).probeType;
export const bestUse = (t: TestFixtureType) => get(t).bestUse;
export const testFixtures = (): TestFixtureType[] => Object.keys(DATA) as TestFixtureType[];
