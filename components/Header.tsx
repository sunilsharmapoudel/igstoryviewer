"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/icons";

const NAV_LINKS = [
  { href: "/#stories", label: "View Story" },
  { href: "/#about", label: "About" },
  { href: "/contact-us", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/ig-story-viewer.webp"
            alt="IG Story Viewer"
            width={36}
            height={36}
            priority
            className="rounded-xl"
          />
          <span className="font-brand text-lg font-extrabold tracking-tight text-title">
            IG Story Viewer
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm font-medium text-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 transition-colors hover:bg-surface hover:text-title"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#stories"
          className="group hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-lifted md:inline-flex"
        >
          Get Started
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-title transition-colors hover:bg-surface md:hidden"
        >
          {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-border/80 bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium text-title">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/#stories"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 font-semibold text-primary-foreground"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
