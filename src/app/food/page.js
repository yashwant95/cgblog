import { Suspense } from 'react';
import FoodListClient from './FoodListClient';
import Breadcrumb from '../components/Breadcrumb';

export const metadata = {
  title: 'Chhattisgarhi Food & Cuisine | Traditional Recipes',
  description: 'Discover authentic Chhattisgarhi cuisine and traditional recipes. From breakfast dishes like Chila to sweet treats like Dehrori, explore the rich culinary heritage of Chhattisgarh.',
  keywords: 'Chhattisgarhi food, traditional recipes, Indian cuisine, Chila, Dehrori, Faraa, Muthia, regional food, cooking',
  openGraph: {
    title: 'Chhattisgarhi Food & Cuisine | Traditional Recipes',
    description: 'Discover authentic Chhattisgarhi cuisine and traditional recipes.',
    type: 'website',
    url: '/food',
  },
};

// Loading component
function FoodListLoading() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-lg max-w-3xl mx-auto animate-pulse"></div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="flex justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FoodPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Food', href: '/food' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Suspense fallback={<FoodListLoading />}>
        <FoodListClient />
      </Suspense>
    </>
  );
}