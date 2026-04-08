import React from 'react';
import { useResponsive } from '../contexts/ResponsiveContext';

const Sidebar = () => {
  const { isMobile, isTablet, sidebarOpen, setSidebarOpen } = useResponsive();

  if (isMobile && !sidebarOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isMobile ? 'fixed left-0 top-0 h-screen w-64 z-40' : 'relative w-16'
      } bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center ${
        isMobile ? 'items-start px-4 py-6' : 'py-8'
      } gap-6 border-r border-slate-700`}>
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Logo */}
        <div className={`${
          isMobile ? 'w-full' : ''
        } w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition`}>
          <span className="text-white font-bold text-lg">H</span>
        </div>

        {/* Navigation Icons */}
        <nav className={`flex ${
          isMobile ? 'flex-row flex-wrap gap-2' : 'flex-col gap-6'
        }`}>
          {[
            { icon: 'M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M7 10l3 3 5-5', label: 'Tickets' },
            { icon: 'M2.5 5.5h15M2.5 10h15M2.5 14.5h15', label: 'Menu' },
            { icon: 'M10 1C5.03 1 1 5.03 1 10s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z', label: 'Chat' },
          ].map((item, i) => (
            <div
              key={i}
              className={`${
                isMobile ? 'w-10 h-10' : 'w-10 h-10'
              } rounded-lg bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition text-slate-300`}
              title={item.label}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          ))}
        </nav>

        {/* Bottom Settings Icon */}
        <div className={`${
          isMobile ? '' : 'mt-auto'
        } w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition text-slate-300`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M10.8 1.8l.6 1.8m0 0l1.8-.6m-1.8.6l.6-1.8m0 0l-1.8.6m7.4 5.4l1.8.6m0 0l-.6 1.8m.6-1.8l-1.8-.6m0 0l.6-1.8m-7.4 9.2l-.6 1.8m0 0l-1.8-.6m1.8.6l-.6-1.8m0 0l1.8.6m-7.4-5.4l-1.8-.6m0 0l.6-1.8m-.6 1.8l1.8.6m0 0l-.6 1.8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Mobile bottom buttons */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="mt-auto w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Close
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
