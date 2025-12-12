import { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Filter, Star } from 'lucide-react';
import { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1764557159396-419b85356035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY1Mzg2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 45,
    rating: 4.8,
    reviews: 234,
    category: 'Audio',
    description: 'High-quality wireless headphones with active noise cancellation and premium sound.',
  },
  {
    id: '2',
    name: 'True Wireless Earbuds Pro',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1598371611276-1bc503a270a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NTM0OTI0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 120,
    rating: 4.6,
    reviews: 456,
    category: 'Audio',
    description: 'Compact wireless earbuds with superior sound quality and long battery life.',
  },
  {
    id: '3',
    name: 'Smart Watch Series X',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1669049358893-9a727252b5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwZGV2aWNlfGVufDF8fHx8MTc2NTM0OTI0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 78,
    rating: 4.9,
    reviews: 892,
    category: 'Wearables',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.',
  },
  {
    id: '4',
    name: 'Ultra Slim Laptop Pro',
    price: 1299.99,
    image: 'https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMGRlc2t8ZW58MXx8fHwxNzY1NDM1NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 23,
    rating: 4.7,
    reviews: 567,
    category: 'Computers',
    description: 'Powerful ultrabook with stunning display and all-day battery life.',
  },
  {
    id: '5',
    name: 'Professional Camera Kit',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjUzOTQ1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 34,
    rating: 4.9,
    reviews: 678,
    category: 'Photography',
    description: 'Professional-grade camera with multiple lenses and accessories included.',
  },
  {
    id: '6',
    name: 'Next-Gen Smartphone',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1646718683720-076fd1c0b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwZGV2aWNlfGVufDF8fHx8MTc2NTQ0MTU4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 156,
    rating: 4.8,
    reviews: 1234,
    category: 'Phones',
    description: 'Latest flagship smartphone with cutting-edge features and premium design.',
  },
];

const CATEGORIES = ['All', 'Audio', 'Wearables', 'Computers', 'Photography', 'Phones'];

interface HomePageProps {
  onProductClick: (product: Product) => void;
  onNavigateToCart: () => void;
  onNavigateToAccount: () => void;
  cartItemCount: number;
}

export function HomePage({ onProductClick, onNavigateToCart, onNavigateToAccount, cartItemCount }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = 
      priceFilter === 'all' ? true :
      priceFilter === 'low' ? product.price < 300 :
      priceFilter === 'mid' ? product.price >= 300 && product.price < 700 :
      product.price >= 700;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-white bg-gradient-to-r from-[#5743E9] to-[#5251D7] px-6 py-2 rounded-lg shadow-lg" 
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              TechStore
            </h1>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5743E9]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
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
              <button
                onClick={onNavigateToAccount}
                className="p-2 bg-[#5743E9] text-white rounded-lg hover:bg-[#6853f0] transition-all duration-300"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div 
        className="bg-gradient-to-r from-[#5743E9] to-[#5251D7] text-white py-16 px-4"
        style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-white mb-4">Welcome to Your Premium Tech Store</h2>
          <p className="text-white text-xl mb-6">Discover the latest electronics with unbeatable prices</p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#4DDAD9] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300">
              Shop Now
            </button>
            <button className="bg-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
              View Deals
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="bg-[#5743E9] text-white px-6 py-3 rounded-t-lg">
            <h3 className="text-white">Browse by Category</h3>
          </div>
          <div className="flex flex-wrap gap-3 bg-white p-6 rounded-b-lg shadow-md">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#4DDAD9] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#5743E9]" />
            <span className="text-gray-700">Price Range:</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All Prices' },
              { value: 'low', label: 'Under $300' },
              { value: 'mid', label: '$300 - $700' },
              { value: 'high', label: 'Over $700' },
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setPriceFilter(filter.value as any)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  priceFilter === filter.value
                    ? 'bg-[#4DDAD9] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#5743E9]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ boxShadow: `0 4px 12px rgba(87, 67, 233, 0.15)` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.stock < 50 && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[#5251D7] to-[#4DDAD9] text-white px-3 py-1 rounded-full text-sm">
                    Low Stock
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900 flex-1">{product.name}</h3>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#4DDAD9] text-[#4DDAD9]" />
                    <span className="text-sm text-gray-700">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-900">${product.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{product.stock} in stock</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                    className="bg-[#5743E9] text-white px-4 py-2 rounded-lg hover:bg-[#6853f0] transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
