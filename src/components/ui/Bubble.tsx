'use client';

import { cn } from '@/lib/utils';

const GOLD = '#D4A853';
const TEXT = '#F5F5F4';
const BORDER = 'rgba(255,255,255,0.06)';
const BG_HOVER = '#161619';

interface BubbleProps {
  role: 'user' | 'assistant';
  text: string;
  time: string;
  className?: string;
}

export function Bubble({ role, text, time, className }: BubbleProps) {
  const u = role === 'user';

  return (
    <div className={cn('flex mb-1', u ? 'justify-end' : 'justify-start', className)}>
      <div className="max-w-[72%]">
        <div
          className="px-[15px] py-[11px] text-[13px] leading-[1.6] whitespace-pre-line rounded-[14px]"
          style={{
            borderRadius: u ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
            background: u ? GOLD : BG_HOVER,
            color: u ? '#000' : TEXT,
            fontWeight: u ? 500 : 400,
            border: u ? 'none' : `1px solid ${BORDER}`,
          }}
        >
          {text}
        </div>
        <div
          className="text-[10px] mt-[3px] px-1"
          style={{
            color: '#6B6B6F',
            textAlign: u ? 'right' : 'left',
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}
