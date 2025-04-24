"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { eventsPosts } from "../data/eventsData";

// This is the client component containing the interactive parts
export default function EventsListClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = eventsPosts.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      {/* Featured Event Banner */}
      <section className="mb-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400">
          <div className="absolute inset-0">
            <Image
              src="/event-bastar-dussehra.jpg"
              alt="Bastar Dussehra"
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
          <div className="relative z-10 p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg mb-2 animate-fade-in">
                Bastar Dussehra Festival 2025
              </h2>
              <p className="text-lg sm:text-2xl text-white/90 max-w-2xl mb-3 animate-fade-in delay-100">
                Experience the world&apos;s longest Dussehra celebration—75 days of
                vibrant rituals, music, and tribal culture in Bastar.
              </p>
              <span className="inline-block bg-yellow-300 text-purple-900 font-semibold px-4 py-2 rounded-full text-sm shadow animate-bounce">
                August 12 – October 24, 2025 • Jagdalpur
              </span>
            </div>
            <Link
              href="/events/bastar-dussehra" // Keep internal links as needed
              className="bg-white/90 hover:bg-white text-purple-700 font-bold px-8 py-3 rounded-xl shadow-lg transition text-lg animate-fade-in delay-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <h1 className="text-4xl font-extrabold mb-3 text-purple-700 tracking-tight">
        Upcoming Events
      </h1>
      <p className="mb-8 text-gray-700 text-lg">
        Discover festivals, cultural programs, and celebrations across
        Chhattisgarh.
      </p>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search events by name or location..."
          className="w-full sm:w-96 p-3 border-2 border-purple-200 focus:border-purple-500 rounded-lg shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Events List */}
      <div className="space-y-12">
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No events found.
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition group"
            >
              <div className="md:w-1/3 h-60 md:h-auto relative">
                <div className="relative w-full h-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2 group-hover:text-purple-600 transition">
                      {event.title}
                    </h2>
                    <span className="bg-gradient-to-r from-yellow-200 to-pink-200 text-purple-900 px-4 py-1 rounded-full text-xs font-semibold shadow">
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{ " "}
                      –{ " "}
                      {new Date(event.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 2.828l4.243 4.243a8 8 0 111.414-1.414z"
                        />
                      </svg>
                      {event.location}
                    </span>
                    <span className="inline-flex items-center bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3"
                        />
                      </svg>
                      {event.organizer}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
                    {event.excerpt}
                  </p>
                  {/* Simplified highlights rendering */}
                  {event.highlights && event.highlights.length > 0 && (
                    <div className="mb-2">
                      <span className="block text-sm text-purple-600 font-semibold mb-1">
                        Highlights:
                      </span>
                      <ul className="list-disc list-inside text-gray-700 text-sm mb-2">
                        {event.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Placeholder text if no specific whyAttend */} 
                  <div className="mb-2">
                    <span className="block text-sm text-pink-600 font-semibold mb-1">
                      Why Attend?
                    </span>
                    <p className="text-gray-700 text-sm">
                      {event.whyAttend || 'Enjoy authentic Chhattisgarhi culture, meet local artists, and experience the regions vibrant traditions firsthand.'}
                    </p>
                  </div>
                  
                </div>
                {/* Link to detailed page (if applicable) */}
                {event.slug && (
                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-4 inline-block text-purple-600 hover:text-purple-800 font-semibold transition self-start"
                  >
                    Read More →
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
