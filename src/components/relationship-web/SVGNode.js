import React from 'react';
import { wrapText } from '../../utils/graphUtils';

const SVGNode = ({
  node,
  darkMode,
  hoveredNode,
  pinnedNodeIds,
  autoPinnedNodeIds,
  showNumber,
  showImportance,
  showDescription,
  showRelationship,
  getNodeStrokeColor,
  getContrastTextColor,
  getTextColor,
  getTextWidth,
  onMouseDown,
  onMouseEnter,
  onMouseLeave
}) => {
  const size = node.animatedSize ?? node.size ?? 30;
  const textShadowStyle = {
    textShadow: darkMode
      ? '1px 1px 2px rgba(0,0,0,0.8)'
      : '1px 1px 2px rgba(255,255,255,0.8)'
  };

  return (
    <g>
      <circle
        cx={node.position.x}
        cy={node.position.y}
        r={size}
        fill={node.color}
        stroke={getNodeStrokeColor(darkMode, node.id)}
        strokeWidth={2}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* Pin icon overlay */}
      {(pinnedNodeIds.has(node.id) || autoPinnedNodeIds.has(node.id)) && (
        <g transform={`translate(${node.position.x + size * 0.3}, ${node.position.y - size * 1.0})`} pointerEvents="none">
          <g transform={`scale(${10 / 256})`}>
            <path fill="#C0392B" d="M394.6,81.1L161.5,314.3l18.1,18.1l115,115c9.5-30.7,12.6-63,7.1-93.7L445,210.3c22.1,0,45.7-4.7,67-11.8l-99.2-99.2L394.6,81.1z"/>
            <polygon fill="#BDC3C7" points="161.5,314.3 125.2,350.5 53.6,422.2 18.1,458.4 0,512 36.2,475.8 143.4,368.6 179.6,332.4 "/>
            <polygon fill="#7F8C8D" points="179.6,332.4 143.4,368.6 71.7,440.3 36.2,475.8 0,512 53.6,493.9 89.8,458.4 161.5,386.8 197.7,350.5 "/>
            <path fill="#E74C3C" d="M313.5,0c-7.1,21.3-12.6,44.9-11.8,67L157.5,210.3c-29.9-5.5-63-2.4-93.7,7.1l115,115L412,99.2 L313.5,0z"/>
          </g>
        </g>
      )}

      {/* Number above node - relationship count or importance rating */}
      {(showNumber || showImportance || hoveredNode === node.id) && (
        <text
          x={node.position.x}
          y={node.position.y - size - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="bold"
          fill={getContrastTextColor(node.color, darkMode)}
          className="select-none pointer-events-none"
          style={textShadowStyle}
        >
          {showImportance ? (node.importance || 0) : (node.relationshipCount || 0)}
        </text>
      )}

      {/* Character name with text wrapping */}
      <text
        x={node.position.x}
        y={node.position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="bold"
        fill={getTextColor(darkMode)}
        className="select-none pointer-events-none"
        style={textShadowStyle}
      >
        {(() => {
          const lines = wrapText(node.name, 72, 12, getTextWidth);
          const lineHeight = 14;
          const totalHeight = lines.length * lineHeight;
          const startY = -(totalHeight / 2) + (lineHeight / 2);
          return lines.map((line, index) => (
            <tspan key={index} x={node.position.x} dy={index === 0 ? startY : 14}>
              {line}
            </tspan>
          ));
        })()}
      </text>

      {/* Character description */}
      {(showDescription || hoveredNode === node.id) && node.role && (
        <text
          x={node.position.x}
          y={node.position.y}
          textAnchor="middle"
          fontSize="10"
          fill={getTextColor(darkMode)}
          className="select-none pointer-events-none"
          style={textShadowStyle}
        >
          {(() => {
            const lines = wrapText(node.role, 120, 10, getTextWidth);
            const lineHeight = 12;
            const startY = size + 15;
            return lines.map((line, index) => (
              <tspan key={index} x={node.position.x} dy={index === 0 ? startY : lineHeight}>
                {line}
              </tspan>
            ));
          })()}
        </text>
      )}
    </g>
  );
};

export default SVGNode;
