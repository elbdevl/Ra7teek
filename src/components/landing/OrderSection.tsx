
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Shield, Truck, Clock, Phone, Check, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const PRODUCT_ID = '8437e255-72f4-4b57-a2b8-49feaa00bf41';

const OrderSection: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleOrder = () => {
    addToCart({
      product_id: PRODUCT_ID,
      name: 'ra7teek - بلسم المفاصل',
      sku: 'RA7TEEK-001',
      price: 21900,
      image: 'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241619070_b9c68fd0.jpg',
    }, quantity);

    toast({
      title: 'تمت الإضافة للسلة',
      description: `${quantity} × ra7teek بلسم المفاصل`,
    });

    navigate('/checkout');
  };

  const totalPrice = 219 * quantity;
  const savedAmount = 30 * quantity;

  return (
    <section id="order" className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 reveal">
          <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
            عرض محدود - لا تفوّت الفرصة!
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            اطلب <span className="text-gradient-green">ra7teek</span> دابا
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Summary */}
          <div className="reveal-right bg-white rounded-3xl p-6 shadow-xl border border-green-100">
            <div className="flex gap-4 mb-6">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241619070_b9c68fd0.jpg"
                alt="ra7teek"
                className="w-28 h-28 rounded-2xl object-cover shadow-md"
              />
              <div>
                <h3 className="font-bold text-xl text-green-800">ra7teek</h3>
                <p className="text-sm text-gray-500">بلسم المفاصل الطبيعي</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-black text-green-700">219 درهم</span>
                  <span className="text-sm line-through text-gray-400">249 درهم</span>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-4">
              <span className="font-bold">الكمية:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-xl font-black w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">السعر ({quantity} وحدة)</span>
                <span className="font-bold">{totalPrice} درهم</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>التوصيل</span>
                <span className="font-bold">مجاني</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>وفّرت</span>
                <span className="font-bold">-{savedAmount} درهم</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg">
                <span className="font-bold">المجموع</span>
                <span className="font-black text-green-700">{totalPrice} درهم</span>
              </div>
            </div>

            {/* Offers for multiple */}
            {quantity >= 2 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-center">
                <p className="text-sm font-bold text-yellow-800">
                  ممتاز! كتوفّر {savedAmount} درهم على {quantity} علب
                </p>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handleOrder}
              className="w-full gradient-green text-white text-xl font-black py-4 rounded-xl shadow-green hover:scale-[1.02] transition-all animate-pulse-glow"
            >
              اطلب دابا - {totalPrice} درهم
            </button>

            {/* Trust */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Truck size={14} className="text-green-600" />
                <span>توصيل مجاني</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-green-600" />
                <span>الدفع عند الاستلام</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-green-600" />
                <span>توصيل 24-48 ساعة</span>
              </div>
            </div>
          </div>

          {/* Why order now */}
          <div className="reveal-left space-y-4">
            <h3 className="text-2xl font-bold mb-6">علاش تطلب دابا؟</h3>

            {[
              { title: 'توصيل مجاني لجميع المدن', desc: 'كنوصلو لكل مدن المغرب بلا أي مصاريف إضافية.' },
              { title: 'الدفع عند الاستلام', desc: 'ما كتخلصش حتى توصلك السلعة ليدك.' },
              { title: 'توصيل سريع 24-48 ساعة', desc: 'كنوصلو بسرعة باش ما تبقاش تستنّى بزاف.' },
              { title: 'منتج طبيعي ومعتمد', desc: 'حاصل على شهادات AMMPS و ISO22716.' },
              { title: 'نتائج مضمونة', desc: '+2000 زبون راضي على النتيجة.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-green flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/212700720490?text=سلام، بغيت نطلب ra7teek بلسم المفاصل"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg mt-6"
            >
              <Phone size={22} />
              <span>اطلب عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
