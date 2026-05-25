import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/cartSlice';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/products/${slug}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++){
      dispatch(cartActions.addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
      }));
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Shop
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images */}
        <div className="w-full lg:w-1/2 flex gap-4">
          <div className="flex flex-col gap-4 w-20 shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-xl cursor-pointer border-2 border-transparent hover:border-primary transition-colors flex items-center justify-center overflow-hidden">
                 <img 
                   src={`https://loremflickr.com/100/100/${encodeURIComponent(product.name.split(' ').pop())}?lock=${product.id.charCodeAt(0) + product.id.charCodeAt(1) + i}`}
                   alt={`Thumbnail ${i}`} 
                   loading="lazy"
                   className="w-full h-full object-cover" 
                 />
              </div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-gray-100 rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden"
          >
             <img 
               src={`https://loremflickr.com/800/800/${encodeURIComponent(product.name.split(' ').pop())}?lock=${product.id.charCodeAt(0) + product.id.charCodeAt(1)}`}
               alt={product.name} 
               loading="lazy"
               className="absolute inset-0 w-full h-full object-cover" 
             />
          </motion.div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <p className="text-sm text-primary font-bold tracking-widest uppercase mb-2">{product.category?.name}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} className="text-gray-300" />
            </div>
            <span className="text-gray-500 text-sm">(128 Reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-black text-gray-900">${product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.price}</span>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-sm">
                  Save ${(product.price - product.discountPrice).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white font-bold text-lg rounded-2xl py-4 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
            >
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Free Delivery</h4>
                <p className="text-xs text-gray-500">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">1 Year Warranty</h4>
                <p className="text-xs text-gray-500">100% Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
