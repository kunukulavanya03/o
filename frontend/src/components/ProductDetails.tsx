import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus, Package, Shield, Truck } from 'lucide-react';
import { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigateToCart: () => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  cartItemCount: number;
}

const MOCK_REVIEWS = [
  {
    id: '1',
    author: 'John D.',
    rating: 5,
    date: '2025-12-05',
    comment: 'Excellent product! Exceeded my expectations in every way.',
  },
  {
    id: '2',
    author: 'Sarah M.',
    rating: 4,
    date: '2025-12-01',
    comment: 'Great quality and fast shipping. Very satisfied with my purchase.',
  },
  {
    id: '3',
    author: 'Mike R.',
    rating: 5,
    date: '2025-11-28',
    comment: 'Best purchase I\'ve made this year. Highly recommended!',
  },
];

export function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onNavigateToCart,
  onToggleWishlist,
  isInWishlist,
  cartItemCount,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 hover:text-[#5743E9] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Products</span>
            </button>

            <button
              onClick={onNavigateToCart}
              className="relative p-2 bg-[#5743E9] text-white rounded-lg hover:bg-[#6853f0] transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4DDAD9] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-white" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-gray-900 flex-1">{product.name}</h1>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#4DDAD9] text-[#4DDAD9]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-700">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              <div className="text-gray-900 mb-2">${product.price.toFixed(2)}</div>
              <div className="text-sm text-gray-600">
                <span className={product.stock < 50 ? 'text-orange-600' : 'text-green-600'}>
                  {product.stock} units in stock
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#4DDAD9] to-[#5743E9] p-6 rounded-lg">
              <p className="text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-gray-700">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white rounded-lg p-2" style={{ boxShadow: '0 2px 8px rgba(87, 67, 233, 0.1)' }}>
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 bg-[#5743E9] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6853f0] transition-all duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-2 bg-[#5743E9] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6853f0] transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-[#5743E9] to-[#5251D7] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 shadow-lg"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={onNavigateToCart}
                className="bg-[#4DDAD9] text-white px-6 py-4 rounded-lg hover:opacity-90 transition-all duration-300"
              >
                Go to Cart
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg" style={{ boxShadow: '0 2px 8px rgba(87, 67, 233, 0.1)' }}>
                <Truck className="w-6 h-6 text-[#5743E9] mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg" style={{ boxShadow: '0 2px 8px rgba(87, 67, 233, 0.1)' }}>
                <Shield className="w-6 h-6 text-[#5743E9] mx-auto mb-2" />
                <p className="text-sm text-gray-600">2 Year Warranty</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg" style={{ boxShadow: '0 2px 8px rgba(87, 67, 233, 0.1)' }}>
                <Package className="w-6 h-6 text-[#5743E9] mx-auto mb-2" />
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="bg-[#5743E9] text-white px-6 py-3 rounded-t-lg">
            <h2 className="text-white">Customer Reviews</h2>
          </div>
          <div className="bg-white rounded-b-lg p-6 space-y-6" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
            {MOCK_REVIEWS.map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900">{review.author}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-[#4DDAD9] text-[#4DDAD9]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
