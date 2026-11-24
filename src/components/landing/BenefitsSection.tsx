
import React from 'react';
import { Flame, Zap, Leaf, Heart, Shield, Activity, Droplets, Timer } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'تخفيف فوري للألم',
    desc: 'كيبدا المفعول من أول 15 دقيقة. كتحس براحة سريعة فالمنطقة اللي فيها الوجع.',
    color: 'from-yellow-400 to-orange-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: Flame,
    title: 'تأثير مسخّن عميق',
    desc: 'الحرارة الطبيعية كتدخل للعضلات وكتفكّ التشنجات بشكل فعال.',
    color: 'from-red-400 to-red-600',
    bg: 'bg-red-50',
  },
  {
    icon: Activity,
    title: 'تحسين الحركة',
    desc: 'كيرجع ليك المرونة فالمفاصل وكتقدر تتحرك بحرية بلا ألم.',
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Leaf,
    title: 'مكونات طبيعية 100%',
    desc: 'مصنوع من شحم الجمل والزيوت الأساسية الطبيعية بلا مواد كيماوية.',
    color: 'from-green-400 to-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Shield,
    title: 'معتمد ومرخّص',
    desc: 'حاصل على شهادة AMMPS و ISO22716. منتج آمن وموثوق.',
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Droplets,
    title: 'مضاد للالتهابات',
    desc: 'كيقلل الالتهاب والتورم فالمفاصل بفضل الزيوت الأساسية المركزة.',
    color: 'from-teal-400 to-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: Heart,
    title: 'راحة أثناء التدليك',
    desc: 'كيعطي إحساس بالراحة والاسترخاء العميق ملي كتدلّك بيه.',
    color: 'from-pink-400 to-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Timer,
    title: 'مفعول طويل المدى',
    desc: 'النتائج كتبان من أول استعمال وكتحسّن مع الاستمرار.',
    color: 'from-indigo-400 to-indigo-600',
    bg: 'bg-indigo-50',
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 gradient-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
            علاش ra7teek؟
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-gradient-green">8 فوائد</span> غادي تبدّل حياتك
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            منتج واحد، فوائد بزاف. شوف كيفاش ra7teek غادي يساعدك.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`reveal group ${benefit.bg} rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-default border border-white/50`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
