import React, { useState } from 'react';
import { useResponsive } from '../contexts/ResponsiveContext';

const Sidebar = () => {
  const { isMobile, isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);

  if (!isDesktop && !isOpen) {
    return null;
  }

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`${
        isDesktop ? 'relative w-16' : 'fixed left-0 top-0 h-screen w-64 z-40'
      } bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center py-8 gap-6 border-r border-slate-700 ${
        isMobile ? 'px-4' : ''
      }`}>
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition">
          <span className="text-white font-bold text-lg">H</span>
        </div>

        <nav className={`flex ${isMobile ? 'flex-row flex-wrap gap-2' : 'flex-col gap-6'}`}>
          {['Tickets', 'Menu', 'Chat'].map((label) => (
            <div
              key={label}
              className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition text-slate-300"
              title={label}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
              </svg>
            </div>
          ))}
        </nav>

        <div className={`w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition text-slate-300 ${
          isDesktop ? 'mt-auto' : ''
        }`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
