import React, { useState, useEffect } from 'react';
import { Shield, Truck, Clock, Star } from 'lucide-react';
interface HeroSectionProps {
  onOrderClick: () => void;
}
const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderClick
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18
  });
  const [currentImage, setCurrentImage] = useState(0);
  const productImages = ['https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241619070_b9c68fd0.jpg', 'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241611483_59baadd8.jpg', 'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241618103_8eb483a3.jpg'];
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let {
          hours,
          minutes,
          seconds
        } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return {
          hours,
          minutes,
          seconds
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % productImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return <section className="relative min-h-screen gradient-hero overflow-hidden pt-20">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 text-center md:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-fade-in-up">
              <Shield size={16} />
              <span>منتج طبيعي 100% معتمد</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 animate-fade-in-up delay-100">
              <span className="text-gradient-green">ودّع</span> آلام الظهر
              <br />
              <span className="text-gradient-gold">والمفاصل</span> للأبد
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed animate-fade-in-up delay-200">
              بلسم <strong className="text-green-800">ra7teek</strong> الطبيعي كيخفف الألم من أول استعمال.
              مصنوع من شحم الجمل والزيوت الأساسية، كيعطيك راحة فورية ونتائج دائمة.
            </p>

            {/* Price */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6 animate-fade-in-up delay-300">
              <span className="text-5xl font-black text-green-700">219 <span className="text-2xl">درهم</span></span>
              <div className="flex flex-col">
                <span className="text-xl line-through text-gray-400">249 درهم</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  وفّر 30 درهم
                </span>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg inline-block animate-fade-in-up delay-400">
              <p className="text-sm font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
                <Clock size={16} />
                العرض غادي يسالي فـ:
              </p>
              <div className="flex gap-3 justify-center" dir="ltr">
                {[{
                val: pad(timeLeft.hours),
                label: 'ساعة'
              }, {
                val: pad(timeLeft.minutes),
                label: 'دقيقة'
              }, {
                val: pad(timeLeft.seconds),
                label: 'ثانية'
              }].map((t, i) => <div key={i} className="text-center">
                    <div className="bg-green-800 text-white text-2xl md:text-3xl font-black px-3 py-2 rounded-lg min-w-[60px] animate-count-pulse">
                      {t.val}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">{t.label}</span>
                  </div>)}
              </div>
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up delay-500">
              <button onClick={onOrderClick} className="w-full md:w-auto gradient-green text-white text-xl md:text-2xl font-black px-10 py-4 rounded-full shadow-green hover:scale-105 transition-all duration-300 animate-pulse-glow">
                اطلب دابا - التوصيل مجاني
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 animate-fade-in-up delay-600">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Truck size={18} className="text-green-600" />
                <span>توصيل مجاني</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Shield size={18} className="text-green-600" />
                <span>الدفع عند الاستلام</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />)}
                </div>
                <span>+200 زبون راضي</span>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="order-1 md:order-2 flex justify-center animate-fade-in-right">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-300/30 to-yellow-300/30 rounded-full blur-3xl scale-110" />
              
              <div className="relative animate-float">
                <img src={productImages[currentImage]} alt="ra7teek بلسم المفاصل" className="w-72 md:w-96 h-72 md:h-96 object-cover rounded-3xl shadow-2xl transition-all duration-700" />
                
                {/* Discount badge */}
                <div className="absolute -top-4 -right-4 bg-red-500 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center font-black shadow-lg">
                  <span className="text-xs">خصم</span>
                  <span className="text-xl">12%</span>
                </div>

                {/* Free shipping badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                  <Truck size={18} className="text-green-600" />
                  <span className="text-sm font-bold text-green-800 whitespace-nowrap">توصيل مجاني</span>
                </div>
              </div>

              {/* Image dots */}
              <div className="flex justify-center gap-2 mt-8">
                {productImages.map((_, i) => <button key={i} onClick={() => setCurrentImage(i)} className={`w-3 h-3 rounded-full transition-all ${currentImage === i ? 'bg-green-700 w-8' : 'bg-gray-300'}`} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,60 1440,60 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>;
};
export default HeroSection;