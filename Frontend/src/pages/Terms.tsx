import React from 'react';
import { Calendar, Shield, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms: React.FC = () => {
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
            Terms of Service
          </h1>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 1, 2024</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Version 1.0</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 md:p-12">
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to EcoFinds</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of EcoFinds' website, 
                mobile application, and services (collectively, the "Service"). By accessing or using 
                our Service, you agree to be bound by these Terms.
              </p>
            </div>

            {/* Acceptance */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
              <p className="text-gray-600 mb-4">
                By creating an account, making a purchase, or using any part of EcoFinds, you acknowledge 
                that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-gray-600">
                If you do not agree to these Terms, you may not access or use our Service.
              </p>
            </section>

            {/* Account */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Account Registration</h3>
              <div className="space-y-4 text-gray-600">
                <p>To use EcoFinds, you must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be at least 18 years old or have parental consent</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. User Conduct</h3>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Transmit viruses, worms, or any malicious code</li>
                <li>Spam, solicit, or harass other users</li>
                <li>Impersonate any person or entity</li>
                <li>Collect user information without permission</li>
              </ul>
            </section>

            {/* Marketplace Rules */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Marketplace Rules</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Sellers:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You must own or have authorization to sell listed items</li>
                    <li>Provide accurate descriptions and photos</li>
                    <li>Honor all sale agreements</li>
                    <li>Ship items promptly and securely</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Buyers:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Pay for items in a timely manner</li>
                    <li>Communicate respectfully with sellers</li>
                    <li>Report any issues promptly</li>
                    <li>Leave honest reviews</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payment & Fees */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Payment & Fees</h3>
              <div className="space-y-4 text-gray-600">
                <p>EcoFinds charges a small service fee on completed transactions to maintain the platform.</p>
                <p>All prices are displayed in USD. Payment processing is handled securely through our payment partners.</p>
                <p>Refunds are handled on a case-by-case basis according to our return policy.</p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h3>
              <p className="text-gray-600 mb-4">
                The EcoFinds platform, including its design, features, and content, is protected by copyright, 
                trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-600">
                Users retain ownership of content they upload but grant EcoFinds a license to display 
                and promote their listings.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Privacy</h3>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our Privacy Policy to understand how we 
                collect, use, and protect your information.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Disclaimers</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  EcoFinds provides the platform "as is" without warranties of any kind. We do not guarantee 
                  the accuracy, completeness, or reliability of user-generated content.
                </p>
                <p>
                  We are not responsible for disputes between buyers and sellers, though we provide 
                  tools and support to help resolve issues.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h3>
              <p className="text-gray-600">
                To the maximum extent permitted by law, EcoFinds shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use of the Service.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">10. Account Termination</h3>
              <p className="text-gray-600 mb-4">
                We reserve the right to terminate or suspend accounts that violate these Terms or 
                engage in harmful behavior.
              </p>
              <p className="text-gray-600">
                You may delete your account at any time from your settings page.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h3>
              <p className="text-gray-600">
                We may update these Terms periodically. Users will be notified of significant changes 
                via email or platform notification. Continued use after changes constitutes acceptance.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Information</h3>
              <p className="text-gray-600 mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Email: legal@ecofinds.com</p>
                <p className="text-gray-600">Phone: 1-800-ECO-FIND</p>
                <p className="text-gray-600">Address: EcoFinds Legal Team, 123 Green Street, Eco City, EC 12345</p>
              </div>
            </section>

            {/* Effective Date */}
            <div className="border-t pt-8">
              <p className="text-sm text-gray-500">
                These Terms of Service are effective as of January 1, 2024, and were last updated on January 1, 2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;