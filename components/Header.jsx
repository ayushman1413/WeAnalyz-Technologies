import React, { useState } from 'react';
import { useResponsive } from '../contexts/ResponsiveContext';

const Header = ({ ticketCount }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">Support Tickets</h1>
        <p className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">{ticketCount} total</p>
      </div>

      {!isMobile && (
        <div className="hidden md:block flex-1 max-w-xs mx-4">
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {isMobile && (
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}

        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {!isMobile && (
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">Sarah Manager</p>
              <p className="text-xs text-slate-500">Support Team</p>
            </div>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>

      {isMobile && showSearch && (
        <div className="absolute left-0 right-0 top-16 bg-white border-b border-slate-200 p-4">
          <input
            type="text"
            placeholder="Search tickets..."
            autoFocus
            className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
