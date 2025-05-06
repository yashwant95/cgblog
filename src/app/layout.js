import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Chhattisgarh Explorer - Your Ultimate Guide to CG Tourism & Culture",
  description: "Discover Chhattisgarh's best attractions: Chitrakote Falls, Danteshwari Temple, Bastar Dussehra, tribal culture, wildlife sanctuaries, and authentic local cuisine. Your complete guide to CG tourism.",
  keywords: "Chhattisgarh tourism, Chitrakote Falls, Danteshwari Temple, Bastar Dussehra, Champaran Mela, Madai Festival, tribal culture, Chhattisgarh food, Chilla, Faraa, Muthia, Barnawapara Wildlife, Achanakmar Tiger Reserve, Udanti-Sitanadi, Sirpur Heritage, Bhoramdeo Temple, CG travel guide, Chhattisgarh places to visit, Raipur, Bilaspur, Jagdalpur, छत्तीसगढ़ पर्यटन, रायपुर, बिलासपुर, जगदलपुर",
  authors: [{ name: 'CG Blog Team' }],
  creator: 'CG Blog',
  publisher: 'CG Blog',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://cgblog.in',
  },
  openGraph: {
    title: "Chhattisgarh Explorer - Your Ultimate Guide to CG Tourism & Culture",
    description: "Explore Chhattisgarh's hidden gems: Waterfalls, temples, wildlife sanctuaries, tribal festivals, and authentic cuisine. Your complete guide to CG tourism and culture.",
    url: "https://cgblog.in", 
    siteName: "CG Blog",
    images: [
      {
        url: "/chitrakote.jpg", 
        width: 1200, 
        height: 630,
        alt: "Chitrakote Falls - The Niagara of India in Chhattisgarh",
      },
      {
        url: "/danteshwari.jpg",
        width: 1200,
        height: 630,
        alt: "Danteshwari Temple - Ancient Spiritual Site in Jagdalpur",
      },
      {
        url: "/bastar-dussehra.jpg",
        width: 1200,
        height: 630,
        alt: "Bastar Dussehra Festival - World's Longest Tribal Festival",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chhattisgarh Explorer - Your Ultimate Guide to CG Tourism',
    description: 'Discover Chhattisgarh\'s best attractions: Waterfalls, temples, wildlife, tribal culture, and authentic cuisine',
    images: ['/chitrakote.jpg'],
  },
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'Travel & Tourism',
  classification: 'Tourism Guide',
  language: 'English',
  geo: {
    region: 'IN-CG',
    position: '21.2787° N, 81.8661° E',
    placename: 'Chhattisgarh, India'
  },
  revisit: '7 days',
  distribution: 'Global',
  rating: 'General',
  referrer: 'origin',
  themeColor: '#4F46E5',
  colorScheme: 'light dark',
  viewport: 'width=device-width, initial-scale=1',
  formatDetection: {
    telephone: false,
    date: true,
    address: true,
    email: true,
    url: true
  },
  // Additional regional meta tags for Chhattisgarh
  locales: {
    'en-IN': 'English (India)',
    'hi-IN': 'Hindi (India)'
  },
  defaultLocale: 'en-IN',
  applicationName: 'Chhattisgarh Tourism Explorer',
  generator: 'Next.js',
  creator: 'CG Blog Team',
  publisher: 'CG Blog',
  archives: 'https://cgblog.in/archives',
  bookmarks: 'https://cgblog.in/bookmarks',
  appLinks: {
    ios: {
      url: 'https://cgblog.in/ios-app',
      app_store_id: 'app-id'
    },
    android: {
      package: 'in.cgblog.app',
      app_name: 'CG Tourism Explorer'
    }
  },
  other: {
    'dc.title': 'Chhattisgarh Tourism Explorer',
    'dc.description': 'Complete guide to tourism in Chhattisgarh state of India',
    'dc.relation': 'https://cgblog.in',
    'dc.source': 'https://cgblog.in',
    'dc.language': 'en-IN',
    'geo.region': 'IN-CG',
    'geo.placename': 'Chhattisgarh',
    'geo.position': '21.2787;81.8661',
    'ICBM': '21.2787, 81.8661',
    'og:locality': 'Raipur',
    'og:region': 'Chhattisgarh',
    'og:postal-code': '492001',
    'og:country-name': 'India'
  }
};

export default function RootLayout({ children }) {
  // Define JSON-LD schema for the website
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Chhattisgarh Explorer',
    url: 'https://cgblog.in',
    description: 'Your complete guide to Chhattisgarh tourism, culture, and travel',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cgblog.in/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CG Blog',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cgblog.in/logo.png'
      }
    },
    sameAs: [
      'https://www.facebook.com/yourpage',
      'https://twitter.com/yourhandle',
      'https://www.instagram.com/yourprofile'
    ],
    about: {
      '@type': 'Thing',
      name: 'Chhattisgarh Tourism',
      description: 'Tourism information about Chhattisgarh, India'
    },
    mainEntity: {
      '@type': 'TouristAttraction',
      name: 'Chhattisgarh',
      description: 'A state in central India known for its waterfalls, temples, and tribal culture',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: 'Chhattisgarh'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '21.2787',
        longitude: '81.8661'
      },
      publicAccess: true,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1299840457351289" crossorigin="anonymous"></script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-278L9G22EN"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-278L9G22EN');
          `,
          }}
        />
      </head>
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
