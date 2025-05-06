"use client"
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NewsletterSection from './NewsletterSection';

// Featured reviews data
const featuredReviews = [
  {
    title: "Magnificent Chitrakote Falls",
    place: "Chitrakote Falls",
    rating: 4.8,
    author: "Travelogue",
    excerpt: "A breathtaking waterfall that rivals the Niagara in beauty and grandeur.",
    img: "/chitrakote.jpg"
  },
  {
    title: "Divine Experience at Danteshwari Temple",
    place: "Danteshwari Temple, Jagdalpur",
    rating: 4.9,
    author: "Heritage Explorer",
    excerpt: "The spiritual energy of this ancient temple is unlike anything I've experienced.",
    img: "/review-danteshwari.jpg"
  },
  {
    title: "Authentic Tribal Cuisine at Bastar Lounge",
    place: "Bastar Lounge, Jagdalpur",
    rating: 4.7,
    author: "Food Critic",
    excerpt: "Traditional flavors prepared with modern techniques - absolutely delicious!",
    img: "/review-bastar-food.jpg"
  }
];

// Upcoming events data
const upcomingEvents = [
  {
    title: "Bastar Dussehra Festival",
    date: "October 2025",
    location: "Jagdalpur",
    desc: "Experience the world's longest festival celebrating tribal culture and traditions.",
    img: "/event-bastar-dussehra.jpg"
  },
  {
    title: "Champaran Mela",
    date: "May 2025",
    location: "Champaran, Raipur",
    desc: "Annual fair featuring local handicrafts, performances, and cuisine.",
    img: "/event-champaran-mela.jpg"
  },
  {
    title: "Madai Festival",
    date: "January 2026",
    location: "Various locations",
    desc: "A traditional tribal fair celebrating harvest season with dance and music.",
    img: "/event-madai-festival.jpg"
  }
];

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

const localCuisine = [
  {
    name: "Chilla",
    img: "/food-chila.jpg", // Placeholder image path
    desc: "A savory pancake made from gram flour, a popular breakfast item."
  },
  {
    name: "Faraa",
    img: "/food-faraa.jpg", // Placeholder image path
    desc: "Steamed rice dumplings, often served with chutney."
  },
  {
    name: "Muthia",
    img: "/food-muthia.jpg", // Placeholder image path
    desc: "Steamed or fried dumplings made from rice batter and spices."
  }
];

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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "CG Blog - Chhattisgarh Explorer",
            "url": "https://cgblog.in",
            "description": "Your comprehensive guide to Chhattisgarh tourism, culture, and travel. Discover the best attractions, food, events, and reviews.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Raipur",
              "addressRegion": "Chhattisgarh",
              "addressCountry": "India"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "21.2787",
              "longitude": "81.8661"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service",
              "areaServed": "IN-CG",
              "availableLanguage": "English"
            },
            "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://twitter.com/yourhandle",
                "https://www.instagram.com/yourprofile"]
          }),
        }}
      />
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/hero-bg.png')" }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
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

      {/* Featured Reviews Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-yellow-800">Featured Reviews</h2>
          <p className="text-center text-gray-600 mb-12">Authentic experiences shared by our community</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={review.img}
                    alt={review.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-300 ease-in-out hover:opacity-90"
                  />
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white font-bold p-2 rounded-bl-lg">
                    ★ {review.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-700">{review.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{review.place}</p>
                  <p className="text-gray-600 mb-4 text-sm italic">✏️ {review.author}</p>
                  <p className="text-gray-600 text-sm">&ldquo;{review.excerpt}&rdquo;</p>
                  <Link href="/reviews" className="inline-block mt-4 text-yellow-600 hover:text-yellow-800 hover:underline">Read full review →</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/reviews" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-purple-800">Upcoming Events</h2>
          <p className="text-center text-gray-600 mb-12">Don&apos;t miss these exciting cultural celebrations</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-300 ease-in-out hover:opacity-90"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold">{event.date}</p>
                    <p className="text-white text-sm">{event.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-purple-700">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.desc}</p>
                  <Link href="/events" className="inline-block mt-4 text-purple-600 hover:text-purple-800 hover:underline">View details →</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/events" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
              Browse All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        className="max-w-6xl mx-auto my-12"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Top Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(34,197,94,0.2)" }}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
            >
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={dest.img}
                  alt={dest.name}
                  className="object-cover rounded-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{dest.name}</h3>
              <p className="text-gray-600 text-center">{dest.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Local Cuisine Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Taste of Chhattisgarh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {localCuisine.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-300 ease-in-out hover:opacity-90"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-700">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wildlife Sanctuaries Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-800">Explore the Wild</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wildlifeSanctuaries.map((sanctuary, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={sanctuary.img}
                    alt={sanctuary.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-300 ease-in-out hover:opacity-90"
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

      {/* Interactive Map Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">Explore by Region</h2>
          <p className="text-center text-gray-600 mb-8">Discover different regions of Chhattisgarh</p>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden border-2 border-blue-200">
              <Image
                src="/cg-map.jpg"
                alt="Chhattisgarh Map"
                fill
                sizes="100vw"
                className="object-contain transition duration-300 ease-in-out"
              />
              
              {/* This would ideally be an interactive map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="bg-white/80 p-4 rounded-lg text-gray-700">Interactive map coming soon</p>
              </div>
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

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto my-12"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                  priority
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto my-16 bg-green-700 rounded-xl shadow-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Plan Your Visit!</h2>
        <p className="mb-4">Contact Chhattisgarh Tourism for personalized travel assistance.</p>
        <a
          href="mailto:info@chhattisgarhtourism.in"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-2 rounded-full shadow hover:bg-green-100 transition"
        >
          Email Us
        </a>
      </motion.section>
      {/* Newsletter Subscription */}
      <NewsletterSection />
      
      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
      </footer>
    </div>
  );
}
