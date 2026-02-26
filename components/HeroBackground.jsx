const NODES = [
  { x: 55, y: 15 },
  { x: 75, y: 10 },
  { x: 90, y: 25 },
  { x: 65, y: 35 },
  { x: 80, y: 45 },
  { x: 95, y: 55 },
  { x: 60, y: 55 },
  { x: 72, y: 65 },
  { x: 85, y: 75 },
  { x: 55, y: 78 },
  { x: 70, y: 85 },
  { x: 92, y: 40 },
  { x: 50, y: 40 },
  { x: 78, y: 28 },
];

const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [2, 4],
  [3, 4],
  [3, 6],
  [4, 5],
  [4, 7],
  [6, 7],
  [7, 8],
  [8, 9],
  [8, 10],
  [9, 10],
  [2, 11],
  [5, 11],
  [0, 12],
  [6, 12],
  [1, 13],
  [2, 13],
  [3, 13],
  [5, 8],
];

export default function HeroBackground() {
  return (
    <div className="hero-network" aria-hidden="true">
      <svg
        className="hero-network-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="heroNodeGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="hsl(var(--decorative))"
              stopOpacity="0.4"
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
            strokeOpacity="0.12"
            strokeWidth="0.15"
            className="animate-network-line"
            style={{ animationDelay: `${index * 0.15}s` }}
          />
        ))}

        {CONNECTIONS.filter((_, index) => index % 3 === 0).map(
          ([a, b], index) => (
            <circle
              key={`pulse-${index}`}
              r="0.3"
              fill="hsl(var(--primary))"
              opacity="0.6"
            >
              <animateMotion
                dur={`${3 + index * 0.7}s`}
                repeatCount="indefinite"
                path={`M${NODES[a].x},${NODES[a].y} L${NODES[b].x},${NODES[b].y}`}
              />
            </circle>
          ),
        )}

        {NODES.map((node, index) => (
          <g
            key={`node-${index}`}
            className="animate-network-node"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <circle cx={node.x} cy={node.y} r="2.5" fill="url(#heroNodeGlow)" />
            <circle
              cx={node.x}
              cy={node.y}
              r="1.4"
              fill="none"
              stroke="hsl(var(--decorative))"
              strokeWidth="0.15"
              strokeOpacity="0.35"
              className="animate-network-ring"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="0.8"
              fill="none"
              stroke="hsl(var(--decorative))"
              strokeWidth="0.12"
              strokeOpacity="0.5"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="0.35"
              fill="hsl(var(--primary))"
              className="animate-network-dot"
              style={{ animationDelay: `${index * 0.25}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
