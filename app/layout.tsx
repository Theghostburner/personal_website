import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const archivo = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Sudeep Sharma";
const description =
  "Sudeep Sharma. Technical product manager. Mechanical engineer from IIT Kharagpur.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Sudeep Sharma",
    "AbleCredit",
    "product manager",
    "Clarion",
    "IIT Kharagpur",
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
  sameAs: [
    "https://www.linkedin.com/in/sudeep-sharma-466a41174/",
    "https://github.com/Theghostburner",
    "https://www.tryclarion.ai",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Kharagpur",
  },
  jobTitle: "Technical Product Manager",
  worksFor: {
    "@type": "Organization",
    name: "AbleCredit",
  },
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${archivo.variable} ${plex.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
