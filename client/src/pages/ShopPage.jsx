import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Grid, List as ListIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/cartSlice';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  
  const dispatch = useDispatch();

  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';
  const currentSearch = searchParams.get('search') || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/products/categories/all');
        setCategories(res.data.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5001/api/products?limit=50`;
        if (currentCategory) url += `&category=${currentCategory}`;
        if (currentSort) url += `&sort=${currentSort}`;
        if (currentSearch) url += `&search=${currentSearch}`;
        
        const res = await axios.get(url);
        setProducts(res.data.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentCategory, currentSort, currentSearch]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const addToCart = (product) => {
    dispatch(cartActions.addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Filter size={20} className="text-primary" />
            <h3 className="font-bold text-lg">Filters</h3>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-3 text-gray-900">Categories</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              <button 
                onClick={() => handleFilterChange('category', '')}
                className={`block w-full text-left text-sm py-1 transition-colors ${!currentCategory ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => handleFilterChange('category', cat.slug)}
                  className={`block w-full text-left text-sm py-1 transition-colors ${currentCategory === cat.slug ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentCategory ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) : 'All Products'}
            <span className="text-sm font-normal text-gray-500 ml-2">({products.length} items)</span>
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}><Grid size={18} /></button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-md ${view === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}><ListIcon size={18} /></button>
            </div>
            
            <div className="relative">
              <select 
                value={currentSort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
              >
                <option value="">Sort by: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-80"></div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {products.map((product, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={product.id}
                className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 relative ${view === 'list' ? 'flex gap-6' : ''}`}
              >
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    SALE
                  </div>
                )}
                
                <Link to={`/product/${product.slug}`} className={`block relative overflow-hidden rounded-xl bg-gray-50 ${view === 'list' ? 'w-48 h-48 shrink-0' : 'aspect-square mb-4'}`}>
                  <img 
                    src={`https://loremflickr.com/400/400/${encodeURIComponent(product.name.split(' ').pop())}?lock=${product.id.charCodeAt(0) + product.id.charCodeAt(1)}`}
                    alt={product.name} 
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                
                <div className={`flex flex-col justify-between ${view === 'list' ? 'flex-1 py-2' : ''}`}>
                  <div>
                    <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">{product.category?.name}</p>
                    <Link to={`/product/${product.slug}`} className="font-semibold text-gray-800 line-clamp-2 hover:text-primary transition-colors text-lg mb-2">
                      {product.name}
                    </Link>
                    {view === 'list' && <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>}
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">${product.discountPrice || product.price}</span>
                      {product.discountPrice && (
                        <span className="text-sm text-gray-400 line-through">${product.price}</span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-primary/10 text-primary font-semibold py-2.5 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
