"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/providers/UserProvider";
import { ArrowLeft, Camera } from "lucide-react";

export default function SettingsPage() {
  const { user, refresh } = useUser();
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const initials = useMemo(() => {
    const a = (user?.firstName?.[0] || "H").toUpperCase();
    const b = (user?.lastName?.[0] || "V").toUpperCase();
    return `${a}${b}`;
  }, [user?.firstName, user?.lastName]);

  const onPick = async (file: File | null) => {
    if (!file) return;
    setErr(null);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/user/avatar", {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to upload avatar");

      await refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-72 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-[-300px] right-[-200px] h-[680px] w-[680px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-xl hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-xl">
            Settings
          </span>
        </header>

        {/* Content */}
        <section className="flex flex-1 items-start justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-white/10 p-5 sm:p-7">
            <div className="mb-5">
              <h1 className="text-lg font-semibold text-white">
                Profile settings
              </h1>
              <p className="mt-1 text-xs text-white/60">
                Update how your account appears on the Haven waitlist.
              </p>
            </div>

            {err && (
              <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-100">
                {err}
              </div>
            )}

            {/* Avatar row */}
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                {user?.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-medium text-white/50">
                    {initials}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <div className="text-sm font-medium text-white">
                  {user?.fullName || "Your profile"}
                </div>
                <div className="text-xs text-white/50">{user?.email}</div>

                <label className="mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl hover:bg-white/10 disabled:opacity-50">
                  <Camera className="h-4 w-4 text-primary" />
                  {uploading ? "Uploading…" : "Change avatar"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onPick(e.target.files?.[0] || null)}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {/* Footer hint */}
            <p className="mt-6 text-[11px] text-white/40">
              Your avatar will be visible on your Haven account when full access
              launches.
            </p>
          </div>
        </section>

        <footer className="pb-6 text-center text-[10px] text-white/30">
          © {new Date().getFullYear()} Haven Labs.
        </footer>
      </div>
    </main>
  );
}
