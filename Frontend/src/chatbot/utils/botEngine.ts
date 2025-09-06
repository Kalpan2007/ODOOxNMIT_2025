import { detectIntent, similarity } from './nlpHelpers';
import { searchProducts, Product } from '../services/productApi';
import { ContentFilter } from './contentFilter';

// Import JSON data
import faqData from '../data/faq.json';
import ecoTipsData from '../data/eco_tips.json';
import platformData from '../data/platform.json';
import extendedData from '../data/extended_knowledge.json';

export interface BotResponse {
  message: string;
  products?: Product[];
  type: 'text' | 'products' | 'error';
  suggestions?: string[];
}

export class BotEngine {
  private greetings = [
    "Hi there! I'm EcoBuddy 🌱, your sustainable shopping assistant powered by EcoFinds!",
    "Hello! Ready to make some eco-friendly choices today? I'm here to help! 🌍",
    "Hey! I'm here to help you find amazing second-hand treasures! Developed by Dax Patel with love! ♻️",
    "Welcome! I'm EcoBuddy, dedicated to protecting our environment through sustainable shopping! 🌱"
  ];

  private generateGreeting(): string {
    const greeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
    return `${greeting}\n\nI can help you:\n• Find sustainable products 🛍️\n• Learn about eco-friendly living 🌱\n• Get platform info & FAQs 💚\n\nWhat would you like to explore?`;
  }

  private searchDocs(query: string): BotResponse {
    const allDocs = [
      ...faqData.faqs.map(item => ({ ...item, source: 'faq' })),
      ...ecoTipsData.tips.map(item => ({ ...item, source: 'tips', question: item.title, answer: item.content })),
      ...platformData.platform.map(item => ({ ...item, source: 'platform', question: item.title, answer: item.content })),
      ...extendedData.general_qa.map(item => ({ ...item, source: 'general' })),
      ...extendedData.creator_info.map(item => ({ ...item, source: 'creator' }))
    ];

    const matches = allDocs
      .map(doc => ({
        ...doc,
        relevance: this.calculateRelevance(query, doc)
      }))
      .filter(doc => doc.relevance > 0.1)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3);

    if (matches.length === 0) {
      const randomResponse = extendedData.no_answer_responses[
        Math.floor(Math.random() * extendedData.no_answer_responses.length)
      ];
      
      return {
        message: randomResponse,
        type: 'text',
        suggestions: ['How to sell items?', 'Who created you?', 'Find electronics under 5000', 'Eco-friendly tips']
      };
    }

    let response = "🌱 Here's what I found:\n\n";
    matches.forEach((match, index) => {
      const emoji = match.source === 'faq' ? '❓' : match.source === 'tips' ? '💡' : '🏪';
      response += `${emoji} **${match.question || match.title}**\n${match.answer}\n\n`;
    });

    response += "Is there anything else you'd like to know? I'm here to help! 😊";

    const suggestions = this.generateSuggestions(query);
    
    return {
      message: response.trim(),
      type: 'text',
      suggestions
    };
  }

  private calculateRelevance(query: string, doc: any): number {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Check title/question
    if (doc.question) {
      score += similarity(queryLower, doc.question.toLowerCase()) * 3;
    }
    if (doc.title) {
      score += similarity(queryLower, doc.title.toLowerCase()) * 3;
    }

    // Check answer/content
    if (doc.answer) {
      score += similarity(queryLower, doc.answer.toLowerCase()) * 2;
    }
    if (doc.content) {
      score += similarity(queryLower, doc.content.toLowerCase()) * 2;
    }

    // Check keywords
    if (doc.keywords) {
      doc.keywords.forEach((keyword: string) => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 2;
        }
      });
    }

    return score;
  }

  private async searchProducts(query: string, params: any): Promise<BotResponse> {
    try {
      const products = await searchProducts({
        search: params.search,
        category: params.category,
        maxPrice: params.maxPrice,
        minPrice: params.minPrice,
        limit: 3
      });

      if (products.length === 0) {
        return {
          message: "🔍 I couldn't find any products matching your criteria. Try adjusting your search or explore our categories:\n\n• Electronics 📱\n• Fashion 👕\n• Furniture 🪑\n• Books 📚\n• Sports ⚽\n• Home & Garden 🏠",
          type: 'text',
          suggestions: ['Show me electronics', 'Find furniture under 5000', 'Browse fashion items']
        };
      }

      let message = `🛍️ Great! I found ${products.length} eco-friendly product${products.length > 1 ? 's' : ''} for you:\n\n`;
      
      return {
        message,
        products,
        type: 'products',
        suggestions: ['Show more products', 'Different category', 'Eco tips']
      };

    } catch (error) {
      return {
        message: "🔧 Oops! I'm having trouble accessing our product database right now. Please try again in a moment, or ask me about sustainability tips and platform info instead! 🌱",
        type: 'error',
        suggestions: ['Try again', 'Eco tips', 'Platform info']
      };
    }
  }

  private generateSuggestions(query: string): string[] {
    const suggestions = [
      'How to sell on EcoFinds?',
      'Find electronics under 10000',
      'Why choose sustainable shopping?',
      'Show me furniture',
      'Eco-friendly tips',
      'Platform features'
    ];

    // Return 3 random suggestions
    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  public async processQuery(query: string): Promise<BotResponse> {
    // Add realistic thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    const trimmedQuery = query.trim().toLowerCase();
    
    // Check for inappropriate content
    const contentCheck = ContentFilter.checkContent(query);
    if (contentCheck.isInappropriate) {
      return {
        message: contentCheck.warningMessage!,
        type: 'text',
        suggestions: ['Find sustainable products', 'Eco-friendly tips', 'About EcoFinds']
      };
    }

    // Handle greetings
    if (this.isGreeting(trimmedQuery)) {
      return {
        message: this.generateGreeting(),
        type: 'text',
        suggestions: ['Find products', 'Eco tips', 'Platform info']
      };
    }

    // Handle thanks
    if (this.isThanking(trimmedQuery)) {
      const thankResponses = [
        "🌱 You're welcome! I'm happy to help you make sustainable choices. Feel free to ask me anything else! Every second-hand purchase makes a difference for our planet! 🌍💚",
        "💚 My pleasure! That's what I'm here for - helping you discover amazing eco-friendly products and tips! Powered by EcoFinds, developed by Dax Patel! 🌱",
        "🌍 You're so welcome! I love helping people make environmentally conscious choices. Together we're building a more sustainable future! 🌱",
        "🌱 Anytime! I'm dedicated to helping you find the best second-hand treasures while protecting our environment. What else can I help you with? 💚"
      ];
      
      const randomThankResponse = thankResponses[Math.floor(Math.random() * thankResponses.length)];
      
      return {
        message: randomThankResponse,
        type: 'text',
        suggestions: ['Find more products', 'Sustainability tips', 'Who created you?', 'How EcoFinds works']
      };
    }

    // Detect intent
    const intent = detectIntent(query);
    
    if (intent.type === 'products' && intent.extractedParams) {
      return await this.searchProducts(query, intent.extractedParams);
    } else {
      return this.searchDocs(query);
    }
  }

  private isGreeting(query: string): boolean {
    const greetingWords = ['hi', 'hello', 'hey', 'start', 'begin', 'help me'];
    return greetingWords.some(word => query.includes(word)) && query.length < 20;
  }

  private isThanking(query: string): boolean {
    const thankWords = ['thank', 'thanks', 'appreciate', 'grateful'];
    return thankWords.some(word => query.includes(word));
  }
}