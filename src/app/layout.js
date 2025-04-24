import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cg blog",
  description: "Discover the beauty, culture, events, food, and places of Chhattisgarh through our curated blog and travel guide.",
  openGraph: {
    title: "Cg blog - Explore Chhattisgarh",
    description: "Your guide to Chhattisgarh's tourism: events, food, places, reviews, and culture.",
    url: "https://cgblog.in", 
    siteName: "Cg blog",
    images: [
      {
        url: "/chitrakote.jpg", 
        width: 1200, 
        height: 630,
        alt: "Chitrakote Waterfall, Chhattisgarh",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};



export default function RootLayout({ children }) {
  // Define JSON-LD schema for the website
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cg blog',
    url: 'https://cgblog.in', // Use your production URL
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cgblog.in/search?q={search_term_string}', // Optional: if you have site search
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-20`}
      >
        {/* Add JSON-LD structured data script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NavBar />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
