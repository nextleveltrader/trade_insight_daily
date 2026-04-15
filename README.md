# 🏦 Trade Insight Daily

> **AI-Powered Financial Intelligence for the Modern Retail Trader**

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5_beta-purple?style=flat-square)](https://authjs.dev)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=flat-square)](https://orm.drizzle.team)
[![Status](https://img.shields.io/badge/Status-🟢_Active_Development-green?style=flat-square)]()

---

## 📋 Table of Contents

1. [🌟 Project Vision & Summary](#-project-vision--summary)
2. [🚀 Key Features](#-key-features)
3. [💰 Multi-Gateway Payment System](#-multi-gateway-payment-system)
4. [🏗️ Tech Stack](#️-tech-stack)
5. [📂 Project Structure](#-project-structure)
6. [🔒 3-Tier Access Logic](#-3-tier-access-logic)
7. [🗺️ Roadmap](#️-roadmap)
8. [🛠️ Installation & Setup](#️-installation--setup)

---

## 🌟 Project Vision & Summary

**Trade Insight Daily** is an enterprise-grade, AI-powered financial intelligence SaaS platform engineered for the modern retail trader. It closes the informational gap between institutional trading desks and individual traders by delivering the kind of sophisticated, data-heavy market analysis previously accessible only through Bloomberg terminals and proprietary quant models — packaged into a clean, accessible, mobile-first product.

### The Problem We Solve

| Challenge | What Happens Today | What Trade Insight Daily Does |
|---|---|---|
| **Information overload** | Traders manually monitor dozens of assets, news feeds, and economic calendars | Platform consolidates all signals into one structured daily briefing |
| **Institutional blind spots** | Retail traders have no visibility into institutional positioning (COT reports) | Platform surfaces CFTC positioning data and AI-computed sentiment in plain English |
| **Central bank complexity** | Fed/ECB/BOE speeches run 45+ minutes; traders miss critical hawkish/dovish signals | Real-time transcript + AI sentence-level decoding, no financial background required |
| **Geopolitical risk** | Risk events like sanctions, elections, and trade wars move markets instantly | Platform runs a continuous 15-minute AI scan producing a scored Geopolitical Risk Indicator |
| **Correlation blindness** | Most traders don't understand how the assets they hold correlate | Full Pearson correlation matrix, visualised as a heatmap with AI trade opportunity commentary |

### Our Strategic Moat

- **Real-Time Data Freshness:** While competitors deliver end-of-day summaries, our platform targets real-time and intraday refresh cadences — 15-minute GRI scans, hourly news indexing, and live central bank speech decoding.
- **Multi-Model AI Pipeline:** A proprietary sequential multi-model prompt chain (Claude → GPT-4o → Gemini → Perplexity) with tiered fallback and confidence scoring — not a single API call, but a structured reasoning pipeline.
- **ICT Content Scarcity:** High-quality institutional bias content written in Inner Circle Trader (ICT) methodology is rare and in high demand among a rapidly growing, highly monetisable trader community.
- **Conversion Architecture:** The 3-tier access system is engineered to demonstrate value at every tier before requesting payment. The auto-activated 14-day free trial removes all friction from first conversion.

### Dual Revenue Architecture

The platform runs two parallel, compounding revenue streams:

| Revenue Stream | Mechanism |
|---|---|
| **Stripe Subscriptions** | Monthly and annual Premium plans; 14-day free trial auto-activated on registration |
| **Google AdSense** | Display ads shown exclusively to Free-tier authenticated users — zero marginal cost, scales linearly with user growth |

> Free users are not a cost centre — they are a **monetised audience** via AdSense while being nurtured toward Stripe conversion through the paywall experience.

---

## 🚀 Key Features

The platform delivers **8 core AI-powered features**, each independently gated across the 3-tier access system.

---

### F1 — 🤖 Daily AI Insight Engine (20+ Assets)
An automated multi-model prompt chain runs on a configurable daily schedule, generating structured market insights across 20+ Forex and Crypto assets simultaneously. Every output passes through a confidence scoring system before publication.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| Top 30% of card visible; bottom 70% blurred with Sign Up CTA | Full card list with AdSlots injected every 4 cards | Ad-free, full access to all AI-generated insights |

---

### F2 — 📊 ICT Daily Bias Report (3–5 Priority Assets)
Expert-authored institutional bias reports written in Inner Circle Trader (ICT) methodology for 3–5 high-priority assets. These are the highest-value content on the platform and the primary Premium conversion driver. Published exclusively through the private admin panel.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| 100% blurred with locked overlay | Locked for 24h post-publish; fully unlocked after 24h with AdSlot | Instant, unlocked access regardless of publish time |

---

### F3 — 📅 Smart Economic Calendar
An AI-enhanced economic calendar that goes beyond raw data — providing plain-English explanations of what each event means for the market, historical release data, and AI-generated trade setup suggestions.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| 30-second timed preview, then 70–80% blur | Event details, About section, and History visible with AdSlots; AI Insight section locked | Full AI Insight section unlocked |

---

### F4 — 📉 Smart COT Report
Parses and visualises weekly CFTC Commitment of Traders (COT) data as interactive D3.js bar charts. AI generates beginner-friendly explanations of institutional positioning for each tracked asset.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| 30-second timed preview, then 70–80% blur | Charts and text breakdown visible with AdSlots; AI Insight section locked | Full AI Insight section unlocked |

---

### F5 — 📰 Real-Time News & Sentiment
A continuously updated news aggregation pipeline sourcing from Bloomberg, Reuters, and FT. Every article is tagged with impact level, relevant asset symbols, and an AI-generated market significance explanation.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| Top 10% of article text visible | Full article text visible with AdSlots; per-article AI Insight locked | Full article + AI Insight unlocked |

---

### F6 — 🎙️ Central Bank Speech Decoder _(Flagship Feature)_
The most technically sophisticated feature on the platform. Admin schedules central bank speeches (Fed, ECB, BOE, BOJ) with a YouTube URL. The platform captures audio via `MediaRecorder API`, proxies through OpenAI Whisper for transcription, and classifies every sentence in real-time as Hawkish, Dovish, or Neutral with confidence scores. Premium users receive live, sentence-level decoded output as the speech happens.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| YouTube embed and title only | Live transcript with AdSlots; real-time decoding locked; final summary unlocked post-speech | Real-time Hawkish/Dovish sentence-level decoding as it happens |

---

### F7 — 🌍 Geopolitical Risk Indicator (GRI)
A continuously computed risk scoring system that scans the latest news headlines for weighted geopolitical keywords (War, Sanctions, Election, Trade War, etc.) every 15 minutes. Outputs a scored risk level (Low / Medium / High / Extreme) with market impact explanations.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| 70% blurred overlay | Full risk dashboard with history and AdSlots | Ad-free full dashboard access |

---

### F8 — 🔗 Intermarket Correlation Matrix
Computes daily Pearson correlation coefficients across all active asset pairs using 30-day OHLC data. Rendered as an interactive D3.js colour-coded heatmap (−1.0 red → 0.0 white → +1.0 green), helping traders visualise hidden dependencies in their portfolio.

| 🔓 Guest | 🟡 Free (Ad-Supported) | 🟢 Premium |
|---|---|---|
| 70% blurred overlay | Full correlation matrix with explanations and AdSlots | Ad-free access plus AI-generated trading opportunity commentary |

---

## 💰 Multi-Gateway Payment System

Trade Insight Daily is architected for a **global user base** with diverse payment preferences. We support both internationally recognised payment providers and locally dominant mobile money solutions — ensuring no user is excluded by geography or banking access.

---

### 🌐 Global Payment Gateways

#### Stripe — Cards & Global Subscriptions
The primary subscription engine for the platform. Handles the full lifecycle of Premium subscriptions including checkout, renewal, cancellation, and self-service management.

- **Monthly Plan** — recurring Stripe subscription (`STRIPE_PRICE_ID_MONTHLY`)
- **Annual Plan** — discounted annual subscription (`STRIPE_PRICE_ID_ANNUAL`)
- **Checkout Flow** — Stripe-hosted Checkout Sessions for secure card processing
- **Customer Portal** — Self-service subscription management via Stripe Billing Portal
- **Webhooks Handled:** `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`

#### PayPal — Global Alternative Checkout
For users who prefer PayPal over direct card payments. Particularly important for markets in North America, Europe, and Southeast Asia where PayPal has dominant wallet penetration.

- Integrated via PayPal Orders API
- Webhook handler at `src/app/api/webhooks/paypal/route.ts`
- Server action at `src/actions/payments/paypal.actions.ts`

#### Crypto — Web3 & Decentralised Payments
For privacy-conscious users and traders already active in DeFi ecosystems. Crypto payment acceptance positions the platform authentically within the trading community it serves.

- On-chain payment verification
- Webhook handler at `src/app/api/webhooks/crypto/route.ts`
- Server action at `src/actions/payments/crypto.actions.ts`

---

### 🇧🇩 Local Payment Gateway

#### bKash — Mobile Money (Bangladesh)
bKash is Bangladesh's dominant mobile financial services platform, with over 60 million registered users. For the significant segment of our target audience based in South Asia, bKash is the primary — and often only — accessible payment method.

- bKash API integration for subscription initiation and verification
- Webhook handler at `src/app/api/webhooks/bkash/route.ts`
- Server action at `src/actions/payments/bkash.actions.ts`

---

### Payment Infrastructure Summary

| Gateway | Region | Method | Status |
|---|---|---|---|
| **Stripe** | Global | Credit/Debit Cards, Apple Pay, Google Pay | 🟢 Primary |
| **PayPal** | Global | PayPal Wallet & Cards | 🟡 Configured |
| **Crypto** | Global | Cryptocurrency (on-chain) | 🟡 Configured |
| **bKash** | Bangladesh / South Asia | Mobile Money | 🟡 Configured |

> **Security:** All webhook endpoints verify cryptographic signatures before processing any state changes. No payment provider secret keys are ever exposed to the client bundle.

---

## 🏗️ Tech Stack

Every tool in this stack was selected against three criteria: **production-readiness**, **synergy with Next.js 15 App Router and React Server Components**, and **minimal operational overhead** for a lean founding team.

---

### Framework & Runtime

| Layer | Tool | Version | Rationale |
|---|---|---|---|
| **Framework** | Next.js | 16.x (App Router) | RSC-first architecture enables server-side tier derivation with zero client bundle overhead. `generateMetadata()` for SEO. Server Actions for all mutations. |
| **UI Library** | React | 19.x | Concurrent features; `useOptimistic` for bookmark UX; `use()` for streaming data. |
| **Language** | TypeScript | 5.x (Strict) | End-to-end type safety from DB schema → ORM → Server Action → RSC → Client Component. No `any` types. |
| **Runtime** | Node.js / Vercel | — | Serverless deployment with integrated cron jobs, edge middleware, and zero infrastructure management overhead. |

### Database & ORM

| Layer | Tool | Rationale |
|---|---|---|
| **Database** | PostgreSQL (Supabase / Neon) | Production-grade relational database with full SQL support. Supabase/Neon provide serverless-native connection pooling ideal for Vercel deployments. |
| **ORM** | Drizzle ORM | Type-safe, schema-as-code, zero-runtime-overhead. Explicit, inspectable SQL queries. Best-in-class migration tooling via `drizzle-kit`. |
| **Migrations** | `drizzle-kit` | `drizzle-kit generate` + `drizzle-kit migrate`. Raw SQL migration files committed to version control for full auditability. |

### Authentication

| Tool | Details |
|---|---|
| **Auth.js v5** (`next-auth@beta`) | JWT strategy. Full data ownership — all user data lives in your own database. `@auth/drizzle-adapter` for first-class Drizzle integration. Complete control over JWT payload for trial/`isPro` logic. |
| **Google OAuth** | First-party Google sign-in via Auth.js Google Provider. |
| **Credentials** | Email/password with bcrypt (cost factor 12) and timing-safe dummy hash to prevent email enumeration. |

### Styling & UI Components

| Tool | Rationale |
|---|---|
| **Tailwind CSS v4** | Utility-first, JIT compilation, CSS-native config (no `tailwind.config.js` required). |
| **shadcn/ui** | Code-generation system — components are owned by the codebase, built on Radix UI primitives for full accessibility. |
| **Lucide React** | Consistent, tree-shakeable icon set. |
| **D3.js** | Required for COT Report bar charts (F4) and Intermarket Correlation heatmap (F8). |
| **TipTap** | Rich text editor for the admin panel's post editor with full extension suite. |

### AI Processing Pipeline

| Provider | Models Used | Purpose |
|---|---|---|
| **Anthropic (Claude)** | Haiku, Sonnet, Opus | Primary chain executor. Best for structured JSON output and financial reasoning. |
| **OpenAI** | GPT-4o-mini, GPT-4o | Fallback chain step 2. Also used for Whisper API (F6 audio transcription). |
| **Google Gemini** | Flash, Pro | Fallback chain step 3 with aggressive sequential model fallback on `model_not_found`. |
| **Perplexity** | `sonar-small-online`, `sonar-large-online` | Real-time web data retrieval within AI prompt chains. |

**Engine Fallback Hierarchy:** `maximum → medium → minimum` on HTTP 429/503/404. The engine is never dependent on a single model or provider.

### Supporting Infrastructure

| Tool | Purpose |
|---|---|
| **Vercel Cron Jobs** | Schedule AI engine runs, news indexing, GRI computation, correlation computation |
| **Telegram Bot API** | Delivery channel for AI-generated insights and admin notifications |
| **Google AdSense** | Conditional ad display for Free-tier users via `<AdSlot>` component |
| **Vercel Analytics** | Privacy-friendly, GDPR-compliant page view and performance analytics |

---

## 📂 Project Structure

```
src/
├── actions/
│   ├── auth-actions.ts              # registerUser, checkTrialStatus
│   ├── auth.actions.ts              # checkAuth helper
│   ├── assets.actions.ts            # Assets CRUD (Admin)
│   ├── blog.actions.ts              # Blog helpers
│   ├── cot.actions.ts               # COT Report pipeline (CFTC data fetch & store)
│   ├── correlation.actions.ts       # Pearson correlation computation pipeline
│   ├── engine.actions.ts            # Multi-model AI engine (Claude→GPT-4o→Gemini)
│   ├── get-content.ts               # Content query Server Actions
│   ├── gri.actions.ts               # Geopolitical Risk Indicator pipeline
│   ├── news.actions.ts              # News aggregation & sentiment pipeline
│   ├── posts.actions.ts             # Posts CRUD (Admin panel)
│   ├── save-insight.ts              # Bookmark / saved insights system
│   └── payments/
│       ├── stripe.actions.ts        # Stripe Checkout & Customer Portal
│       ├── paypal.actions.ts        # PayPal Orders API integration
│       ├── crypto.actions.ts        # Crypto payment verification
│       └── bkash.actions.ts         # bKash Mobile Money integration
│
├── app/
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── admin/
│   │       ├── login/               # Admin login (HMAC cookie auth)
│   │       │   ├── page.tsx
│   │       │   └── loading.tsx
│   │       └── (dashboard)/
│   │           ├── layout.tsx       # Admin shell
│   │           ├── page.tsx         # Dashboard overview
│   │           ├── error.tsx
│   │           ├── loading.tsx
│   │           ├── assets/          # Asset management CRUD
│   │           │   ├── page.tsx
│   │           │   ├── error.tsx
│   │           │   └── loading.tsx
│   │           ├── engine/          # AI engine trigger panel
│   │           │   ├── page.tsx
│   │           │   ├── error.tsx
│   │           │   └── loading.tsx
│   │           ├── posts/           # Post management with TipTap editor
│   │           │   ├── page.tsx
│   │           │   ├── error.tsx
│   │           │   ├── loading.tsx
│   │           │   └── [id]/
│   │           │       ├── page.tsx
│   │           │       ├── error.tsx
│   │           │       └── loading.tsx
│   │           └── speeches/        # CB Speech scheduling
│   │               ├── page.tsx
│   │               ├── error.tsx
│   │               └── loading.tsx
│   │
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── login/                   # Email/password & Google OAuth login
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   └── register/                # User registration (trial auto-activated)
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   ├── (public)/
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── page.tsx                 # Public landing page
│   │   └── insights/[id]/           # Public insight detail view
│   │       └── page.tsx
│   │
│   ├── (user)/
│   │   ├── layout.tsx               # User shell (UserTierProvider)
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── feed/                    # F1 + F2 — Daily Insights + ICT Bias
│   │   │   ├── page.tsx
│   │   │   ├── FeedPageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── insights/[id]/           # F1 — Insight Detail View
│   │   │   ├── page.tsx
│   │   │   ├── InsightDetailClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── calendar/                # F3 — Smart Economic Calendar
│   │   │   ├── page.tsx
│   │   │   ├── CalendarPageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── cot/                     # F4 — Smart COT Report
│   │   │   ├── page.tsx
│   │   │   ├── CotPageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── news/                    # F5 — Real-Time News & Sentiment
│   │   │   ├── page.tsx
│   │   │   ├── NewsPageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── speeches/                # F6 — CB Speech Decoder
│   │   │   ├── page.tsx
│   │   │   ├── SpeechesPageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── gri/                     # F7 — Geopolitical Risk Indicator
│   │   │   ├── page.tsx
│   │   │   ├── GriPageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── correlation/             # F8 — Intermarket Correlation Matrix
│   │   │   ├── page.tsx
│   │   │   ├── CorrelationMatrixClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── saved/                   # User bookmarks
│   │   │   ├── page.tsx
│   │   │   ├── SavedPageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── profile/                 # User profile & subscription status
│   │   │   ├── page.tsx
│   │   │   ├── ProfilePageClient.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   ├── pricing/                 # Stripe pricing & plan selection
│   │   │   ├── page.tsx
│   │   │   ├── error.tsx
│   │   │   └── loading.tsx
│   │   └── upgrade/                 # Upgrade flow
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   ├── api/
│   │   ├── auth/[...nextauth]/      # Auth.js route handler
│   │   │   └── route.ts
│   │   ├── admin/auth/              # Admin HMAC cookie issuance
│   │   │   └── route.ts
│   │   ├── cron/
│   │   │   ├── engine/              # AI insight engine (daily, 06:00 UTC)
│   │   │   │   └── route.ts
│   │   │   ├── cot/                 # COT data fetch (weekly)
│   │   │   │   └── route.ts
│   │   │   ├── correlation/         # Pearson correlation compute (daily)
│   │   │   │   └── route.ts
│   │   │   ├── gri/                 # GRI compute (every 15 minutes)
│   │   │   │   └── route.ts
│   │   │   └── news/                # News aggregation (every 30 minutes)
│   │   │       └── route.ts
│   │   ├── transcribe/              # OpenAI Whisper relay for CB speeches
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       ├── stripe/              # Stripe subscription lifecycle webhooks
│   │       │   └── route.ts
│   │       ├── paypal/              # PayPal payment webhooks
│   │       │   └── route.ts
│   │       ├── crypto/              # Crypto payment verification webhooks
│   │       │   └── route.ts
│   │       └── bkash/               # bKash payment webhooks
│   │           └── route.ts
│   │
│   ├── layout.tsx                   # Root layout (AdSense script, fonts)
│   ├── globals.css
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── admin/
│   │   ├── AssetsManager.tsx        # Asset CRUD UI
│   │   ├── PostEditorClient.tsx     # TipTap-powered post editor
│   │   ├── PostsTable.tsx           # Post list with status management
│   │   ├── RichTextEditor.tsx       # TipTap wrapper component
│   │   └── Sidebar.tsx              # Admin panel sidebar
│   ├── ads/
│   │   └── AdSlot.tsx               # Conditional Google AdSense renderer
│   ├── gating/
│   │   ├── ContentBlur.tsx          # Gradient blur gate with CTA overlay
│   │   ├── PremiumLock.tsx          # Full-overlay Premium feature lock
│   │   └── TimedGate.tsx            # Countdown-based timed content gate
│   ├── layout/
│   │   └── RootLayoutShell.tsx      # Root layout shell component
│   ├── payments/
│   │   ├── CryptoPaymentStatus.tsx  # Crypto transaction status UI
│   │   └── PaymentMethodSelector.tsx # Multi-gateway payment selector
│   ├── providers/
│   │   ├── SessionProvider.tsx      # Auth.js session context provider
│   │   └── UserTierProvider.tsx     # UserTier context (guest|free|premium)
│   ├── shared/
│   │   └── LogoutButton.tsx         # Session-aware logout button
│   ├── skeletons/
│   │   ├── ChartSkeleton.tsx        # D3 chart loading skeleton
│   │   ├── FeedSkeleton.tsx         # Feed card list skeleton
│   │   └── InsightCardSkeleton.tsx  # Individual card skeleton
│   ├── ui/                          # shadcn/ui components (owned by codebase)
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   └── user/
│       ├── MobileHeader.tsx         # Mobile top header bar
│       ├── MobileNav.tsx            # Mobile bottom navigation
│       ├── ProfileWidget.tsx        # Trial countdown / subscription status
│       └── UserSidebar.tsx          # Desktop sidebar with feature links
│
├── constants/
│   └── index.ts                     # App-wide constants
│
├── db/
│   ├── index.ts                     # Database connection factory
│   ├── schema.ts                    # Full Drizzle ORM schema definition
│   ├── seed.ts                      # Categories & assets seed script
│   └── migrations/
│       ├── 0000_foundation.sql      # Foundation tables (Auth + Core)
│       └── 0001_feature_tables.sql  # Feature-specific tables
│
├── hooks/
│   └── use-auth.ts                  # Client-side auth hook
│
├── lib/
│   ├── env.ts                       # Type-safe environment variable access
│   ├── get-user-tier.ts             # getUserTier() — cornerstone of gating
│   └── utils.ts                     # clsx + tailwind-merge utility
│
├── middleware.ts                     # Route access control & tier-based redirects
│
├── auth.ts                          # Auth.js v5 configuration
│
└── types/
    ├── content.ts                   # UIInsight, UIInsightDetail, Direction, etc.
    ├── index.ts                     # Shared type exports
    └── next-auth.d.ts               # Session & JWT type augmentation
```

---

## 🔒 3-Tier Access Logic

Every user on the platform is classified into exactly one tier, derived **once per page render on the server** by `getUserTier()` in `src/lib/get-user-tier.ts`. This value is passed as a prop to Client Components. It is **never** derived on the client from raw session data.

### Tier Definitions

| Tier | Identity | Condition | Revenue Model |
|---|---|---|---|
| 🔓 **Guest** | Not logged in | No active session | Conversion funnel entry point |
| 🟡 **Free** | Registered user | `isPro = false` AND trial expired | Google AdSense display advertising |
| 🟢 **Premium** | Paying or trial user | `isPro = true` OR `trialEndsAt > Date.now()` | Stripe monthly / annual subscription |

### The 14-Day Free Trial

- **Auto-Activated:** Triggered at the moment of registration for both email/password and Google OAuth — no opt-in required.
- **Full Premium Access:** The user receives complete Premium-tier access for exactly 14 days.
- **Expiry Redirect:** On the first request after trial expiry where `isPro = false`, middleware redirects to `/pricing`. The `/pricing` and `/upgrade` routes are exempt.
- **Non-Reinstatable:** Once a trial expires, it cannot be re-activated. Only a Stripe subscription (`isPro = true`) restores Premium access.

### Middleware Routing Matrix

| Route Pattern | 🔓 Guest | 🟡 Free | 🟢 Premium | ⏰ Trial Expired |
|---|---|---|---|---|
| `/` (landing page) | ✅ Allow | ✅ Allow | ✅ Allow | ✅ Allow |
| `/feed`, `/insights/*`, `/calendar`, `/cot`, `/news`, `/gri`, `/correlation`, `/speeches` | ✅ **Allow** _(content gated in component layer)_ | ✅ Allow | ✅ Allow | ✅ Allow |
| `/saved`, `/profile` | ➡️ `/login` | ✅ Allow | ✅ Allow | ✅ Allow |
| `/pricing`, `/upgrade` | ✅ Allow | ✅ Allow | ✅ Allow | ✅ Allow |
| `/login`, `/register` | ✅ Allow | ➡️ `/feed` | ➡️ `/feed` | ✅ Allow |
| `/admin/*` | ➡️ `/admin/login` | ➡️ `/admin/login` | ➡️ `/admin/login` | ➡️ `/admin/login` |

> **Architectural Note:** Feature routes are **not** behind an auth redirect. Guests can reach all feature pages. Content gating is implemented entirely in the component layer using `<ContentBlur>`, `<PremiumLock>`, and `<TimedGate>` — never in the routing layer.

### The 5 Content Gating Components

| Component | Behaviour | Used For |
|---|---|---|
| `<ContentBlur>` | Applies a CSS gradient mask and blur at a configurable percentage; overlays a CTA card | Partially visible content for Guests (F1, F2) |
| `<TimedGate>` | Renders content for N seconds, then switches to locked/blurred view with a visible countdown | 30-second preview for Guests on F3, F4 |
| `<PremiumLock>` | Full overlay card with lock icon and Upgrade CTA | AI Insight sub-sections for Free users on F3–F6 |
| `<AdSlot>` | Conditionally renders Google AdSense `<ins>` tag; only active when `userTier === 'free'` | Between content groups for Free users across all features |
| `<UserTierProvider>` | React context exposing `useUserTier()` hook to all Client Component descendants | User layout shell — passed the server-derived tier value |

---

## 🗺️ Roadmap

The platform is built in 8 sequential phases. Each phase has a defined completion checklist before the next phase begins.

---

### Phase 1 — 🏗️ Iron Foundation _(Current)_
**Auth, Database, Routing & 3-Tier Access Middleware**

Complete authentication system (email/password + Google OAuth), full database schema, middleware-based routing, all 5 gating components, admin panel with HMAC cookie auth, and the `getUserTier()` helper.

**Exit Criteria:** A guest can browse `/feed` without being redirected. A trial-expired user is redirected to `/pricing`. The admin panel is accessible only with a valid HMAC cookie.

---

### Phase 2 — 🤖 MVP Feature 1: Daily AI Insight Engine
**The Core Product, End-to-End**

Multi-model AI engine (`engine.actions.ts`) with sequential fallback (Claude → GPT-4o → Gemini → Perplexity), confidence scoring, and draft post creation. Vercel cron job scheduled daily at 06:00 UTC. Feed page with full 3-tier gating. Bookmark system with optimistic UI.

---

### Phase 3 — 📊 Feature 2: ICT Daily Bias Report
**Expert Analysis Workflow**

Admin panel extension for ICT post type with direction, confidence, and `isProOnly` fields. ICT section in the feed with correct 24-hour unlock logic. Telegram notification on ICT post publish.

---

### Phase 4 — 💳 Stripe Payment Integration
**The Monetisation Layer**

Full Stripe integration: Checkout Sessions for initial subscription, Customer Portal for self-service management, and webhook handlers for `checkout.session.completed`, `customer.subscription.deleted`, and `invoice.payment_failed`. Rebuilt `/pricing` page with live plan options. Profile widget wired to trial countdown and subscription status.

---

### Phase 5 — 📉🔗 Features 4 & 8: COT Report & Correlation Matrix
**Data Visualisation Features**

CFTC COT data pipeline with weekly automated fetch. D3.js grouped bar chart for positioning data. Pearson correlation engine with daily compute. D3.js colour-coded heatmap for the correlation matrix.

---

### Phase 6 — 📅📰🌍 Features 3, 5 & 7: Calendar, News & GRI
**Real-Time Data Pipelines**

Smart Economic Calendar with AI explanations and historical data. RSS news aggregator with AI significance scoring (every 30 minutes). Geopolitical Risk Indicator with weighted keyword scanning (every 15 minutes).

---

### Phase 7 — 🎙️ Feature 6: Central Bank Speech Decoder
**The Flagship Technical Feature**

YouTube embed scheduling, `MediaRecorder API` audio capture, OpenAI Whisper transcription relay, real-time Hawkish/Dovish sentence classification, and SSE/polling-based delivery to Premium clients.

---

### Phase 8 — ✨ Polish, SEO & Launch Readiness
**Production Hardening**

`loading.tsx` and `error.tsx` in every route segment, security headers (`Content-Security-Policy`, `X-Frame-Options`, etc.), `generateMetadata()` for all 8 feature pages, `sitemap.ts`, `robots.ts`, OpenGraph images, rate limiting on AI endpoints, analytics integration, and full E2E test sign-off across all tiers on mobile and desktop.

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** `>= 20.9.0`
- **npm** `>= 10.x`
- A PostgreSQL database (Supabase or Neon recommended)
- API keys for: Anthropic, OpenAI, Google Gemini, Perplexity, Stripe, Google OAuth

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/trade-insight-daily.git
cd trade-insight-daily
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root. All variables listed below are **required**:

```env
# ─── Database ───────────────────────────────────────────────────────────────
DATABASE_URL=                         # PostgreSQL connection string

# ─── Auth.js v5 ─────────────────────────────────────────────────────────────
AUTH_SECRET=                          # Generate: openssl rand -base64 32
AUTH_GOOGLE_ID=                       # Google OAuth Client ID
AUTH_GOOGLE_SECRET=                   # Google OAuth Client Secret

# ─── Admin Panel ────────────────────────────────────────────────────────────
ADMIN_PASSWORD_HASH=                  # SHA-256 hash of your admin password
ADMIN_HMAC_SECRET=                    # Generate: openssl rand -base64 32

# ─── AI Providers ───────────────────────────────────────────────────────────
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_GEMINI_API_KEY=
PERPLEXITY_API_KEY=

# ─── Telegram ───────────────────────────────────────────────────────────────
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# ─── Stripe ─────────────────────────────────────────────────────────────────
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=
STRIPE_PRICE_ID_ANNUAL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# ─── PayPal ─────────────────────────────────────────────────────────────────
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_WEBHOOK_ID=

# ─── Crypto Payments ────────────────────────────────────────────────────────
CRYPTO_PAYMENT_API_KEY=
CRYPTO_WEBHOOK_SECRET=

# ─── bKash ──────────────────────────────────────────────────────────────────
BKASH_APP_KEY=
BKASH_APP_SECRET=
BKASH_USERNAME=
BKASH_PASSWORD=
BKASH_WEBHOOK_SECRET=

# ─── Advertising ────────────────────────────────────────────────────────────
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=

# ─── Vercel Cron ────────────────────────────────────────────────────────────
CRON_SECRET=                          # Generate: openssl rand -base64 32

# ─── App ────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Database Migrations

```bash
# Generate migration files from schema
npx drizzle-kit generate

# Apply migrations to your database
npx drizzle-kit migrate
```

### 5. Seed the Database

```bash
# Seed categories and initial asset list
npx tsx src/db/seed.ts
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the codebase |
| `npx drizzle-kit generate` | Generate SQL migration from schema changes |
| `npx drizzle-kit migrate` | Apply pending migrations to the database |
| `npx drizzle-kit studio` | Launch Drizzle Studio (visual DB browser) |

---

### Admin Panel Access

The admin panel at `/admin` uses a **separate HMAC-signed cookie authentication system**, completely independent of the user Auth.js session.

1. Navigate to `/admin/login`
2. Enter the admin password (the SHA-256 hash of which is stored in `ADMIN_PASSWORD_HASH`)
3. A signed `admin_session` cookie is issued, valid for the browser session
4. Middleware verifies this cookie on every `/admin/*` request

---

## 📜 Architectural Principles

To maintain codebase integrity, the following rules are enforced across all phases of development:

1. **Server-Side Tier Derivation:** `getUserTier()` is called **once per page, in the RSC shell**. Never derive the user tier on the client from raw session data.
2. **Always Pass `userTier`, Never a Boolean:** The prop signature is always `userTier: 'guest' | 'free' | 'premium'`. A binary `hasAccess: boolean` is insufficient for 3-tier gating.
3. **All FK Columns are INTEGER:** No TEXT foreign keys. This prevents silent type mismatches at the DB level.
4. **Every Route Segment Needs `loading.tsx` and `error.tsx`:** No blank screens. No unhandled errors. Both files are required from Phase 1 onwards.
5. **Never Expose Secret Keys to the Client:** Stripe secret key, AI provider keys, and webhook secrets live exclusively in server-side code. `NEXT_PUBLIC_*` variables contain only non-sensitive public values.
6. **Migrations Are Tracked:** Every schema change produces a numbered SQL file in `src/db/migrations/`. The schema is never mutated without a corresponding migration.

---

## 📄 License

This project is proprietary software. All rights reserved. Unauthorised copying, distribution, or modification of this codebase is strictly prohibited.

---

<div align="center">

**Trade Insight Daily** — _Institutional Intelligence. Retail Accessible._

Built with ❤️ using Next.js, TypeScript, and a multi-model AI pipeline.

</div>
