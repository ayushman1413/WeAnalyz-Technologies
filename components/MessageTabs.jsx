import React from 'react';

const MessageTabs = ({ activeTab, onTabChange, publicCount, privateCount }) => {
  const tabClass = (isActive) => `px-4 py-3 font-medium text-xs sm:text-sm border-b-2 transition whitespace-nowrap ${
    isActive
      ? 'border-blue-500 text-blue-600'
      : 'border-transparent text-slate-600 hover:text-slate-900'
  }`;

  return (
    <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 flex-shrink-0 overflow-x-auto">
      <button onClick={() => onTabChange('public')} className={tabClass(activeTab === 'public')}>
        Public Messages
        <span className="ml-2 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{publicCount}</span>
      </button>
      <button onClick={() => onTabChange('private')} className={tabClass(activeTab === 'private')}>
        Private Notes
        <span className="ml-2 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{privateCount}</span>
      </button>
    </div>
  );
};

export default MessageTabs;
