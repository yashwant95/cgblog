import PlacesListClient from './PlacesListClient';

export const viewport = {
  themeColor: '#4F46E5',
  colorScheme: 'light dark',
};

const metadata = {
  title: "Tourist Places in Chhattisgarh: Waterfalls, Temples, Wildlife | CG Blog",
  description: "Explore the best tourist places in Chhattisgarh. Discover stunning waterfalls like Chitrakote, ancient temples like Danteshwari and Bhoramdeo, wildlife sanctuaries like Barnawapara, and hidden gems. Your complete guide to CG tourism.",
  keywords: "Chhattisgarh tourist places, Chitrakote Falls, Danteshwari Temple, Bhoramdeo Temple, Barnawapara Wildlife, Achanakmar Tiger Reserve, Udanti-Sitanadi, Sirpur Heritage, CG tourism spots, Chhattisgarh attractions",
  openGraph: {
    title: "Tourist Places in Chhattisgarh: Waterfalls, Temples, Wildlife",
    description: "Discover the best tourist places in Chhattisgarh. From stunning waterfalls to ancient temples and wildlife sanctuaries.",
    images: [
      {
        url: "/chitrakote.jpg",
        width: 1200,
        height: 630,
        alt: "Chitrakote Falls - The Niagara of India in Chhattisgarh"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tourist Places in Chhattisgarh',
    description: 'Discover the best tourist places in Chhattisgarh'
  },
  alternates: {
    canonical: 'https://cgblog.in/places'
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Tourist Places in Chhattisgarh: Waterfalls, Temples, Wildlife",
  "description": "Explore the best tourist places in Chhattisgarh. Discover stunning waterfalls like Chitrakote, ancient temples like Danteshwari and Bhoramdeo, wildlife sanctuaries like Barnawapara, and hidden gems.",
  "url": "https://cgblog.in/places",
  "mainEntity": {
    "@type": "ItemList",
    "name": "List of Tourist Places in Chhattisgarh",
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "itemListElement": [
      // Add individual place items here if you have data to populate
      // Example:
      // {
      //   "@type": "ListItem",
      //   "position": 1,
      //   "item": {
      //     "@id": "https://cgblog.in/places/chitrakote-falls",
      //     "@type": "TouristAttraction",
      //     "name": "Chitrakote Falls"
      //   }
      // }
    ]
  }
};

export { metadata };

export default function PlacesPage() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <PlacesListClient />
    </>);
}
