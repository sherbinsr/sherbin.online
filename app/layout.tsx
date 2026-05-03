import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Script from "next/script";

const BASE_URL = "https://sherbin.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sherbin S — Software Development Engineer | AI & Full-Stack",
    template: "%s | Sherbin S",
  },
  description:
    "Sherbin S is a Software Development Engineer at Think41 specializing in AI systems, LLM-powered applications, full-stack platforms, and real-time communication tools. 20K+ users served, 99.9% uptime.",
  keywords: [
    "Sherbin S",
    "Software Development Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "LLM applications",
    "FastAPI",
    "Next.js",
    "Python",
    "React",
    "Think41",
    "Bangalore",
    "portfolio",
  ],
  authors: [{ name: "Sherbin S", url: BASE_URL }],
  creator: "Sherbin S",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Sherbin S — Portfolio",
    title: "Sherbin S — Software Development Engineer | AI & Full-Stack",
    description:
      "SDE at Think41 building production-grade AI systems, full-stack platforms, and real-time tools. 20K+ users, 99.9% uptime.",
    images: [
      {
        url: "/IMG_5538.jpg",
        width: 800,
        height: 1000,
        alt: "Sherbin S — Software Development Engineer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sherbin S — Software Development Engineer | AI & Full-Stack",
    description:
      "SDE at Think41 building production-grade AI systems, full-stack platforms, and real-time tools.",
    images: ["/IMG_5538.jpg"],
    creator: "@sherbinsr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sherbin S",
  url: BASE_URL,
  image: `${BASE_URL}/IMG_5538.jpg`,
  jobTitle: "Software Development Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Think41",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  email: "sherbinsyles31@gmail.com",
  sameAs: [
    "https://github.com/sherbinsr",
    "https://linkedin.com/in/sherbinsr",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Development",
    "FastAPI",
    "Next.js",
    "Python",
    "LLM Applications",
    "React",
    "PostgreSQL",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
