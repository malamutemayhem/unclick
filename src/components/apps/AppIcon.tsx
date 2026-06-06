// Small, consistent app icon. The frame is always identical so the grid never
// shifts: a rounded, category-tinted chip. When we know the app's brand domain
// we load its favicon inside that frame; if the favicon is unknown or fails to
// load, we fall back to the app's tinted initial. Consistent look + real brand
// recognition where possible, exactly as intended.

import { useState } from "react";

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
  size = 22,
}: {
  name: string;
  category: string;
  domain?: string | null;
  size?: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const letter = (name.replace(/[^A-Za-z0-9]/g, "").charAt(0) || "?").toUpperCase();
  const tint = CATEGORY_TINT[category] ?? "#9ca3af";
  const showImg = Boolean(domain) && !imgFailed;

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
          src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
          alt=""
          width={Math.round(size * 0.64)}
          height={Math.round(size * 0.64)}
          loading="lazy"
          onError={() => setImgFailed(true)}
          style={{ display: "block" }}
        />
      ) : (
        letter
      )}
    </span>
  );
}
