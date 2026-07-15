import type { Metadata } from "next";
import { MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the IG Story Viewer team for questions, concerns, or content removal requests.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-bold text-title sm:text-4xl">Contact Us</h1>
        <p className="mt-4 leading-relaxed text-muted">
          We appreciate your interest in IG Story Viewer. If you have any
          questions, concerns, or requests, please feel free to reach out to
          us. We are here to help you!
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-8">
          <h2 className="text-xl font-bold text-title">Get in Touch</h2>
          <p className="mt-2 text-muted">
            If you need to contact us for any reason, you can reach us at:
          </p>
          <a
            href="mailto:contact@igstoryviewer.pro"
            className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-5 py-3 font-medium text-title transition-colors hover:border-primary/30 hover:text-primary"
          >
            <MailIcon className="h-4 w-4 text-primary" />
            contact@igstoryviewer.pro
          </a>
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-8">
          <h2 className="text-xl font-bold text-title">Disclaimer</h2>
          <p className="mt-2 leading-relaxed text-muted">
            IG Story Viewer is not affiliated with Instagram. We do not host
            any of the Instagram stories on our servers. All rights belong to
            their respective owners.
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            If you are the owner of any content displayed through our
            service and would like to remove your profile data, please
            contact us at the above email address. We will address your
            request promptly.
          </p>
        </div>
      </div>
    </main>
  );
}
