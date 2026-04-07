'use client';

import { cn } from '@/lib/utils';
import { MiniChart } from './MiniChart';
import { Anim } from './Anim';
import {
  MessageSquare,
  Bot,
  Users,
  CreditCard,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const GOLD = '#D4A853';
const GREEN = '#34D399';
const BLUE = '#60A5FA';
const PURPLE = '#A78BFA';
const BORDER = 'rgba(255,255,255,0.06)';
const BG_CARD = '#111113';
const TEXT = '#F5F5F4';
const TEXT_DIM = '#6B6B6F';

interface DStatProps {
  label: string;
  value: number;
  suffix?: string;
  change?: string;
  pos?: boolean;
  icon: React.ReactNode;
  color: string;
  chart?: number[];
  className?: string;
}

export function DStat({
  label,
  value,
  suffix,
  change,
  pos,
  icon,
  color,
  chart,
  className,
}: DStatProps) {
  return (
    <div
      className={cn('dstat rounded-2xl p-5 border relative overflow-hidden', className)}
      style={{ background: BG_CARD, borderColor: BORDER }}
    >
      <div className="flex justify-between items-start mb-2-5">
        <div>
          <div className="text-[12px] mb-2 font-medium" style={{ color: TEXT_DIM }}>
            {label}
          </div>
          <div
            className="text-[28px] font-bold tracking-tight"
            style={{ color: TEXT, lineHeight: 1 }}
          >
            <Anim to={value} suffix={suffix} />
          </div>
        </div>
        <div
          className="w-[38px] h-[38px] rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, color }}
        >
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1 text-[11px] mb-2-5">
          <span
            className="flex items-center gap-0-5"
            style={{ color: pos ? GREEN : '#F87171' }}
          >
            {pos ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {change}
          </span>
          <span style={{ color: TEXT_DIM }}>7 хоногоос</span>
        </div>
      )}
      {chart && <MiniChart data={chart} color={color} />}
    </div>
  );
}

// Pre-built stat cards
export function MessagesStat({ value, change, chart }: { value: number; change: string; chart: number[] }) {
  return (
    <DStat
      label="Нийт мессеж"
      value={value}
      change={change}
      pos
      icon={<MessageSquare size={18} />}
      color={GOLD}
      chart={chart}
    />
  );
}

export function AIResponsesStat({ value, change, chart }: { value: number; change: string; chart: number[] }) {
  return (
    <DStat
      label="AI хариулт"
      value={value}
      change={change}
      pos
      icon={<Bot size={18} />}
      color={GREEN}
      chart={chart}
    />
  );
}

export function NewCustomersStat({ value, change, chart }: { value: number; change: string; chart: number[] }) {
  return (
    <DStat
      label="Шинэ харилцагч"
      value={value}
      change={change}
      pos
      icon={<Users size={18} />}
      color={BLUE}
      chart={chart}
    />
  );
}

export function RevenueStat({ value, change, chart }: { value: number; change: string; chart: number[] }) {
  return (
    <DStat
      label="Орлого"
      value={value}
      suffix="₮"
      change={change}
      pos
      icon={<CreditCard size={18} />}
      color={PURPLE}
      chart={chart}
    />
  );
}
