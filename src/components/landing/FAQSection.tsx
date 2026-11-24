
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'واش المنتج طبيعي بصح؟',
    a: 'نعم، ra7teek مصنوع 100% من مكونات طبيعية: شحم الجمل، زيت الغولثيريا، زيت إكليل الجبل، زيت الخزامى، وزيت الزنجبيل. بلا أي مواد كيماوية.',
  },
  {
    q: 'شحال من مرة نقدر نستعملو فالنهار؟',
    a: 'كنصحو باستعمال 1 إلى 2 مرات فالنهار. حط كمية صغيرة على المنطقة المعنية ودلّكها حتى تتشرّب.',
  },
  {
    q: 'واش كاين آثار جانبية؟',
    a: 'المنتج طبيعي وآمن. ولكن كنصحو بتجنب العينين والجروح المفتوحة. ما كيتستعملش عند الحوامل والمرضعات. من 12 سنة فما فوق.',
  },
  {
    q: 'فوقتاش غادي نحس بالنتيجة؟',
    a: 'بزاف ديال الزبناء كيحسّو بالراحة من أول 15 دقيقة. النتائج كتحسّن مع الاستمرار فالاستعمال.',
  },
  {
    q: 'كيفاش ندير الطلب؟',
    a: 'كليك على "اطلب دابا" ولا تواصل معانا عبر واتساب على الرقم +212700720490. كنوصلو لجميع مدن المغرب.',
  },
  {
    q: 'واش التوصيل مجاني؟',
    a: 'نعم! التوصيل مجاني لجميع مدن المغرب. والدفع عند الاستلام.',
  },
  {
    q: 'شحال مدة التوصيل؟',
    a: 'التوصيل كيكون فمدة 24 إلى 48 ساعة حسب المدينة ديالك.',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
            أسئلة شائعة
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            عندك <span className="text-gradient-green">سؤال</span>؟
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="reveal bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-green-200 transition-colors"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-right"
              >
                <span className="font-bold text-gray-800">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-green-600 transition-transform flex-shrink-0 mr-3 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 pb-5' : 'max-h-0'
                }`}
              >
                <p className="px-5 text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
