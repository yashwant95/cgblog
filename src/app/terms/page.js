import Head from 'next/head';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100">
      <Head>
        <title>Terms of Use - CG Blog | Chhattisgarh Tourism Guide</title>
        <meta name="description" content="Terms of Use for CG Blog. Read our terms and conditions for using our Chhattisgarh tourism website and services." />
      </Head>
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of <span className="text-green-600">Use</span>
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to CG Blog (cgblog.in). These Terms of Use ("Terms") govern your use of our website and services. 
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, 
                then you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                CG Blog provides information about Chhattisgarh tourism, including travel guides, food reviews, event listings, 
                and cultural insights. We strive to provide accurate and up-to-date information, but we make no warranties 
                about the completeness, reliability, or accuracy of this information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Permitted Use</h3>
              <p className="text-gray-700 mb-4">You may use our Service for lawful purposes only. You agree not to use the Service:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>In any way that violates applicable federal, state, local, or international law</li>
                <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
                <li>To engage in any form of automated data collection</li>
                <li>To interfere with or disrupt the Service or servers connected to the Service</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">User Content</h3>
              <p className="text-gray-700 mb-4">
                If you submit comments, reviews, or other content, you grant us a non-exclusive, royalty-free, perpetual, 
                and worldwide license to use, modify, and display such content. You represent that you own or have the 
                necessary rights to grant this license.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property 
                of CG Blog and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-gray-700">
                You may not modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, 
                transfer, or sell any information, software, products, or services obtained from the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                to understand our practices regarding the collection and use of your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Information Accuracy</h3>
              <p className="text-gray-700 mb-4">
                While we strive to provide accurate and current information about travel destinations, events, and services, 
                we cannot guarantee the accuracy, completeness, or timeliness of all information. Travel conditions, 
                venue details, and event schedules may change without notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Links</h3>
              <p className="text-gray-700 mb-4">
                Our Service may contain links to third-party websites or services. We have no control over and assume 
                no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Availability</h3>
              <p className="text-gray-700">
                We do not warrant that the Service will be uninterrupted, timely, secure, or error-free. 
                We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700">
                In no event shall CG Blog, its directors, employees, partners, agents, suppliers, or affiliates be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700">
                You agree to defend, indemnify, and hold harmless CG Blog and its licensee and licensors, and their employees, 
                contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, 
                liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
                including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its 
                conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought 
                exclusively in the courts of India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> contact@cgblog.in<br/>
                  <strong>Website:</strong> cgblog.in
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acknowledgment</h2>
              <p className="text-gray-700">
                By using our Service, you acknowledge that you have read these Terms of Use and agree to be bound by them.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}