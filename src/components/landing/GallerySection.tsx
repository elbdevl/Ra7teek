
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const galleryImages = [
  'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241619070_b9c68fd0.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241611483_59baadd8.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241613495_cec75dca.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241614666_72fae202.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241615629_acc14e5f.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241616876_59c16141.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d0094187a7e6bfa833f953_1775241618103_8eb483a3.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242106639_f45f84ae.png',
  'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242122496_265c531f.png',
  'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242232948_a18a3ed5.jpg',
  'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242250415_b8b1e485.png',
  'https://d64gsuwffb70l.cloudfront.net/69d00a2d9d598beb9e85da92_1775242063026_d93750a2.png',
];

const GallerySection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const next = () => setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
            معرض الصور
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            شوف <span className="text-gradient-green">المنتج</span> من كل الزوايا
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="reveal-scale group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
              style={{ transitionDelay: `${index * 60}ms` }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`صورة المنتج ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-12 left-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            <img
              src={galleryImages[currentIndex]}
              alt={`صورة ${currentIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="text-center text-white mt-4 text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
