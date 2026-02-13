import React from 'react';

const SVGEdge = ({ edge, sourceNode, targetNode, showRelationship, hoveredNode, darkMode, getTextWidth, getTextColor }) => {
  if (!sourceNode || !targetNode) return null;

  const sourceRadius = (sourceNode.animatedSize ?? sourceNode.size ?? 30);
  const targetRadius = (targetNode.animatedSize ?? targetNode.size ?? 30);

  // Calculate angle between nodes
  const dx = targetNode.position.x - sourceNode.position.x;
  const dy = targetNode.position.y - sourceNode.position.y;
  const angle = Math.atan2(dy, dx);

  // Calculate start and end points (on the edge of the circles, inset by 4px for arrowheads)
  const startX = sourceNode.position.x + (sourceRadius + 4) * Math.cos(angle);
  const startY = sourceNode.position.y + (sourceRadius + 4) * Math.sin(angle);
  const endX = targetNode.position.x - (targetRadius + 4) * Math.cos(angle);
  const endY = targetNode.position.y - (targetRadius + 4) * Math.sin(angle);

  // Label position (middle of the line)
  const labelX = (startX + endX) / 2;
  const labelY = (startY + endY) / 2;

  const showLabel = showRelationship || hoveredNode === edge.from || hoveredNode === edge.to;

  return (
    <g>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={edge.color}
        strokeWidth="2"
        markerEnd="url(#arrow-end)"
        markerStart="url(#arrow-start)"
      />
      {showLabel && (
        <>
          <rect
            x={labelX - getTextWidth(edge.label) / 2}
            y={labelY - 8}
            width={getTextWidth(edge.label)}
            height="16"
            fill={darkMode ? "rgb(34, 33, 33)" : "rgba(255, 255, 255, 0.9)"}
            stroke={edge.color}
            strokeWidth="1"
            rx="3"
          />
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill={getTextColor(darkMode)}
            className="select-none font-medium"
            style={{
              textShadow: darkMode
                ? '1px 1px 2px rgba(0,0,0,0.8)'
                : '1px 1px 2px rgba(255,255,255,0.8)'
            }}
          >
            {edge.label}
          </text>
        </>
      )}
    </g>
  );
};

export default SVGEdge;
