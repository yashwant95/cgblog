import ReviewsListClient from './ReviewsListClient';

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
  return <ReviewsListClient />;
}
