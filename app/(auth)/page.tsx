"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Lock,
  Zap,
  ArrowUpRight,
  Coins,
  CreditCard,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const Landing = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient glow (match app vibe) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-72 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-[-320px] right-[-220px] h-[680px] w-[680px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-10">
        {/* Top nav */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-black/30 backdrop-blur-xl">
              <Image
                src="/logo.jpg"
                alt="Haven"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/70">
                Haven
              </span>
              <span className="text-[11px] text-white/50">
                The easy way to use crypto.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-xl hover:bg-white/10 sm:inline-flex"
              >
                Sign in
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-black shadow-[0_0_18px_rgba(190,242,100,0.6)] hover:brightness-105">
                Join waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Center content */}
        <section className="flex flex-1 flex-col items-center justify-center py-12">
          <div className="w-full max-w-2xl">
            {/* Hero panel */}
            <div className="rounded-3xl border border-zinc-800 bg-white/10 p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                  <Lock className="h-3 w-3" />
                  Non-custodial
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                  <Zap className="h-3 w-3 text-primary" />
                  Gasless transactions
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                  <Shield className="h-3 w-3 text-primary" />
                  Secure by design
                </span>
              </div>

              {/* WAITLIST header */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  Waitlist open
                </span>
                <span className="text-[11px] text-white/55">
                  Create an account now — we’ll email you when full access
                  unlocks.
                </span>
              </div>

              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Crypto has the best tools — but it’s still too hard to use.
              </h1>

              <p className="mt-3 text-sm text-white/70 sm:text-base">
                People want higher yields, instant transfers, and easy access to
                markets — but end up dealing with gas, confusing wallets, random
                fees, and interfaces built for power users.
              </p>

              {/* Problem → Solution → How it works */}
              <div className="mt-6 space-y-2">
                {[
                  {
                    icon: <CreditCard className="h-4 w-4 text-primary" />,
                    title: "The problem",
                    body: "Using crypto still feels like managing 5 apps: buy somewhere, move funds, pay gas, guess fees, then finally do the thing you wanted.",
                  },
                  {
                    icon: <Coins className="h-4 w-4 text-primary" />,
                    title: "What Haven solves",
                    body: "Haven makes using the best of crypto simple — savings accounts, gasless transactions, and a clean exchange for stocks + crypto in one place.",
                  },
                  {
                    icon: <BarChart3 className="h-4 w-4 text-primary" />,
                    title: "How Haven works",
                    body: "You hold USDC, Haven sponsors gas, and any fees are charged in your chosen display currency — so you never need to hold SOL just to use the app.",
                  },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="rounded-2xl border border-zinc-800 bg-black/25 px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        {row.icon}
                      </div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                        {row.title}
                      </div>
                    </div>
                    <div className="mt-2 text-[12px] leading-relaxed text-white/70">
                      {row.body}
                    </div>
                  </div>
                ))}
              </div>

              {/* What you get (waitlist-focused) */}
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  {
                    title: "Savings accounts",
                    body: "Put USDC to work with simple savings options and clear tracking.",
                  },
                  {
                    title: "Gasless transactions",
                    body: "Send, swap, and move funds without needing SOL for gas.",
                  },
                  {
                    title: "Fees in your currency",
                    body: "No surprise costs — fees are shown and charged in your display currency.",
                  },
                  {
                    title: "Easy exchange",
                    body: "A clean place to buy stocks and crypto with filters that make sense.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-zinc-800 bg-white/5 px-4 py-3"
                  >
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                      {f.title}
                    </div>
                    <div className="mt-1 text-[12px] leading-relaxed text-white/70">
                      {f.body}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/sign-in" className="w-full sm:w-auto">
                  <button className="haven-primary-btn w-full sm:w-auto px-5">
                    Join the waitlist
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                <div className="flex items-center gap-2 text-[11px] text-white/55">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                  <span>Create account → onboard → waitlist dashboard</span>
                </div>
              </div>

              {/* Tiny reassurance */}
              <p className="mt-4 text-[11px] text-white/45">
                No spam. We’ll only email you about launch + early access.
              </p>
            </div>

            {/* Minimal footer note */}
            <p className="mt-4 text-center text-[11px] text-white/40">
              Haven is non-custodial — you remain in control of your assets.
            </p>
          </div>
        </section>

        <footer className="pb-6 text-center text-[10px] text-white/30">
          © {new Date().getFullYear()} Haven Labs.
        </footer>
      </div>
    </main>
  );
};

export default Landing;
