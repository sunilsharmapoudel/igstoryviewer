import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const STEPS = [
  {
    title: "Open IG Story Viewer Website",
    body: (
      <>
        Go to the IG Story Viewer website at{" "}
        <Link className="font-medium text-primary underline underline-offset-2" href="https://www.igstoryviewer.pro">
          www.igstoryviewer.pro
        </Link>
        .
      </>
    ),
  },
  {
    title: "Enter Instagram Username or URL",
    body: (
      <ul className="mt-2 list-inside list-disc space-y-1.5 pl-1">
        <li>
          In the search bar on the homepage, enter the Instagram username,
          profile URL, or story URL of the person whose story you want to
          view or download.
        </li>
        <li>Make sure you enter the correct username or URL to ensure accurate results.</li>
      </ul>
    ),
  },
  {
    title: "Select Desired Action",
    body: (
      <ul className="mt-2 list-inside list-disc space-y-1.5 pl-1">
        <li>
          <strong className="font-semibold text-title">View Stories:</strong>{" "}
          Click on the &quot;View Story&quot; button to see the latest
          stories posted by the user. You can view stories anonymously
          without notifying the user.
        </li>
        <li>
          <strong className="font-semibold text-title">Download Stories:</strong>{" "}
          If you want to download a story, click on the &quot;Download
          Story&quot; button. The story will be saved to your device.
        </li>
        <li>
          <strong className="font-semibold text-title">View Profile:</strong>{" "}
          To see the Instagram profile, click on the &quot;View Profile&quot;
          button. This allows you to see the profile details and public
          posts.
        </li>
      </ul>
    ),
  },
  {
    title: "Enjoy Anonymous Viewing",
    body: "The IG Story Viewer ensures that your identity remains anonymous. The Instagram user will not be notified that you have viewed their stories or profile.",
  },
  {
    title: "Free and Easy to Use",
    body: "IG Story Viewer is a free tool that provides quick and easy access to Instagram stories and profiles. There is no need to create an account or log in.",
  },
];

export default function HowToSection() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <ScrollReveal className="text-center">
          <h2 className="text-2xl font-bold text-title sm:text-3xl">
            How to Use IG Story Viewer
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80} className="relative mt-10 w-full overflow-hidden rounded-3xl border border-border pb-[56.25%] shadow-soft">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src="https://drive.google.com/file/d/1CEEnZgtiTIEOSS-ul8nRPJeVvG3hFD3U/preview"
            allow="encrypted-media;"
            allowFullScreen
            loading="lazy"
            title="How to use IG Story Viewer"
          />
        </ScrollReveal>

        <ScrollReveal delay={140} className="mt-12 rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-10">
          <h3 className="text-lg font-bold text-title">
            Steps to Use IG Story Viewer
          </h3>
          <p className="mt-2 text-muted">
            Follow these steps to view Instagram stories anonymously,
            download stories, or view Instagram profiles:
          </p>

          <ol className="mt-6 space-y-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <div className="text-muted">
                  <p className="font-semibold text-title">{step.title}</p>
                  <div className="mt-1 text-sm leading-relaxed">{step.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
