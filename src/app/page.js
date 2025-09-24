"use client"
import { useState, useEffect, lazy, Suspense } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { generateOrganizationSchema } from './utils/schemaGenerators';
import { PlacesApi } from './coreApi/PlacesApi';
import { EventsApi } from './coreApi/EventsApi';
import FoodApi from './coreApi/FoodApi';
import ReviewsApi from './coreApi/ReviewsApi';
import config from './config';

// Lazy load non-critical components
const NewsletterSection = lazy(() => import('./NewsletterSection'));
const FaqSection = lazy(() => import('./components/FaqSection'));
const OptimizedImage = lazy(() => import('./components/OptimizedImage'));

// Function to create URL-friendly slug from place name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Hardcoded data for sections that don't have APIs yet

const destinations = [
  {
    name: "Chitrakote Falls",
    img: "/chitrakote.jpg",
    desc: "The Niagara of India, a spectacular waterfall in Bastar."
  },
  
  {
    name: "Sirpur Heritage Site",
    img: "/sirpur.jpg",
    desc: "An ancient archaeological site with temples and monasteries."
  },
  {
    name: "Bhoramdeo Temple",
    img: "/bhoramdeo.jpg",
    desc: "Often called the 'Khajuraho of Chhattisgarh' for its intricate carvings."
  }
];

const galleryImages = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg"
];

// Local cuisine will be fetched from API

