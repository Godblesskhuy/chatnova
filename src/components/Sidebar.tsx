'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Users,
  Volume2,
  BookOpen,
  ShoppingBag,
  Bot,
  MessageCircle,
  CreditCard,
  Calendar,
  Settings,
  ChevronRight,
  Zap,
} from 'lucide-react';

const GOLD = '#D4A853';
const GOLD_DIM = 'rgba(212,168,83,0.12)';
const BG_SIDE = '#0C0C0E';
const BG_CARD = '#111113';
const TEXT = '#F5F5F4';
const TEXT_DIM = '#6B6B6F';
const TEXT_MUTED = '#9A9A9E';
const BORDER = 'rgba(255,255,255,0.06)';
const GREEN = '#34D399';
const GREEN_DIM = 'rgba(52,211,153,0.1)';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  d: true;
  label: string;
}

interface SidebarProps {
  businessName?: string;
  businessAvatar?: string;
  userName?: string;
  userRole?: string;
  daysLeft?: number;
  planUsed?: number;
  isPro?: boolean;
  activePage: string;
  onNavigate: (id: string) => void;
  notifications?: { icon: string; text: string; time: string }[];
}

export function Sidebar({
  businessName = 'Brew Lab Coffee',
  businessAvatar = '☕',
  userName = 'Usukh Bayar',
  userRole = 'Админ',
  daysLeft = 20,
  planUsed = 33,
  isPro = true,
  activePage,
  onNavigate,
  notifications = [],
}: SidebarProps) {
  const navSections: (NavItem | NavSection)[] = [
    { id: 'dashboard', label: 'Хянах самбар', icon: <LayoutDashboard size={18} /> },
    { id: 'messages', label: 'Мессеж', icon: <MessageSquare size={18} />, badge: 3 },
    { id: 'analytics', label: 'Аналитик', icon: <BarChart3 size={18} /> },
    { id: 'contacts', label: 'Харилцагчид', icon: <Users size={18} /> },
    { id: 'broadcast', label: 'Broadcast', icon: <Volume2 size={18} /> },
    { d: true, label: 'AI & КОНТЕНТ' },
    { id: 'knowledge', label: 'Мэдлэгийн сан', icon: <BookOpen size={18} /> },
    { id: 'products', label: 'Бүтээгдэхүүн', icon: <ShoppingBag size={18} /> },
    { id: 'ai-config', label: 'AI тохиргоо', icon: <Bot size={18} /> },
    { id: 'comments', label: 'Comment Reply', icon: <MessageCircle size={18} /> },
    { d: true, label: 'ЗАХИАЛГА' },
    { id: 'orders', label: 'Захиалга', icon: <CreditCard size={18} /> },
    { id: 'schedule', label: 'Цаг захиалга', icon: <Calendar size={18} /> },
    { d: true, label: 'ТОХИРГОО' },
    { id: 'settings', label: 'Тохиргоо', icon: <Settings size={18} /> },
  ];

  return (
    <aside
      className="w-[230px] flex-shrink-0 flex flex-col h-full"
      style={{ background: BG_SIDE, borderRight: `1px solid ${BORDER}` }}
    >
      {/* Logo */}
      <div className="px-[18px] py-[18px] pb-[14px] flex items-center gap-2-5">
        <div
          className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${GOLD}, #E8C97A)`,
          }}
        >
          <MessageSquare size={15} strokeWidth={2.5} color="#000" />
        </div>
        <span className="text-[17px] font-bold">
          Chat<span style={{ color: GOLD }}>Nova</span>
        </span>
      </div>

      {/* Business Selector */}
      <div
        className="mx-[10px] mb-[10px] px-3 py-2 rounded-xl border flex items-center gap-2-5 cursor-pointer"
        style={{ background: BG_CARD, borderColor: BORDER }}
      >
        <div
          className="w-[26px] h-[26px] rounded-md flex items-center justify-center text-[12px]"
          style={{ background: GOLD_DIM }}
        >
          {businessAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold truncate" style={{ color: TEXT }}>
            {businessName}
          </div>
          <div
            className="text-[10px] flex items-center gap-1"
            style={{ color: GREEN }}
          >
            <span style={{ color: GREEN, width: 6, height: 6, borderRadius: 3, background: GREEN, display: 'inline-block' }} />
            Идэвхтэй
          </div>
        </div>
        <span style={{ color: TEXT_DIM, transform: 'rotate(90deg)', display: 'flex' }}>
          <ChevronRight size={14} />
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto px-[6px] py-0">
        {navSections.map((item, i) => {
          if ('d' in item) {
            return (
              <div
                key={i}
                className="px-3 pt-4 pb-1-5 text-[10px] font-semibold"
                style={{ color: TEXT_DIM, letterSpacing: '0.1em' }}
              >
                {item.label}
              </div>
            );
          }
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-2-5 px-3 py-2 rounded-lg mb-[2px] transition-all duration-[150ms] text-left relative',
                active ? 'font-semibold' : 'font-normal'
              )}
              style={{
                background: active ? GOLD_DIM : 'transparent',
                color: active ? GOLD : TEXT_DIM,
              }}
            >
              {active && (
                <div
                  className="absolute left-0 top-[25%] bottom-[25%] w-[2px] rounded"
                  style={{ background: GOLD }}
                />
              )}
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className="text-[10px] font-bold px-[7px] py-[1px] rounded-[8px]"
                  style={{ background: GOLD, color: '#000' }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Pro Banner */}
      <div
        className="mx-[10px] mb-[10px] p-3 rounded-xl border"
        style={{
          background: `linear-gradient(135deg, rgba(212,168,83,0.06), ${BG_CARD})`,
          borderColor: GOLD_DIM,
        }}
      >
        <div className="flex items-center gap-1-5 mb-1-5">
          <span
            className="text-[9px] font-bold px-[7px] py-[2px] rounded"
            style={{ background: GOLD, color: '#000' }}
          >
            PRO
          </span>
          <span className="text-[10px]" style={{ color: TEXT_DIM }}>
            {daysLeft} өдөр үлдсэн
          </span>
        </div>
        <div
          className="h-[3px] rounded overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <div
            className="h-full rounded"
            style={{
              width: `${planUsed}%`,
              background: `linear-gradient(90deg, ${GOLD}, #E8C97A)`,
            }}
          />
        </div>
      </div>

      {/* User */}
      <div
        className="px-3 py-3 border-t flex items-center gap-2-5"
        style={{ borderColor: BORDER }}
      >
        <div
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[12px] font-semibold"
          style={{ background: GOLD_DIM, color: GOLD }}
        >
          {userName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold truncate" style={{ color: TEXT }}>
            {userName}
          </div>
          <div className="text-[10px]" style={{ color: TEXT_DIM }}>
            {userRole}
          </div>
        </div>
      </div>
    </aside>
  );
}
