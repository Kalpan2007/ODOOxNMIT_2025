import React from 'react';
import { Calendar, Shield, ArrowLeft, Eye, Lock, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 1, 2024</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 md:p-12">
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Matters</h2>
              <p className="text-gray-600 leading-relaxed">
                At EcoFinds, we are committed to protecting your privacy and personal data. This Privacy Policy 
                explains how we collect, use, store, and protect your information when you use our sustainable 
                marketplace platform.
              </p>
            </div>

            {/* Quick Overview */}
            <div className="mb-8 bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Quick Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-green-900">We collect minimal data</p>
                    <p className="text-sm text-green-700">Only what's necessary for the service</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-green-900">Your data is secure</p>
                    <p className="text-sm text-green-700">Encrypted and protected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Database className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-green-900">You control your data</p>
                    <p className="text-sm text-green-700">Access, modify, or delete anytime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Account Information</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Username and email address</li>
                    <li>Profile information you choose to share</li>
                    <li>Account preferences and settings</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transaction Data</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Purchase and sales history</li>
                    <li>Payment information (securely processed by our partners)</li>
                    <li>Shipping addresses for order fulfillment</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Usage Information</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>How you interact with our platform</li>
                    <li>Search queries and browsing patterns</li>
                    <li>Device information and IP address</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Communications</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Messages you send through our platform</li>
                    <li>Customer support interactions</li>
                    <li>Feedback and reviews</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h3>
              <div className="space-y-4 text-gray-600">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our marketplace services</li>
                  <li>Process transactions and communicate about orders</li>
                  <li>Personalize your experience and show relevant products</li>
                  <li>Prevent fraud and maintain platform security</li>
                  <li>Send important updates about your account or our services</li>
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Respond to customer support requests</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h3>
              <div className="space-y-4 text-gray-600">
                <p>We may share your information in the following limited circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>With other users:</strong> Profile information and public listings are visible to other users</li>
                  <li><strong>Service providers:</strong> Trusted partners who help us operate the platform (payment processing, hosting, etc.)</li>
                  <li><strong>Legal requirements:</strong> When required by law or to protect our users and platform</li>
                  <li><strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                </ul>
                <p className="mt-4">
                  <strong>We never sell your personal data to third parties for marketing purposes.</strong>
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h3>
              <div className="space-y-4 text-gray-600">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure payment processing through certified providers</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Limited access to personal data on a need-to-know basis</li>
                  <li>Secure data centers with physical and digital safeguards</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Your Privacy Rights</h3>
              <div className="space-y-4 text-gray-600">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correct:</strong> Update or correct inaccurate information</li>
                  <li><strong>Delete:</strong> Request deletion of your account and data</li>
                  <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Object:</strong> Object to certain types of data processing</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at privacy@ecofinds.com or through your account settings.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h3>
              <div className="space-y-4 text-gray-600">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and login status</li>
                  <li>Analyze site usage and performance</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Prevent fraud and improve security</li>
                </ul>
                <p className="mt-4">
                  You can manage cookie preferences in your browser settings. For more details, see our 
                  <span className="text-green-600"> Cookies Policy</span>.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Data Retention</h3>
              <p className="text-gray-600 mb-4">
                We retain your personal information only as long as necessary to provide our services and 
                comply with legal obligations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>Account data: Until you delete your account</li>
                <li>Transaction records: 7 years for tax and legal purposes</li>
                <li>Support communications: 3 years</li>
                <li>Marketing data: Until you opt out</li>
              </ul>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h3>
              <p className="text-gray-600">
                EcoFinds operates globally. Your data may be transferred to and processed in countries 
                other than your own. We ensure appropriate safeguards are in place to protect your data 
                in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h3>
              <p className="text-gray-600">
                EcoFinds is not intended for users under 18. We do not knowingly collect personal 
                information from children. If you believe we have collected information from a child, 
                please contact us immediately.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h3>
              <p className="text-gray-600">
                We may update this Privacy Policy periodically. We'll notify you of significant changes 
                via email or platform notification. The "Last Updated" date at the top indicates when 
                the policy was last revised.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h3>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy or our data practices, contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Privacy Team: privacy@ecofinds.com</p>
                <p className="text-gray-600">General Support: support@ecofinds.com</p>
                <p className="text-gray-600">Phone: 1-800-ECO-FIND</p>
                <p className="text-gray-600">Address: EcoFinds Privacy Team, 123 Green Street, Eco City, EC 12345</p>
              </div>
            </section>

            {/* Effective Date */}
            <div className="border-t pt-8">
              <p className="text-sm text-gray-500">
                This Privacy Policy is effective as of January 1, 2024, and was last updated on January 1, 2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;