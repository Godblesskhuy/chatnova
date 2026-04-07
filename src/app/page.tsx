'use client';

import { useState, useEffect, useRef } from 'react';

const GOLD = '#D4A853';
const GOLD_LIGHT = '#E8C97A';
const GOLD_DIM = 'rgba(212,168,83,0.15)';
const BG = '#0A0A0B';
const BG_CARD = '#111113';
const BG_CARD_HOVER = '#18181B';
const TEXT = '#F5F5F4';
const TEXT_DIM = '#8A8A8D';
const BORDER = 'rgba(255,255,255,0.06)';
const GREEN = '#34D399';

function PhoneMockup() {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2800),
      setTimeout(() => setStep(4), 3800),
      setTimeout(() => { setCycle(c => c + 1); }, 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const msgs = [
    { r: 'user', t: 'Сайн байна уу, latte захиалмаар байна' },
    { r: 'bot', t: `Сайн байна уу! 🙌\nLatte-ийн хэмжээгээ сонгоно уу:\n\n☕ Жижиг — 9,900₮\n☕ Том — 12,900₮` },
    { r: 'user', t: 'Том' },
    { r: 'bot', t: '✅ Latte (Том) — 12,900₮\nQPay төлбөр илгээж байна...' },
  ];

  return (
    <div
      className="w-[280px] min-h-[540px] rounded-[40px] p-[3px] flex-shrink-0"
      style={{
        background: `linear-gradient(160deg, ${GOLD} 0%, ${GOLD_DIM} 40%, transparent 70%)`,
      }}
    >
      <div
        className="rounded-[38px] bg-black w-full min-h-[534px] flex flex-col overflow-hidden"
      >
        {/* Notch */}
        <div className="flex justify-center pt-[10px]">
          <div className="w-[80px] h-[24px] rounded-[12px] bg-[#111]" />
        </div>
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center gap-[10px]"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]"
            style={{ background: GOLD_DIM }}
          >
            ☕
          </div>
          <div>
            <div className="text-[14px] font-semibold" style={{ color: TEXT }}>
              Brew Lab Coffee
            </div>
            <div
              className="text-[11px] flex items-center gap-1"
              style={{ color: GREEN }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full inline-block"
                style={{ background: GREEN }}
              />
              AI Онлайн
            </div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
          {msgs.map((m, i) => step >= i + 1 && (
            <div
              key={`${cycle}-${i}`}
              className="max-w-[85%]"
              style={{
                alignSelf: m.r === 'user' ? 'flex-end' : 'flex-start',
                animation: 'msgIn 0.35s ease-out forwards',
              }}
            >
              <div
                className="px-[14px] py-[10px] text-[12.5px] leading-[1.55] whitespace-pre-line"
                style={{
                  borderRadius:
                    m.r === 'user'
                      ? '14px 14px 4px 14px'
                      : '14px 14px 14px 4px',
                  background: m.r === 'user' ? GOLD : '#1A1A1D',
                  color: m.r === 'user' ? '#000' : TEXT,
                  fontWeight: m.r === 'user' ? 500 : 400,
                }}
              >
                {m.t}
              </div>
            </div>
          ))}
          {step >= 4 && (
            <div
              key={`${cycle}-qr`}
              className="max-w-[85%]"
              style={{
                alignSelf: 'flex-start',
                animation: 'msgIn 0.35s ease-out 0.3s forwards',
              }}
            >
              <div
                className="p-4 rounded-[14px]"
                style={{
                  background: '#1A1A1D',
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div className="flex items-center gap-[6px] mb-[10px]">
                  <span className="text-[13px]">💳</span>
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: GOLD }}
                  >
                    QPay Төлбөр
                  </span>
                </div>
                <div
                  className="w-[72px] h-[72px] mx-auto mb-2 rounded-[6px]"
                  style={{
                    background: `repeating-conic-gradient(${TEXT} 0% 25%, #222 0% 50%) 0 0 / 12px 12px`,
                  }}
                />
                <div
                  className="text-center text-[18px] font-bold"
                  style={{ color: TEXT }}
                >
                  12,900₮
                </div>
                <div
                  className="text-center text-[10px] mt-1"
                  style={{ color: GREEN }}
                >
                  ✅ QPay • сканнердах
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Input */}
        <div
          className="p-[10px] pb-4"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          <div
            className="flex items-center gap-2 rounded-[20px] px-3 py-2"
            style={{ background: '#1A1A1D' }}
          >
            <span className="flex-1 text-[12px]" style={{ color: TEXT_DIM }}>
              Мессеж бичих...
            </span>
            <div
              className="w-7 h-7 rounded-[14px] flex items-center justify-center"
              style={{ background: GOLD }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  number,
  label,
  icon,
  suffix = '',
}: {
  number: string;
  label: string;
  icon: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const target = parseInt(number);
    let cur = 0;
    const step = Math.max(1, Math.floor(target / 35));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(t);
      }
      setCount(cur);
    }, 25);
    return () => clearInterval(t);
  }, [visible, number]);

  return (
    <div
      ref={ref}
      className="stat-card relative overflow-hidden rounded-2xl p-7 border"
      style={{
        background: BG_CARD,
        borderColor: BORDER,
      }}
    >
      <div
        className="absolute -top-5 -right-5 w-20 h-20 rounded-full"
        style={{
          background: GOLD_DIM,
          filter: 'blur(30px)',
        }}
      />
      <div
        className="text-[13px] mb-2-5 flex items-center gap-1-5"
        style={{ color: TEXT_DIM }}
      >
        <span className="text-[16px]">{icon}</span> {label}
      </div>
      <div
        className="text-[38px] font-bold tracking-tight"
        style={{ color: TEXT, letterSpacing: '-0.03em' }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  tag,
}: {
  icon: string;
  title: string;
  desc: string;
  tag?: string;
}) {
  return (
    <div
      className="feat-card relative overflow-hidden rounded-2xl p-8 border"
      style={{
        background: BG_CARD,
        borderColor: BORDER,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-5"
        style={{ background: GOLD_DIM }}
      >
        {icon}
      </div>
      {tag && (
        <span
          className="absolute top-4 right-4 text-[10px] font-semibold px-[10px] py-1 rounded-full"
          style={{
            background: tag === 'Popular' ? GOLD_DIM : 'rgba(52,211,153,0.1)',
            color: tag === 'Popular' ? GOLD : GREEN,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {tag}
        </span>
      )}
      <h3
        className="text-[18px] font-semibold mb-2-5 leading-tight"
        style={{ color: TEXT }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-[1.7]" style={{ color: TEXT_DIM }}>
        {desc}
      </p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative overflow-hidden rounded-3xl p-9 border transition-all duration-300"
      style={{
        background: highlighted
          ? `linear-gradient(170deg, #1a1708 0%, ${BG_CARD} 50%)`
          : BG_CARD,
        borderColor: highlighted ? GOLD : hover ? 'rgba(255,255,255,0.1)' : BORDER,
        transform: highlighted ? 'scale(1.02)' : hover ? 'translateY(-4px)' : 'none',
      }}
    >
      {highlighted && (
        <>
          <div
            className="absolute -top-10 -right-10 w-[120px] h-[120px] rounded-full"
            style={{ background: GOLD_DIM, filter: 'blur(50px)' }}
          />
          <span
            className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full"
            style={{ background: GOLD, color: '#000', letterSpacing: '0.05em' }}
          >
            POPULAR
          </span>
        </>
      )}
      <div
        className="relative text-[14px] mb-1 font-medium"
        style={{ color: TEXT_DIM }}
      >
        {name}
      </div>
      <div
        className="relative text-[40px] font-bold mb-1 tracking-tight"
        style={{ color: TEXT, letterSpacing: '-0.02em' }}
      >
        {price}
        <span className="text-[15px] font-normal" style={{ color: TEXT_DIM }}>
          ₮/сар
        </span>
      </div>
      <div
        className="h-[2px] rounded-sm mb-6"
        style={{
          background: highlighted ? GOLD : BORDER,
          width: 40,
        }}
      />
      <div className="flex flex-col gap-3-5 mb-7">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-start gap-2-5 text-[14px]"
            style={{ color: TEXT_DIM }}
          >
            <span
              className="mt-0-5 flex-shrink-0"
              style={{ color: highlighted ? GOLD : GREEN }}
            >
              ✓
            </span>
            <span className="leading-[1.4]">{f}</span>
          </div>
        ))}
      </div>
      <button
        className={highlighted ? 'btn-gold' : 'btn-outline'}
        style={{
          width: '100%',
          padding: '14px 0',
          borderRadius: 12,
          border: 'none',
          background: highlighted
            ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`
            : 'transparent',
          color: highlighted ? '#000' : TEXT,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          outline: highlighted ? 'none' : `1px solid ${BORDER}`,
        }}
      >
        Эхлэх →
      </button>
    </div>
  );
}

function WorkflowStep({
  num,
  title,
  desc,
  active,
}: {
  num: string;
  title: string;
  desc: string;
  active: boolean;
}) {
  return (
    <div className="flex gap-5 items-start transition-all duration-400">
      <div
        className="w-12 h-12 rounded-full flex-shrink-0 items-center justify-center text-[18px] font-bold transition-all"
        style={{
          background: active
            ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`
            : GOLD_DIM,
          color: active ? '#000' : GOLD,
          display: 'flex',
          boxShadow: active ? `0 0 24px ${GOLD_DIM}` : 'none',
          transform: active ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {num}
      </div>
      <div className="transition-opacity duration-400" style={{ opacity: active ? 1 : 0.5 }}>
        <h4 className="text-[17px] font-semibold mb-1-5" style={{ color: TEXT }}>
          {title}
        </h4>
        <p className="text-[14px] leading-[1.6]" style={{ color: TEXT_DIM }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function ScrollSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const t = setInterval(
      () => setActiveStep((s) => (s >= 3 ? 1 : s + 1)),
      3000
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = document.querySelector('.cn-scroll-root');
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 40);
    el.addEventListener('scroll', fn);
    return () => el.removeEventListener('scroll', fn);
  }, []);

  return (
    <div
      className="cn-scroll-root"
      style={{
        background: BG,
        minHeight: '100vh',
        maxHeight: '100vh',
        overflow: 'auto',
        color: TEXT,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* BG Effects */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute -top-[15%] -left-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${GOLD_DIM} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animation: 'glowPulse 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-[10%] -right-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 px-8 py-3-5 flex items-center justify-between transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,11,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
        }}
      >
        <div className="flex items-center gap-2-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-[20px] font-bold tracking-tight">
            Chat
            <span style={{ color: GOLD }}>Nova</span>
          </span>
        </div>
        <div className="nav-links hidden md:flex items-center gap-7">
          <a href="#features" className="nav-link">
            Боломжууд
          </a>
          <a href="#how" className="nav-link">
            Хэрхэн
          </a>
          <a href="#pricing" className="nav-link">
            Үнэ
          </a>
          <button
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              border: 'none',
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: '#000',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Эхлэх →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="min-h-[90vh] flex items-center justify-center px-8 py-15 relative z-10"
      >
        <div
          className="hero-flex max-w-[1140px] w-full mx-auto flex items-center gap-[72px]"
          style={{ display: 'flex', alignItems: 'center', gap: 72 }}
        >
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold mb-7"
              style={{
                padding: '6px 16px',
                background: GOLD_DIM,
                color: GOLD,
                letterSpacing: '0.08em',
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full"
                style={{
                  background: GOLD,
                  animation: 'glowPulse 2s ease-in-out infinite',
                }}
              />
              POWERED BY AI
            </div>
            <h1
              className="text-[60px] font-bold leading-[1.06] mb-6 tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              Messenger &amp;
              <br />
              Instagram
              <br />
              <span
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                автомат хариулагч
              </span>
            </h1>
            <p
              className="text-[16px] leading-[1.75] mb-9 max-w-[460px]"
              style={{ color: TEXT_DIM }}
            >
              AI чатбот. Бүтээгдэхүүний санал болгох, захиалга хүлээн авах,
              QPay төлбөр, цаг товлох — бүгдийг автоматжуул.
            </p>
            <div
              className="hero-btns flex gap-3 mb-10"
              style={{ display: 'flex', gap: 12, marginBottom: 40 }}
            >
              <button
                className="btn-gold"
                style={{
                  padding: '16px 36px',
                  borderRadius: 12,
                  border: 'none',
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  color: '#000',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: `0 8px 32px ${GOLD_DIM}`,
                }}
              >
                Үнэгүй эхлэх →
              </button>
              <button
                className="btn-outline"
                style={{
                  padding: '16px 28px',
                  borderRadius: 12,
                  background: 'transparent',
                  border: `1px solid rgba(255,255,255,0.12)`,
                  color: TEXT,
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                Demo үзэх
              </button>
            </div>
            <div
              className="hero-tags flex flex-wrap gap-2-5"
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
            >
              {[
                ['💬', 'Мессенжер'],
                ['📸', 'Instagram'],
                ['🤖', 'AI'],
                ['💳', 'QPay'],
                ['🛒', 'Дэлгүүр'],
              ].map(([ic, t]) => (
                <span
                  key={t}
                  className="flex items-center gap-1-5 text-[12px] rounded-lg border"
                  style={{
                    padding: '7px 14px',
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: BORDER,
                    color: TEXT_DIM,
                  }}
                >
                  {ic} {t}
                </span>
              ))}
            </div>
          </div>
          <div
            className="phone-wrap flex-shrink-0 hidden lg:block"
            style={{ animation: 'floatY 7s ease-in-out infinite' }}
          >
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Stats */}
      <ScrollSection>
        <section className="py-5 px-8 relative z-10">
          <div
            className="max-w-[1140px] mx-auto grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          >
            <StatCard number="1500" label="Мессеж / өдөр" icon="💬" suffix="+" />
            <StatCard number="98" label="AI нарийвчлал" icon="🎯" suffix="%" />
            <StatCard number="24" label="Цаг ажиллана" icon="⚡" suffix="/7" />
            <StatCard number="350" label="Идэвхтэй бизнес" icon="🏢" suffix="+" />
          </div>
        </section>
      </ScrollSection>

      {/* Features */}
      <ScrollSection>
        <section id="features" className="py-15 px-8 relative z-10">
          <div className="max-w-[1140px] mx-auto">
            <div className="text-center mb-14">
              <span
                className="text-[11px] font-semibold"
                style={{ color: GOLD, letterSpacing: '0.15em' }}
              >
                БОЛОМЖУУД
              </span>
              <h2 className="text-[42px] font-bold mt-2-5 tracking-tight">
                Бизнесээ{' '}
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    color: GOLD,
                  }}
                >
                  автоматжуул
                </span>
              </h2>
            </div>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
              <FeatureCard
                icon="🤖"
                title="AI Чатбот"
                desc="GPT-4 болон Claude ашиглан хэрэглэгчдэд 24/7 мэргэжлийн түвшинд хариулна. Монгол хэлийг бүрэн дэмждэг."
                tag="Шинэ"
              />
              <FeatureCard
                icon="💬"
                title="Comment → PM"
                desc="Пост дээрх сэтгэгдэлд автомат хариулж, Messenger-ээр хувийн мессеж илгээнэ. Funnel автоматжуулна."
              />
              <FeatureCard
                icon="📢"
                title="Broadcast"
                desc="Бүх харилцагчдадаа нэг дороос мессеж илгээнэ. Tag-аар шүүж, зөвхөн зорилтот бүлэгт хүргэнэ."
              />
              <FeatureCard
                icon="💳"
                title="QPay Төлбөр"
                desc="Чатботоор дамжуулан QPay QR код үүсгэж, шууд төлбөр хүлээн авна. Автомат баримт илгээнэ."
              />
              <FeatureCard
                icon="🛒"
                title="Бүтээгдэхүүний Каталог"
                desc="Бүтээгдэхүүнээ оруулаад carousel хэлбэрээр Messenger дээр харуулна."
                tag="Popular"
              />
              <FeatureCard
                icon="📊"
                title="Аналитик"
                desc="Мессеж, AI хариулт, шинэ харилцагч, захиалга, орлого — бүгдийг нэг дашбоардаас харна."
              />
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* How it works */}
      <ScrollSection>
        <section id="how" className="py-15 px-8 relative z-10">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-14">
              <span
                className="text-[11px] font-semibold"
                style={{ color: GOLD, letterSpacing: '0.15em' }}
              >
                ХЭРХЭН АЖИЛЛАДАГ
              </span>
              <h2 className="text-[42px] font-bold mt-2-5 tracking-tight">
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    color: GOLD,
                  }}
                >
                  3 алхам
                </span>
                -д бэлэн
              </h2>
            </div>
            <div className="flex flex-col gap-7 max-w-[520px] mx-auto">
              <WorkflowStep
                num="1"
                title="Facebook Page холбох"
                desc="OAuth-оор Page-аа холбоно. Нэг товшилтоор Messenger webhook идэвхжинэ."
                active={activeStep === 1}
              />
              <div
                className="w-[2px] h-5 rounded-sm ml-[23px]"
                style={{ background: GOLD_DIM }}
              />
              <WorkflowStep
                num="2"
                title="Бизнесээ тохируулах"
                desc="Бүтээгдэхүүн, ажлын цаг, AI prompt, QPay мэдээллээ оруулна."
                active={activeStep === 2}
              />
              <div
                className="w-[2px] h-5 rounded-sm ml-[23px]"
                style={{ background: GOLD_DIM }}
              />
              <WorkflowStep
                num="3"
                title="Автомат ажиллаж эхэлнэ"
                desc="AI чатбот 24/7 хариулна. Та зүгээр аналитикаа хянана."
                active={activeStep === 3}
              />
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* Pricing */}
      <ScrollSection>
        <section id="pricing" className="py-15 px-8 pb-[100px] relative z-10">
          <div className="max-w-[1060px] mx-auto">
            <div className="text-center mb-14">
              <span
                className="text-[11px] font-semibold"
                style={{ color: GOLD, letterSpacing: '0.15em' }}
              >
                ҮНЭ
              </span>
              <h2 className="text-[42px] font-bold mt-2-5 tracking-tight">
                Бизнестээ{' '}
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    color: GOLD,
                  }}
                >
                  тохирох
                </span>{' '}
                багц
              </h2>
            </div>
            <div
              className="grid gap-5 items-center"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
              <PricingCard
                name="Starter"
                price="49,000"
                features={[
                  '1 Facebook Page',
                  'AI чатбот (500 мессеж/сар)',
                  'Бүтээгдэхүүний каталог',
                  'Мэдлэгийн сан',
                  'Аналитик',
                ]}
              />
              <PricingCard
                name="Pro"
                price="149,000"
                highlighted
                features={[
                  '3 хүртэл Page / Instagram',
                  'AI чатбот (хязгааргүй)',
                  'Comment → PM автомат',
                  'Broadcast мессеж',
                  'QPay интеграц',
                  'Тусгай дэмжлэг',
                ]}
              />
              <PricingCard
                name="Enterprise"
                price="349,000"
                features={[
                  'Хязгааргүй Page',
                  'Бүх Pro боломж',
                  'Custom AI prompt',
                  'API хандалт',
                  'Тусгай менежер',
                  'SLA баталгаа',
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* CTA */}
      <ScrollSection>
        <section className="py-10 px-8 relative z-10">
          <div
            className="max-w-[860px] mx-auto text-center rounded-3xl p-15 relative overflow-hidden border"
            style={{
              background: `linear-gradient(170deg, rgba(212,168,83,0.07), ${BG_CARD})`,
              borderColor: GOLD_DIM,
            }}
          >
            <div
              className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full"
              style={{ background: GOLD_DIM, filter: 'blur(80px)' }}
            />
            <h2
              className="text-[38px] font-bold mb-4 relative tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Бизнесээ{' '}
              <span style={{ color: GOLD }}>дараагийн түвшинд</span> аваач
            </h2>
            <p
              className="text-[15px] mb-8 relative max-w-[480px] mx-auto"
              style={{ color: TEXT_DIM }}
            >
              Хэдхэн минутад AI чатбот тохируулж, 24/7 автомат борлуулалт
              эхлүүлээорэй.
            </p>
            <button
              className="btn-gold relative"
              style={{
                padding: '18px 48px',
                borderRadius: 14,
                border: 'none',
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                color: '#000',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 12px 40px ${GOLD_DIM}`,
              }}
            >
              Үнэгүй эхлэх →
            </button>
          </div>
        </section>
      </ScrollSection>

      {/* Footer */}
      <footer
        className="px-8 py-8 border-t relative z-10"
        style={{ borderColor: BORDER }}
      >
        <div className="max-w-[1140px] mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-[14px] font-semibold">
              Chat<span style={{ color: GOLD }}>Nova</span>
            </span>
          </div>
          <div className="text-[12px]" style={{ color: TEXT_DIM }}>
            © 2026 NueraTech LLC
          </div>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-[12px]"
              style={{ color: TEXT_DIM, textDecoration: 'none' }}
            >
              Нууцлал
            </a>
            <a
              href="#"
              className="text-[12px]"
              style={{ color: TEXT_DIM, textDecoration: 'none' }}
            >
              Үйлчилгээний нөхцөл
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
