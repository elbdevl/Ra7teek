
import React from 'react';

const ingredients = [
  {
    name: 'شحم الجمل',
    nameEn: 'Camelus Dromedarius Fat',
    desc: 'مرطب طبيعي عميق كيغذي الجلد وكيساعد فنقل المواد الفعالة للعضلات.',
    icon: '🐪',
  },
  {
    name: 'زيت الغولثيريا',
    nameEn: 'Wintergreen Oil',
    desc: 'مسكّن طبيعي قوي كيشبه الأسبرين. كيخفف الألم والالتهاب بسرعة.',
    icon: '🌿',
  },
  {
    name: 'زيت إكليل الجبل بالكافور',
    nameEn: 'Rosemary Camphor Oil',
    desc: 'كيحسّن الدورة الدموية وكيعطي تأثير مسخّن كيفكّ التشنجات.',
    icon: '🌱',
  },
  {
    name: 'زيت الخزامى',
    nameEn: 'Lavender Oil',
    desc: 'كيهدّي الأعصاب وكيقلل التوتر العضلي. كيعطي إحساس بالراحة.',
    icon: '💜',
  },
  {
    name: 'زيت الزنجبيل',
    nameEn: 'Ginger Oil',
    desc: 'مضاد قوي للالتهابات. كيسخّن المنطقة وكيحسّن الحركة.',
    icon: '🫚',
  },
];

const IngredientsSection: React.FC = () => {
  return (
    <section id="ingredients" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242209243_7f8d6969.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
            مكونات طبيعية 100%
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            قوة <span className="text-gradient-gold">الطبيعة</span> فيديك
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            كل مكوّن مختار بعناية من الطبيعة المغربية لتخفيف الألم بشكل فعال وآمن.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Ingredients image */}
          <div className="reveal-right">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242164374_9e0b1e0e.jpg"
              alt="المكونات الطبيعية"
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>

          {/* Ingredients list */}
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="reveal-left group bg-gradient-to-l from-green-50 to-white rounded-xl p-4 border border-green-100 hover:shadow-lg hover:border-green-200 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-125 transition-transform">
                    {ingredient.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800 text-lg">{ingredient.name}</h3>
                    <p className="text-xs text-gray-400 mb-1" dir="ltr">{ingredient.nameEn}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{ingredient.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 text-center reveal">
          <div className="inline-flex items-center gap-6 bg-green-50 rounded-2xl px-8 py-4 border border-green-100">
            <div className="text-center">
              <div className="text-2xl font-black text-green-700">AMMPS</div>
              <div className="text-xs text-gray-500">معتمد</div>
            </div>
            <div className="w-px h-10 bg-green-200" />
            <div className="text-center">
              <div className="text-2xl font-black text-green-700">ISO 22716</div>
              <div className="text-xs text-gray-500">معتمد</div>
            </div>
            <div className="w-px h-10 bg-green-200" />
            <div className="text-center">
              <div className="text-2xl font-black text-green-700">100%</div>
              <div className="text-xs text-gray-500">طبيعي</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
