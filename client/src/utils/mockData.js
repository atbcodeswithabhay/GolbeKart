export const MOCK_CATEGORIES = [
  {
    id: "cat-1",
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "cat-2",
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "cat-3",
    name: "Shoes",
    slug: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "cat-4",
    name: "Smart Gadgets",
    slug: "smart-gadgets",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "cat-5",
    name: "Home Appliances",
    slug: "home-appliances",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "cat-6",
    name: "Furniture",
    slug: "furniture",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "cat-7",
    name: "Beauty",
    slug: "beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "cat-8",
    name: "Gaming",
    slug: "gaming",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=300"
  }
];

export const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Wireless Noise-Canceling Headphones",
    slug: "wireless-noise-canceling-headphones",
    description: "Experience high-fidelity sound and premium active noise canceling with these ultra-comfortable wireless headphones. Features up to 40 hours of battery life and quick charge technology.",
    price: 299.99,
    discountPrice: 249.99,
    stock: 45,
    brand: "AeroSound",
    category: { name: "Electronics", slug: "electronics" },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prod-2",
    name: "Minimalist Leather Watch",
    slug: "minimalist-leather-watch",
    description: "A sleek, minimalist timepiece featuring a genuine Italian leather strap, scratch-resistant mineral glass, and Japanese quartz movement.",
    price: 150.00,
    discountPrice: 119.99,
    stock: 20,
    brand: "ChronoCo",
    category: { name: "Fashion", slug: "fashion" },
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prod-3",
    name: "Ultralight Running Shoes",
    slug: "ultralight-running-shoes",
    description: "Engineered with breathable mesh upper and responsive foam cushioning to give you a light-as-air feel and maximum speed on your runs.",
    price: 129.99,
    discountPrice: 99.99,
    stock: 55,
    brand: "RunMax",
    category: { name: "Shoes", slug: "shoes" },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prod-4",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description: "Keep track of your health and workouts with blood oxygen monitoring, heart-rate tracking, GPS tracking, and a stunning AMOLED touchscreen interface.",
    price: 199.99,
    discountPrice: null,
    stock: 80,
    brand: "FitTech",
    category: { name: "Smart Gadgets", slug: "smart-gadgets" },
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prod-5",
    name: "Retro Style Espresso Machine",
    slug: "retro-style-espresso-machine",
    description: "Bring the cafe experience home with this high-pressure espresso machine. Includes steam wand for milk frothing and easy manual controls.",
    price: 249.99,
    discountPrice: 199.99,
    stock: 12,
    brand: "Breva",
    category: { name: "Home Appliances", slug: "home-appliances" },
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prod-6",
    name: "Nordic Lounge Chair",
    slug: "nordic-lounge-chair",
    description: "An elegant, mid-century modern accent chair featuring premium upholstery and sturdy solid ash wood legs.",
    price: 349.99,
    discountPrice: 299.99,
    stock: 8,
    brand: "NordicDesign",
    category: { name: "Furniture", slug: "furniture" },
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prod-7",
    name: "Organic Hydrating Serum",
    slug: "organic-hydrating-serum",
    description: "Infused with pure hyaluronic acid and natural plant extracts, this lightweight serum locks in moisture for a youthful, glowing skin complexion.",
    price: 45.00,
    discountPrice: 34.99,
    stock: 150,
    brand: "AuraGlow",
    category: { name: "Beauty", slug: "beauty" },
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prod-8",
    name: "Pro Wireless Gaming Controller",
    slug: "pro-wireless-gaming-controller",
    description: "Dominate the game with customizable macro paddles, adjustable trigger sensitivity, and ergonomic textured grips designed for long play sessions.",
    price: 89.99,
    discountPrice: null,
    stock: 40,
    brand: "Nexus",
    category: { name: "Gaming", slug: "gaming" },
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600"
  }
];
