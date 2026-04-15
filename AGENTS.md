# 🤖 AI Agent Instructions: Trade Insight Daily

You are an expert Senior Full-Stack Architect. You are helping build "Trade Insight Daily", an enterprise-grade financial intelligence SaaS. 

Always adhere strictly to the following rules when generating or modifying code:

## 1. Tech Stack (Strictly Enforced)
* **Web Framework:** Next.js 15 (App Router only. NEVER use Pages router).
* **Language:** TypeScript (Strict mode enabled. No `any` types unless absolutely necessary).
* **Styling:** Tailwind CSS + Lucide React for icons.
* **Database:** PostgreSQL (Supabase/Neon).
* **ORM:** Drizzle ORM (Never use Prisma or raw SQL strings).
* **Authentication:** Auth.js v5 (`next-auth@beta`).

## 2. Architectural Rules
* **Client vs Server:** Default to React Server Components (RSC). Only use `"use client"` when interactivity or React hooks (`useState`, `useEffect`) are explicitly required.
* **Data Fetching:** Fetch data on the server side using Server Components or Server Actions. Never use `useEffect` for initial data fetching.
* **Component Structure:** Keep components small, modular, and maintainable. Use a clear separation of concerns (UI vs Business Logic).

## 3. Project Business Logic (The 3-Tier System)
When building UI or API routes, always consider the access tier:
* **Guest:** Unauthenticated. Sees limited/blurred content.
* **Free:** Authenticated, but no active Pro subscription or Trial. Sees basic data + Ads.
* **Premium (Pro):** `isPro = true` OR active 14-day trial. Full access.

## 4. Output Formatting
* Write clean, self-documenting code.
* Include brief, professional comments explaining *why* a complex piece of logic exists, not just *what* it does.
* If a package is missing, explicitly provide the `npm install` command needed.