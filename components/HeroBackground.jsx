/**
 * Hero background — "Global Fabric"
 * Articulates: distributed scale, multi-region redundancy, observable pipelines.
 *
 *  - Isometric meridian arcs (planetary / multi-region fabric)
 *  - Region nodes with steady heartbeat (uptime / SLO)
 *  - Inter-region replication packets traveling along arcs (animateMotion)
 *  - Stacked platform slabs that build in layer-by-layer (our profile pillars)
 *  - Quiet blueprint grid + ambient wash for depth
 *
 * Monochromatic: primary (teal/cyan) + decorative (turquoise). No childish shapes.
 */

const VB_W = 1200;
const VB_H = 720;
const CX = 760;
const CY = 380;

// Concentric "meridian" arcs — suggest a globe / fabric without literal earth.
const ARCS = [
  { rx: 520, ry: 130, rot: -8, op: 0.16 },
  { rx: 460, ry: 200, rot: -8, op: 0.2 },
  { rx: 380, ry: 280, rot: -8, op: 0.22 },
  { rx: 280, ry: 340, rot: -8, op: 0.18 },
  { rx: 160, ry: 360, rot: -8, op: 0.12 },
];

// Region nodes positioned along the fabric.
const REGIONS = [
  { x: 280, y: 300, label: 'us-west', delay: 0.0, primary: true },
  { x: 460, y: 200, label: 'us-east', delay: 0.6 },
  { x: 700, y: 160, label: 'eu-west', delay: 1.2 },
  { x: 940, y: 240, label: 'eu-north', delay: 1.8 },
  { x: 1060, y: 440, label: 'ap-east', delay: 2.4 },
  { x: 820, y: 540, label: 'ap-south', delay: 3.0 },
  { x: 520, y: 520, label: 'sa-east', delay: 1.5 },
];

// Replication paths between regions (cubic curves above the plane).
const LINKS = [
  { d: 'M 280 300 C 360 140, 580 100, 700 160', dur: 4.2, delay: 0.0 },
  { d: 'M 700 160 C 820 130, 920 180, 940 240', dur: 3.6, delay: 0.8 },
  { d: 'M 940 240 C 1040 320, 1100 380, 1060 440', dur: 4.0, delay: 1.4 },
  { d: 'M 1060 440 C 980 520, 900 540, 820 540', dur: 3.4, delay: 0.4 },
  { d: 'M 820 540 C 700 580, 600 560, 520 520', dur: 3.8, delay: 2.0 },
  { d: 'M 520 520 C 380 460, 280 400, 280 300', dur: 4.4, delay: 1.0 },
  {
    d: 'M 460 200 C 580 140, 640 140, 700 160',
    dur: 3.2,
    delay: 1.6,
    reverse: true,
  },
  { d: 'M 280 300 C 380 260, 420 220, 460 200', dur: 3.0, delay: 0.2 },
];

