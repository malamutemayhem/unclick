export type CryptoAccel =
  | "aes_ni_instruction"
  | "sha_hardware_engine"
  | "ecc_point_multiply"
  | "rsa_modular_exp"
  | "post_quantum_lattice";

const DATA: Record<CryptoAccel, {
  throughput: number; latency: number; powerEff: number;
  keySize: number; accCost: number; sideChannelResist: boolean;
  forTls: boolean; algorithm: string; bestUse: string;
}> = {
  aes_ni_instruction: {
    throughput: 10, latency: 10, powerEff: 9,
    keySize: 5, accCost: 3, sideChannelResist: true,
    forTls: true, algorithm: "aes_128_256_gcm_ctr",
    bestUse: "bulk_data_encryption",
  },
  sha_hardware_engine: {
    throughput: 9, latency: 9, powerEff: 8,
    keySize: 4, accCost: 3, sideChannelResist: true,
    forTls: true, algorithm: "sha256_sha3_keccak",
    bestUse: "message_digest_hmac",
  },
  ecc_point_multiply: {
    throughput: 6, latency: 7, powerEff: 7,
    keySize: 7, accCost: 5, sideChannelResist: false,
    forTls: true, algorithm: "nist_p256_curve25519",
    bestUse: "ecdsa_key_exchange",
  },
  rsa_modular_exp: {
    throughput: 4, latency: 5, powerEff: 4,
    keySize: 9, accCost: 6, sideChannelResist: false,
    forTls: true, algorithm: "montgomery_multiply_4096",
    bestUse: "certificate_signature",
  },
  post_quantum_lattice: {
    throughput: 5, latency: 6, powerEff: 5,
    keySize: 10, accCost: 8, sideChannelResist: true,
    forTls: false, algorithm: "kyber_dilithium_ntt",
    bestUse: "quantum_safe_kem_sign",
  },
};

const get = (t: CryptoAccel) => DATA[t];

export const throughput = (t: CryptoAccel) => get(t).throughput;
export const latency = (t: CryptoAccel) => get(t).latency;
export const powerEff = (t: CryptoAccel) => get(t).powerEff;
export const keySize = (t: CryptoAccel) => get(t).keySize;
export const accCost = (t: CryptoAccel) => get(t).accCost;
export const sideChannelResist = (t: CryptoAccel) => get(t).sideChannelResist;
export const forTls = (t: CryptoAccel) => get(t).forTls;
export const algorithm = (t: CryptoAccel) => get(t).algorithm;
export const bestUse = (t: CryptoAccel) => get(t).bestUse;
export const cryptoAccels = (): CryptoAccel[] => Object.keys(DATA) as CryptoAccel[];
