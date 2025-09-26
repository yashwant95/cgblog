import Head from 'next/head';

export default function TravelTips() {
  const travelTips = [
    {
      category: "Best Time to Visit",
      tips: [
        "Visit during October to March for pleasant weather",
        "Avoid monsoon season (June-September) for outdoor activities",
        "Winter months are ideal for wildlife spotting",
        "Festival season (October-February) offers cultural experiences"
      ]
    },
    {
      category: "Transportation",
      tips: [
        "Book flights to Raipur airport, the main gateway",
        "State transport buses connect major destinations",
        "Hire local taxis or auto-rickshaws for city travel",
        "Consider renting a car for exploring remote areas"
      ]
    },
    {
      category: "Accommodation",
      tips: [
        "Book forest lodges in advance for wildlife tours",
        "Government guest houses offer budget-friendly stays",
        "Private resorts available in major tourist areas",
        "Homestays provide authentic local experiences"
      ]
    },
    {
      category: "Local Culture & Etiquette",
      tips: [
        "Dress modestly when visiting temples and religious sites",
        "Remove shoes before entering temples",
        "Respect local tribal customs and traditions",
        "Learn basic Hindi phrases for better communication"
      ]
    },
    {
      category: "Food & Water",
      tips: [
        "Try local specialties like Chila, Farra, and Bafauri",
        "Drink bottled or boiled water",
        "Eat at clean, well-reviewed restaurants",
        "Carry digestive medications for stomach sensitivities"
      ]
    },
    {
      category: "Health & Safety",
      tips: [
        "Carry mosquito repellent for forest areas",
        "Get vaccinated for common tropical diseases",
        "Keep emergency contact numbers handy",
        "Inform someone about your travel itinerary"
      ]
    },
    {
      category: "Photography & Electronics",
      tips: [
        "Carry extra batteries and power banks",
        "Respect photography restrictions at religious sites",
        "Capture tribal art and handicrafts ethically",
        "Keep equipment protected from humidity"
      ]
    },
    {
      category: "Shopping",
      tips: [
        "Buy authentic tribal handicrafts and textiles",
        "Negotiate prices at local markets",
        "Look for Dhokra metal art and Bastar wooden crafts",
        "Support local artisans and cooperatives"
      ]
    }
  ];

  const emergencyContacts = [
    { service: "Police", number: "100" },
    { service: "Fire", number: "101" },
    { service: "Ambulance", number: "108" },
    { service: "Tourist Helpline", number: "1363" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>Travel Tips - Chhattisgarh Tourism Guide | CG Blog</title>
        <meta name="description" content="Essential travel tips for visiting Chhattisgarh. Get expert advice on transportation, accommodation, local culture, food, safety, and more for your CG trip." />
        <meta name="keywords" content="Chhattisgarh travel tips, CG tourism guide, best time to visit Chhattisgarh, travel safety tips, local culture etiquette, transportation in CG" />
      </Head>
      
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Travel <span className="text-green-600">Tips</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make the most of your Chhattisgarh adventure with our expert travel tips and local insights
            </p>
          </div>

          {/* Quick Tips Banner */}
          <div className="bg-green-100 border-l-4 border-green-500 p-6 mb-12 rounded-lg">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-green-800">Quick Tip</h3>
            </div>
            <p className="text-green-700">
              Plan your visit during the winter months (October-March) for the best weather and optimal conditions for exploring Chhattisgarh's natural beauty and cultural sites.
            </p>
          </div>

          {/* Travel Tips Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {travelTips.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
                </div>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-12">
            <div className="text-center mb-6">
              <div className="bg-red-100 p-3 rounded-full inline-block mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
              <p className="text-gray-600">Keep these important numbers handy during your travels</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">{contact.service}</h3>
                  <a 
                    href={`tel:${contact.number}`}
                    className="text-2xl font-bold text-red-600 hover:text-red-700"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Guide */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Seasonal Travel Guide</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Winter (Oct-Feb)</h3>
                <p className="text-gray-600 text-sm">
                  Perfect for sightseeing, wildlife safaris, and outdoor activities. Comfortable temperatures and clear skies.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Summer (Mar-May)</h3>
                <p className="text-gray-600 text-sm">
                  Hot weather but good for early morning activities. Stay hydrated and avoid midday sun.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Monsoon (Jun-Sep)</h3>
                <p className="text-gray-600 text-sm">
                  Heavy rainfall makes travel challenging but landscapes are lush. Indoor attractions recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Packing Checklist */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Essential Packing Checklist</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clothing</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Comfortable walking shoes
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Light cotton clothes
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Light jacket for evenings
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Hat and sunglasses
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health & Safety</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    First aid kit
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Mosquito repellent
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Sunscreen (SPF 30+)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Personal medications
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Electronics & Documents</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Power bank & chargers
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Camera with extra memory
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    ID proof & travel permits
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Travel insurance documents
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}