
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Filter, Star, Truck, ArrowRight, Phone, Menu, X, Search, Tag } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PRODUCT_TYPE_LABELS: Record<string, string> = {
  'Balm': 'بلسم',
  'Oil': 'زيوت',
  'Patch': 'لصقات',
  'Cream': 'كريمات',
  'Gel': 'جل',
};

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { addToCart, cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('ecom_products')
        .select('*, variants:ecom_product_variants(*)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const productTypes = ['all', ...new Set(products.map(p => p.product_type).filter(Boolean))];

  const filteredProducts = products.filter(p => {
    const matchesType = selectedType === 'all' || p.product_type === selectedType;
    const matchesSearch = !searchQuery || p.name.includes(searchQuery) || p.description?.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const handleQuickAdd = (product: any) => {
    const price = product.price;
    addToCart({
      product_id: product.id,
      name: product.name,
      sku: product.sku || product.handle,
      price,
      image: product.images?.[0],
    }, 1);
    toast({ title: 'تمت الإضافة للسلة', description: product.name });
  };

  const getOriginalPrice = (product: any) => {
    return product.metadata?.original_price || null;
  };

  const getDiscount = (product: any) => {
    const orig = getOriginalPrice(product);
    if (!orig) return null;
    return Math.round(((orig - product.price) / orig) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass shadow-sm sticky top-0 z-50 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="text-2xl md:text-3xl font-black text-gradient-green">ra7teek</Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-green-700 transition-colors">الرئيسية</Link>
            <Link to="/shop" className="text-green-700 font-bold">المتجر</Link>
            <a href="tel:+212700720490" className="flex items-center gap-1.5 text-green-800 hover:text-green-600">
              <Phone size={14} />
              <span dir="ltr">+212 700 720 490</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/checkout" className="relative p-2 text-green-800 hover:text-green-600">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-green-800">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden glass border-t mt-2 py-3 px-4 space-y-2">
            <Link to="/" className="block py-2 font-medium" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
            <Link to="/shop" className="block py-2 font-bold text-green-700" onClick={() => setMenuOpen(false)}>المتجر</Link>
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <div className="gradient-green text-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-3">متجر ra7teek</h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            منتجات طبيعية 100% لتخفيف آلام الظهر والمفاصل والعضلات
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1.5"><Truck size={16} /> توصيل مجاني</span>
            <span className="flex items-center gap-1.5"><Star size={16} className="fill-yellow-400 text-yellow-400" /> +2000 زبون راضي</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {productTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedType === type
                    ? 'gradient-green text-white shadow-green'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700'
                }`}
              >
                {type === 'all' ? 'الكل' : PRODUCT_TYPE_LABELS[type] || type}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredProducts.length} منتج{filteredProducts.length !== 1 ? 'ات' : ''}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-8 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">ما لقينا حتى منتج</h3>
            <p className="text-gray-400">جرّب تبدّل الفلتر أو البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const discount = getDiscount(product);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50 hover:border-green-100"
                >
                  {/* Image */}
                  <Link to={`/product/${product.handle}`} className="block relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={product.images?.[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {discount && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        -{discount}%
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Truck size={12} />
                      توصيل مجاني
                    </div>
                    {product.product_type && (
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Tag size={10} />
                        {PRODUCT_TYPE_LABELS[product.product_type] || product.product_type}
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <Link to={`/product/${product.handle}`}>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-green-700 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Metadata badges */}
                    {product.metadata?.volume && (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mb-3">
                        {product.metadata.volume}
                      </span>
                    )}
                    {product.metadata?.quantity && (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mb-3 mr-1">
                        {product.metadata.quantity}
                      </span>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-black text-green-700">{(product.price / 100).toFixed(0)}</span>
                      <span className="text-sm text-green-700 font-bold">درهم</span>
                      {getOriginalPrice(product) && (
                        <span className="text-sm line-through text-gray-400">{(getOriginalPrice(product) / 100).toFixed(0)} درهم</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="flex-1 gradient-green text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        أضف للسلة
                      </button>
                      <Link
                        to={`/product/${product.handle}`}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700 transition-all text-sm font-medium"
                      >
                        التفاصيل
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer mini */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-2xl font-black text-gradient-green">ra7teek</span>
          <p className="text-gray-400 text-sm mt-2">منتجات طبيعية مغربية 100% لتخفيف الآلام</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <a href="tel:+212700720490" className="hover:text-green-400 flex items-center gap-1"><Phone size={14} /> <span dir="ltr">+212 700 720 490</span></a>
            <a href="https://wa.me/212700720490" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">واتساب</a>
          </div>
          <p className="text-gray-600 text-xs mt-4">© 2026 ra7teek. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default ShopPage;
