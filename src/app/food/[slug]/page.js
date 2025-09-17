import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';
import FoodApi from '../../coreApi/FoodApi';

// Helper function to create slug
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Generate static params for build optimization
export async function generateStaticParams() {
  try {
    const response = await FoodApi.getAllFoods({ status: 'published', limit: 100 });
    const foods = response.success ? response.data : [];
    
    return foods.map((food) => ({
      slug: createSlug(food.name),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch food data
async function fetchFoodBySlug(slug) {
  try {
    const response = await FoodApi.getAllFoods({ status: 'published', limit: 100 });
    if (!response.success) {
      return null;
    }
    
    const foods = response.data || [];
    return foods.find(food => createSlug(food.name) === slug);
  } catch (error) {
    console.error('Error fetching food:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const food = await fetchFoodBySlug(params.slug);

  if (!food) {
    return {
      title: 'Food Not Found',
    };
  }

  return {
    title: `${food.name} Recipe | Chhattisgarhi Cuisine`,
    description: food.shortDescription || food.description?.substring(0, 160),
    keywords: `${food.name}, Chhattisgarhi food, ${food.category}, ${food.cuisine}, recipe, cooking`,
    openGraph: {
      title: `${food.name} Recipe`,
      description: food.shortDescription || food.description?.substring(0, 160),
      images: [
        {
          url: food.image,
          width: 1200,
          height: 630,
          alt: food.name,
        },
      ],
    },
  };
}

// Helper function to get difficulty color
const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-800';
};

// Helper function to get category color
const getCategoryColor = (category) => {
  const colors = {
    breakfast: 'bg-orange-100 text-orange-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800',
    snacks: 'bg-pink-100 text-pink-800',
    sweets: 'bg-red-100 text-red-800',
    beverages: 'bg-cyan-100 text-cyan-800',
    traditional: 'bg-amber-100 text-amber-800',
    'street-food': 'bg-indigo-100 text-indigo-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export default async function FoodDetailPage({ params }) {
  const food = await fetchFoodBySlug(params.slug);

  if (!food) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Food', href: '/food' },
    { label: food.name, href: `/food/${params.slug}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-96 lg:h-auto">
              <Image
                src={food.image || '/placeholder-food.jpg'}
                alt={food.name}
                fill
                className="object-cover"
                unoptimized={food.image?.startsWith('http')}
                priority
              />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(food.category)}`}>
                  {food.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(food.difficulty)}`}>
                  {food.difficulty}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                  {food.cuisine?.replace('-', ' ')}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {food.name}
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {food.shortDescription || food.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{food.prepTime}</div>
                  <div className="text-sm text-gray-500">Prep Time (min)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{food.cookTime}</div>
                  <div className="text-sm text-gray-500">Cook Time (min)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{food.servings}</div>
                  <div className="text-sm text-gray-500">Servings</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600 mr-1">{food.rating || 0}</span>
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
              </div>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-3">
                {food.isVegetarian && (
                  <span className="flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Vegetarian
                  </span>
                )}
                {food.isVegan && (
                  <span className="flex items-center bg-lime-100 text-lime-800 text-sm px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
                    Vegan
                  </span>
                )}
                {food.isGlutenFree && (
                  <span className="flex items-center bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Gluten-Free
                  </span>
                )}
                {food.isSpicy && (
                  <span className="flex items-center bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Spicy (Level {food.spiceLevel}/5)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {food.description && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Dish</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {food.description}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {food.ingredients && food.ingredients.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {food.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-900">{ingredient.name}</span>
                      <span className="text-gray-600">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            {food.instructions && food.instructions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
                <div className="space-y-6">
                  {food.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                          {instruction.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">
                          {instruction.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cultural Information */}
            {(food.history || food.culturalSignificance) && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultural Heritage</h2>
                <div className="space-y-4">
                  {food.history && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">History</h3>
                      <p className="text-gray-700 leading-relaxed">{food.history}</p>
                    </div>
                  )}
                  {food.culturalSignificance && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Significance</h3>
                      <p className="text-gray-700 leading-relaxed">{food.culturalSignificance}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Nutrition */}
            {food.nutrition && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Nutrition Facts</h3>
                <div className="space-y-4">
                  {food.nutrition.calories && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">Calories</span>
                      <span className="font-semibold">{food.nutrition.calories}</span>
                    </div>
                  )}
                  {food.nutrition.protein && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">Protein</span>
                      <span className="font-semibold">{food.nutrition.protein}g</span>
                    </div>
                  )}
                  {food.nutrition.carbs && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">Carbs</span>
                      <span className="font-semibold">{food.nutrition.carbs}g</span>
                    </div>
                  )}
                  {food.nutrition.fat && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">Fat</span>
                      <span className="font-semibold">{food.nutrition.fat}g</span>
                    </div>
                  )}
                  {food.nutrition.fiber && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">Fiber</span>
                      <span className="font-semibold">{food.nutrition.fiber}g</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Info</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Origin</span>
                  <p className="font-medium text-gray-900">{food.origin}</p>
                </div>
                {food.season && (
                  <div>
                    <span className="text-sm text-gray-500">Best Season</span>
                    <p className="font-medium text-gray-900">{food.season.replace('-', ' ')}</p>
                  </div>
                )}
                {food.bestTimeToEat && food.bestTimeToEat.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-500">Best Time to Eat</span>
                    <p className="font-medium text-gray-900">{food.bestTimeToEat.join(', ')}</p>
                  </div>
                )}
                {food.priceRange && (
                  <div>
                    <span className="text-sm text-gray-500">Price Range</span>
                    <p className="font-medium text-gray-900">{food.priceRange}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {food.tags && food.tags.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {food.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Food List */}
        <div className="mt-12 text-center">
          <Link 
            href="/food"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Foods
          </Link>
        </div>
      </main>
    </>
  );
}