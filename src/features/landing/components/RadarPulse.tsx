import { motion } from "motion/react";

type ProfessionalType = "avocat" | "notaire" | "huissier";

interface RadarNode {
  x: number;
  y: number;
  type: ProfessionalType;
  label: string;
}

const nodes: RadarNode[] = [
  { x: 320, y: 110, type: "avocat", label: "Avocat" },
  { x: 90, y: 260, type: "notaire", label: "Notaire" },
  { x: 290, y: 320, type: "huissier", label: "Huissier" },
];

const nearestNode = nodes[0];

const initials: Record<ProfessionalType, string> = {
  avocat: "A",
  notaire: "N",
  huissier: "H",
};

export function RadarPulse() {
  return (
    <div className="relative mx-auto aspect-square max-w-md">
      {/* halo ambiant derrière le radar */}
      <div className="absolute inset-0 rounded-full bg-signal/10 blur-3xl" />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        role="img"
        aria-label="Recherche du professionnel du droit disponible le plus proche"
      >
        <defs>
          <radialGradient id="scope-fade" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-signal)"
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor="var(--color-signal)"
              stopOpacity="0"
            />
          </radialGradient>
          <linearGradient id="sweep-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0" />
            <stop
              offset="100%"
              stopColor="var(--color-signal)"
              stopOpacity="0.4"
            />
          </linearGradient>
        </defs>

        {/* grille fixe façon écran radar */}
        <g stroke="var(--color-paper)" strokeOpacity="0.08" strokeWidth="1">
          <circle cx={200} cy={200} r={60} fill="none" />
          <circle cx={200} cy={200} r={110} fill="none" />
          <circle cx={200} cy={200} r={160} fill="none" />
          <line x1={200} y1={20} x2={200} y2={380} />
          <line x1={20} y1={200} x2={380} y2={200} />
        </g>

        {/* faisceau rotatif — l'élément signature */}
        <motion.g
          style={{ transformOrigin: "200px 200px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M200,200 L200,20 A180,180 0 0,1 336,80 Z"
            fill="url(#sweep-fade)"
          />
        </motion.g>

        {/* anneaux de pulsation (allégés) */}
        {[0, 1].map((i) => (
          <motion.circle
            key={i}
            cx={200}
            cy={200}
            r={20}
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth={1.5}
            initial={{ r: 20, opacity: 0.6 }}
            animate={{ r: 170, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* ligne de connexion vers le professionnel le plus proche */}
        <motion.line
          x1={200}
          y1={200}
          x2={nearestNode.x}
          y2={nearestNode.y}
          stroke="var(--color-signal)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeInOut" }}
        />

        {/* nœuds professionnels */}
        {nodes.map((node, i) => {
          const isNearest = node === nearestNode;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isNearest ? 14 : 10}
                fill={isNearest ? "var(--color-signal)" : "var(--color-ink)"}
                stroke={
                  isNearest ? "var(--color-signal)" : "var(--color-brass)"
                }
                strokeWidth={1.5}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                fontWeight={600}
                fill={isNearest ? "var(--color-ink)" : "var(--color-brass)"}
              >
                {initials[node.type]}
              </text>
              {isNearest && (
                <motion.text
                  x={node.x}
                  y={node.y - 22}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--color-paper)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ delay: 2, duration: 0.4 }}
                >
                  {node.label} · 4 min
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* position de l'utilisateur — traité comme un sceau/cachet officiel */}
        <circle cx={200} cy={200} r={14} fill="url(#scope-fade)" />

        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
        >
          {/* anneau extérieur crénelé, façon cachet de cire */}
          <circle
            cx={200}
            cy={200}
            r={13}
            fill="none"
            stroke="var(--color-brass)"
            strokeWidth={1.5}
            strokeDasharray="2 2.4"
          />
          {/* disque */}
          <circle cx={200} cy={200} r={9} fill="var(--color-paper)" />
          {/* point central */}
          <circle cx={200} cy={200} r={2.5} fill="var(--color-ink)" />
        </motion.g>
      </svg>
    </div>
  );
}
