// Generates the UnClick Browser source icon (1024x1024 PNG), no dependencies.
// Run in CI before `tauri icon`. Writes src-tauri/source-icon.png.
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const S = 1024;
const bg = [0x61, 0xC1, 0xC4];
const white = [0xFF, 0xFF, 0xFF];
const teal = [0x3a, 0x9a, 0x9d];
const px = Buffer.alloc(S * S * 3);
const set = (x, y, c) => { const i = (y * S + x) * 3; px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2]; };
const cardX0 = 300, cardX1 = 724, cardY0 = 190, cardY1 = 834, r = 48;
function inCard(x, y) {
  if (x < cardX0 || x > cardX1 || y < cardY0 || y > cardY1) return false;
  const nx = x < cardX0 + r ? cardX0 + r : (x > cardX1 - r ? cardX1 - r : x);
  const ny = y < cardY0 + r ? cardY0 + r : (y > cardY1 - r ? cardY1 - r : y);
  if (nx !== x && ny !== y) { const dx = x - nx, dy = y - ny; if (dx * dx + dy * dy > r * r) return false; }
  return true;
}
const lines = [[260, 360], [400, 500], [540, 640], [680, 780]];
function inLine(x, y) {
  if (x < cardX0 + 56 || x > cardX1 - 56) return false;
  for (const [a, b] of lines) if (y >= a && y <= b) return true;
  return false;
}
for (let y = 0; y < S; y++) for (let x = 0; x < S; x++)
  set(x, y, inCard(x, y) ? (inLine(x, y) ? teal : white) : bg);

const raw = Buffer.alloc(S * (S * 3 + 1));
for (let y = 0; y < S; y++) { raw[y * (S * 3 + 1)] = 0; px.copy(raw, y * (S * 3 + 1) + 1, y * S * 3, (y + 1) * S * 3); }
const idat = zlib.deflateSync(raw, { level: 9 });
const table = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (buf) => { let c = 0xFFFFFFFF; for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
};
const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(S, 0); ihdr.writeUInt32BE(S, 4); ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const png = Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
mkdirSync("src-tauri", { recursive: true });
writeFileSync("src-tauri/source-icon.png", png);
console.log("Wrote src-tauri/source-icon.png", png.length, "bytes");
