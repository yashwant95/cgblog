import EventsListClient from './EventsListClient';

// Add metadata for SEO
export const metadata = {
  title: "Upcoming Events & Festivals in Chhattisgarh | CG Blog",
  description: "Discover the latest events, festivals, and cultural celebrations happening across Chhattisgarh. Find dates, locations, and details for Bastar Dussehra, Rajim Kumbh, Champaran Mela, Madai Festival, and more.",
  keywords: "Chhattisgarh events, Bastar Dussehra, Rajim Kumbh, Champaran Mela, Madai Festival, CG festivals, tribal celebrations, cultural events, Chhattisgarh tourism events, upcoming events in CG",
  openGraph: {
    title: "Upcoming Events & Festivals in Chhattisgarh",
    description: "Discover the latest cultural events and festivals in Chhattisgarh",
    images: [
      {
        url: "/event-bastar-dussehra.jpg",
        width: 1200,
        height: 630,
        alt: "Bastar Dussehra Festival - World's Longest Tribal Festival"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events & Festivals in Chhattisgarh',
    description: 'Discover upcoming cultural events and festivals in Chhattisgarh'
  },
  alternates: {
    canonical: 'https://cgblog.in/events'
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Upcoming Events & Festivals in Chhattisgarh",
  "description": "Discover the latest events, festivals, and cultural celebrations happening across Chhattisgarh. Find dates, locations, and details for Bastar Dussehra, Rajim Kumbh, Champaran Mela, Madai Festival, and more.",
  "url": "https://cgblog.in/events",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
        // You'd dynamically add the events here
        // Example:
        // {
        //   "@type": "Event",
        //   "name": "Bastar Dussehra Festival",
        //   "startDate": "2024-10-15",
        //   "location": { "@type": "Place", "name": "Jagdalpur" },
        //   "url": "https://cgblog.in/events/bastar-dussehra"
        // }
    ]
  }
};

export default function EventsPage() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <EventsListClient />
  </>);
}
