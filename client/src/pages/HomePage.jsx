import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../utils/mockData';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get('http://localhost:5001/api/products/categories/all'),
          axios.get('http://localhost:5001/api/products?limit=8&sort=price_desc')
        ]);
        setCategories(catRes.data.data || MOCK_CATEGORIES);
        setTrending(prodRes.data.data || MOCK_PRODUCTS);
      } catch (error) {
        console.error('Error fetching home data, falling back to mock data', error);
        setCategories(MOCK_CATEGORIES);
        setTrending(MOCK_PRODUCTS);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-primary via-purple-800 to-darkBg flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Next-Gen <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Shopping</span> Experience
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-lg">
              Discover millions of products with premium quality, unbeatable prices, and lightning-fast delivery.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Explore Now <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="glass rounded-2xl p-6 flex gap-6 overflow-x-auto snap-x scrollbar-hide py-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 min-w-[100px] snap-center group"
            >
              <Link 
                to={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center gap-3 w-full"
              >
              <div className="w-20 h-20 rounded-full bg-gray-100 p-1 group-hover:ring-4 ring-secondary transition-all overflow-hidden shadow-md">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary rounded-full" />
                )}
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors text-center">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <p className="text-gray-500 mt-2">Top picks hand-curated for you</p>
          </div>
          <Link to="/shop" className="text-primary font-medium hover:underline flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trending.map((product, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={product.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow group border border-gray-100 relative overflow-hidden"
            >
              {product.discountPrice && (
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                  SALE
                </div>
              )}
              <Link to={`/product/${product.slug}`} className="block relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                <img 
                  src={product.image || product.images?.[0]?.url || `https://loremflickr.com/400/400/${encodeURIComponent(product.name.split(' ').pop())}?lock=${product.id.charCodeAt(0) + product.id.charCodeAt(1)}`}
                  alt={product.name} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div>
                <p className="text-xs text-gray-500 mb-1">{product.category?.name}</p>
                <Link to={`/product/${product.slug}`} className="font-semibold text-gray-800 line-clamp-2 hover:text-primary transition-colors h-10 mb-2">
                  {product.name}
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">${product.discountPrice || product.price}</span>
                  {product.discountPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.price}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
