"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/providers/UserProvider";
import { usePrivy } from "@privy-io/react-auth";
import {
  ArrowRight,
  Copy,
  Check,
  Mail,
  Sparkles,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function WaitlistDashboardPage() {
  const { user, loading, error, refresh } = useUser();
  const { logout } = usePrivy();

  const [copied, setCopied] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const firstName = useMemo(
    () => user?.firstName || user?.fullName?.split(" ")?.[0] || "there",
    [user]
  );

  const referralLink = useMemo(() => {
    const code = user?.referralCode?.trim();
    if (!code) return "";
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/sign-in?ref=${encodeURIComponent(code)}`;
  }, [user?.referralCode]);

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      // Clear Haven session cookie (server)
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      }).catch(() => {});

      // Clear Privy session (client)
      await logout();
    } finally {
      setLoggingOut(false);
      // UserProvider will redirect after user becomes null,
      // but we can also hard-navigate:
      window.location.href = "/";
    }
  };

  if (loading) return null; // your UserProvider already renders <Loading />

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-72 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-[-320px] right-[-220px] h-[680px] w-[680px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-10">
        {/* top nav */}
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
                Waitlist dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-xl hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? "Logging out…" : "Logout"}
            </button>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-white/10 p-5 sm:p-7">
            {error && (
              <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-100">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* avatar */}
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {user?.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-white/40">
                    HVN
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="text-sm font-semibold text-white">
                  {user?.fullName ||
                    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
                    "Your account"}
                </div>
                <div className="text-[11px] text-white/60">{user?.email}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                <ShieldCheck className="h-3 w-3 text-primary" />
                Account created
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                <Mail className="h-3 w-3 text-primary" />
                Email on launch
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                <Sparkles className="h-3 w-3 text-primary" />
                Early access list
              </span>
            </div>

            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              You’re on the waitlist, {firstName}.
            </h1>

            <p className="mt-3 text-sm text-white/70 sm:text-base">
              Your Haven account is ready. We’ll email you when Haven fully
              launches — then you can sign in and start using everything
              immediately.
            </p>

            {/* Invite */}
            {!!user?.referralCode && (
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/25 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                      Invite friends
                    </div>
                    <div className="mt-1 text-[12px] text-white/70">
                      Share your link to move up the list.
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    disabled={!referralLink}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/80 hover:bg-white/10"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied" : "Copy link"}
                  </button>
                </div>

                {referralLink && (
                  <div className="mt-3 break-all rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-[11px] text-white/70">
                    {referralLink}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/settings"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 sm:w-auto"
              >
                Edit profile
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={refresh}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_18px_rgba(190,242,100,0.6)] hover:brightness-105 sm:w-auto"
              >
                Refresh
              </button>
            </div>
          </div>
        </section>

        <footer className="pb-6 text-center text-[10px] text-white/30">
          © {new Date().getFullYear()} Haven Labs.
        </footer>
      </div>
    </main>
  );
}
