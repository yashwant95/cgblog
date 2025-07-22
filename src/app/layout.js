import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport = {
  themeColor: '#4F46E5',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
};

export const metadata = {
  title: {
    default: "Chhattisgarh Explorer - Ultimate Guide to CG Tourism & Culture",
    template: "%s | Chhattisgarh Explorer"
  },
  description: "Discover Chhattisgarh's best attractions: Chitrakote Falls, Danteshwari Temple, Bastar Dussehra, tribal culture, wildlife sanctuaries, and authentic local cuisine.",
  keywords: [
    "Chhattisgarh tourism", "Chitrakote Falls", "Danteshwari Temple", 
    "Bastar Dussehra", "CG travel guide", "Chhattisgarh food",
    "Raipur tourism", "Jagdalpur", "Bilaspur", "छत्तीसगढ़ पर्यटन"
  ],
  metadataBase: new URL('https://cgblog.in'),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      'hi-IN': '/hi',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://cgblog.in',
    siteName: 'CG Blog',
    title: "Chhattisgarh Explorer - Ultimate Guide to CG Tourism",
    description: "Explore Chhattisgarh's hidden gems: Waterfalls, temples, wildlife sanctuaries, tribal festivals, and authentic cuisine.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chhattisgarh Tourism Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chhattisgarh Explorer - Tourism Guide",
    description: 'Discover Chhattisgarh\'s best attractions: Waterfalls, temples, wildlife, tribal culture, and authentic cuisine',
    creator: '@cgblog',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'eCk5iF0DvkUcqxdl2wwU8T42oW4MpCCYkr6bMGLsQ2M',
    yandex: '5cb4c491ac7e9e2a',
    bing: '34DA2A53F709D9066F063BC8782C498E'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'travel',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'geo.region': 'IN-CG',
    'geo.placename': 'Chhattisgarh',
    'geo.position': '21.2787;81.8661',
    'ICBM': '21.2787, 81.8661',
    'fb:app_id': 'your-facebook-app-id',
    'fb:pages': 'your-facebook-page-id',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'CG Blog',
    'mobile-web-app-capable': 'yes',
    'application-name': 'CG Blog'
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'LocalBusiness'],
    name: 'Chhattisgarh Explorer',
    url: 'https://cgblog.in',
    logo: 'https://cgblog.in/logo.png',
    image: 'https://cgblog.in/og-image.jpg',
    description: 'Complete travel guide to Chhattisgarh tourism',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Raipur',
      addressRegion: 'Chhattisgarh',
      postalCode: '492001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '21.2787',
      longitude: '81.8661'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    telephone: '+91-7712832421',
    priceRange: '₹₹',
    sameAs: [
      'https://www.facebook.com/cgblogtourism',
      'https://twitter.com/cgblogtourism',
      'https://www.instagram.com/cgblogtourism'
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cgblog.in/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en-IN" dir="ltr">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TW35KFBT');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4F46E5" />
        <meta name="apple-mobile-web-app-title" content="CG Blog" />
        <meta name="application-name" content="CG Blog" />
        <meta name="msapplication-TileColor" content="#4F46E5" />
        
        {/* Google Analytics */}
        <Script id="google-analytics-config">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-278L9G22EN', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-278L9G22EN`}
        />
        
        {/* Canonical and Alternate Links */}
        <link rel="canonical" href="https://cgblog.in" />
        <link rel="alternate" hrefLang="en-IN" href="https://cgblog.in" />
        <link rel="alternate" hrefLang="hi-IN" href="https://cgblog.in/hi" />
        <link rel="alternate" hrefLang="x-default" href="https://cgblog.in" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TW35KFBT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <NavBar />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <footer className="bg-gray-100 py-6">
          <div className="w-full px-4 md:px-8 lg:px-16 text-center text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Explore</h3>
                <ul className="space-y-2">
                  <li><Link href="/places/" className="hover:text-blue-600">Places</Link></li>
                  <li><Link href="/food/" className="hover:text-blue-600">Food</Link></li>
                  <li><Link href="/events/" className="hover:text-blue-600">Events</Link></li>
                  <li><Link href="/reviews/" className="hover:text-blue-600">Reviews</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Information</h3>
                <ul className="space-y-2">
                  <li><Link href="/about/" className="hover:text-blue-600">About Us</Link></li>
                  <li><Link href="/contact/" className="hover:text-blue-600">Contact</Link></li>
                  <li><Link href="/privacy-policy/" className="hover:text-blue-600">Privacy Policy</Link></li>
                  <li><Link href="/terms/" className="hover:text-blue-600">Terms of Use</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/travel-tips/" className="hover:text-blue-600">Travel Tips</Link></li>
                  <li><Link href="/maps/" className="hover:text-blue-600">Maps</Link></li>
                  <li><Link href="/gallery/" className="hover:text-blue-600">Photo Gallery</Link></li>
                  <li><Link href="/faq/" className="hover:text-blue-600">FAQs</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Connect with Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/cgblogtourism" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/cgblogtourism" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://instagram.com/_yashwant95" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <p className="pt-6 border-t border-gray-200">© {new Date().getFullYear()} CG Blog - All Rights Reserved</p>
          </div>
        </footer>
        <ScrollToTop />
      </body>
    </html>
  );
}