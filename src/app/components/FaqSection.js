"use client";

import { useState } from 'react';
import Script from 'next/script';
import { generateFAQSchema } from '../utils/schemaGenerators';

const faqs = [
  {
    question: "What are the top tourist attractions in Chhattisgarh?",
    answer: "The top tourist attractions in Chhattisgarh include Chitrakote Falls (the Niagara of India), Danteshwari Temple in Jagdalpur, Barnawapara Wildlife Sanctuary, Bhoramdeo Temple, Sirpur Heritage Site, Kanger Valley National Park, Tirathgarh Falls, and Rajiv Lochan Temple."
  },
  {
    question: "When is the best time to visit Chhattisgarh?",
    answer: "The best time to visit Chhattisgarh is from October to March when the weather is pleasant with temperatures ranging from 10°C to 25°C. The monsoon season (July to September) is also good for experiencing waterfalls and lush green landscapes, though some areas may have accessibility issues."
  },
  {
    question: "What are some famous local dishes to try in Chhattisgarh?",
    answer: "Some famous local dishes to try in Chhattisgarh include Chila (rice flour pancakes), Faraa (steamed rice dumplings), Muthia (steamed rice flour balls), Aamat (sour curry), Petha (sweet dish), Bafauri (gram flour dumplings), and traditional tribal dishes like Chapda Chutney (made from red ants)."
  },
  {
    question: "What are the major festivals celebrated in Chhattisgarh?",
    answer: "The major festivals celebrated in Chhattisgarh include Bastar Dussehra (the longest festival in the world lasting 75 days), Madai Festival, Goncha Festival, Hareli (agricultural festival), Pola (bull worship festival), and the traditional tribal celebrations like Bhoramdeo Festival and Champaran Mela."
  },
  {
    question: "How can I reach Chhattisgarh?",
    answer: "You can reach Chhattisgarh by air through Swami Vivekananda Airport in Raipur, which is connected to major cities like Delhi, Mumbai, and Kolkata. By train, the main railway stations are in Raipur, Bilaspur, and Durg, connected to major Indian cities. Major national highways (NH-30, NH-53, NH-49) connect Chhattisgarh to neighboring states."
  },
  {
    question: "What types of accommodations are available for tourists in Chhattisgarh?",
    answer: "Chhattisgarh offers various accommodation options including luxury hotels in major cities like Raipur and Bilaspur, mid-range hotels across tourist destinations, budget guesthouses, Chhattisgarh Tourism Board accommodations near major attractions, tribal homestays in villages for authentic experiences, and eco-resorts and nature camps near wildlife sanctuaries."
  },
  {
    question: "Are there any cultural or tribal tours available in Chhattisgarh?",
    answer: "Yes, several cultural and tribal tours are available in Chhattisgarh, focusing on the tribal regions of Bastar, Dantewada, and Kanker. These tours offer insights into tribal art, handicrafts, traditional dances, and lifestyle. The Chhattisgarh Tourism Board and local tour operators organize guided tribal village tours, art and craft workshops, and opportunities to witness tribal ceremonies."
  },
  {
    question: "What wildlife sanctuaries can be visited in Chhattisgarh?",
    answer: "Chhattisgarh has several wildlife sanctuaries that can be visited, including Achanakmar Tiger Reserve, Barnawapara Wildlife Sanctuary, Kanger Valley National Park, Udanti-Sitanadi Tiger Reserve, Gomarda Wildlife Sanctuary, and Tamor Pingla Wildlife Sanctuary. These protected areas are home to tigers, leopards, sloth bears, wild buffaloes, and diverse bird species."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqSchema = generateFAQSchema(faqs);
  
  return (
    <section className="py-12 bg-blue-50 w-full">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="w-full px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Frequently Asked Questions about Chhattisgarh Tourism
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-800 hover:bg-blue-50 transition-colors"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-blue-600 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`px-4 overflow-hidden transition-all max-h-0 ${openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'}`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 