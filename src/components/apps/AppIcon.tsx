// Small, consistent app icon. The frame is always identical so the grid never
// shifts: a rounded, category-tinted chip. Three fills, in order of preference:
//   1. Brand favicon - when the app has a real brand domain.
//   2. Meaningful glyph - built-in apps get a lucide icon picked by keyword
//      (calculator for math, clock for time, lock for ciphers, ...) with a
//      category glyph as fallback, tinted like the chip. No network requests.
//   3. Tinted initial - only when the category is unknown.
// One frame + per-category tint keeps the whole set looking uniform whether
// the fill is a favicon or a glyph.

import { createElement, useState } from "react";
import { brandIconSrcFor } from "./appBrandIcons";
import { glyphFor } from "./appIconGlyphs";

const LOCAL_GLYPH_SLUGS = new Set(["supabase", "vercel"]);

const CATEGORY_TINT: Record<string, string> = {
  "AI": "#a78bfa",
  "Developer & infra": "#61C1C4",
  "Money & payments": "#34d399",
  "Markets & crypto": "#fbbf24",
  "Messaging & email": "#60a5fa",
  "Social": "#f472b6",
  "News & reading": "#f59e0b",
  "Productivity": "#818cf8",
  "Shopping": "#fb7185",
  "Music & video": "#c084fc",
  "Games & esports": "#4ade80",
  "Travel, maps & local": "#22d3ee",
  "Weather & science": "#38bdf8",
  "Security": "#f87171",
  "Events & tickets": "#fb923c",
  "Content & CMS": "#2dd4bf",
  "Books": "#fcd34d",
  "Utilities": "#9ca3af",
  "Quality (XPass)": "#e879f9",
  "Other": "#9ca3af",
};

export function AppIcon({
  name,
  category,
  domain,
  slug,
  size = 22,
}: {
  name: string;
  category: string;
  domain?: string | null;
  slug?: string;
  size?: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const letter = (name.replace(/[^A-Za-z0-9]/g, "").charAt(0) || "?").toUpperCase();
  const tint = CATEGORY_TINT[category] ?? "#9ca3af";
  const forceLocalGlyph = slug ? LOCAL_GLYPH_SLUGS.has(slug) : false;
  const brandIcon = forceLocalGlyph ? null : brandIconSrcFor(slug);
  // Only real, dotted hostnames get a favicon lookup. Anything else (null, the
  // legacy "local" marker, bare words) falls straight back to a glyph, because
  // the favicon service answers unknown hosts with a generic placeholder
  // instead of an error - which used to leave built-in apps with a junk icon.
  const imageSrc = brandIcon ?? `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  const showImg = !forceLocalGlyph && Boolean(brandIcon || (domain && domain.includes("."))) && !imgFailed;
  const glyph = glyphFor(name, category, slug);

  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        color: tint,
        borderColor: `${tint}33`,
        background: `${tint}1a`,
      }}
    >
      {showImg ? (
        <img
          src={imageSrc}
          alt=""
          width={Math.round(size * 0.64)}
          height={Math.round(size * 0.64)}
          loading="lazy"
          onError={() => setImgFailed(true)}
          style={{ display: "block" }}
        />
      ) : glyph ? (
        createElement(glyph, { size: Math.round(size * 0.58), strokeWidth: 2 })
      ) : (
        letter
      )}
    </span>
  );
}
