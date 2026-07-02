import { useReducedMotion } from "framer-motion";

/**
 * SystemMap: the deck's slide-one instinct as a live diagram. UnClick
 * at the center, the six pieces around it, signal dots travelling the
 * spokes both ways so the system reads as one working thing, not a
 * list. Pure SVG with SMIL motion; dots hide under reduced motion
 * (see preview.css).
 */

const NODES = [
  { label: "any ai", angle: -90 },
  { label: "memory", angle: -30 },
  { label: "apps", angle: 30 },
  { label: "proof", angle: 90 },
  { label: "team", angle: 150 },
  { label: "gates", angle: 210 },
];

const CX = 280;
const CY = 280;
const RING = 178;
const NODE_R = 44;
const CENTER_R = 58;

function polar(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

export default function SystemMap() {
  const reduced = useReducedMotion() ?? false;

  return (
    <svg
      viewBox="0 0 560 560"
      className="h-auto w-full max-w-[560px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
      role="img"
      aria-label="UnClick system map: any AI, memory, apps, proof, team, and gates connected through one center"
    >
      {/* Spokes */}
      {NODES.map((node) => {
        const p = polar(node.angle, RING - NODE_R);
        const start = polar(node.angle, CENTER_R + 4);
        return (
          <line
            key={`spoke-${node.label}`}
            x1={start.x}
            y1={start.y}
            x2={p.x}
            y2={p.y}
            stroke="hsl(187 60% 70% / 0.22)"
            strokeWidth="1.25"
          />
        );
      })}

      {/* Travelling signal dots, alternating direction per spoke */}
      {!reduced &&
        NODES.map((node, i) => {
          const inner = polar(node.angle, CENTER_R + 6);
          const outer = polar(node.angle, RING - NODE_R - 4);
          const outbound = i % 2 === 0;
          const from = outbound ? inner : outer;
          const to = outbound ? outer : inner;
          return (
            <circle key={`dot-${node.label}`} r="3" fill="hsl(184 70% 72%)" className="hp-map-dot">
              <animateMotion
                dur={`${3.2 + i * 0.45}s`}
                begin={`${i * 0.55}s`}
                repeatCount="indefinite"
                path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
              />
            </circle>
          );
        })}

      {/* Ring nodes */}
      {NODES.map((node) => {
        const p = polar(node.angle, RING);
        return (
          <g key={`node-${node.label}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={NODE_R}
              fill="hsl(199 56% 11% / 0.92)"
              stroke="hsl(182 46% 57% / 0.45)"
              strokeWidth="1.5"
            />
            <text
              x={p.x}
              y={p.y + 3.5}
              textAnchor="middle"
              fill="hsl(185 42% 90%)"
              fontSize="12.5"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.5"
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Center */}
      <circle
        cx={CX}
        cy={CY}
        r={CENTER_R}
        fill="hsl(199 70% 8% / 0.96)"
        stroke="hsl(182 46% 57% / 0.8)"
        strokeWidth="2"
      />
      <circle cx={CX} cy={CY} r={CENTER_R + 9} fill="none" stroke="hsl(182 46% 57% / 0.18)" strokeWidth="1" />
      <text
        x={CX}
        y={CY - 1}
        textAnchor="middle"
        fill="hsl(185 42% 96%)"
        fontSize="19"
        fontWeight="800"
        fontFamily="Inter, sans-serif"
        letterSpacing="-0.4"
      >
        UnClick
      </text>
      <text
        x={CX}
        y={CY + 16}
        textAnchor="middle"
        fill="hsl(182 46% 65% / 0.75)"
        fontSize="7.5"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="1.8"
      >
        WHERE AI BELONGS
      </text>
    </svg>
  );
}
