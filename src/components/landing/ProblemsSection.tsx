
import React from 'react';

const problems = [
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775241898973_b5d1e024.jpg',
    title: 'آلام الظهر',
    desc: 'كتعاني من وجع الظهر اللي كيمنعك تنوض وتخدم؟',
  },
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242005599_1c73b9d5.png',
    title: 'آلام الركبة',
    desc: 'الركبة كتوجعك ملي كتمشي ولا كتنزل الدروج؟',
  },
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242140972_9ab25f2a.jpg',
    title: 'تيبّس الرقبة',
    desc: 'الرقبة متشنجة وما كتقدرش تدور راسك؟',
  },
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242270915_cc9d8103.jpg',
    title: 'آلام المعصم',
    desc: 'اليدين كيوجعوك من الخدمة والتكرار؟',
  },
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242004597_55c644c8.png',
    title: 'آلام المفاصل',
    desc: 'المفاصل متيبسين وكتحس بالحرارة فيهم؟',
  },
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242142446_1c3fc5db.jpg',
    title: 'آلام الكتف',
    desc: 'الكتف كيوجعك وما كتقدرش ترفع يدك؟',
  },
];

interface ProblemsSectionProps {
  onOrderClick: () => void;
}

const ProblemsSection: React.FC<ProblemsSectionProps> = ({ onOrderClick }) => {
  return (
    <section id="problems" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
            واش كتعاني من هاد المشاكل؟
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-red-600">الألم</span> اللي كيمنعك تعيش حياتك
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            هاد المشاكل كيعانيو منها ملايين الناس. الحل الطبيعي موجود!
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`reveal group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={problem.image}
                  alt={problem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-4">
                  <h3 className="text-white text-xl font-bold">{problem.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 leading-relaxed">{problem.desc}</p>
              </div>
              {/* Red indicator */}
              <div className="absolute top-3 left-3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* CTA after problems */}
        <div className="text-center mt-12 reveal">
          <p className="text-xl font-bold text-gray-700 mb-4">
            ما تخليش الألم يتحكم فيك! الحل الطبيعي هنا 👇
          </p>
          <button
            onClick={onOrderClick}
            className="gradient-green text-white text-lg font-bold px-8 py-4 rounded-full shadow-green hover:scale-105 transition-all"
          >
            جرّب ra7teek دابا
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
