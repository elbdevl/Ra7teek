
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Phone, Menu, X } from 'lucide-react';

interface StickyHeaderProps {
  onOrderClick: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ onOrderClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-black text-gradient-green tracking-tight">
            ra7teek
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/shop" className="hover:text-green-700 transition-colors font-bold text-green-800">
            المتجر
          </Link>
          <button onClick={() => scrollToSection('problems')} className="hover:text-green-700 transition-colors">
            المشاكل
          </button>
          <button onClick={() => scrollToSection('benefits')} className="hover:text-green-700 transition-colors">
            الفوائد
          </button>
          <button onClick={() => scrollToSection('ingredients')} className="hover:text-green-700 transition-colors">
            المكونات
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="hover:text-green-700 transition-colors">
            آراء الزبناء
          </button>
        </nav>


        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+212700720490"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-green-800 hover:text-green-600 transition-colors"
          >
            <Phone size={16} />
            <span dir="ltr">+212 700 720 490</span>
          </a>

          <button
            onClick={onOrderClick}
            className="relative gradient-green text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-bold hover:opacity-90 transition-all animate-pulse-glow"
          >
            اطلب دابا
            {cartCount > 0 && (
              <span className="absolute -top-2 -left-2 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-green-800"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t mt-2 py-4 px-4 space-y-3">
          <button onClick={() => scrollToSection('problems')} className="block w-full text-right py-2 font-medium hover:text-green-700">
            المشاكل
          </button>
          <button onClick={() => scrollToSection('benefits')} className="block w-full text-right py-2 font-medium hover:text-green-700">
            الفوائد
          </button>
          <button onClick={() => scrollToSection('ingredients')} className="block w-full text-right py-2 font-medium hover:text-green-700">
            المكونات
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="block w-full text-right py-2 font-medium hover:text-green-700">
            آراء الزبناء
          </button>
          <a
            href="tel:+212700720490"
            className="flex items-center gap-2 py-2 font-medium text-green-800"
          >
            <Phone size={16} />
            <span dir="ltr">+212 700 720 490</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default StickyHeader;
