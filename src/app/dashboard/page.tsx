'use client';

import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Toggle } from '@/components/ui/Toggle';
import { Bubble } from '@/components/ui/Bubble';
import { cn } from '@/lib/utils';
import {
  Search,
  Bell,
  Plus,
  Send,
  ChevronRight,
} from 'lucide-react';

const GOLD = '#D4A853';
const GOLD_LIGHT = '#E8C97A';
const GOLD_DIM = 'rgba(212,168,83,0.12)';
const BG = '#08080A';
const BG_CARD = '#111113';
const BG_CARD_HOVER = '#18181B';
const BG_HOVER = '#161619';
const BG_INPUT = '#0E0E11';
const TEXT = '#F5F5F4';
const TEXT_DIM = '#6B6B6F';
const TEXT_MUTED = '#9A9A9E';
const BORDER = 'rgba(255,255,255,0.06)';
const GREEN = '#34D399';
const GREEN_DIM = 'rgba(52,211,153,0.1)';
const RED = '#F87171';
const RED_DIM = 'rgba(248,113,113,0.1)';
const BLUE = '#60A5FA';
const BLUE_DIM = 'rgba(96,165,250,0.1)';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  emoji: string;
  isActive: boolean;
}

interface Conversation {
  id: string;
  name: string;
  message: string;
  time: string;
  unread?: number;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function DashboardPage() {
  const [page, setPage] = useState('dashboard');
  const [activeConv, setActiveConv] = useState(0);
  const [msgInput, setMsgInput] = useState('');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Smoothie', price: '13,900', category: 'Хүйтэн ундаа', emoji: '🥤', isActive: true },
    { id: '2', name: 'Latte', price: '9,900 ~ 12,900', category: 'Халуун кофе', emoji: '☕', isActive: true },
    { id: '3', name: 'Americano', price: '7,900 ~ 9,900', category: 'Халуун кофе', emoji: '☕', isActive: true },
    { id: '4', name: 'Моча', price: '11,900', category: 'Халуун кофе', emoji: '🍫', isActive: false },
    { id: '5', name: 'Чийзкейк', price: '8,900', category: 'Бялуу', emoji: '🍰', isActive: true },
  ]);
  const [aiOn, setAiOn] = useState(true);
  const [selModel, setSelModel] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [page, activeConv]);

  const convs: Conversation[] = [
    { id: '1', name: 'Болд-Эрдэнэ', message: 'Latte захиалах боломжтой юу?', time: '12:45', unread: 2 },
    { id: '2', name: 'Сарнай', message: 'Баярлалаа! 🙏', time: '12:30' },
    { id: '3', name: 'Бат-Очир', message: 'Ажлын цаг хэд вэ?', time: '11:15', unread: 1 },
    { id: '4', name: 'Оюунтуяа', message: 'QPay-аар төлсөн', time: '10:42' },
    { id: '5', name: 'Тэмүүлэн', message: 'Smoothie хэдэн төгрөг вэ?', time: '09:58' },
    { id: '6', name: 'Ану', message: 'Захиалга амжилттай!', time: 'Өчигдөр' },
    { id: '7', name: 'Ганбаатар', message: 'Капучино байгаа юу?', time: 'Өчигдөр' },
  ];

  const msgs: Message[] = [
    { role: 'user', text: 'Сайн байна уу! Latte захиалмаар байна', time: '12:40' },
    { role: 'assistant', text: 'Сайн байна уу! 🙌\n\nLatte-ийн хэмжээгээ сонгоно уу:\n\n☕ Жижиг — 9,900₮\n☕ Том — 12,900₮', time: '12:40' },
    { role: 'user', text: 'Том', time: '12:42' },
    { role: 'assistant', text: 'Latte (Том) — 12,900₮\n\n💳 QPay төлбөрийн QR код илгээж байна...', time: '12:42' },
    { role: 'user', text: 'Төлсөн', time: '12:44' },
    { role: 'assistant', text: '✅ Төлбөр амжилттай!\n\n🧾 Баримт:\nLatte (Том) x1 — 12,900₮\nНийт: 12,900₮\n\nБаярлалаа! 15 минутад бэлэн болно ☕', time: '12:45' },
  ];

  const activities = [
    { icon: '💬', text: 'Болд-Эрдэнэ шинэ мессеж', time: '2 мин', color: GOLD_DIM },
    { icon: '💳', text: 'QPay төлбөр — 12,900₮', time: '5 мин', color: GREEN_DIM },
    { icon: '👤', text: 'Шинэ харилцагч: Сарнай', time: '12 мин', color: BLUE_DIM },
    { icon: '🤖', text: 'AI 3 мессежд хариулсан', time: '15 мин', color: GOLD_DIM },
    { icon: '💬', text: 'Comment reply илгээсэн', time: '28 мин', color: GREEN_DIM },
    { icon: '📢', text: 'Broadcast дууссан (45 хүн)', time: '1 цаг', color: BLUE_DIM },
    { icon: '⚠️', text: 'Token 30 хоногт дуусна', time: '3 цаг', color: RED_DIM },
  ];

  const dayChartData = [42, 55, 38, 67, 52, 78, 61, 45, 72, 88, 64, 91, 76, 83];

  const toggleProduct = (id: string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <div className="p-7">
            <div className="flex justify-between items-center mb-7">
              <div>
                <h1 className="text-[24px] font-bold mb-1 tracking-tight">
                  Хянах самбар
                </h1>
                <p className="text-[13px]" style={{ color: TEXT_DIM }}>
                  Бизнесийн тойм — 2026.04.07
                </p>
              </div>
              <div className="flex gap-2">
                {['7 хоног', '30 хоног', '90 хоног'].map((t, i) => (
                  <button
                    key={t}
                    className="px-3 py-[7px] rounded-lg text-[12px] font-medium transition-all"
                    style={{
                      border: `1px solid ${i === 0 ? GOLD : BORDER}`,
                      background: i === 0 ? GOLD_DIM : 'transparent',
                      color: i === 0 ? GOLD : TEXT_DIM,
                      cursor: 'pointer',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3-5 mb-5">
              <div className="dstat rounded-2xl p-5 border relative overflow-hidden" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="flex justify-between items-start mb-2-5">
                  <div>
                    <div className="text-[12px] mb-2 font-medium" style={{ color: TEXT_DIM }}>Нийт мессеж</div>
                    <div className="text-[28px] font-bold tracking-tight" style={{ color: TEXT, lineHeight: 1 }}>847</div>
                  </div>
                  <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center" style={{ background: `${GOLD}15`, color: GOLD }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] mb-2-5">
                  <span className="flex items-center gap-0-5" style={{ color: GREEN }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> +23%</span>
                  <span style={{ color: TEXT_DIM }}>7 хоногоос</span>
                </div>
              </div>

              <div className="dstat rounded-2xl p-5 border relative overflow-hidden" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="flex justify-between items-start mb-2-5">
                  <div>
                    <div className="text-[12px] mb-2 font-medium" style={{ color: TEXT_DIM }}>AI хариулт</div>
                    <div className="text-[28px] font-bold tracking-tight" style={{ color: TEXT, lineHeight: 1 }}>634</div>
                  </div>
                  <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center" style={{ background: `${GREEN}15`, color: GREEN }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4m-7.07-15.07 2.83 2.83m8.49 8.49 2.83 2.83M1 12h4m14 0h4M4.93 4.93l2.83 2.83m8.49 8.49 2.83 2.83"/></svg>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] mb-2-5">
                  <span className="flex items-center gap-0-5" style={{ color: GREEN }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> +18%</span>
                  <span style={{ color: TEXT_DIM }}>7 хоногоос</span>
                </div>
              </div>

              <div className="dstat rounded-2xl p-5 border relative overflow-hidden" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="flex justify-between items-start mb-2-5">
                  <div>
                    <div className="text-[12px] mb-2 font-medium" style={{ color: TEXT_DIM }}>Шинэ харилцагч</div>
                    <div className="text-[28px] font-bold tracking-tight" style={{ color: TEXT, lineHeight: 1 }}>52</div>
                  </div>
                  <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center" style={{ background: `${BLUE}15`, color: BLUE }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] mb-2-5">
                  <span className="flex items-center gap-0-5" style={{ color: GREEN }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> +31%</span>
                  <span style={{ color: TEXT_DIM }}>7 хоногоос</span>
                </div>
              </div>

              <div className="dstat rounded-2xl p-5 border relative overflow-hidden" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="flex justify-between items-start mb-2-5">
                  <div>
                    <div className="text-[12px] mb-2 font-medium" style={{ color: TEXT_DIM }}>Орлого</div>
                    <div className="text-[28px] font-bold tracking-tight" style={{ color: TEXT, lineHeight: 1 }}>2,450,000₮</div>
                  </div>
                  <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center" style={{ background: `rgba(167,139,250,0.1)`, color: '#A78BFA' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] mb-2-5">
                  <span className="flex items-center gap-0-5" style={{ color: GREEN }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> +12%</span>
                  <span style={{ color: TEXT_DIM }}>7 хоногоос</span>
                </div>
              </div>
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-[5fr_3fr] gap-3-5 mb-3-5">
              <div className="rounded-2xl p-5 border" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-[14px] font-semibold">Өдрийн мессеж</h3>
                  <span className="text-[11px]" style={{ color: TEXT_DIM }}>14 хоног</span>
                </div>
                <div className="h-[180px] relative">
                  {[0, 25, 50, 75, 100].reverse().map((v) => (
                    <div
                      key={v}
                      className="absolute left-0 flex items-center w-full"
                      style={{ top: `${v}%` }}
                    >
                      <span className="text-[10px] w-[26px] text-right mr-2" style={{ color: TEXT_DIM }}>
                        {v}
                      </span>
                      <div className="flex-1 h-[1px]" style={{ background: BORDER }} />
                    </div>
                  ))}
                  <div className="absolute left-[38px] right-0 bottom-0 top-0 flex items-end gap-[5px]">
                    {dayChartData.map((v, i) => (
                      <div key={i} className="flex-1 flex justify-center">
                        <div
                          className="bar-item w-[70%] max-w-[20px] rounded-t-[3px] transition-all duration-500 cursor-pointer"
                          style={{
                            height: `${v * 1.7}px`,
                            background: i === 13
                              ? `linear-gradient(to top, ${GOLD}, ${GOLD_LIGHT})`
                              : `linear-gradient(to top, rgba(212,168,83,0.25), rgba(212,168,83,0.08))`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-[5px] pl-[38px] mt-1-5">
                  {['25', '26', '27', '28', '29', '30', '31', '4/1', '2', '3', '4', '5', '6', '7'].map(d => (
                    <div key={d} className="flex-1 text-center text-[9px]" style={{ color: TEXT_DIM }}>{d}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 border flex flex-col" style={{ background: BG_CARD, borderColor: BORDER }}>
                <h3 className="text-[14px] font-semibold mb-4">Сүүлийн үйлдлүүд</h3>
                <div className="flex-1 flex flex-col gap-3-5 overflow-auto">
                  {activities.map((a, idx) => (
                    <div key={idx} className="flex gap-2-5 items-center">
                      <div
                        className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[13px] flex-shrink-0"
                        style={{ background: a.color }}
                      >
                        {a.icon}
                      </div>
                      <div className="flex-1 text-[12px] truncate" style={{ color: TEXT }}>{a.text}</div>
                      <span className="text-[10px] flex-shrink-0" style={{ color: TEXT_DIM }}>{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div
              className="flex items-center gap-3-5 p-4-5 rounded-xl border"
              style={{
                background: `linear-gradient(135deg, rgba(212,168,83,0.05), ${BG_CARD})`,
                borderColor: GOLD_DIM,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] flex-shrink-0"
                style={{ background: GOLD_DIM }}
              >
                ✨
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold mb-0-5" style={{ color: TEXT }}>AI Зөвлөмж</div>
                <div className="text-[12px] leading-[1.5]" style={{ color: TEXT_DIM }}>
                  12:00-14:00 цагт захиалга хамгийн их ирдэг. &quot;Өдрийн тусгай&quot; broadcast илгээвэл орлого ~20% нэмэгдэнэ.
                </div>
              </div>
              <button
                className="px-4 py-[7px] rounded-lg text-[11px] font-semibold flex-shrink-0 transition-all"
                style={{
                  border: `1px solid ${GOLD}`,
                  background: 'transparent',
                  color: GOLD,
                  cursor: 'pointer',
                }}
              >
                Дэлгэрэнгүй
              </button>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="flex h-full overflow-hidden">
            {/* Conversation List */}
            <div className="w-[300px] flex-shrink-0 flex flex-col" style={{ borderRight: `1px solid ${BORDER}` }}>
              <div className="p-[18px_14px_10px]">
                <div className="flex justify-between items-center mb-3-5">
                  <h2 className="text-[17px] font-bold">Мессежүүд</h2>
                  <span
                    className="text-[10px] font-bold px-2 py-[2px] rounded-[10px]"
                    style={{ background: GOLD, color: '#000' }}
                  >
                    3
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 rounded-[10px] px-3 py-2"
                  style={{ background: BG_INPUT, border: `1px solid ${BORDER}` }}
                >
                  <Search size={16} style={{ color: TEXT_DIM }} />
                  <input
                    placeholder="Хайх..."
                    className="flex-1 bg-transparent border-none outline-none text-[13px]"
                    style={{ color: TEXT }}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-auto px-[6px]">
                {convs.map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => setActiveConv(i)}
                    className="flex gap-3 p-3 rounded-xl mb-[2px] cursor-pointer transition-all"
                    style={{
                      background: activeConv === i ? GOLD_DIM : 'transparent',
                      borderLeft: activeConv === i ? `2px solid ${GOLD}` : '2px solid transparent',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold flex-shrink-0"
                      style={{
                        background: activeConv === i ? GOLD_DIM : BG_HOVER,
                        color: TEXT,
                        border: activeConv === i ? `1.5px solid ${GOLD}` : 'none',
                      }}
                    >
                      {c.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-0-5">
                        <span
                          className="text-[13px] font-medium truncate"
                          style={{
                            color: TEXT,
                            fontWeight: activeConv === i ? 600 : 500,
                          }}
                        >
                          {c.name}
                        </span>
                        <span className="text-[10px] flex-shrink-0" style={{ color: TEXT_DIM }}>
                          {c.time}
                        </span>
                      </div>
                      <div
                        className="text-[12px] truncate"
                        style={{ color: TEXT_DIM }}
                      >
                        {c.message}
                      </div>
                    </div>
                    {c.unread && (
                      <div
                        className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold self-center flex-shrink-0"
                        style={{ background: GOLD, color: '#000' }}
                      >
                        {c.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div
                className="px-5 py-3-5 border-b flex justify-between items-center"
                style={{ borderColor: BORDER }}
              >
                <div className="flex items-center gap-2-5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-semibold"
                    style={{ background: GOLD_DIM, color: TEXT }}
                  >
                    {convs[activeConv]?.name[0]}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold">{convs[activeConv]?.name}</div>
                    <div className="text-[11px] flex items-center gap-1" style={{ color: GREEN }}>
                      <span style={{ background: GREEN, width: 6, height: 6, borderRadius: 3, display: 'inline-block' }} />
                      Онлайн
                    </div>
                  </div>
                </div>
                <div className="flex gap-1-5">
                  {['👤 Профайл', '🏷 Tag'].map(b => (
                    <button
                      key={b}
                      className="px-3 py-1-5 rounded-lg text-[11px]"
                      style={{
                        background: 'transparent',
                        border: `1px solid ${BORDER}`,
                        color: TEXT_DIM,
                        cursor: 'pointer',
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={chatRef} className="flex-1 overflow-auto p-4-5 flex flex-col gap-1-5">
                <div className="text-center text-[11px] my-1-5" style={{ color: TEXT_DIM }}>
                  Өнөөдөр
                </div>
                {msgs.map((m, i) => (
                  <Bubble key={i} {...m} />
                ))}
              </div>
              <div className="p-4-5 border-t" style={{ borderColor: BORDER }}>
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-1-5 border"
                  style={{ background: BG_INPUT, borderColor: BORDER }}
                >
                  <input
                    value={msgInput}
                    onChange={e => setMsgInput(e.target.value)}
                    placeholder="Мессеж бичих..."
                    className="flex-1 bg-transparent border-none outline-none text-[13px] py-1-5"
                    style={{ color: TEXT }}
                    onKeyDown={e => e.key === 'Enter' && msgInput && setMsgInput('')}
                  />
                  <button
                    onClick={() => msgInput && setMsgInput('')}
                    className="w-[34px] h-[34px] rounded-[9px] border-none flex items-center justify-center transition-all"
                    style={{
                      background: msgInput ? GOLD : GOLD_DIM,
                      color: '#000',
                      cursor: msgInput ? 'pointer' : 'default',
                    }}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="p-7">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-[22px] font-bold mb-1">Бүтээгдэхүүн</h1>
                <p className="text-[13px]" style={{ color: TEXT_DIM }}>
                  Чатбот carousel-д харагдах бүтээгдэхүүнүүд
                </p>
              </div>
              <button
                className="px-4 py-2-5 rounded-[10px] border-none flex items-center gap-1-5 text-[13px] font-semibold transition-all"
                style={{
                  background: GOLD,
                  color: '#000',
                  cursor: 'pointer',
                }}
              >
                <Plus size={14} /> Нэмэх
              </button>
            </div>
            <div
              className="rounded-2xl p-[6px_22px] border"
              style={{ background: BG_CARD, borderColor: BORDER }}
            >
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3-5 py-3-5"
                  style={{
                    borderBottom: i < products.length - 1 ? `1px solid ${BORDER}` : 'none',
                  }}
                >
                  <div
                    className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[18px] flex-shrink-0"
                    style={{ background: GOLD_DIM }}
                  >
                    {p.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium" style={{ color: TEXT }}>
                      {p.name}
                    </div>
                    <div className="text-[12px]" style={{ color: TEXT_DIM }}>
                      {p.category}
                    </div>
                  </div>
                  <div className="text-[14px] font-semibold mr-3" style={{ color: GOLD }}>
                    {p.price}₮
                  </div>
                  <Toggle
                    on={p.isActive}
                    onToggle={() => toggleProduct(p.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'knowledge':
        return (
          <div className="p-7">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-[22px] font-bold mb-1">Мэдлэгийн сан</h1>
                <p className="text-[13px]" style={{ color: TEXT_DIM }}>
                  AI чатбот энд байгаа мэдээллээр хариулна
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-2-5 rounded-[10px] border text-[13px]"
                  style={{ background: 'transparent', borderColor: BORDER, color: TEXT, cursor: 'pointer' }}
                >
                  📄 Файл
                </button>
                <button
                  className="px-4 py-2-5 rounded-[10px] border-none flex items-center gap-1-5 text-[13px] font-semibold"
                  style={{ background: GOLD, color: '#000', cursor: 'pointer' }}
                >
                  <Plus size={14} /> Нэмэх
                </button>
              </div>
            </div>
            <div className="flex gap-2 mb-4-5">
              {['Бүгд (6)', 'FAQ (4)', 'Бүтээгдэхүүн', 'Бодлого'].map((t, i) => (
                <button
                  key={t}
                  className="px-3 py-[7px] rounded-lg text-[12px] font-medium transition-all"
                  style={{
                    background: i === 0 ? GOLD_DIM : 'transparent',
                    border: `1px solid ${i === 0 ? GOLD : BORDER}`,
                    color: i === 0 ? GOLD : TEXT_DIM,
                    cursor: 'pointer',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2-5">
              {[
                ['ChatNova-ийн үнэ тариф ямар байдаг вэ?', 'FAQ'],
                ['ChatNova-г хэрхэн ашиглаж эхлэх вэ?', 'FAQ'],
                ['Ямар үйлчилгээ үзүүлдэг вэ?', 'FAQ'],
                ['Буцаалтын бодлого', 'Бодлого'],
                ['Хүргэлтийн мэдээлэл', 'Бодлого'],
                ['Кофены ялгаа — Arabica vs Robusta', 'Бүтээгдэхүүн'],
              ].map(([q, c]) => (
                <div
                  key={q}
                  className="kb-item p-3-5 rounded-xl border cursor-pointer transition-all"
                  style={{ background: BG_HOVER, borderColor: BORDER }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-medium" style={{ color: TEXT }}>
                      {q}
                    </span>
                    <span
                      className="text-[10px] px-2-5 py-1 rounded-md font-semibold"
                      style={{ background: GOLD_DIM, color: GOLD }}
                    >
                      {c}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ai-config':
        return (
          <div className="p-7">
            <h1 className="text-[22px] font-bold mb-1">AI тохиргоо</h1>
            <p className="text-[13px] mb-6" style={{ color: TEXT_DIM }}>
              Чатботын хариулах хэлбэрийг тохируулна
            </p>
            <div className="flex flex-col gap-4 max-w-[620px]">
              {/* AI Toggle */}
              <div className="rounded-xl p-5 border" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[15px] font-semibold mb-1">AI автомат хариулт</div>
                    <div className="text-[12px]" style={{ color: TEXT_DIM }}>
                      Асаалттай үед чатбот автоматаар хариулна
                    </div>
                  </div>
                  <Toggle on={aiOn} onToggle={() => setAiOn(!aiOn)} />
                </div>
              </div>

              {/* Welcome Message */}
              <div className="rounded-xl p-5 border" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[15px] font-semibold">Угтах мессеж</span>
                  <button
                    className="px-3 py-1-5 rounded-lg border-none text-[11px] font-semibold"
                    style={{ background: GOLD_DIM, color: GOLD, cursor: 'pointer' }}
                  >
                    ✨ AI санал
                  </button>
                </div>
                <textarea
                  className="w-full min-h-[80px] rounded-xl p-3-5 text-[13px] leading-[1.6] resize-y outline-none"
                  style={{
                    background: BG_INPUT,
                    border: `1px solid ${BORDER}`,
                    color: TEXT_MUTED,
                  }}
                  defaultValue="Сайн байна уу! Brew Lab Coffee-д тавтай морил. Бид таны бүтээгдэхүүний мэдээлэл, үнэ, захиалга авахад бэлэн байна."
                />
              </div>

              {/* AI Model */}
              <div className="rounded-xl p-5 border" style={{ background: BG_CARD, borderColor: BORDER }}>
                <div className="text-[15px] font-semibold mb-3">AI Model</div>
                <div className="flex gap-2-5">
                  {[
                    { n: 'GPT-4.1 Mini', d: 'Хурдан, хямд' },
                    { n: 'Claude Sonnet', d: 'Нарийвчлалтай' },
                    { n: 'Gemini Flash', d: 'Хурдан' },
                  ].map((m, i) => (
                    <div
                      key={i}
                      onClick={() => setSelModel(i)}
                      className="flex-1 p-3-5 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: selModel === i ? GOLD_DIM : BG_INPUT,
                        border: `1px solid ${selModel === i ? GOLD : BORDER}`,
                      }}
                    >
                      <div
                        className="text-[13px] font-semibold"
                        style={{ color: selModel === i ? GOLD : TEXT }}
                      >
                        {m.n}
                      </div>
                      <div className="text-[11px] mt-0-5" style={{ color: TEXT_DIM }}>
                        {m.d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tone & Language */}
              <div className="grid grid-cols-2 gap-3-5">
                <div className="rounded-xl p-5 border" style={{ background: BG_CARD, borderColor: BORDER }}>
                  <div className="text-[15px] font-semibold mb-2-5">Өнгө аяс</div>
                  <select
                    className="w-full px-3-5 py-2-5 rounded-xl text-[13px] outline-none cursor-pointer"
                    style={{
                      background: BG_INPUT,
                      border: `1px solid ${BORDER}`,
                      color: TEXT_MUTED,
                    }}
                  >
                    <option>😊 Найрсаг</option>
                    <option>💼 Мэргэжлийн</option>
                    <option>😎 Энгийн</option>
                  </select>
                </div>
                <div className="rounded-xl p-5 border" style={{ background: BG_CARD, borderColor: BORDER }}>
                  <div className="text-[15px] font-semibold mb-2-5">Хариулах хэл</div>
                  <select
                    className="w-full px-3-5 py-2-5 rounded-xl text-[13px] outline-none cursor-pointer"
                    style={{
                      background: BG_INPUT,
                      border: `1px solid ${BORDER}`,
                      color: TEXT_MUTED,
                    }}
                  >
                    <option>🇲🇳 Монгол</option>
                    <option>🇬🇧 English</option>
                  </select>
                </div>
              </div>

              <button
                className="px-0 py-3 rounded-[10px] border-none text-[14px] font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  color: '#000',
                  cursor: 'pointer',
                  width: 160,
                }}
              >
                💾 Хадгалах
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-3-5">
            <div
              className="w-14 h-14 rounded-[14px] flex items-center justify-center text-[26px]"
              style={{ background: GOLD_DIM }}
            >
              🚧
            </div>
            <h2 className="text-[18px] font-semibold">{page}</h2>
            <p className="text-[13px]" style={{ color: TEXT_DIM }}>
              Удахгүй бэлэн болно
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="flex h-screen"
      style={{
        background: BG,
        color: TEXT,
        fontFamily: "'DM Sans', sans-serif",
        overflow: 'hidden',
      }}
    >
      <Sidebar
        activePage={page}
        onNavigate={setPage}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="px-9 py-2-5 border-b flex items-center justify-between"
          style={{
            borderColor: BORDER,
            background: 'rgba(8,8,10,0.7)',
            backdropFilter: 'blur(12px)',
            flexShrink: 0,
          }}
        >
          <div
            className="flex items-center gap-2 w-[280px] rounded-lg px-3 py-1-5"
            style={{ background: BG_INPUT, border: `1px solid ${BORDER}` }}
          >
            <Search size={16} style={{ color: TEXT_DIM }} />
            <input
              placeholder="Хайх... ⌘K"
              className="flex-1 bg-transparent border-none outline-none text-[13px]"
              style={{ color: TEXT }}
            />
          </div>
          <div className="flex items-center gap-3-5">
            <div
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative cursor-pointer p-1"
              style={{ color: TEXT_DIM }}
            >
              <Bell size={18} />
              <div
                className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full border-2"
                style={{ background: RED, borderColor: BG }}
              />
              {notifOpen && (
                <div
                  className="absolute top-9 right-0 w-[280px] rounded-xl p-1 z-50"
                  style={{
                    background: BG_CARD,
                    border: `1px solid ${BORDER}`,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  }}
                >
                  {[
                    { icon: '💬', text: 'Болд-Эрдэнэ шинэ мессеж', time: '2 мин' },
                    { icon: '💳', text: 'QPay төлбөр — 12,900₮', time: '5 мин' },
                    { icon: '👤', text: 'Шинэ: Сарнай', time: '12 мин' },
                  ].map((n, j) => (
                    <div
                      key={j}
                      className="flex gap-2-5 items-center p-2-5 rounded-lg cursor-pointer"
                    >
                      <span className="text-[14px]">{n.icon}</span>
                      <div className="flex-1 text-[12px]" style={{ color: TEXT }}>
                        {n.text}
                      </div>
                      <span className="text-[10px]" style={{ color: TEXT_DIM }}>
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="px-3 py-1-5 rounded-lg text-[12px] font-medium flex items-center gap-1"
              style={{ background: GREEN_DIM, color: GREEN }}
            >
              <span style={{ background: GREEN, width: 6, height: 6, borderRadius: 3, display: 'inline-block' }} />
              AI идэвхтэй
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">{renderPage()}</div>
      </main>
    </div>
  );
}
