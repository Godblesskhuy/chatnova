'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimProps {
  to: number;
  suffix?: string;
  className?: string;
}

export function Anim({ to, suffix = '', className }: AnimProps) {
  const [v, setV] = useState(0);

  useEffect(() => {
    let c = 0;
    const st = Math.max(1, Math.floor(to / 30));
    const timer = setInterval(() => {
      c += st;
      if (c >= to) {
        c = to;
        clearInterval(timer);
      }
      setV(c);
    }, 25);
    return () => clearInterval(timer);
  }, [to]);

  return (
    <span className={cn(className)}>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}
