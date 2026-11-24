
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StickyHeader from '@/components/landing/StickyHeader';
import HeroSection from '@/components/landing/HeroSection';
import ProblemsSection from '@/components/landing/ProblemsSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import BeforeAfterSection from '@/components/landing/BeforeAfterSection';
import HowToUseSection from '@/components/landing/HowToUseSection';
import IngredientsSection from '@/components/landing/IngredientsSection';
import GallerySection from '@/components/landing/GallerySection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import OrderSection from '@/components/landing/OrderSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton';

const AppLayout: React.FC = () => {
  const scrollToOrder = () => {
    const el = document.getElementById('order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal, .reveal-right, .reveal-left, .reveal-scale');
      elements.forEach((element) => observer.observe(element));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <StickyHeader onOrderClick={scrollToOrder} />
      <HeroSection onOrderClick={scrollToOrder} />
      <ProblemsSection onOrderClick={scrollToOrder} />
      <BenefitsSection />
      <BeforeAfterSection onOrderClick={scrollToOrder} />
      <HowToUseSection />
      <IngredientsSection />
      <GallerySection />
      <TestimonialsSection />
      <OrderSection />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AppLayout;
