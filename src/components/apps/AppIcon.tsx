// Small, consistent app icon. Phase 1 uses a uniform rounded chip with the app's
// initial, tinted deterministically by category so the grid stays visually
// consistent. Phase 4 can swap the inner content for a brand favicon while
// keeping this exact frame, so the layout never shifts.

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

export function AppIcon({ name, category, size = 22 }: { name: string; category: string; size?: number }) {
  const letter = (name.replace(/[^A-Za-z0-9]/g, "").charAt(0) || "?").toUpperCase();
  const tint = CATEGORY_TINT[category] ?? "#9ca3af";
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-md border font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        color: tint,
        borderColor: `${tint}33`,
        background: `${tint}1a`,
      }}
    >
      {letter}
    </span>
  );
}
