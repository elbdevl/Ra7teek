
import React from 'react';
import { Hand, Timer, Repeat, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Hand,
    step: '1',
    title: 'خود كمية صغيرة',
    desc: 'حط شوية من البلسم على صباعك',
  },
  {
    icon: Sparkles,
    step: '2',
    title: 'دلّك المنطقة',
    desc: 'دلّك البلاصة اللي فيها الوجع بحركات دائرية حتى يتشرّب',
  },
  {
    icon: Timer,
    step: '3',
    title: 'استنّى المفعول',
    desc: 'فـ 15 دقيقة غادي تحس بالحرارة والراحة',
  },
  {
    icon: Repeat,
    step: '4',
    title: 'كرّر يومياً',
    desc: 'استعمل 1 إلى 2 مرات فالنهار للحصول على أحسن نتيجة',
  },
];

const HowToUseSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
            كيفاش تستعملو؟
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-gradient-green">4 خطوات</span> بسيطة
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="reveal text-center relative"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-green-200 -translate-x-1/2" />
                )}

                <div className="relative z-10 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4 shadow-green">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-black text-sm">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product application images */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto reveal">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242106639_f45f84ae.png"
            alt="طريقة الاستعمال"
            className="rounded-2xl shadow-lg w-full h-64 object-cover"
          />
          <img
            src="https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242122496_265c531f.png"
            alt="تطبيق البلسم"
            className="rounded-2xl shadow-lg w-full h-64 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
