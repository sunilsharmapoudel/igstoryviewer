import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL = "https://www.igstoryviewer.pro";
const SITE_DESCRIPTION =
  "IG Story Viewer is an anonymous Instagram story viewer application which let you view story of a person by pugging their username or id or url.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IG Story Viewer",
    template: "%s | IG Story Viewer",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "IG Story Viewer",
    title: "IG Story Viewer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: ["/images/ig-story-viewer-pro.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "IG Story Viewer is an anonymous Instagram story viewer application.",
    description: SITE_DESCRIPTION,
    images: ["/images/ig-story-viewer-pro.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IG Story Viewer",
  url: SITE_URL,
  description:
    "IG Story Viewer is an anonymous Instagram story viewer application which lets you view the story of a person by plugging their username or id or url.",
  logo: `${SITE_URL}/images/ig-story-viewer.webp`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    ratingCount: "100",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  service: {
    "@type": "Service",
    serviceType: [
      "IG Story Viewer",
      "Anonymous IG Story Viewer",
      "Instagram Story Download",
      "Instagram Profile Viewer",
      "Instagram Story Viewers Free",
    ],
    provider: {
      "@type": "Organization",
      name: "IG Story Viewer",
      url: SITE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-title antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />

        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3426014324848537"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        /> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T84WSMRC8N"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T84WSMRC8N');
          `}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "msrwbr7tcz");
          `}
        </Script>
      </body>
    </html>
  );
}
