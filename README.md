# ChatNova

AI чатбот SaaS платформ — Messenger & Instagram бизнестэй холбоотой Mongolia-ийн бизнесүүдэд зориулагдсан.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Postgres, Auth, Realtime)
- **AI**: OpenAI GPT-4.1 Mini, Anthropic Claude, Google Gemini
- **Deploy**: Vercel (frontend), Supabase (backend)

## Quick Start

### 1. Supabase Setup

1. [supabase.com](https://supabase.com) дээр шинэ проект үүсгэнэ
2. SQL Editor дээр `supabase/migrations/001_initial_schema.sql` файл ажиллуулна
3. Project Settings > API хуудснаас URL болон anon key-г хуулна

### 2. Environment Variables

```bash
cp .env.example .env.local
```

`.env.local` файлд утгуудыг оруулна:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `OPENAI_API_KEY` - OpenAI API key

### 3. Run Locally

```bash
npm install
npm run dev
```

### 4. Deploy to Vercel

1. GitHub руу push хийнэ
2. [vercel.com](https://vercel.com) дээр шинэ проект үүсгэнэ
3. GitHub repo-оо холбогно
4. Environment variables-г Vercel dashboard дээр тохируулна

## Project Structure

```
next-chatnova/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── dashboard/page.tsx    # Admin dashboard
│   │   ├── auth/login/           # Login page
│   │   ├── auth/register/        # Register page
│   │   └── api/
│   │       ├── chat/             # AI chat endpoint
│   │       ├── stats/            # Dashboard stats API
│   │       └── webhooks/         # Facebook & QPay webhooks
│   ├── components/
│   │   ├── ui/                  # UI components
│   │   └── Sidebar.tsx          # Dashboard sidebar
│   └── lib/
│       ├── supabase/            # Supabase client utilities
│       └── utils.ts             # Utility functions
├── supabase/
│   └── migrations/               # Database migrations
└── .env.example                 # Environment template
```

## Database Schema

- `profiles` - Хэрэглэгчийн мэдээлэл
- `ai_configs` - AI тохиргоо
- `knowledge_base` - Мэдлэгийн сан (FAQ)
- `products` - Бүтээгдэхүүн
- `conversations` - Харилцагчид
- `messages` - Мессежнүүд
- `orders` - Захиалгууд
- `activity_log` - Үйлдлийн түүх
- `broadcasts` - Broadcast мессежнүүд

## Features

- [x] Landing page (Маркетинг хуудас)
- [x] Admin dashboard (Админ хянах самбар)
- [x] Authentication (Нэвтрэх/Бүртгүүлэх)
- [x] Products catalog (Бүтээгдэхүүн)
- [x] AI Config (AI тохиргоо)
- [x] Knowledge Base (Мэдлэгийн сан)
- [x] AI Chat API (OpenAI integration)
- [x] Messages interface (Мессеж)
- [x] Facebook webhook
- [x] QPay webhook
- [ ] Analytics deep views
- [ ] Broadcast functionality
- [ ] Comment → PM automation
- [ ] Schedule/Calendar
- [ ] Settings page

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

## License

© 2026 NueraTech LLC
