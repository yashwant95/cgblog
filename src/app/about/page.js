import Head from 'next/head';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>About Us - Chhattisgarh Tourism Guide | CG Blog</title>
        <meta name="description" content="Learn about CG Blog, your trusted source for Chhattisgarh tourism information, travel guides, food reviews, and cultural insights." />
      </Head>
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-green-600">CG Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your ultimate guide to exploring the rich heritage, culture, and natural beauty of Chhattisgarh
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At CG Blog, we are passionate about showcasing the incredible diversity and beauty of Chhattisgarh. 
                From ancient temples and pristine waterfalls to vibrant festivals and delicious local cuisine, 
                we aim to be your comprehensive guide to everything this wonderful state has to offer.
              </p>
              <p className="text-gray-700">
                Our goal is to promote sustainable tourism while preserving the rich cultural heritage 
                and natural resources of Chhattisgarh for future generations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Comprehensive travel guides for top destinations
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Authentic food reviews and local cuisine insights
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Up-to-date information on cultural events and festivals
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Expert travel tips and recommendations
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Beautiful photography showcasing CG&apos;s natural beauty
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h3>
            <p className="text-gray-700 mb-6">
              Whether you&apos;re a local resident looking to explore your own state or a visitor planning your first trip to Chhattisgarh, 
              we invite you to join our community of travel enthusiasts and cultural explorers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Local Insights
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Cultural Heritage
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                Adventure Travel
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Sustainable Tourism
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}