import PlacesListClient from './PlacesListClient';

export const metadata = {
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

export default function PlacesPage() {
  return <PlacesListClient />;
}
