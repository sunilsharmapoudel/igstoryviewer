import Image from "next/image";
import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "/#stories", label: "View Story" },
  { href: "/#about", label: "About" },
];

const LEGAL_LINKS = [
  { href: "/contact-us", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/ig-story-viewer.webp"
                alt="IG Story Viewer"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-brand text-lg font-extrabold tracking-tight text-title">
                IG Story Viewer
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Watch and download Instagram stories, reels, and highlights
              anonymously &mdash; free, no login required.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="text-sm font-semibold text-title">Product</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-title">Company</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} IG Story Viewer. All rights reserved.</p>
          <p>Not affiliated with Instagram or Meta Platforms, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
