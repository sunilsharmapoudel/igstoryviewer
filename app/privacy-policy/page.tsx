import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the IG Story Viewer privacy policy to learn how we collect, use, and safeguard your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-bold text-title sm:text-4xl">
          Privacy Policy for IG Story Viewer
        </h1>

        <div className="mt-8 space-y-8 rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-10">
          <p className="leading-relaxed text-muted">
            Welcome to IG Story Viewer. Your privacy is important to us, and
            we are committed to protecting your personal information. This
            Privacy Policy outlines how we collect, use, and safeguard your
            data when you use our services.
          </p>

          <section>
            <h2 className="text-xl font-bold text-title">Information We Collect</h2>
            <p className="mt-2 leading-relaxed text-muted">
              <strong className="text-title">Personal Information:</strong>{" "}
              We do not collect any personal information that can identify
              you directly when you use our services. Our tools are designed
              to function without requiring any personal data from you.
            </p>
            <p className="mt-2 leading-relaxed text-muted">
              <strong className="text-title">Non-Personal Information:</strong>{" "}
              We may collect non-personal information about your usage of
              our website. This may include your IP address, browser type,
              operating system, and the pages you visit. This information
              helps us improve our services and provide a better user
              experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-title">How We Use Your Information</h2>
            <p className="mt-2 leading-relaxed text-muted">
              We use the information we collect for the following purposes:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
              <li>To operate and maintain our website.</li>
              <li>To improve our services and enhance user experience.</li>
              <li>
                To monitor and analyze usage and trends to better understand
                how our services are used.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-title">
              Cookies and Tracking Technologies
            </h2>
            <p className="mt-2 leading-relaxed text-muted">
              IG Story Viewer may use cookies and similar tracking
              technologies to enhance your experience on our website.
              Cookies are small data files stored on your device that help
              us understand your preferences and improve our services. You
              can manage your cookie preferences through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-title">Third-Party Services</h2>
            <p className="mt-2 leading-relaxed text-muted">
              We may use third-party services to help operate our website
              and perform analytics. These third parties may have access to
              non-personal information to perform their functions, but they
              are obligated not to disclose or use the information for any
              other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-title">Data Security</h2>
            <p className="mt-2 leading-relaxed text-muted">
              We take reasonable measures to protect your information from
              unauthorized access, use, or disclosure. However, no internet
              transmission is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-title">Children&apos;s Privacy</h2>
            <p className="mt-2 leading-relaxed text-muted">
              Our services are not intended for children under the age of
              13. We do not knowingly collect personal information from
              children under 13. If we become aware that we have
              inadvertently received personal information from a user under
              the age of 13, we will delete such information from our
              records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-title">
              Changes to This Privacy Policy
            </h2>
            <p className="mt-2 leading-relaxed text-muted">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any significant
              changes by posting the new Privacy Policy on our website. Your
              continued use of our services after any changes to this
              Privacy Policy will constitute your acknowledgment of the
              changes and your consent to abide by and be bound by the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-title">Contact Us</h2>
            <p className="mt-2 leading-relaxed text-muted">
              If you have any questions or concerns about this Privacy
              Policy, please contact us at:
            </p>
            <p className="mt-2 leading-relaxed text-muted">
              <strong className="text-title">Email: </strong>
              contact@igstoryviewer.pro
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
