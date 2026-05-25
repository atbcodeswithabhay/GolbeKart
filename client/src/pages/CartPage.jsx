import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../redux/cartSlice';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleAdd = (item) => {
    dispatch(cartActions.addToCart({
      id: item.id,
      name: item.name,
      price: item.price
    }));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-8">
          <ShoppingCart size={64} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Discover something amazing in our shop!</p>
        <Link to="/shop" className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {items.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.id} 
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 items-center"
                >
                  <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl shrink-0 border border-gray-200 overflow-hidden">
                      <img 
                        src={`https://loremflickr.com/200/200/${encodeURIComponent(item.name.split(' ').pop())}?lock=${item.id.charCodeAt(0) + item.id.charCodeAt(1)}`}
                        alt={item.name} 
                        loading="lazy"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                      <button 
                        onClick={() => {
                          for(let j=0; j<item.quantity; j++) handleRemove(item.id);
                        }} 
                        className="text-red-500 text-sm mt-2 flex items-center gap-1 hover:underline"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 text-center font-semibold text-gray-600 hidden sm:block">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button onClick={() => handleRemove(item.id)} className="p-2 text-gray-500 hover:text-primary transition-colors"><Minus size={14} /></button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => handleAdd(item)} className="p-2 text-gray-500 hover:text-primary transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 text-right font-bold text-lg text-gray-900">
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Estimate</span>
                <span className="font-semibold">$5.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax Estimate</span>
                <span className="font-semibold">${(totalAmount * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${(totalAmount + 5 + totalAmount * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group">
              Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-4 text-center">
              <Link to="/shop" className="text-primary text-sm font-medium hover:underline">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

