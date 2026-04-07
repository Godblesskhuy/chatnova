'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, MessageSquare } from 'lucide-react';

const GOLD = '#D4A853';
const GOLD_LIGHT = '#E8C97A';
const GOLD_DIM = 'rgba(212,168,83,0.12)';
const BG = '#0A0A0B';
const BG_CARD = '#111113';
const TEXT = '#F5F5F4';
const TEXT_DIM = '#8A8A8D';
const BORDER = 'rgba(255,255,255,0.06)';
const RED = '#F87171';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: BG }}
    >
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${GOLD_DIM} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
          >
            <MessageSquare size={24} strokeWidth={2.5} color="#000" />
          </div>
          <h1 className="text-[28px] font-bold">
            Chat<span style={{ color: GOLD }}>Nova</span>
          </h1>
          <p className="text-[14px] mt-2" style={{ color: TEXT_DIM }}>
            Бизнесийн AI чатбот платформ
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-3xl p-8 border"
          style={{ background: BG_CARD, borderColor: BORDER }}
        >
          <h2 className="text-[22px] font-bold mb-2">Нэвтрэх</h2>
          <p className="text-[13px] mb-6" style={{ color: TEXT_DIM }}>
            Бүртгэлтэй хэрэглэгч бол {''}
            <Link href="/auth/register" className="font-semibold" style={{ color: GOLD }}>
              бүртгүүлэх
            </Link>
          </p>

          {error && (
            <div
              className="mb-4 p-3 rounded-xl text-[13px]"
              style={{
                background: 'rgba(248,113,113,0.1)',
                border: `1px solid rgba(248,113,113,0.3)`,
                color: RED,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium mb-2" style={{ color: TEXT_DIM }}>
                Имэйл
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all"
                style={{
                  background: '#0E0E11',
                  border: `1px solid ${BORDER}`,
                  color: TEXT,
                }}
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-2" style={{ color: TEXT_DIM }}>
                Нууц үг
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl text-[14px] outline-none transition-all"
                  style={{
                    background: '#0E0E11',
                    border: `1px solid ${BORDER}`,
                    color: TEXT,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: TEXT_DIM }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[12px]" style={{ color: TEXT_DIM }}>
                <input type="checkbox" className="accent-[#D4A853]" />
                Санах
              </label>
              <a
                href="#"
                className="text-[12px]"
                style={{ color: GOLD }}
              >
                Нууц үг мартсан?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-[14px] font-semibold transition-all disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                color: '#000',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх →'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[12px] mt-6" style={{ color: TEXT_DIM }}>
          © 2026 NueraTech LLC
        </p>
      </div>
    </div>
  );
}
