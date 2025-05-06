import FoodListClient from './FoodListClient';

export const metadata = {
  title: "Chhattisgarhi Cuisine: Traditional Dishes & Recipes | CG Blog",
  description: "Explore the rich flavors of Chhattisgarh's traditional food. Discover famous dishes like Chilla, Faraa, Muthia, Angakar Roti, and learn about local ingredients. Your complete guide to CG cuisine.",
  keywords: "Chhattisgarh food, Chhattisgarhi cuisine, traditional CG dishes, Chilla recipe, Faraa food, Muthia recipe, Angakar Roti, tribal food, CG local cuisine, Chhattisgarh recipes",
  openGraph: {
    title: "Chhattisgarhi Cuisine: Traditional Dishes & Recipes",
    description: "Discover the authentic flavors of Chhattisgarh's traditional cuisine",
    images: [
      {
        url: "/food-chila.jpg",
        width: 1200,
        height: 630,
        alt: "Traditional Chhattisgarhi Chilla - A Popular Breakfast Dish"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chhattisgarhi Cuisine',
    description: 'Explore traditional Chhattisgarhi dishes and recipes'
  },
  alternates: {
    canonical: 'https://cgblog.in/food'
  }
};

export default function FoodPage() {
  return <FoodListClient />;
}
