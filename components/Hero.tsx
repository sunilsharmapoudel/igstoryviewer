import Image from "next/image";
import StorySearch from "@/components/StorySearch";
import { ShieldCheckIcon, ZapIcon, SparklesIcon } from "@/components/icons";

const TRUST_BADGES = [
  { icon: ShieldCheckIcon, label: "100% Anonymous" },
  { icon: ZapIcon, label: "Instant Results" },
  { icon: SparklesIcon, label: "Free Forever" },
];

export default function Hero() {
  return (
    <section
      id="stories"
      className="relative scroll-mt-20 overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="bg-grid-fade pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-linear-to-br from-accent-pink/25 via-accent-purple/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-linear-to-bl from-primary/20 via-accent-purple/10 to-transparent blur-3xl"
        style={{ animation: "float 7s ease-in-out infinite 1s" }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:gap-10 lg:py-28">
        <div className="w-full text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted">
            <Image
              src="/images/instagram-logo.webp"
              alt=""
              width={16}
              height={16}
              aria-hidden
            />
            Stories &middot; Reels &middot; Highlights &middot; Profiles
          </div>

          <h1 className="mt-5 font-brand text-4xl leading-tight font-extrabold tracking-tight text-title sm:text-5xl lg:text-6xl">
            Watch Instagram stories
            <span className="text-gradient-brand block">without a trace.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted lg:mx-0">
            Enter any public Instagram username to anonymously view and
            download stories, reels, and highlights &mdash; no account, no
            login, no notifications sent.
          </p>

          <div className="mt-8">
            <StorySearch />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-muted"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-sm shrink-0 lg:max-w-md">
          <div
            aria-hidden
            className="absolute inset-8 -z-10 rounded-full bg-linear-to-br from-accent-pink/20 via-accent-purple/15 to-primary/10 blur-2xl"
          />
          <div className="rounded-4xl border border-border bg-white/60 p-3 shadow-lifted backdrop-blur-sm">
            <Image
              src="/images/watch-instagram-story.webp"
              alt="Preview of viewing an Instagram story anonymously"
              width={480}
              height={480}
              priority
              className="w-full rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
