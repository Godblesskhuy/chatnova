'use client';

import { cn } from '@/lib/utils';

interface ToggleProps {
  on: boolean;
  onToggle: () => void;
  className?: string;
}

export function Toggle({ on, onToggle, className }: ToggleProps) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        'w-10 h-[22px] rounded-[11px] cursor-pointer relative transition-all duration-200 flex-shrink-0',
        className
      )}
      style={{
        background: on ? '#34D399' : 'rgba(255,255,255,0.1)',
      }}
    >
      <div
        className="w-[18px] h-[18px] rounded-full bg-white absolute top-[2px] transition-all duration-200 shadow-md"
        style={{
          left: on ? 20 : 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}
