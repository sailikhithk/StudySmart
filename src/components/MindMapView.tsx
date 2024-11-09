import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { MindMapNode, MindMapLink } from '../types/learning';

interface MindMapViewProps {
  nodes: MindMapNode[];
  links: MindMapLink[];
}

export default function MindMapView({ nodes, links }: MindMapViewProps) {
  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg">
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeLabel="name"
        nodeColor={(node: any) => node.color || '#1d4ed8'}
        linkColor={() => '#94a3b8'}
        nodeRelSize={6}
        linkWidth={1}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
}