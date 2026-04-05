// Hexagon: node 0 = center (larger), nodes 1–6 = vertices (pointy-top)
const NODES = [
  { x: 78, y: 50, center: true }, // center
  { x: 78, y: 30 }, // top
  { x: 96, y: 40 }, // top-right
  { x: 96, y: 60 }, // bottom-right
  { x: 78, y: 70 }, // bottom
  { x: 60, y: 60 }, // bottom-left
  { x: 60, y: 40 }, // top-left
];

const CONNECTIONS = [
  // hexagon edges
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 1],
  // spokes to center
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
];

export default function HeroBackground() {
  return (
    <div className="hero-network" aria-hidden="true">
      <svg
        className="hero-network-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <radialGradient id="heroNodeGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="hsl(var(--decorative))"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--decorative))"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {CONNECTIONS.map(([a, b], index) => (
          <line
            key={`conn-${index}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="hsl(var(--decorative))"
            strokeOpacity="0.3"
            strokeWidth="0.25"
            className="animate-network-line"
            style={{ animationDelay: `${index * 0.15}s` }}
          />
        ))}

        {CONNECTIONS.filter((_, index) => index % 2 === 0).map(
          ([a, b], index) => (
            <circle
              key={`pulse-${index}`}
              r="0.4"
              fill="hsl(var(--primary))"
              opacity="0.85"
            >
              <animateMotion
                dur={`${3 + index * 0.7}s`}
                repeatCount="indefinite"
                path={`M${NODES[a].x},${NODES[a].y} L${NODES[b].x},${NODES[b].y}`}
              />
            </circle>
          ),
        )}

        {NODES.map((node, index) => {
          const isCenter = node.center;
          return (
            <g
              key={`node-${index}`}
              className="animate-network-node"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isCenter ? 3 : 1.6}
                fill="url(#heroNodeGlow)"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isCenter ? 2.5 : 1.4}
                fill="none"
                stroke="hsl(var(--decorative))"
                strokeWidth={isCenter ? 0.3 : 0.22}
                strokeOpacity="0.6"
                className="animate-network-ring"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isCenter ? 1.5 : 0.8}
                fill="none"
                stroke="hsl(var(--decorative))"
                strokeWidth={isCenter ? 0.22 : 0.18}
                strokeOpacity="0.75"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isCenter ? 0.6 : 0.35}
                fill="hsl(var(--primary))"
                className="animate-network-dot"
                style={{ animationDelay: `${index * 0.25}s` }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