const wildlifeSanctuaries = [
  {
    name: "Barnawapara Wildlife Sanctuary",
    img: "/barnawapara.jpg", // Placeholder image path
    desc: "Home to leopards, sloth bears, flying squirrels, and diverse birdlife."
  },
  {
    name: "Achanakmar Tiger Reserve",
    img: "/achanakmar.jpg", // Placeholder image path
    desc: "A key tiger habitat also sheltering bison, leopards, and wild dogs."
  },
  {
    name: "Udanti-Sitanadi Tiger Reserve",
    img: "/udanti_sitanadi.jpg", // Placeholder image path
    desc: "Known for its population of wild buffaloes and rich biodiversity."
  }
];

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [localCuisine, setLocalCuisine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [placesData, reviewsData, eventsData, foodData] = await Promise.all([
          PlacesApi.getAllPlaces(),
          ReviewsApi.getAllReviews({ featured: true, limit: 3 }),
          EventsApi.getUpcomingEvents(3),
          FoodApi.getFeaturedFoods(3)
        ]);

        setPlaces(placesData);
        setFeaturedReviews(reviewsData.data || []);
        setUpcomingEvents(eventsData.data || eventsData || []);
        setLocalCuisine(foodData.data || []);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Generate organization schema
  const organizationSchema = generateOrganizationSchema();
  
  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100 min-h-screen w-full">
        <Head>
        <title>Chhattisgarh Tourism Guide | Explore CG Attractions, Food & Events - CG Blog</title>
        <meta name="description" content="Discover Chhattisgarh with our comprehensive travel guide. Explore top attractions, local cuisine, upcoming events, and authentic reviews. Your ultimate CG tourism resource." />
        <meta name="keywords" content="Chhattisgarh tourism, CG travel guide, Chitrakote Falls, Danteshwari Temple, Bastar Dussehra, Chhattisgarh food, tribal culture, places to visit in CG, events in Chhattisgarh, reviews in Chhattisgarh" />
      </Head>
      <Script
        id="structured-data-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* Hero Section - Full width */}
      <div 
        className="h-screen flex items-center justify-center bg-cover bg-center relative hero-bg bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"
        style={{ 
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="w-full px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Chhattisgarh Explorer</h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">Your guide to the best places, food, events & authentic reviews</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/places" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg">Explore Places</Link>
            <Link href="/food" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg">Food Blogs</Link>
            <Link href="/events" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg">Upcoming Events</Link>
            <Link href="/reviews" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg">Read Reviews</Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto my-12 bg-white/70 rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-4">About Chhattisgarh</h2>
        <p className="text-gray-700 text-lg">
          Chhattisgarh, located in central India, is known for its breathtaking waterfalls, dense forests, rich tribal culture, and ancient temples. Whether you seek adventure, spirituality, or a cultural experience, Chhattisgarh has something for everyone.
        </p>
      </motion.section>

      {/* Featured Reviews Section - Full width */}
      <section className="py-16 bg-yellow-50 w-full">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-yellow-800">Featured Reviews</h2>
          <p className="text-center text-gray-600 mb-12">Authentic experiences shared by our community</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                <p className="mt-4 text-gray-600">Loading reviews...</p>
              </div>
            ) : featuredReviews.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg py-12">
                No featured reviews available at the moment.
              </div>
            ) : (
              featuredReviews.map((review, index) => {
                // For review images, check if they exist in public folder first
                const isPublicImage = review.image && review.image.startsWith('/') && 
                  ['/review-adventure.jpg', '/review-bastar-food.jpg', '/review-danteshwari.jpg', '/review-hotels.jpg', '/review-restaurants.jpg'].includes(review.image);
                
                const imageUrl = review.image.startsWith('http') 
                  ? review.image 
                  : isPublicImage 
                    ? review.image 
                    : `${config.API_BASE_URL.replace('/api', '')}${review.image}`;
                return (
                <div key={review._id || index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageUrl}
                      alt={review.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 ease-in-out hover:opacity-90"
                      loading="lazy"
                      quality={80}
                      onError={(e) => {
                        console.error('Image failed to load:', e.target.src);
                        console.error('Review image path:', review.image);
                        console.error('Constructed URL:', imageUrl);
                        e.target.src = '/next.svg'; // Use a fallback that exists
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white font-bold p-2 rounded-bl-lg">
                      ★ {review.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-yellow-700">{review.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{review.location?.name || review.itemReviewed?.name}</p>
                    <p className="text-gray-600 mb-4 text-sm italic">✏️ {review.author}</p>
                    <p className="text-gray-600 text-sm">&ldquo;{review.excerpt}&rdquo;</p>
                    <Link href={`/reviews/${review.slug}`} className="inline-block mt-4 text-yellow-600 hover:text-yellow-800 hover:underline">Read full review →</Link>
                  </div>
                </div>
                );
              })
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/reviews" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events - Full width */}
      <section className="py-16 bg-purple-50 w-full">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-purple-800">Upcoming Events</h2>
          <p className="text-center text-gray-600 mb-12">Don&apos;t miss these exciting cultural celebrations</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-600">Loading events...</p>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg py-12">
                No upcoming events available at the moment.
              </div>
            ) : (
              upcomingEvents.map((event, index) => {
                // For event images, check if they exist in public folder first
                const isPublicImage = event.image && event.image.startsWith('/') && 
                  ['/event-bastar-dussehra.jpg', '/event-rajim-kumbh.jpg', '/event-sirpur-festival.jpeg', '/event-champaran-mela.jpg', '/event-madai-festival.jpg'].includes(event.image);
                
                const imageUrl = event.image.startsWith('http') 
                  ? event.image 
                  : isPublicImage 
                    ? event.image 
                    : `${config.API_BASE_URL.replace('/api', '')}${event.image}`;
                return (
                <div key={event._id || index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 ease-in-out hover:opacity-90"
                      loading="lazy"
                      quality={80}
                      onError={(e) => {
                        console.error('Event image failed to load:', e.target.src);
                        console.error('Event image path:', event.image);
                        console.error('Constructed URL:', imageUrl);
                        e.target.src = '/next.svg'; // Use a fallback that exists
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white font-bold">{new Date(event.startDate).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</p>
                      <p className="text-white text-sm">{event.location}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-700">{event.title}</h3>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                    <Link href={`/events/${event.slug}`} className="inline-block mt-4 text-purple-600 hover:text-purple-800 hover:underline">View details →</Link>
                  </div>
                </div>
                );
              })
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/events" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
              Browse All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Section - Full width */}
      <section className="py-16 bg-white w-full">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">Top Destinations in Chhattisgarh</h2>
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Loading destinations...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p>Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {places.map((place) => (
                <motion.div
                  key={place._id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-64">
                    {place.image ? (
                      <Image
                        src={place.image.startsWith('http') ? place.image : `${config.API_BASE_URL.replace('/api', '')}${place.image}`}
                        alt={`${place.name} - Chhattisgarh Tourism`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                        quality={80}
                        unoptimized={true}
                        onError={(e) => {
                          console.error('Image failed to load:', place.image);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                    <p className="text-gray-600 mb-4">{place.location}</p>
                    <p className="text-gray-600 mb-4 text-sm">
                      {place.sections && place.sections.length > 0 
                        ? place.sections[0].description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                        : 'Explore this amazing destination in Chhattisgarh'
                      }
                    </p>
                    <Link href={`/places/${createSlug(place.name)}`}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Explore More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Local Cuisine Section - Full width */}
      <section className="py-16 bg-green-50 w-full">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Taste of Chhattisgarh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Loading food items...</p>
              </div>
            ) : localCuisine.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg py-12">
                No food items available at the moment.
              </div>
            ) : (
              localCuisine.map((item, index) => {
                // For food images, check if they exist in public folder first
                const isPublicImage = item.image && item.image.startsWith('/') && 
                  ['/food-chila.jpg', '/food-faraa.jpg', '/food-dehrori.jpg', '/food-muthia.jpg'].includes(item.image);
                
                const imageUrl = item.image.startsWith('http') 
                  ? item.image 
                  : isPublicImage 
                    ? item.image 
                    : `${config.API_BASE_URL.replace('/api', '')}${item.image}`;
                return (
                <div key={item._id || index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 ease-in-out hover:opacity-90"
                      loading="lazy"
                      quality={80}
                      onError={(e) => {
                        console.error('Food image failed to load:', e.target.src);
                        console.error('Food image path:', item.image);
                        console.error('Constructed URL:', imageUrl);
                        e.target.src = '/next.svg'; // Use a fallback that exists
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-green-700">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.shortDescription || item.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center mr-4">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {item.rating}
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {item.cuisine}
                        </span>
                      </div>
                      <Link href={`/food/${item.slug}`} className="text-green-600 hover:text-green-800 hover:underline text-sm font-medium">Learn more →</Link>
                    </div>
                  </div>
                </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Wildlife Sanctuaries Section - Full width */}
      <section className="py-16 bg-yellow-50 w-full">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-800">Explore the Wild</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {wildlifeSanctuaries.map((sanctuary, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={sanctuary.img}
                    alt={sanctuary.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-300 ease-in-out hover:opacity-90"
                    loading="lazy"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-700">{sanctuary.name}</h3>
                  <p className="text-gray-600 text-sm">{sanctuary.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section - Full width */}
      <section className="py-16 bg-blue-50 w-full">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">Explore by Region</h2>
          <p className="text-center text-gray-600 mb-8">Discover different regions of Chhattisgarh</p>
          
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
            <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-blue-200">
              <Image
                src="/cg-map.png"
                alt="Chhattisgarh Map"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover transition duration-300 ease-in-out"
                loading="lazy"
                quality={80}
              />
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/places?region=bastar" className="block text-center p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-300">
                <span className="text-blue-800 font-medium">Bastar Region</span>
              </Link>
              <Link href="/places?region=raipur" className="block text-center p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-300">
                <span className="text-blue-800 font-medium">Raipur Region</span>
              </Link>
              <Link href="/places?region=bilaspur" className="block text-center p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-300">
                <span className="text-blue-800 font-medium">Bilaspur Region</span>
              </Link>
              <Link href="/places?region=surguja" className="block text-center p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-300">
                <span className="text-blue-800 font-medium">Surguja Region</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Full width */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-16 w-full px-4 md:px-8 lg:px-16"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img}
              whileHover={{ scale: 1.06 }}
              className="overflow-hidden rounded-xl shadow-md"
            >
              <div className="relative w-full h-32 sm:h-40">
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section - Full width */}
      <div className="w-full">
        <Suspense fallback={<div className="text-center py-12"><div className="loading-spinner"></div><p className="mt-4 text-gray-600">Loading FAQ...</p></div>}>
          <FaqSection />
        </Suspense>
      </div>

      {/* Newsletter Section - Full width */}
      <div className="w-full">
        <Suspense fallback={<div className="text-center py-12"><div className="loading-spinner"></div><p className="mt-4 text-gray-600">Loading Newsletter...</p></div>}>
          <NewsletterSection />
        </Suspense>
      </div>
      
      {/* Add FAQ Section */}
   
      
      {/* Enhanced Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/places" className="hover:text-yellow-400 transition duration-300">Tourist Places</Link></li>
                <li><Link href="/food" className="hover:text-yellow-400 transition duration-300">Food & Cuisine</Link></li>
                <li><Link href="/events" className="hover:text-yellow-400 transition duration-300">Events & Festivals</Link></li>
                <li><Link href="/reviews" className="hover:text-yellow-400 transition duration-300">Reviews</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Reviews</h3>
              <ul className="space-y-2">
                <li><Link href="/reviews?category=places" className="hover:text-yellow-400 transition duration-300">Tourist Attractions</Link></li>
                <li><Link href="/reviews?category=restaurants" className="hover:text-yellow-400 transition duration-300">Restaurants</Link></li>
                <li><Link href="/reviews?category=hotels" className="hover:text-yellow-400 transition duration-300">Hotels & Stays</Link></li>
                <li><Link href="/reviews?category=activities" className="hover:text-yellow-400 transition duration-300">Activities</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/travel-tips" className="hover:text-yellow-400 transition duration-300">Travel Tips</a></li>
                <li><a href="/transportation" className="hover:text-yellow-400 transition duration-300">Transportation</a></li>
                <li><a href="/best-time-to-visit" className="hover:text-yellow-400 transition duration-300">Best Time to Visit</a></li>
                <li><a href="/faq" className="hover:text-yellow-400 transition duration-300">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-2xl hover:text-yellow-400 transition duration-300">📘</a>
                <a href="#" className="text-2xl hover:text-yellow-400 transition duration-300">📸</a>
                <a href="#" className="text-2xl hover:text-yellow-400 transition duration-300">🐦</a>
                <a href="#" className="text-2xl hover:text-yellow-400 transition duration-300">📺</a>
              </div>
              <p className="text-sm text-gray-400">Contact us: info@cgexplorer.com</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()}Managed by StateBlogs. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4 text-sm text-gray-400">
              <a href="/privacy-policy" className="hover:text-white transition duration-300">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white transition duration-300">Terms of Service</a>
              <a href="/sitemap" className="hover:text-white transition duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