const HeroBackground = () => {
  return (
    <div className="hero-fabric absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ambient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 70% 45%, hsl(var(--primary) / 0.16) 0%, transparent 65%)',
        }}
      />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground) / 0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 75% 70% at 65% 50%, black 25%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 70% at 65% 50%, black 25%, transparent 80%)',
        }}
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="fabricGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.35"
            />
            <stop
              offset="70%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.04"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0"
            />
          </radialGradient>
          <radialGradient id="regionGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="hsl(var(--decorative))"
              stopOpacity="0.55"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--decorative))"
              stopOpacity="0"
            />
          </radialGradient>
          <linearGradient id="linkStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop
              offset="50%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.55"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Fabric core glow */}
        <ellipse cx={CX} cy={CY} rx={380} ry={260} fill="url(#fabricGlow)" />

        {/* Meridian arcs */}
        <g style={{ transformOrigin: `${CX}px ${CY}px` }}>
          {ARCS.map((a, i) => (
            <ellipse
              key={`arc-${i}`}
              cx={CX}
              cy={CY}
              rx={a.rx}
              ry={a.ry}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity={a.op}
              strokeWidth={1}
              transform={`rotate(${a.rot} ${CX} ${CY})`}
              style={{
                transformOrigin: `${CX}px ${CY}px`,
                animation: `arc-breathe 9s ease-in-out ${i * 0.7}s infinite`,
              }}
            />
          ))}
          {/* Equator highlight */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={500}
            ry={120}
            fill="none"
            stroke="hsl(var(--decorative))"
            strokeOpacity={0.18}
            strokeWidth={1}
            strokeDasharray="2 8"
            transform={`rotate(-8 ${CX} ${CY})`}
          />
        </g>

        {/* Replication links + traveling packets */}
        {LINKS.map((l, i) => (
          <g key={`link-${i}`}>
            <path
              d={l.d}
              fill="none"
              stroke="url(#linkStroke)"
              strokeWidth={1}
              opacity={0.7}
            />
            {/* Packet */}
            <circle
              r={2.4}
              fill="hsl(var(--decorative))"
              style={{ filter: 'drop-shadow(0 0 4px hsl(var(--decorative)))' }}
            >
              <animateMotion
                dur={`${l.dur}s`}
                begin={`${l.delay}s`}
                repeatCount="indefinite"
                path={l.d}
                keyPoints={l.reverse ? '1;0' : '0;1'}
                keyTimes="0;1"
              />
            </circle>
            {/* Trailing pip */}
            <circle r={1.2} fill="hsl(var(--primary))" opacity={0.7}>
              <animateMotion
                dur={`${l.dur}s`}
                begin={`${l.delay + 0.25}s`}
                repeatCount="indefinite"
                path={l.d}
                keyPoints={l.reverse ? '1;0' : '0;1'}
                keyTimes="0;1"
              />
            </circle>
          </g>
        ))}

        {/* Region nodes */}
        {REGIONS.map((r, i) => (
          <g key={`region-${i}`}>
            <circle
              cx={r.x}
              cy={r.y}
              r={r.primary ? 22 : 14}
              fill="url(#regionGlow)"
            />
            <circle
              cx={r.x}
              cy={r.y}
              r={r.primary ? 4.5 : 3}
              fill="hsl(var(--primary))"
              style={{ filter: 'drop-shadow(0 0 6px hsl(var(--primary)))' }}
            />
            <circle
              cx={r.x}
              cy={r.y}
              r={r.primary ? 10 : 7}
              fill="none"
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth={1}
              style={{
                transformOrigin: `${r.x}px ${r.y}px`,
                animation: `region-ping 3.6s ease-out ${r.delay}s infinite`,
              }}
            />
            {/* Region label tick */}
            <text
              x={r.x + (r.primary ? 14 : 10)}
              y={r.y + 3}
              fill="hsl(var(--muted-foreground))"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              opacity={0.55}
            >
              {r.label}
            </text>
          </g>
        ))}

        {/* Brand watermark — stacked platform slabs labeled with our profile pillars.
            Slab faces use background color to punch through the fabric; labels + icons
            sit on top in primary color. */}
        {(() => {
          // Isometric slab geometry (smaller, tighter stack)
          const W = 108; // half-width (x)
          const H = 86; // half-depth (y) — steeper edge angle
          const SIDE = 10; // slab thickness
          const STEP = 28; // vertical spacing — tighter stack, roughly half previous

          // Icon renderers (24x24 viewbox, drawn at origin, scaled inline)
          const icons = {
            shield: (
              <path d="M12 2 L20 5 V11 C20 16 16 20 12 22 C8 20 4 16 4 11 V5 Z" />
            ),
            gauge: (
              <>
                <path d="M4 14 A8 8 0 0 1 20 14" />
                <path d="M12 14 L16 9" />
                <circle cx="12" cy="14" r="1.2" />
              </>
            ),
            activity: <path d="M3 12 H7 L10 5 L14 19 L17 12 H21" />,
            server: (
              <>
                <rect x="3" y="4" width="18" height="6" rx="1" />
                <rect x="3" y="14" width="18" height="6" rx="1" />
                <circle cx="7" cy="7" r="0.8" />
                <circle cx="7" cy="17" r="0.8" />
              </>
            ),
          };

          // Extra icons for the new layers
          const extraIcons = {
            check: (
              <>
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12 L11 15 L16 9" />
              </>
            ),
            brackets: (
              <>
                <path d="M9 4 L5 12 L9 20" />
                <path d="M15 4 L19 12 L15 20" />
              </>
            ),
            zap: <path d="M13 3 L5 13 H11 L10 21 L18 11 H12 Z" />,
          };

          // Top → bottom: API → Security → Reliability → Performance → Scalability → Observability → Infrastructure
          const layers = [
            { label: 'API-FIRST', icon: extraIcons.brackets, delay: '3.0s' },
            { label: 'SECURITY', icon: icons.shield, delay: '2.4s' },
            { label: 'RELIABILITY', icon: extraIcons.check, delay: '1.8s' },
            { label: 'PERFORMANCE', icon: extraIcons.zap, delay: '1.2s' },
            { label: 'SCALABILITY', icon: icons.gauge, delay: '0.9s' },
            { label: 'OBSERVABILITY', icon: icons.activity, delay: '0.6s' },
            { label: 'INFRASTRUCTURE', icon: icons.server, delay: '0s' },
          ];

          // Edge angle of the front-right edge of the top face: from (0,0) to (W,-H)
          const edgeAngleDeg = (Math.atan2(-H, W) * 180) / Math.PI; // ≈ -26.57

          return (
            <g
              className="hero-slabs"
              transform={`translate(${CX} ${CY + 130})`}
              style={{
                filter: 'drop-shadow(0 0 18px hsl(var(--primary) / 0.35))',
              }}
            >
              {(() => {
                const N = layers.length;
                const STAGGER = 0.35; // seconds between each layer reveal
                const DUR = 0.55; // seconds for each layer to fade in
                return [...layers].reverse().map((l, rev) => {
                  const i = layers.length - 1 - rev;
                  const yOffset = -STEP * (layers.length - 1 - i);
                  const faceOp = 0.9 - i * 0.05;
                  const sideOpR = 0.62 - i * 0.04;
                  const sideOpL = 0.44 - i * 0.03;
                  // Bottom layer (i = N-1) appears first
                  const order = N - 1 - i;
                  const delay = order * STAGGER;
                  return (
                    <g key={`slab-${i}`} transform={`translate(0 ${yOffset})`}>
                      <g
                        style={{
                          animation: `slab-reveal ${DUR}s ease-out ${delay}s forwards`,
                          transformOrigin: '0 0',
                          opacity: 0,
                        }}
                      >
                        {/* Slab faces — background color to mask fabric */}
                        <g fill="hsl(var(--background))" opacity={0.92}>
                          <polygon
                            points={`0,0 ${W},-${H} 0,-${H * 2} -${W},-${H}`}
                            fillOpacity={faceOp}
                          />
                          <polygon
                            points={`0,0 ${W},-${H} ${W},-${H - SIDE} 0,${SIDE}`}
                            fillOpacity={sideOpR}
                          />
                          <polygon
                            points={`0,0 -${W},-${H} -${W},-${H - SIDE} 0,${SIDE}`}
                            fillOpacity={sideOpL}
                          />
                        </g>
                        {/* Top face outline */}
                        <polygon
                          points={`0,0 ${W},-${H} 0,-${H * 2} -${W},-${H}`}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeOpacity={0.4}
                          strokeWidth={1}
                        />
                        {/* Label — centered on the front-right edge of the top face */}
                        <g
                          transform={`translate(${W / 2} ${-H / 2}) rotate(${edgeAngleDeg})`}
                          opacity={0.95}
                        >
                          <text
                            x={0}
                            y={-6}
                            textAnchor="middle"
                            fontSize="10"
                            fontFamily="JetBrains Mono, monospace"
                            letterSpacing="2"
                            fontWeight={600}
                            fill="hsl(var(--primary))"
                          >
                            {l.label}
                          </text>
                        </g>
                        {/* Icon — centered on the top face, rotated to match label angle */}
                        <g
                          transform={`translate(0 ${-H}) rotate(${edgeAngleDeg})`}
                          opacity={0.95}
                        >
                          <g
                            transform="scale(1.31) translate(-12 -12)"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {l.icon}
                          </g>
                        </g>
                      </g>
                    </g>
                  );
                });
              })()}
            </g>
          );
        })()}
      </svg>

      {/* Edge fades */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, hsl(var(--background)), transparent)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            'linear-gradient(to top, hsl(var(--background)), transparent)',
        }}
      />

      {/* Left readability veil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 33%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)',
        }}
      />

      <style>{`
        @keyframes arc-breathe {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.012); }
        }
        @keyframes region-ping {
          0%   { transform: scale(1);   opacity: 0.8; }
          80%  { transform: scale(3.6); opacity: 0; }
          100% { transform: scale(3.6); opacity: 0; }
        }
        @keyframes slab-reveal {
          0%   { opacity: 0; transform: translateY(12px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fabric [style*="animation"] { animation: none !important; opacity: 1 !important; }
        }
        /* On narrow viewports the slab stack lands behind the hero copy and
           hurts legibility — hide just the watermark; arcs/regions stay. */
        @media (max-width: 1023px) {
          .hero-fabric .hero-slabs { display: none; }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;
