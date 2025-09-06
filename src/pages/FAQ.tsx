import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account on EcoFinds?",
          answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, fill in your details, and you'll receive 50 eco-points as a welcome bonus. You'll be ready to start buying and selling sustainable treasures right away."
        },
        {
          question: "What are eco-points and how do I earn them?",
          answer: "Eco-points are our reward system for sustainable actions. You earn 1 point for every $10 spent on purchases. These points represent your positive environmental impact and can be used to unlock special features and badges on your profile."
        },
        {
          question: "Is EcoFinds free to use?",
          answer: "Yes! Creating an account, browsing products, and making purchases is completely free. There are no monthly fees or hidden charges. We only make money when you successfully sell items through our platform."
        }
      ]
    },
    {
      category: "Buying",
      questions: [
        {
          question: "How do I search for specific items?",
          answer: "Use our search bar at the top of the feed page to search by keywords, or browse by category using our filter options. You can also filter by price range and location to find exactly what you're looking for."
        },
        {
          question: "Is it safe to buy from other users?",
          answer: "Absolutely! We have built-in safety measures including seller verification, secure payment processing, and a rating system. All transactions are protected, and we have a customer support team ready to help with any issues."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, and digital wallets. All payments are processed securely through our encrypted payment system, so your financial information is always protected."
        },
        {
          question: "What if I'm not satisfied with my purchase?",
          answer: "We want you to be happy with every purchase! Contact the seller first to try to resolve any issues. If that doesn't work, our customer support team can help mediate and find a solution that works for everyone."
        }
      ]
    },
    {
      category: "Selling",
      questions: [
        {
          question: "How do I list an item for sale?",
          answer: "Click 'Add New Item' from your dashboard or the plus icon in the navigation. Fill in the product details, add a photo, set your price, and publish! Your item will be visible to buyers immediately."
        },
        {
          question: "How do I price my items competitively?",
          answer: "Research similar items on our platform to see what they're selling for. Consider the item's condition, brand, and demand. Remember, competitive pricing helps items sell faster and benefits both you and the environment!"
        },
        {
          question: "Can I edit my listings after they're posted?",
          answer: "Yes! Go to 'My Listings' in your dashboard and click the edit button on any item. You can update the title, description, price, and photos. Changes are reflected immediately on the marketplace."
        },
        {
          question: "How do I communicate with potential buyers?",
          answer: "Buyers can contact you through our secure messaging system. You'll receive notifications when someone is interested in your item. Always keep communication on our platform for safety and security."
        }
      ]
    },
    {
      category: "Environmental Impact",
      questions: [
        {
          question: "How does buying second-hand help the environment?",
          answer: "Every second-hand purchase reduces demand for new production, saving raw materials, energy, and reducing carbon emissions. It also keeps items out of landfills, extending their useful life and reducing waste."
        },
        {
          question: "How do you calculate CO₂ savings?",
          answer: "We use industry-standard calculations based on the environmental impact of producing new items versus extending the life of existing ones. On average, buying second-hand saves 70% of the carbon footprint compared to buying new."
        },
        {
          question: "What happens to items that don't sell?",
          answer: "We encourage sellers to consider donating unsold items to local charities or recycling centers. We also provide resources and connections to organizations that can give items a second chance."
        }
      ]
    },
    {
      category: "Account & Technical",
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account anytime from your settings page. Keep in mind that this will remove all your listings and purchase history. Consider downloading your data first if you need it for records."
        },
        {
          question: "The app is running slowly. What can I do?",
          answer: "Try refreshing your browser, clearing your cache, or using a different browser. Make sure you have a stable internet connection. If problems persist, contact our support team with details about your device and browser."
        },
        {
          question: "How do I report inappropriate content or users?",
          answer: "Use the report button on any listing or user profile that violates our community guidelines. Our moderation team reviews all reports promptly and takes appropriate action to maintain a safe, friendly marketplace."
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about EcoFinds. Can't find what you're looking for? 
            We're here to help!
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.questions.map((item, index) => {
                    const itemIndex = categoryIndex * 100 + index; // Unique index
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <div key={index}>
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900 pr-4">
                              {item.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="max-w-sm mx-auto">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">
                  Try different keywords or browse all categories above.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-green-50 rounded-lg p-8 border border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-green-700 mb-6 max-w-2xl mx-auto">
              Our friendly support team is here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
            <Link
              to="/support"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;