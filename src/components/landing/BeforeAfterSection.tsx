
import React from 'react';
import { ArrowLeft, Check, X as XIcon } from 'lucide-react';

interface BeforeAfterSectionProps {
  onOrderClick: () => void;
}

const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-red-500">قبل</span> و <span className="text-gradient-green">بعد</span> ra7teek
          </h2>
          <p className="text-gray-500 text-lg">شوف الفرق اللي غادي يدير ra7teek فحياتك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <div className="reveal-right bg-red-50 rounded-2xl p-8 border-2 border-red-100">
            <div className="text-center mb-6">
              <span className="inline-block bg-red-500 text-white px-6 py-2 rounded-full font-bold text-lg">
                قبل ra7teek
              </span>
            </div>
            <div className="space-y-4">
              {[
                'كتعاني من آلام الظهر كل يوم',
                'ما كتقدرش تنوض من الفراش بسهولة',
                'المفاصل متيبسين ومتشنجين',
                'كتستعمل أدوية كيماوية بلا فايدة',
                'الألم كيمنعك تخدم وتعيش عادي',
                'كتحس بالإحباط والتعب المستمر',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-200 flex items-center justify-center mt-0.5">
                    <XIcon size={14} className="text-red-600" />
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="reveal-left bg-green-50 rounded-2xl p-8 border-2 border-green-200 shadow-green">
            <div className="text-center mb-6">
              <span className="inline-block gradient-green text-white px-6 py-2 rounded-full font-bold text-lg">
                بعد ra7teek
              </span>
            </div>
            <div className="space-y-4">
              {[
                'راحة فورية من الألم من أول استعمال',
                'كتنوض من النعاس بنشاط وحيوية',
                'المفاصل مرنة وكتتحرك بحرية',
                'مكونات طبيعية 100% بلا آثار جانبية',
                'كتخدم وكتعيش حياتك بشكل عادي',
                'كتحس بالطاقة والراحة كل يوم',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-200 flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-green-700" />
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow + CTA */}
        <div className="text-center mt-12 reveal">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gray-300 flex-1 max-w-[100px]" />
            <ArrowLeft size={32} className="text-green-600 rotate-90" />
            <div className="h-px bg-gray-300 flex-1 max-w-[100px]" />
          </div>
          <button
            onClick={onOrderClick}
            className="gradient-green text-white text-xl font-bold px-10 py-4 rounded-full shadow-green hover:scale-105 transition-all animate-pulse-glow"
          >
            بدّل حياتك دابا - 219 درهم فقط
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
