import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const FEATURES = [
  {
    image: "/images/free-to-use.webp",
    alt: "IG Viewer is free",
    title: "Completely free",
    text: "IG Story Viewer provides free features like anonymous story viewing, easy story downloads, and profile exploration. Enjoy Instagram story viewers free and enhance your IG experience effortlessly!",
  },
  {
    image: "/images/privately-watch-ig-stories.webp",
    alt: "IG Viewer helps to maintain privacy",
    title: "Privacy first",
    node: (
      <>
        IG Story Viewer ensures your privacy with its anonymous IG story
        viewer and Instagram profile viewer. Watch stories and explore
        profiles discreetly, and enjoy free Instagram story downloads with our{" "}
        <a
          className="font-medium text-primary underline underline-offset-2"
          href="https://securitysection.in/importance-of-digital-privacy/"
        >
          privacy-focused
        </a>{" "}
        service.
      </>
    ),
  },
  {
    image: "/images/download-stories.webp",
    alt: "IG Viewer lets you download ig stories",
    title: "One-click downloads",
    text: "IG Story Viewer offers a free Instagram story download feature, allowing you to save stories effortlessly.",
  },
  {
    image: "/images/easy-to-use.webp",
    alt: "IG Viewer is easy to use",
    title: "Effortlessly simple",
    text: "IG Story Viewer is designed for ease of use. With our IG story viewer, you can quickly and effortlessly view stories. Our anonymous IG story viewer ensures private viewing, while the Instagram story download feature lets you save stories with a single click.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold text-title sm:text-3xl">
          Why IG Story Viewer
        </h2>
        <p className="mt-3 text-muted">
          Everything you need to browse Instagram content anonymously, in one
          fast and free tool.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {FEATURES.map((feature, index) => (
          <ScrollReveal
            key={feature.image}
            delay={index * 80}
            className="group flex flex-col gap-4 rounded-3xl border border-border bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lifted"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-surface transition-colors group-hover:bg-surface-2">
              <Image src={feature.image} alt={feature.alt} width={40} height={40} />
            </div>
            <div>
              <h3 className="font-semibold text-title">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {feature.node ?? feature.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
