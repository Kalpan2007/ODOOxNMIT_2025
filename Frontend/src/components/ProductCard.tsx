import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Edit, Trash2, User } from 'lucide-react';
import { Product } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showActions = false, 
  onEdit, 
  onDelete 
}) => {
  const { state, dispatch } = useApp();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.user) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) onEdit(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(product.id);
  };

  const isOwn = state.user?.id === product.sellerId;

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group-hover:scale-[1.02] transform transition-transform">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 h-48 overflow-hidden bg-gray-200">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Seller Info */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <User className="h-4 w-4 mr-1" />
            <span>{product.sellerName}</span>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-600">
                ${product.price}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {showActions && isOwn ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit Product"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              ) : (
                state.user && !isOwn && (
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm">Add</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;