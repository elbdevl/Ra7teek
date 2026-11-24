
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowRight, Star, Truck, Shield, Phone, Minus, Plus, Check, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PRODUCT_TYPE_LABELS: Record<string, string> = {
  'Balm': 'بلسم', 'Oil': 'زيوت', 'Patch': 'لصقات', 'Cream': 'كريمات', 'Gel': 'جل',
};

const ProductPage: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      setLoading(true);
      setQuantity(1);
      setCurrentImage(0);

      const { data } = await supabase
        .from('ecom_products')
        .select('*, variants:ecom_product_variants(*)')
        .eq('handle', handle)
        .eq('status', 'active')
        .single();

      if (data) {
        setProduct(data);
        // Fetch related products
        const { data: related } = await supabase
          .from('ecom_products')
          .select('*')
          .eq('status', 'active')
          .neq('id', data.id)
          .limit(4);
        setRelatedProducts(related || []);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product_id: product.id,
      name: product.name,
      sku: product.sku || product.handle,
      price: product.price,
      image: product.images?.[0],
    }, quantity);
    toast({ title: 'تمت الإضافة للسلة', description: `${quantity} × ${product.name}` });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const getOriginalPrice = (p: any) => p?.metadata?.original_price || null;
  const getDiscount = (p: any) => {
    const orig = getOriginalPrice(p);
    if (!orig) return null;
    return Math.round(((orig - p.price) / orig) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">المنتج غير موجود</h2>
          <Link to="/shop" className="text-green-700 font-bold hover:underline">رجع للمتجر</Link>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const discount = getDiscount(product);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass shadow-sm sticky top-0 z-50 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-gradient-green">ra7teek</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-green-700">الرئيسية</Link>
            <Link to="/shop" className="hover:text-green-700">المتجر</Link>
            <a href="tel:+212700720490" className="flex items-center gap-1.5 text-green-800"><Phone size={14} /><span dir="ltr">+212 700 720 490</span></a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/checkout" className="relative p-2 text-green-800">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2"><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">الرئيسية</Link>
          <ChevronLeft size={14} />
          <Link to="/shop" className="hover:text-green-700">المتجر</Link>
          <ChevronLeft size={14} />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm mb-3 aspect-square">
              <img
                src={images[currentImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1.5 rounded-full text-sm">-{discount}%</div>
              )}
              {images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"><ChevronRight size={20} /></button>
                  <button onClick={() => setCurrentImage((currentImage + 1) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"><ChevronLeft size={20} /></button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setCurrentImage(i)} className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImage === i ? 'border-green-500' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.product_type && (
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {PRODUCT_TYPE_LABELS[product.product_type] || product.product_type}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-black mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />)}</div>
              <span className="text-sm text-gray-500">(+200 تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-black text-green-700">{(product.price / 100).toFixed(0)}</span>
              <span className="text-lg text-green-700 font-bold">درهم</span>
              {getOriginalPrice(product) && (
                <span className="text-lg line-through text-gray-400">{(getOriginalPrice(product) / 100).toFixed(0)} درهم</span>
              )}
              {discount && <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded">وفّر {((getOriginalPrice(product) - product.price) / 100).toFixed(0)} درهم</span>}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Metadata details */}
            {product.metadata && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
                {product.metadata.volume && <div className="flex justify-between text-sm"><span className="text-gray-500">الحجم</span><span className="font-medium">{product.metadata.volume}</span></div>}
                {product.metadata.quantity && <div className="flex justify-between text-sm"><span className="text-gray-500">الكمية</span><span className="font-medium">{product.metadata.quantity}</span></div>}
                {product.metadata.duration && <div className="flex justify-between text-sm"><span className="text-gray-500">المدة</span><span className="font-medium">{product.metadata.duration}</span></div>}
                {product.metadata.ingredients && <div className="text-sm"><span className="text-gray-500 block mb-1">المكونات:</span><span className="font-medium">{product.metadata.ingredients}</span></div>}
                {product.metadata.usage && <div className="text-sm"><span className="text-gray-500 block mb-1">طريقة الاستعمال:</span><span className="font-medium">{product.metadata.usage}</span></div>}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-bold">الكمية:</span>
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-2 py-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 shadow-sm"><Minus size={16} /></button>
                <span className="text-lg font-black w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 shadow-sm"><Plus size={16} /></button>
              </div>
              <span className="text-sm text-gray-500">المجموع: <strong className="text-green-700">{((product.price * quantity) / 100).toFixed(0)} درهم</strong></span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-6">
              <button onClick={handleAddToCart} className="flex-1 gradient-green text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-green">
                <ShoppingCart size={20} />
                أضف للسلة
              </button>
              <button onClick={handleBuyNow} className="flex-1 bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-gold">
                اشتري دابا
              </button>
            </div>

            {/* WhatsApp */}
            <a href={`https://wa.me/212700720490?text=سلام، بغيت نطلب ${product.name}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors mb-6">
              <Phone size={18} />
              اطلب عبر واتساب
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'توصيل مجاني' },
                { icon: Shield, label: 'منتج معتمد' },
                { icon: Check, label: 'طبيعي 100%' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-1 bg-green-50 rounded-xl p-3 text-center">
                  <badge.icon size={20} className="text-green-600" />
                  <span className="text-xs font-bold text-green-800">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black mb-6">منتجات أخرى قد تعجبك</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(rp => (
                <Link key={rp.id} to={`/product/${rp.handle}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-50">
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <img src={rp.images?.[0] || '/placeholder.svg'} alt={rp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm mb-1 line-clamp-1 group-hover:text-green-700">{rp.name}</h3>
                    <span className="text-lg font-black text-green-700">{(rp.price / 100).toFixed(0)} <span className="text-xs">درهم</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xl font-black text-gradient-green">ra7teek</span>
          <p className="text-gray-500 text-xs mt-2">© 2026 ra7teek. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;
