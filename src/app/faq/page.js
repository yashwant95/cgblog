"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: "General Travel Information",
      questions: [
        {
          question: "What is the best time to visit Chhattisgarh?",
          answer: "The best time to visit Chhattisgarh is during the winter months from October to March when the weather is pleasant and ideal for sightseeing. The temperatures are comfortable, ranging from 10°C to 28°C, making it perfect for exploring outdoor attractions and wildlife sanctuaries."
        },
        {
          question: "How do I reach Chhattisgarh?",
          answer: "Chhattisgarh is well-connected by air, rail, and road. The main airport is Swami Vivekananda Airport in Raipur with regular flights from major Indian cities. Raipur, Bilaspur, and Durg are major railway stations. The state is also accessible by road through national highways from neighboring states."
        },
        {
          question: "Do I need any permits to visit Chhattisgarh?",
          answer: "Most tourist destinations in Chhattisgarh don't require special permits. However, for certain tribal areas and some national parks, you might need permits from local authorities. It's advisable to check with your tour operator or local tourism office for specific destinations."
        },
        {
          question: "What languages are spoken in Chhattisgarh?",
          answer: "Hindi is the official language and is widely spoken. Chhattisgarhi is the local dialect. English is understood in major cities and tourist areas. Many tribal languages are also spoken in different regions of the state."
        }
      ]
    },
    {
      category: "Tourist Attractions",
      questions: [
        {
          question: "What are the must-visit places in Chhattisgarh?",
          answer: "Must-visit places include Chitrakote Falls (Niagara of India), Bhoramdeo Temple (Khajuraho of Chhattisgarh), Sirpur archaeological site, Kanger Valley National Park, Tirathgarh Falls, Danteshwari Temple in Dantewada, and various wildlife sanctuaries like Barnawapara and Achanakmar."
        },
        {
          question: "Are there any UNESCO World Heritage Sites in Chhattisgarh?",
          answer: "Currently, Chhattisgarh doesn't have UNESCO World Heritage Sites. However, Sirpur is being considered for nomination due to its significant Buddhist archaeological remains. The state has numerous sites of historical and cultural importance that are protected by the Archaeological Survey of India."
        },
        {
          question: "What wildlife can I see in Chhattisgarh?",
          answer: "Chhattisgarh is home to tigers, leopards, sloth bears, wild elephants, bison, deer, and numerous bird species. Major wildlife destinations include Kanger Valley National Park, Indravati Tiger Reserve, Achanakmar Tiger Reserve, Barnawapara Wildlife Sanctuary, and Udanti-Sitanadi Tiger Reserve."
        },
        {
          question: "How many days should I plan for Chhattisgarh?",
          answer: "A minimum of 5-7 days is recommended to cover major attractions. For a comprehensive trip including wildlife safaris, cultural sites, and waterfalls, plan 10-14 days. Weekend trips of 2-3 days are suitable for nearby attractions from major cities."
        }
      ]
    },
    {
      category: "Culture and Festivals",
      questions: [
        {
          question: "What is special about Bastar Dussehra?",
          answer: "Bastar Dussehra is unique as it's a 75-day long festival, unlike the 10-day celebration elsewhere in India. It's dedicated to the local deity Danteshwari Mata rather than celebrating the victory of Ram over Ravana. The festival includes tribal rituals, traditional dances, and a grand chariot procession."
        },
        {
          question: "What are the major festivals celebrated in Chhattisgarh?",
          answer: "Major festivals include Bastar Dussehra, Rajim Kumbh Mela, Madai festivals (tribal village fairs), Hareli (farming festival), Teej, and Champaran Mela. Each festival showcases the rich cultural heritage and tribal traditions of the state."
        },
        {
          question: "What is the tribal culture like in Chhattisgarh?",
          answer: "Chhattisgarh has a rich tribal heritage with communities like Gond, Baiga, Korwa, and others. They have unique traditions, art forms (like Dhokra metal craft), music, dance, and lifestyle. Many still practice traditional occupations and maintain their cultural identity while gradually integrating with modern society."
        }
      ]
    },
    {
      category: "Food and Accommodation",
      questions: [
        {
          question: "What is the local cuisine like?",
          answer: "Chhattisgarhi cuisine is simple yet flavorful. Popular dishes include Chila (rice pancake), Farra (steamed rice dumplings), Bafauri (steamed gram flour balls), Aamat (curry with vegetables), and various rice-based preparations. The food is generally not very spicy and uses minimal oil."
        },
        {
          question: "What are the accommodation options?",
          answer: "Options range from luxury resorts and heritage hotels to budget hotels, government guest houses, forest lodges, and homestays. Major cities like Raipur offer 5-star accommodations. For wildlife areas, forest rest houses and eco-resorts are popular. Advance booking is recommended during peak season."
        },
        {
          question: "Is street food safe to eat?",
          answer: "Street food in major cities is generally safe, but it's advisable to eat from busy, clean stalls. Popular street foods include Chaat, Samosa, and local snacks. Always check for cleanliness and opt for freshly prepared items. Carry digestive medicines as a precaution."
        }
      ]
    },
    {
      category: "Transportation and Safety",
      questions: [
        {
          question: "How is the road condition for self-driving?",
          answer: "Major highways and roads connecting tourist destinations are generally in good condition. However, some remote areas and forest roads might be challenging. It's recommended to use a reliable vehicle, carry spare parts, and inform someone about your travel plans when visiting remote areas."
        },
        {
          question: "Is Chhattisgarh safe for tourists?",
          answer: "Yes, Chhattisgarh is generally safe for tourists. However, some remote border areas have security concerns. Stick to established tourist circuits, travel during daylight in remote areas, and follow local guidelines. Tourist police and authorities are helpful and supportive."
        },
        {
          question: "What should I pack for a Chhattisgarh trip?",
          answer: "Pack comfortable cotton clothes, walking shoes, hat, sunscreen, mosquito repellent, first aid kit, camera, power bank, and any personal medications. For wildlife safaris, carry neutral-colored clothing. Winter visits require light woolens for evenings."
        }
      ]
    },
    {
      category: "Shopping and Souvenirs",
      questions: [
        {
          question: "What are the best things to buy in Chhattisgarh?",
          answer: "Popular souvenirs include Dhokra metal art, Bastar wooden crafts, tribal jewelry, handwoven textiles, bamboo products, and tribal paintings. These items represent the rich artistic heritage of the state and make excellent gifts and collectibles."
        },
        {
          question: "Where are the best places to shop?",
          answer: "Good shopping areas include local markets in Raipur, Bilaspur, and Jagdalpur. Government emporiums like Mrignayani showcase authentic handicrafts. Village markets during festivals offer unique tribal products. Always bargain respectfully and buy from authentic sources."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>Frequently Asked Questions - CG Blog | Chhattisgarh Tourism Guide</title>
        <meta name="description" content="Get answers to frequently asked questions about traveling to Chhattisgarh. Find information about attractions, culture, food, accommodation, and travel tips." />
        <meta name="keywords" content="Chhattisgarh FAQ, CG travel questions, tourism information, travel guide, visitor information, trip planning" />
      </Head>
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-green-600">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about traveling to Chhattisgarh and make your trip planning easier
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-green-100 px-6 py-4 border-b border-green-200">
                  <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, questionIndex) => {
                    const isOpen = openFAQ === `${categoryIndex}-${questionIndex}`;
                    
                    return (
                      <div key={questionIndex}>
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full text-left px-6 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                            <div className="flex-shrink-0">
                              <svg 
                                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Can't find the answer you're looking for? Our friendly team is here to help you plan your perfect Chhattisgarh adventure.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Contact Us
              </a>
              <a 
                href="mailto:contact@cgblog.in" 
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors duration-300"
              >
                Email Support
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Links</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/travel-tips" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h4 className="font-medium text-gray-900">Travel Tips</h4>
              </a>
              
              <a href="/places" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h4 className="font-medium text-gray-900">Places to Visit</h4>
              </a>
              
              <a href="/maps" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h4 className="font-medium text-gray-900">Maps & Routes</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}