import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProductDetails } from './components/ProductDetails';
import { CartCheckout } from './components/CartCheckout';
import { UserAccount } from './components/UserAccount';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  category: string;
  description: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'product' | 'cart' | 'account'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handlePlaceOrder = (paymentMethod: string) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'processing',
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setCurrentScreen('account');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'home' && (
        <HomePage
          onProductClick={handleProductClick}
          onNavigateToCart={() => setCurrentScreen('cart')}
          onNavigateToAccount={() => setCurrentScreen('account')}
          cartItemCount={cart.length}
        />
      )}
      {currentScreen === 'product' && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setCurrentScreen('home')}
          onAddToCart={handleAddToCart}
          onNavigateToCart={() => setCurrentScreen('cart')}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlist.some(p => p.id === selectedProduct.id)}
          cartItemCount={cart.length}
        />
      )}
      {currentScreen === 'cart' && (
        <CartCheckout
          cartItems={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onBack={() => setCurrentScreen('home')}
          onPlaceOrder={handlePlaceOrder}
          onNavigateToAccount={() => setCurrentScreen('account')}
        />
      )}
      {currentScreen === 'account' && (
        <UserAccount
          orders={orders}
          wishlist={wishlist}
          onBack={() => setCurrentScreen('home')}
          onProductClick={handleProductClick}
          onNavigateToCart={() => setCurrentScreen('cart')}
          cartItemCount={cart.length}
        />
      )}
    </div>
  );
}
