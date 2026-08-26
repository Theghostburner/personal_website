import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

const title = "Sudeep Sharma | IIT Kharagpur · Founder of Clarion";
const description =
  "Sudeep Sharma is an engineer and founder from IIT Kharagpur. He founded the Computer Graphics Society at IIT KGP and is building Clarion for engineering teams.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Sudeep Sharma",
    "IIT Kharagpur",
    "Clarion",
    "Computer Graphics Society",
    "tryclarion",
    "engineer",
    "founder",
  ],
  authors: [{ name: "Sudeep Sharma" }],
  creator: "Sudeep Sharma",
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sudeep Sharma",
  url: "https://www.linkedin.com/in/sudeep-sharma-466a41174/",
  sameAs: [
    "https://www.linkedin.com/in/sudeep-sharma-466a41174/",
    "https://github.com/Theghostburner",
    "https://www.tryclarion.ai",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Kharagpur",
    alternateName: "IIT Kharagpur",
  },
  jobTitle: "Founder",
  worksFor: {
    "@type": "Organization",
    name: "Clarion",
    url: "https://www.tryclarion.ai",
  },
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrument.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
