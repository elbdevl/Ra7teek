import React from 'react';
import { Star, Quote } from 'lucide-react';
const testimonials = [{
  name: 'فاطمة الزهراء',
  city: 'الدار البيضاء',
  rating: 5,
  text: 'والله منين بديت نستعمل ra7teek، الظهر ديالي ولّا كيحسّ براحة كبيرة. كنت ما نقدرش نوقف بزاف، دابا الحمد لله رجعت عادي.',
  date: 'قبل أسبوعين'
}, {
  name: 'محمد أمين',
  city: 'مراكش',
  rating: 5,
  text: 'أنا خدّام فالبناء وكنت كنعاني من الركبة بزاف. صاحبي نصحني بهاد المنتج، من أول مرة حسيت بالفرق! شكراً ra7teek.',
  date: 'قبل 3 أيام'
}, {
  name: 'خديجة بنعلي',
  city: 'فاس',
  rating: 5,
  text: 'أمي عندها 65 عام وكانت كتشكي من المفاصل ديالها كل يوم. شريت ليها ra7teek ودابا كتقول لي راها حسّات بتحسن كبير.',
  date: 'قبل أسبوع'
}, {
  name: 'يوسف الإدريسي',
  city: 'الرباط',
  rating: 4,
  text: 'منتج ممتاز! الريحة ديالو طبيعية وما كيحرقش الجلد. كنستعملو كل ليلة قبل النعاس والنتيجة واضحة.',
  date: 'قبل 5 أيام'
}, {
  name: 'سعاد المنصوري',
  city: 'طنجة',
  rating: 5,
  text: 'كنت كنستعمل أدوية بزاف للظهر بلا فايدة. ra7teek هو اللي نفعني بصح! الحرارة ديالو كتدخل للعمق وكتفكّ التشنج.',
  date: 'قبل 10 أيام'
}, {
  name: 'عبد الرحيم',
  city: 'أكادير',
  rating: 5,
  text: 'شريت 3 علب مرة وحدة! وحدة ليا ووحدة للوالد ووحدة للوالدة. كلنا راضيين على النتيجة. منتج مغربي وفخور بيه.',
  date: 'قبل أسبوع'
}, {
  name: 'نادية الحسني',
  city: 'مكناس',
  rating: 5,
  text: 'أنا معلمة وكنوقف بزاف. الركبة ديالي كانت كتوجعني بزاف. من بعد ra7teek ولّيت كنمشي بلا مشكل الحمد لله.',
  date: 'قبل 4 أيام'
}, {
  name: 'حسن الفيلالي',
  city: 'وجدة',
  rating: 4,
  text: 'المنتج مزيان بزاف. غير بغيت يكون الحجم أكبر شوية حيت كنستعملو بزاف. غادي نعاود نطلب إن شاء الله.',
  date: 'قبل أسبوعين'
}, {
  name: 'زينب العلوي',
  city: 'القنيطرة',
  rating: 5,
  text: 'أحسن حاجة شريتها هاد العام! الكتف ديالي كان متشنج من 6 شهور، وفأسبوع ديال ra7teek رجع عادي. ما صدقتش!',
  date: 'قبل 6 أيام'
}];
const TestimonialsSection: React.FC = () => {
  return <section id="testimonials" className="py-16 md:py-24 gradient-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
            آراء الزبناء
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4"><span className="text-gradient-gold">راضي</span>+200 زبون </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            شوف شنو كيقولو الناس اللي جرّبو ra7teek
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => <div key={index} className="reveal bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50 relative" style={{
          transitionDelay: `${index * 80}ms`
        }}>
              {/* Quote icon */}
              <Quote size={32} className="text-green-100 absolute top-4 left-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({
              length: 5
            }).map((_, i) => <Star key={i} size={18} className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'} />)}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-4 text-sm" data-mixed-content="true">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between border-t pt-3">
                <div>
                  <p className="font-bold text-gray-800 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.city}</p>
                </div>
                <span className="text-xs text-gray-400">{testimonial.date}</span>
              </div>
            </div>)}
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
          {[{
          num: '+2000',
          label: 'زبون راضي'
        }, {
          num: '4.8/5',
          label: 'تقييم عام'
        }, {
          num: '95%',
          label: 'نسبة الرضا'
        }, {
          num: '+500',
          label: 'طلب متكرر'
        }].map((stat, i) => <div key={i} className="text-center bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl md:text-3xl font-black text-green-700">{stat.num}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;