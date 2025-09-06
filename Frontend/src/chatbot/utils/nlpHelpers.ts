export interface KeywordMatch {
  type: 'docs' | 'products';
  confidence: number;
  extractedParams?: any;
}

export const extractPriceRange = (query: string): { maxPrice?: number; minPrice?: number } => {
  const pricePatterns = [
    /under ₹?(\d+)/i,
    /below ₹?(\d+)/i,
    /less than ₹?(\d+)/i,
    /maximum ₹?(\d+)/i,
    /max ₹?(\d+)/i,
    /up to ₹?(\d+)/i
  ];
  
  const minPricePatterns = [
    /above ₹?(\d+)/i,
    /over ₹?(\d+)/i,
    /more than ₹?(\d+)/i,
    /minimum ₹?(\d+)/i,
    /min ₹?(\d+)/i,
    /from ₹?(\d+)/i
  ];
  
  const rangePattern = /₹?(\d+)[-\s]?to[-\s]?₹?(\d+)/i;
  
  let maxPrice: number | undefined;
  let minPrice: number | undefined;
  
  // Check for price range
  const rangeMatch = query.match(rangePattern);
  if (rangeMatch) {
    minPrice = parseInt(rangeMatch[1]);
    maxPrice = parseInt(rangeMatch[2]);
    return { minPrice, maxPrice };
  }
  
  // Check for maximum price
  for (const pattern of pricePatterns) {
    const match = query.match(pattern);
    if (match) {
      maxPrice = parseInt(match[1]);
      break;
    }
  }
  
  // Check for minimum price
  for (const pattern of minPricePatterns) {
    const match = query.match(pattern);
    if (match) {
      minPrice = parseInt(match[1]);
      break;
    }
  }
  
  return { maxPrice, minPrice };
};

export const extractCategory = (query: string): string | undefined => {
  const categories = [
    'electronics', 'fashion', 'furniture', 'books', 'sports', 
    'home', 'garden', 'art', 'collectibles', 'toys', 'music',
    'instruments', 'clothes', 'clothing', 'shoes', 'accessories'
  ];
  
  const queryLower = query.toLowerCase();
  
  for (const category of categories) {
    if (queryLower.includes(category)) {
      // Map some aliases to proper categories
      if (category === 'clothes' || category === 'clothing') return 'Fashion';
      if (category === 'shoes' || category === 'accessories') return 'Fashion';
      
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }
  
  return undefined;
};

export const extractSearchTerms = (query: string): string | undefined => {
  // Remove common question words and extract meaningful terms
  const stopWords = ['show', 'me', 'find', 'search', 'for', 'get', 'want', 'need', 'looking', 'i', 'am', 'a', 'an', 'the'];
  const words = query.toLowerCase().split(/\s+/).filter(word => 
    !stopWords.includes(word) && 
    word.length > 2 && 
    !/^₹?\d+$/.test(word) && // Remove price numbers
    !['under', 'above', 'below', 'over', 'max', 'min', 'maximum', 'minimum'].includes(word)
  );
  
  return words.length > 0 ? words.join(' ') : undefined;
};

export const detectIntent = (query: string): KeywordMatch => {
  const queryLower = query.toLowerCase();
  
  // Product-related keywords
  const productKeywords = [
    'buy', 'purchase', 'find', 'search', 'show', 'get', 'want', 'need',
    'cheap', 'expensive', 'price', 'cost', 'under', 'above', 'below',
    'electronics', 'fashion', 'furniture', 'books', 'sports', 'table',
    'phone', 'laptop', 'chair', 'sofa', 'clothes', 'shoes', 'bag'
  ];
  
  // Documentation keywords
  const docKeywords = [
    'how', 'what', 'why', 'when', 'where', 'help', 'about', 'mission',
    'sustainable', 'ecofinds', 'platform', 'sell', 'listing', 'account',
    'return', 'policy', 'quality', 'rating', 'community', 'guidelines',
    'circular economy', 'environment', 'carbon', 'waste', 'recycle'
  ];
  
  let productScore = 0;
  let docScore = 0;
  
  // Count matches for product keywords
  productKeywords.forEach(keyword => {
    if (queryLower.includes(keyword)) {
      productScore += keyword.length > 4 ? 2 : 1;
    }
  });
  
  // Count matches for doc keywords
  docKeywords.forEach(keyword => {
    if (queryLower.includes(keyword)) {
      docScore += keyword.length > 4 ? 2 : 1;
    }
  });
  
  // Extract parameters for product searches
  const extractedParams = {
    ...extractPriceRange(query),
    category: extractCategory(query),
    search: extractSearchTerms(query)
  };
  
  // Determine intent based on scores and context
  if (productScore > docScore && (extractedParams.category || extractedParams.search || extractedParams.maxPrice)) {
    return {
      type: 'products',
      confidence: Math.min(productScore / (productScore + docScore), 0.95),
      extractedParams
    };
  } else {
    return {
      type: 'docs',
      confidence: Math.min(docScore / (productScore + docScore + 1), 0.95)
    };
  }
};

export const similarity = (a: string, b: string): number => {
  const aWords = a.toLowerCase().split(/\s+/);
  const bWords = b.toLowerCase().split(/\s+/);
  
  let matches = 0;
  aWords.forEach(word => {
    if (bWords.some(bWord => bWord.includes(word) || word.includes(bWord))) {
      matches++;
    }
  });
  
  return matches / Math.max(aWords.length, bWords.length);
};