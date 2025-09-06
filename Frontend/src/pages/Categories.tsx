import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

const Categories: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Filter products based on category and search
  const filteredProducts = state.products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const categoryTitle = selectedCategory || 'All Categories';
  const categoryEmojis: { [key: string]: string } = {
    'Clothes': '👕',
    'Electronics': '📱',
    'Books': '📚',
    'Home & Garden': '🏠',
    'Sports': '⚽',
    'Toys': '🧸',
    'Other': '📦'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">{categoryEmojis[selectedCategory] || '🛍️'}</span>
            <h1 className="text-3xl font-bold text-gray-900">
              {categoryTitle}
            </h1>
          </div>
          <p className="text-gray-600">
            Discover sustainable treasures in {selectedCategory ? 'this category' : 'all our categories'}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search in this category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-6">
              <CategoryFilter
                categories={state.categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Price Range Filter */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="radio" id="under-25" name="price" className="mr-2" />
                    <label htmlFor="under-25" className="text-sm text-gray-700">Under $25</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="25-50" name="price" className="mr-2" />
                    <label htmlFor="25-50" className="text-sm text-gray-700">$25 - $50</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="50-100" name="price" className="mr-2" />
                    <label htmlFor="50-100" className="text-sm text-gray-700">$50 - $100</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="over-100" name="price" className="mr-2" />
                    <label htmlFor="over-100" className="text-sm text-gray-700">Over $100</label>
                  </div>
                </div>
              </div>

              {/* Condition Filter */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Condition</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="excellent" className="mr-2" />
                    <label htmlFor="excellent" className="text-sm text-gray-700">Excellent</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="good" className="mr-2" />
                    <label htmlFor="good" className="text-sm text-gray-700">Good</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="fair" className="mr-2" />
                    <label htmlFor="fair" className="text-sm text-gray-700">Fair</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-bold text-green-600">${product.price}</span>
                              <span className="text-sm text-gray-500">{product.category}</span>
                            </div>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-sm mx-auto">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">
                    No items match your current filters. Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;