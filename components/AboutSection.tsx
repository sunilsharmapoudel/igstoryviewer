import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckCircleIcon } from "@/components/icons";

const SERVICES = [
  "IG Story Viewer",
  "Anonymous IG Story Viewer",
  "Instagram Story Download",
  "Instagram Profile Viewer",
  "Instagram Story Viewers Free",
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <ScrollReveal className="flex flex-col items-center gap-3 text-center">
          <Image
            src="/images/ig-story-viewer.webp"
            alt="IG Story Viewer"
            width={56}
            height={56}
            className="rounded-2xl"
          />
          <p className="font-brand text-2xl font-extrabold tracking-tight text-title">
            IG Story Viewer
          </p>
          <p className="max-w-md text-sm font-medium text-muted">
            Watch Instagram stories without letting them know.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={100}
          className="mt-14 grid gap-10 rounded-3xl border border-border bg-white p-8 shadow-soft sm:p-10 lg:grid-cols-5 lg:gap-14"
        >
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-title sm:text-3xl">About us</h2>
            <p className="mt-4 leading-relaxed text-muted">
              IG Story Viewer for seamless Instagram story viewing. Our
              anonymous IG story viewer ensures privacy, while our Instagram
              story download feature lets you save moments effortlessly.
              Check out profiles with our Instagram profile viewer and enjoy
              Instagram story viewers free of charge!
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-title uppercase">
              Services we provide
            </h3>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2.5 text-sm text-muted">
                  <CheckCircleIcon className="h-4 w-4 shrink-0 text-success" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
