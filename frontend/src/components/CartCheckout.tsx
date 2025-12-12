import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { CartItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartCheckoutProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onBack: () => void;
  onPlaceOrder: (paymentMethod: string) => void;
  onNavigateToAccount: () => void;
}

export function CartCheckout({ cartItems, onUpdateQuantity, onBack, onPlaceOrder, onNavigateToAccount }: CartCheckoutProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    address: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setCheckoutStep('confirmation');
    setTimeout(() => {
      onPlaceOrder(paymentMethod);
    }, 2000);
  };

  if (checkoutStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-r from-[#4DDAD9] to-[#5743E9] p-12 rounded-lg text-center max-w-md w-full shadow-xl">
          <CheckCircle className="w-20 h-20 text-white mx-auto mb-6" />
          <h2 className="text-white mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Order Placed Successfully!
          </h2>
          <p className="text-white mb-8" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
            Your order has been confirmed and a receipt has been sent to your email.
          </p>
          <button
            onClick={onNavigateToAccount}
            className="bg-white text-[#5743E9] px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            View Order Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-[#5743E9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${checkoutStep === 'cart' ? 'text-[#5743E9]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                checkoutStep === 'cart' ? 'bg-[#5743E9] text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span>Cart</span>
            </div>
            <div className="w-16 h-1 bg-gray-200" />
            <div className={`flex items-center gap-2 ${checkoutStep === 'payment' ? 'text-[#5743E9]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                checkoutStep === 'payment' ? 'bg-[#5743E9] text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {checkoutStep === 'cart' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-[#5743E9] text-white px-6 py-3 rounded-t-lg">
                <h2 className="text-white">Shopping Cart ({cartItems.length} items)</h2>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-b-lg p-12 text-center" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
                  <p className="text-gray-500 text-xl mb-4">Your cart is empty</p>
                  <button
                    onClick={onBack}
                    className="bg-[#5743E9] text-white px-6 py-3 rounded-lg hover:bg-[#6853f0] transition-all duration-300"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-b-lg divide-y" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
                  {cartItems.map(item => (
                    <div key={item.product.id} className="p-6 flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-2">{item.product.name}</h3>
                        <p className="text-gray-600 mb-3">${item.product.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 bg-[#5743E9] text-white rounded hover:bg-[#6853f0] transition-all duration-300"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="p-1 bg-[#5743E9] text-white rounded hover:bg-[#6853f0] transition-all duration-300 disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 0)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-[#5743E9] to-[#5251D7] text-white px-6 py-3 rounded-t-lg">
                <h3 className="text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>Order Summary</h3>
              </div>
              <div className="bg-white rounded-b-lg p-6 space-y-4" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setCheckoutStep('payment')}
                  disabled={cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-[#5743E9] to-[#5251D7] text-white py-4 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Payment Method Selection */}
            <div className="mb-8">
              <div className="bg-[#5743E9] text-white px-6 py-3 rounded-t-lg">
                <h2 className="text-white">Select Payment Method</h2>
              </div>
              <div className="bg-white rounded-b-lg p-6" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { value: 'card', label: 'Credit Card', icon: CreditCard },
                    { value: 'paypal', label: 'PayPal', icon: Lock },
                    { value: 'crypto', label: 'Crypto', icon: Lock },
                  ].map(method => (
                    <button
                      key={method.value}
                      onClick={() => setPaymentMethod(method.value as any)}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all duration-300 ${
                        paymentMethod === method.value
                          ? 'border-[#5743E9] bg-[#5743E9]/5'
                          : 'border-gray-200 hover:border-[#5743E9]/50'
                      }`}
                    >
                      <method.icon className={`w-6 h-6 ${paymentMethod === method.value ? 'text-[#5743E9]' : 'text-gray-400'}`} />
                      <span className={paymentMethod === method.value ? 'text-[#5743E9]' : 'text-gray-600'}>
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5743E9]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={e => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5743E9]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5743E9]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={e => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5743E9]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Billing Information */}
            <div className="mb-8">
              <div className="bg-[#5743E9] text-white px-6 py-3 rounded-t-lg">
                <h3 className="text-white">Billing Information</h3>
              </div>
              <div className="bg-white rounded-b-lg p-6 space-y-4" style={{ boxShadow: '0 4px 12px rgba(87, 67, 233, 0.15)' }}>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5743E9]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Shipping Address</label>
                  <textarea
                    placeholder="123 Main St, City, State, ZIP"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5743E9]"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary & Place Order */}
            <div className="bg-gradient-to-r from-[#4DDAD9] to-[#5743E9] rounded-lg p-6 text-white shadow-xl">
              <div className="flex justify-between mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                <span className="text-white">Order Total:</span>
                <span className="text-white text-2xl">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-white text-[#5743E9] py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Place Secure Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
