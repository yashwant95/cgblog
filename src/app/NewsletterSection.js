"use client";

import { useState, useEffect } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  // Use effect to mark when component is running on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Subscribing email:', email);
    // Reset form after submission
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <section className="py-16 bg-blue-600 text-white w-full">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="mb-8 text-blue-100">
            Subscribe to our newsletter for the latest updates on Chhattisgarh tourism, events, and special offers.
          </p>
          
          {isClient ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-3 rounded-lg flex-grow max-w-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition duration-300"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <div className="px-4 py-3 rounded-lg flex-grow max-w-sm bg-white"></div>
              <div className="bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg">Subscribe</div>
            </div>
          )}
          
          <p className="mt-4 text-sm text-blue-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
