import React from 'react';

const MessageTabs = ({ activeTab, onTabChange, publicCount, privateCount }) => {
  return (
    <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 flex-shrink-0 overflow-x-auto">
      <button
        onClick={() => onTabChange('public')}
        className={`px-4 py-3 font-medium text-xs sm:text-sm border-b-2 transition relative whitespace-nowrap ${
          activeTab === 'public'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-slate-600 hover:text-slate-900'
        }`}
      >
        Public Messages
        <span className="ml-2 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
          {publicCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange('private')}
        className={`px-4 py-3 font-medium text-xs sm:text-sm border-b-2 transition relative whitespace-nowrap ${
          activeTab === 'private'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-slate-600 hover:text-slate-900'
        }`}
      >
        Private Notes
        <span className="ml-2 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
          {privateCount}
        </span>
      </button>
    </div>
  );
};

export default MessageTabs;
      </button>
    </div>
  );
};

export default MessageTabs;
