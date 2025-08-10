import { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { motion } from "framer-motion";

const data = {
  nodes: [
    { id: "Raj Kumar", group: 1 },
    { id: "Anjali Sharma", group: 2 },
    { id: "Sunil Gupta", group: 2 },
    { id: "Sita Verma", group: 3 },
  ],
  links: [
    { source: "Raj Kumar", target: "Anjali Sharma" },
    { source: "Raj Kumar", target: "Sunil Gupta" },
    { source: "Sunil Gupta", target: "Sita Verma" },
  ],
};

// Custom colors for groups for better contrast
const groupColors = {
  1: "#2563eb", // blue-600
  2: "#7c3aed", // purple-700
  3: "#dc2626", // red-600
};

// ...rest of imports and data

export default function ConnectionsGraph() {
  const fgRef = useRef();

  return (
    <motion.div
      className="p-6 flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-extrabold text-white mb-6 tracking-wide">
        Connections Graph
      </h2>

      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 h-[600px]">
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          nodeColor={(node) => groupColors[node.group] || "#999"}
          nodeLabel="id"
          nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.id;
                const fontSize = 14 / globalScale;
                ctx.font = `${fontSize}px Arial Black, sans-serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map((n) => n + 8);

                // Position label slightly above the node circle (y - offset)
                const labelX = node.x;
                const labelY = node.y - 18; // adjust upward by 18 px

                // Lighter label background
                ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
                ctx.shadowColor = "rgba(0, 0, 0, 0)";
                ctx.shadowBlur = 3;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;

                // Rounded rect for label background
                const x = labelX - bckgDimensions[0] / 2;
                const y = labelY - bckgDimensions[1] / 2;
                const radius = 6;
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + bckgDimensions[0] - radius, y);
                ctx.quadraticCurveTo(x + bckgDimensions[0], y, x + bckgDimensions[0], y + radius);
                ctx.lineTo(x + bckgDimensions[0], y + bckgDimensions[1] - radius);
                ctx.quadraticCurveTo(
                    x + bckgDimensions[0],
                    y + bckgDimensions[1],
                    x + bckgDimensions[0] - radius,
                    y + bckgDimensions[1]
                );
                ctx.lineTo(x + radius, y + bckgDimensions[1]);
                ctx.quadraticCurveTo(x, y + bckgDimensions[1], x, y + bckgDimensions[1] - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.fill();

                ctx.shadowColor = "transparent";

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // Use white text for clarity on dark background
                ctx.fillStyle = "#ffffff"; // <-- changed here

                ctx.fillText(label, labelX, labelY);
            }}

          nodeRelSize={10}
          nodeVal={8}
          width={window.innerWidth * 0.85}
          height={600}
          linkDirectionalArrowLength={8}
          linkDirectionalArrowRelPos={0.85}  // move arrows closer to link end but away from node
          linkWidth={2}
          linkColor={() => "rgba(255, 255, 255, 0.6)"}
          cooldownTicks={100}
          enableNodeDrag={true}
          backgroundColor="transparent"
        />
      </div>
    </motion.div>
  );
}
