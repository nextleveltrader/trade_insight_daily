import Link from "next/link";
import { BarChart3, Lock, Mail } from "lucide-react";

import { signIn } from "@/auth";

const googleSignInAction = async () => {
  "use server";
  await signIn("google", { redirectTo: "/feed" });
};

const credentialsSignInPlaceholderAction = async () => {
  "use server";
  // UI-only placeholder for now. Credentials submit wiring comes next.
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <section className="relative w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
              <BarChart3 className="h-6 w-6 text-cyan-300" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Sign in to Trade Insight Daily
            </h1>
            <p className="text-sm text-slate-400">
              Institutional Intelligence. Retail Accessible.
            </p>
          </div>

          <form action={googleSignInAction}>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.8-5.4 3.8-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.7 3.4 14.6 2.5 12 2.5 6.9 2.5 2.8 6.6 2.8 11.7S6.9 20.9 12 20.9c6.9 0 9.1-4.8 9.1-7.2 0-.5 0-.9-.1-1.2H12z"
                />
                <path
                  fill="#34A853"
                  d="M2.8 7.7l3.2 2.4c.9-1.8 2.8-3 6-3 1.8 0 3 .8 3.7 1.4l2.5-2.4C16.7 3.4 14.6 2.5 12 2.5 8.1 2.5 4.7 4.8 2.8 7.7z"
                />
                <path
                  fill="#4A90E2"
                  d="M12 20.9c2.5 0 4.6-.8 6.1-2.2l-2.8-2.2c-.8.6-1.8 1-3.3 1-3.8 0-5.1-2.5-5.4-3.8l-3.2 2.5c1.8 3.1 5.3 4.7 8.6 4.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M2.8 16.2l3.2-2.5c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L2.8 7.7c-.7 1.3-1.1 2.6-1.1 4.1s.4 2.8 1.1 4.4z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Or
            </span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <form action={credentialsSignInPlaceholderAction} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wide text-slate-400"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@trader.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-wide text-slate-400"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-cyan-900/50 transition hover:from-cyan-400 hover:to-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Create one
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
