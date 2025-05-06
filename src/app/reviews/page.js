import ReviewsListClient from './ReviewsListClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Chhattisgarh Travel Reviews & Experiences",
  "description": "Read authentic reviews and travel stories from visitors exploring Chhattisgarh.",
  "url": "https://cgblog.in/reviews",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Chhattisgarh Travel Reviews",
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": [
      // Example item, replace with actual data or dynamic population
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://cgblog.in/reviews/example-review-1",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://cgblog.in/reviews/example-review-2",
      },
            {
        "@type": "ListItem",
        "position": 3,
        "url": "https://cgblog.in/reviews/example-review-3",
      },
    ],
  },
};

export const metadata = {
  title: "Chhattisgarh Travel Reviews & Experiences | CG Blog",
  description: "Read authentic reviews and travel stories from visitors exploring Chhattisgarh. Share your own experiences and tips for visiting places, attending events, and tasting local food. Your trusted source for CG travel insights.",
  keywords: "Chhattisgarh travel reviews, CG tourism experiences, Chitrakote Falls review, Danteshwari Temple experience, Bastar tourism feedback, CG food reviews, Chhattisgarh travel tips, visitor experiences, CG travel stories",
  openGraph: {
    title: "Chhattisgarh Travel Reviews & Experiences",
    description: "Read authentic reviews and travel stories from visitors exploring Chhattisgarh",
    images: [
      {
        url: "/review-danteshwari.jpg",
        width: 1200,
        height: 630,
        alt: "Danteshwari Temple - Visitor Reviews and Experiences"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chhattisgarh Travel Reviews',
    description: 'Read authentic reviews and travel stories from visitors'
  },
  alternates: {
    canonical: 'https://cgblog.in/reviews'
  }
};

export default function ReviewsPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReviewsListClient />

      </>
  );
}
