import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-brand-gray mt-16 border-t border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-0 justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src="/image.png"
            alt="Casa Grande PropCare"
            loading="lazy"
            className="h-5 sm:h-6 w-auto opacity-80 hidden sm:block"
          />
          <span className="truncate text-xs sm:text-sm">© {year} Casa Grande PropCare</span>
        </div>
        <span className="text-xs sm:text-sm text-brand-gold text-center">Facilities Managed. Peace Delivered.</span>
      </div>
    </footer>
  );
};

export default Footer;