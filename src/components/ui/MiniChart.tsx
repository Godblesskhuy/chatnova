'use client';

import { cn } from '@/lib/utils';

interface MiniChartProps {
  data: number[];
  color: string;
  height?: number;
  className?: string;
}

export function MiniChart({ data, color, height: h = 44, className }: MiniChartProps) {
  const mx = Math.max(...data);
  const mn = Math.min(...data);
  const r = mx - mn || 1;
  const w = 100;

  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - mn) / r) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  const uid = 'g' + color.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);

  return (
    <svg
      width="100%"
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn('block', className)}
    >
      <defs>
        <linearGradient id={uid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${uid})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
