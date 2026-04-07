'use client';

import { useState } from 'react';
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
const GREEN = '#34D399';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate
    if (password.length < 6) {
      setError('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой');
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_name: businessName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: BG }}
      >
        <div
          className="rounded-3xl p-8 border text-center max-w-[400px]"
          style={{ background: BG_CARD, borderColor: BORDER }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: GREEN }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[22px] font-bold mb-2">И-мэйл илгээлээ!</h2>
          <p className="text-[14px] mb-6" style={{ color: TEXT_DIM }}>
            {email} хаягт баталгаажуулах линк илгээлээ. И-мэйлээ шалгаж, холбоос дээр дарж бүртгэлээ баталгаажуулна уу.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 rounded-xl text-[14px] font-semibold"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: '#000',
            }}
          >
            Нэвтрэх рүү буцах →
          </Link>
        </div>
      </div>
    );
  }

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
            AI чатбот платформ үүсгэх
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-3xl p-8 border"
          style={{ background: BG_CARD, borderColor: BORDER }}
        >
          <h2 className="text-[22px] font-bold mb-2">Бүртгүүлэх</h2>
          <p className="text-[13px] mb-6" style={{ color: TEXT_DIM }}>
            Бүртгэлтэй хэрэглэгч бол {''}
            <Link href="/auth/login" className="font-semibold" style={{ color: GOLD }}>
              нэвтрэх
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium mb-2" style={{ color: TEXT_DIM }}>
                Бизнесийн нэр
              </label>
              <input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="Coffee Shop Mongolia"
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
                  minLength={6}
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
              {loading ? 'Бүртгэж байна...' : 'Бүртгүүлэх →'}
            </button>
          </form>

          <p className="text-center text-[11px] mt-4" style={{ color: TEXT_DIM }}>
            Бүртгэхийн өмнө {''}
            <a href="#" style={{ color: GOLD }}>Үйлчилгээний нөхцөл</a>
            {' '}уншсан байх ёстой.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-[12px] mt-6" style={{ color: TEXT_DIM }}>
          © 2026 NueraTech LLC
        </p>
      </div>
    </div>
  );
}
