import { ArrowLeft, ShoppingCart, Package, Heart, User, Bell, Settings, TrendingUp } from 'lucide-react';
import { Order, Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserAccountProps {
  orders: Order[];
  wishlist: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onNavigateToCart: () => void;
  cartItemCount: number;
}

export function UserAccount({ orders, wishlist, onBack, onProductClick, onNavigateToCart, cartItemCount }: UserAccountProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

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
              <span>Back to Home</span>
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

      {/* Hero Section */}
      <div 
        className="bg-gradient-to-r from-[#5743E9] to-[#5251D7] text-white py-12 px-4"
        style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-white mb-2">Welcome Back, Customer!</h1>
              <p className="text-white">Manage your orders, wishlist, and account settings</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-all duration-300">
              <Bell className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Notifications</p>
            </button>
            <button className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-all duration-300">
              <Settings className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Settings</p>
            </button>
            <button className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-all duration-300">
              <Heart className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Wishlist ({wishlist.length})</p>
            </button>
            <button className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-all duration-300">
              <Package className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Orders ({orders.length})</p>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Analytics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#4DDAD9] to-[#5743E9] p-6 rounded-lg text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-white" />
              <span className="text-white text-2xl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                ${totalSpent.toFixed(2)}
              </span>
            </div>
            <p className="text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Total Spent</p>
          </div>

          <div className="bg-gradient-to-r from-[#5251D7] to-[#4DDAD9] p-6 rounded-lg text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-white" />
              <span className="text-white text-2xl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                {totalOrders}
              </span>
            </div>
            <p className="text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Total Orders</p>
          </div>

          <div className="bg-gradient-to-r from-[#5743E9] to-[#5251D7] p-6 rounded-lg text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-white" />
              <span className="text-white text-2xl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                ${averageOrderValue.toFixed(2)}
              </span>
            </div>
            <p className="text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Avg Order Value</p>
          </div>
        </div>

        {/* Order History */}
        <div className="mb-8">
          <div className="bg-[#5743E9] text-white px-6 py-3 rounded-t-lg">
            <h2 className="text-white">Order History</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-b-lg p-12 text-center" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl mb-2">No orders yet</p>
              <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
              <button
                onClick={onBack}
                className="bg-[#5743E9] text-white px-6 py-3 rounded-lg hover:bg-[#6853f0] transition-all duration-300"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-b-lg divide-y" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
              {orders.map(order => (
                <div key={order.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">Order {order.id}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="text-gray-900 mt-2">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="text-gray-900">{order.trackingNumber}</p>
                  </div>

                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-900">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 bg-[#5743E9] text-white py-2 rounded-lg hover:bg-[#6853f0] transition-all duration-300">
                      Track Order
                    </button>
                    <button className="flex-1 bg-[#4DDAD9] text-white py-2 rounded-lg hover:opacity-90 transition-all duration-300">
                      Download Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wishlist */}
        <div>
          <div className="bg-gradient-to-r from-[#5251D7] to-[#4DDAD9] text-white px-6 py-3 rounded-t-lg">
            <h2 className="text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
              My Wishlist ({wishlist.length})
            </h2>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white rounded-b-lg p-12 text-center" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl mb-2">Your wishlist is empty</p>
              <p className="text-gray-400 mb-6">Save your favorite items for later</p>
              <button
                onClick={onBack}
                className="bg-[#5743E9] text-white px-6 py-3 rounded-lg hover:bg-[#6853f0] transition-all duration-300"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-b-lg grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
              {wishlist.map(product => (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-900 mb-3">${product.price.toFixed(2)}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onProductClick(product);
                      }}
                      className="w-full bg-[#5743E9] text-white py-2 rounded-lg hover:bg-[#6853f0] transition-all duration-300"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
