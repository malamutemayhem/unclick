export type RngSource =
  | "trng_thermal_noise"
  | "trng_jitter_ring"
  | "drbg_ctr_aes"
  | "drbg_hash_sha"
  | "qrng_photon_split";

const DATA: Record<RngSource, {
  entropy: number; throughput: number; determinism: number;
  testability: number; rngCost: number; nistCertified: boolean;
  forCrypto: boolean; mechanism: string; bestUse: string;
}> = {
  trng_thermal_noise: {
    entropy: 10, throughput: 4, determinism: 1,
    testability: 6, rngCost: 5, nistCertified: true,
    forCrypto: true, mechanism: "amplified_johnson_noise",
    bestUse: "seed_generation_root",
  },
  trng_jitter_ring: {
    entropy: 8, throughput: 6, determinism: 2,
    testability: 7, rngCost: 3, nistCertified: true,
    forCrypto: true, mechanism: "ring_osc_phase_jitter",
    bestUse: "embedded_key_material",
  },
  drbg_ctr_aes: {
    entropy: 5, throughput: 9, determinism: 10,
    testability: 10, rngCost: 2, nistCertified: true,
    forCrypto: true, mechanism: "aes_256_counter_mode",
    bestUse: "high_rate_session_keys",
  },
  drbg_hash_sha: {
    entropy: 5, throughput: 8, determinism: 10,
    testability: 9, rngCost: 2, nistCertified: true,
    forCrypto: false, mechanism: "sha_512_reseed_chain",
    bestUse: "general_purpose_prng",
  },
  qrng_photon_split: {
    entropy: 10, throughput: 3, determinism: 1,
    testability: 5, rngCost: 9, nistCertified: false,
    forCrypto: true, mechanism: "beam_splitter_detector",
    bestUse: "quantum_key_distribution",
  },
};

const get = (t: RngSource) => DATA[t];

export const entropy = (t: RngSource) => get(t).entropy;
export const throughput = (t: RngSource) => get(t).throughput;
export const determinism = (t: RngSource) => get(t).determinism;
export const testability = (t: RngSource) => get(t).testability;
export const rngCost = (t: RngSource) => get(t).rngCost;
export const nistCertified = (t: RngSource) => get(t).nistCertified;
export const forCrypto = (t: RngSource) => get(t).forCrypto;
export const mechanism = (t: RngSource) => get(t).mechanism;
export const bestUse = (t: RngSource) => get(t).bestUse;
export const rngSources = (): RngSource[] => Object.keys(DATA) as RngSource[];
