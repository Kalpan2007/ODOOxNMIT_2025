import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
            selectedCategory === ''
              ? 'bg-green-100 text-green-700 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-green-100 text-green-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;