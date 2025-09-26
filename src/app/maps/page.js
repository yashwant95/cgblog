import Head from 'next/head';

export default function Maps() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>Maps - Chhattisgarh Tourism Guide | CG Blog</title>
        <meta name="description" content="Interactive maps of Chhattisgarh showing tourist attractions, cities, districts, and important landmarks. Plan your CG journey with detailed location guides." />
        <meta name="keywords" content="Chhattisgarh map, CG districts map, tourist places map, Raipur map, Bastar map, navigation guide, travel route planning" />
      </Head>
      
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Chhattisgarh <span className="text-green-600">Maps</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate through Chhattisgarh with our comprehensive maps and location guides
            </p>
          </div>

          {/* Main Map Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Chhattisgarh State Map</h2>
              <p className="text-gray-600">
                Explore the geographic layout of Chhattisgarh with major cities, districts, and tourist attractions
              </p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="/optimized/cg-map.avif"
                alt="Chhattisgarh State Map showing districts and major cities"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>

          {/* Districts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "Raipur District",
                capital: "Raipur",
                highlights: ["State Capital", "Mahant Ghasidas Memorial Museum", "Nagar Ghadi", "Telibandha Lake"],
                description: "The heart of Chhattisgarh, known for its urban development and cultural heritage."
              },
              {
                name: "Bastar District",
                capital: "Jagdalpur",
                highlights: ["Chitrakote Falls", "Tirathgarh Falls", "Kanger Valley National Park", "Danteshwari Temple"],
                description: "Famous for its tribal culture, waterfalls, and natural beauty."
              },
              {
                name: "Bilaspur District",
                capital: "Bilaspur",
                highlights: ["Ratanpur", "Khutaghat Dam", "Achanakmar Wildlife Sanctuary"],
                description: "Known for its historical significance and wildlife reserves."
              },
              {
                name: "Durg District",
                capital: "Durg",
                highlights: ["Bhilai Steel Plant", "Maitri Bagh", "Siyadevi Temple"],
                description: "Industrial hub with modern amenities and religious sites."
              },
              {
                name: "Korba District",
                capital: "Korba",
                highlights: ["Kendai Falls", "Amarkantak (nearby)", "Coal mines"],
                description: "Energy capital of Chhattisgarh with natural attractions."
              },
              {
                name: "Rajnandgaon District",
                capital: "Rajnandgaon",
                highlights: ["Dongargarh", "Khairpur", "Bambleshwari Temple"],
                description: "Religious and cultural center with ancient temples."
              }
            ].map((district, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{district.name}</h3>
                <p className="text-green-600 font-semibold mb-3">Capital: {district.capital}</p>
                <p className="text-gray-700 text-sm mb-4">{district.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Attractions:</h4>
                  <ul className="space-y-1">
                    {district.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-center">
                        <span className="text-green-500 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Travel Routes Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Travel Routes</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Heritage Circuit</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">1</div>
                    <span className="text-gray-700">Raipur (Start)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">2</div>
                    <span className="text-gray-700">Sirpur (Archaeological site)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">3</div>
                    <span className="text-gray-700">Ratanpur (Historical temples)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">4</div>
                    <span className="text-gray-700">Bhoramdeo Temple</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Nature & Wildlife Circuit</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</div>
                    <span className="text-gray-700">Raipur (Start)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</div>
                    <span className="text-gray-700">Barnawapara Wildlife Sanctuary</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">3</div>
                    <span className="text-gray-700">Chitrakote Falls</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">4</div>
                    <span className="text-gray-700">Kanger Valley National Park</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transportation Hub */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Transportation Hubs</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Airports</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Swami Vivekananda Airport (Raipur)</li>
                  <li>Bilaspur Airport</li>
                  <li>Jagdalpur Airport</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Railway Stations</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Raipur Junction</li>
                  <li>Bilaspur Junction</li>
                  <li>Durg Junction</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bus Terminals</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Raipur Bus Stand</li>
                  <li>Bilaspur Bus Terminal</li>
                  <li>Jagdalpur Bus Stand</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Distance Chart */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Distance Chart (in km)</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-semibold text-gray-900">From/To</th>
                    <th className="text-center p-3 font-semibold text-gray-900">Raipur</th>
                    <th className="text-center p-3 font-semibold text-gray-900">Bilaspur</th>
                    <th className="text-center p-3 font-semibold text-gray-900">Jagdalpur</th>
                    <th className="text-center p-3 font-semibold text-gray-900">Korba</th>
                    <th className="text-center p-3 font-semibold text-gray-900">Durg</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { city: "Raipur", distances: ["-", "120", "300", "200", "35"] },
                    { city: "Bilaspur", distances: ["120", "-", "420", "80", "155"] },
                    { city: "Jagdalpur", distances: ["300", "420", "-", "500", "335"] },
                    { city: "Korba", distances: ["200", "80", "500", "-", "235"] },
                    { city: "Durg", distances: ["35", "155", "335", "235", "-"] }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-3 font-medium text-gray-900">{row.city}</td>
                      {row.distances.map((distance, idx) => (
                        <td key={idx} className="text-center p-3 text-gray-600">{distance}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                * Distances are approximate and may vary based on route taken
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}