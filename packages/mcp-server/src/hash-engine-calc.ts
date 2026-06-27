export type HashEngine =
  | "sha2_256_pipeline"
  | "sha3_keccak_sponge"
  | "blake3_tree_hash"
  | "md5_legacy_compat"
  | "poly1305_mac_auth";

const DATA: Record<HashEngine, {
  throughput: number; security: number; parallelism: number;
  area: number; heCost: number; quantumResist: boolean;
  forBlockchain: boolean; structure: string; bestUse: string;
}> = {
  sha2_256_pipeline: {
    throughput: 8, security: 8, parallelism: 6,
    area: 6, heCost: 3, quantumResist: false,
    forBlockchain: true, structure: "merkle_damgaard_compress",
    bestUse: "bitcoin_mining_verify",
  },
  sha3_keccak_sponge: {
    throughput: 7, security: 10, parallelism: 5,
    area: 5, heCost: 4, quantumResist: true,
    forBlockchain: false, structure: "sponge_absorb_squeeze",
    bestUse: "post_quantum_hash_sign",
  },
  blake3_tree_hash: {
    throughput: 10, security: 8, parallelism: 10,
    area: 7, heCost: 5, quantumResist: false,
    forBlockchain: false, structure: "merkle_tree_parallel",
    bestUse: "file_integrity_dedup",
  },
  md5_legacy_compat: {
    throughput: 9, security: 2, parallelism: 4,
    area: 9, heCost: 1, quantumResist: false,
    forBlockchain: false, structure: "feistel_4_round_compress",
    bestUse: "legacy_checksum_non_crypto",
  },
  poly1305_mac_auth: {
    throughput: 9, security: 9, parallelism: 7,
    area: 8, heCost: 3, quantumResist: false,
    forBlockchain: false, structure: "polynomial_eval_mod_prime",
    bestUse: "chacha20_aead_tag",
  },
};

const get = (t: HashEngine) => DATA[t];

export const throughput = (t: HashEngine) => get(t).throughput;
export const security = (t: HashEngine) => get(t).security;
export const parallelism = (t: HashEngine) => get(t).parallelism;
export const area = (t: HashEngine) => get(t).area;
export const heCost = (t: HashEngine) => get(t).heCost;
export const quantumResist = (t: HashEngine) => get(t).quantumResist;
export const forBlockchain = (t: HashEngine) => get(t).forBlockchain;
export const structure = (t: HashEngine) => get(t).structure;
export const bestUse = (t: HashEngine) => get(t).bestUse;
export const hashEngines = (): HashEngine[] => Object.keys(DATA) as HashEngine[];
