'use client'

// https://x6.antv.vision/zh/docs/tutorial/advanced/layout#%E5%B8%83%E5%B1%80%E6%B5%81%E7%A8%8B

import React, { useRef, useEffect } from 'react'
import { Graph } from '@antv/x6'
import './app.css'
import { DagreLayout } from "@antv/layout";
import { Graph as GraphLib } from '@antv/graphlib';

const data: any = {
  nodes: [],
  edges: [],
}

// 创建节点数据
for (let i = 1; i <= 12; i++) {
  data.nodes.push({
    id: i + '',
    shape: 'rect',
    width: 60,
    height: 30,
    label: i,
    data: {
      name: `node_${i}`,
    },
    attrs: {
      body: {
        fill: '#855af2',
        stroke: 'transparent',
      },
      label: {
        fill: '#ffffff',
      },
    },
  })
}

// 创建边数据
data.edges.push(
  ...[
    {
      id: 'e1',
      source: '1',
      target: '2',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e2',
      source: '2',
      target: '3',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e3',
      source: '2',
      target: '4',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e4',
      source: '4',
      target: '5',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e5',
      source: '4',
      target: '6',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e6',
      source: '4',
      target: '7',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e7',
      source: '4',
      target: '8',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e8',
      source: '5',
      target: '9',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e9',
      source: '6',
      target: '10',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e10',
      source: '7',
      target: '11',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'e11',
      source: '8',
      target: '12',
      data: {},
      attrs: {
        line: {
          stroke: '#fd6d6f',
          strokeWidth: 1,
        },
      },
    },
  ],
)

export default function X6Example() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const graph = new Graph({
      container: containerRef.current,
      grid: true,
      width: 800,
      height: 600,
    })

    // 使用 @antv/layout 的 DagreLayout
    const applyDagreLayout = async () => {
      try {
        // 创建 GraphLib 实例
        const graphLib = new GraphLib(data);
        
        // 创建 DagreLayout 实例
        const dagre = new DagreLayout({
          type: 'dagre',
          rankdir: 'LR',
          // align: 'UL',
          ranksep: 100,
          nodesep: 100,
          controlPoints: true,
        });

        // 执行布局算法
        const positions = await dagre.execute(graphLib);

        // 转换数据格式为 X6 可用的格式
        const layoutData = {
          nodes: positions.nodes.map((node: any) => {
            const originalNode = data.nodes.find((n: any) => n.id === node.id);
            return {
              ...originalNode,
              x: node.data.x,
              y: node.data.y,
            };
          }),
          edges: data.edges
        };

        // 加载数据到图形中
        graph.fromJSON(layoutData);
      } catch (error) {
        console.error('DagreLayout error:', error);
      }
    };

    applyDagreLayout();

    // 清理函数
    return () => {
      graph.dispose()
    }
  }, [])

  return (
    <div className="app">
      <div className="app-content" ref={containerRef} />
    </div>
  )
}