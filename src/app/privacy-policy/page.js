import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>Privacy Policy - CG Blog | Chhattisgarh Tourism Guide</title>
        <meta name="description" content="Privacy Policy for CG Blog. Learn how we collect, use, and protect your personal information when you visit our Chhattisgarh tourism website." />
      </Head>
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy <span className="text-green-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At CG Blog (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website cgblog.in 
                (the &quot;Service&quot;) operated by CG Blog.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect personally identifiable information, such as:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Name and email address (when you contact us or subscribe to our newsletter)</li>
                <li>Comments and feedback you provide</li>
                <li>Any other information you voluntarily provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Non-Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect non-personal information about users whenever they interact with our Service:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Browser name and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Information</h2>
              <p className="text-gray-700 mb-4">We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Provide, operate, and maintain our Service</li>
                <li>Improve, personalize, and expand our Service</li>
                <li>Understand and analyze how you use our Service</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you for customer service and support</li>
                <li>Send you newsletters and marketing communications (with your consent)</li>
                <li>Find and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to track activity on our Service and store certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-gray-700">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.</p>
              
              <p className="text-gray-700">We may share your information in the following situations:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, please remember that no method of transmission over the Internet 
                or method of electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our Service may contain links to third-party websites or services that are not owned or controlled by CG Blog. 
                We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p className="text-gray-700">
                We may also use third-party services such as Google Analytics to help us understand how our Service is being used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>The right to access your personal data</li>
                <li>The right to rectification of your personal data</li>
                <li>The right to erasure of your personal data</li>
                <li>The right to restrict processing of your personal data</li>
                <li>The right to data portability</li>
                <li>The right to object to processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information 
                from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, 
                please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the &quot;last updated&quot; date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> contact@cgblog.in<br/>
                  <strong>Website:</strong> cgblog.in
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}