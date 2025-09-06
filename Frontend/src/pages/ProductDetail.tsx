import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch, loadProducts, addProductToCart } = useApp();
  const dataLoaded = useRef(false);

  useEffect(() => {
    if (state.user && !dataLoaded.current) {
      dataLoaded.current = true;
      loadProducts();
    }
  }, [state.user]);

  const product = Array.isArray(state.products) ? state.products.find(p => p._id === id) : null;

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/feed')}
            className="text-green-600 hover:text-green-700"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (state.user) {
      try {
        await addProductToCart(product._id, 1);
        // Show success message (could use toast notification)
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    }
  };

  const isOwn = state.user?._id === product.userId;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1 lg:aspect-none lg:h-96 xl:h-[500px]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-6 lg:p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>
                <p className="text-4xl font-bold text-green-600 mb-6">
                  ${product.price}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">{product.sellerName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">
                    Listed {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {state.user && !isOwn ? (
                  <>
                    <button
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                    <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Contact Seller
                    </button>
                  </>
                ) : isOwn ? (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-center">This is your listing</p>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-center">
                      Please <button 
                        onClick={() => navigate('/login')}
                        className="text-green-600 hover:text-green-700 underline"
                      >
                        log in
                      </button> to purchase this item
                    </p>
                  </div>
                )}
              </div>

              {/* Product Features */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Pre-Loved?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-green-500" />
                    <span>Save money</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-green-500" />
                    <span>Reduce waste</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-green-500" />
                    <span>Unique finds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-green-500" />
                    <span>Eco-friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products (could be implemented later) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {state.products
              .filter(p => p.category === product.category && p._id !== product._id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{relatedProduct.title}</h3>
                    <p className="text-green-600 font-bold">${relatedProduct.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;