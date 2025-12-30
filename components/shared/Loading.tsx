"use client";

import React from "react";
import { Loader2, Mail, Sparkles } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="relative w-full max-w-sm rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 px-5 py-6 shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
        {/* Top brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/15">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-emerald-200">
              HVN
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Haven waitlist
            </span>
            <span className="text-sm font-semibold text-zinc-50">
              Preparing your account
            </span>
          </div>
        </div>

        {/* Spinner + message */}
        <div className="mt-4 flex items-start gap-3">
          <div className="relative h-10 w-10 shrink-0">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/15" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-300" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs leading-relaxed text-zinc-400">
              We’re setting up your Haven account and confirming your place on
              the waitlist.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <Mail className="h-3.5 w-3.5 text-emerald-300" />
              You’ll be emailed when full access opens
            </div>
          </div>
        </div>

        {/* Status bullets */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Creating secure, non-custodial profile
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Saving your preferences
          </div>
        </div>

        {/* Subtle skeleton */}
        <div className="mt-5 space-y-2">
          <div className="h-2 w-4/5 animate-pulse rounded-full bg-zinc-800" />
          <div className="h-2 w-2/3 animate-pulse rounded-full bg-zinc-900" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
