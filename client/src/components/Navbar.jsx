import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { totalQuantity } = useSelector(state => state.cart);

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button className="p-2 lg:hidden">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold text-gradient">
              GolBeKARTT
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for products, brands and more"
                className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/shop" className="hidden sm:block font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <User size={20} />
              <span className="hidden sm:block font-medium">Login</span>
            </button>
            <Link to="/cart" className="relative p-2 hover:text-primary transition-colors group">
              <ShoppingCart size={24} />
              {totalQuantity > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:bg-primary transition-colors"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
