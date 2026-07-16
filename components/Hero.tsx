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
    <section id="stories" className="relative scroll-mt-20 overflow-hidden">
      <div className="relative bg-title">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/watch-instagram-story.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/40 to-black/70" />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 pt-20 pb-28 text-center sm:px-6 sm:pt-24 sm:pb-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <Image
              src="/images/instagram-logo.webp"
              alt=""
              width={16}
              height={16}
              aria-hidden
            />
            Stories &middot; Reels &middot; Highlights &middot; Profiles
          </div>

          <h1 className="mt-5 font-brand text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Watch Instagram stories
            <span className="block bg-linear-to-r from-pink-300 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">
              without a trace.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/85">
            Enter any public Instagram username to anonymously view and
            download stories, reels, and highlights &mdash; no account, no
            login, no notifications sent.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-white/85"
              >
                <Icon className="h-4 w-4 text-white" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-16 max-w-4xl px-4 pb-16 sm:-mt-20 sm:px-6 sm:pb-20">
        <div className="rounded-3xl border border-border bg-white p-5 shadow-lifted sm:p-7">
          <StorySearch />
        </div>
      </div>
    </section>
  );
}
