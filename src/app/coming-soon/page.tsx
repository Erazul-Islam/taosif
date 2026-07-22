import Link from "next/link";
import { ArrowLeft, Clock3, Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_40%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10 text-slate-100">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.8)] backdrop-blur sm:p-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-300">
          <Clock3 className="h-3.5 w-3.5" />
          Coming Soon
        </div>

        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          This section is getting ready.
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
          We&apos;re working on something exciting for this page. Please check back soon for updates.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-sm text-slate-300">
          <div className="flex items-center gap-2 font-medium text-white">
            <Sparkles className="h-4 w-4 text-sky-400" />
            What&apos;s next?
          </div>
          <p className="mt-2 text-slate-400">
            Fresh content, new features, and a polished experience are on the way.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
