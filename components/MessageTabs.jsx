import React from 'react';

const MessageTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="message-tabs">
      <button
        className={`message-tab ${activeTab === 'public' ? 'message-tab--active' : ''}`}
        onClick={() => onTabChange('public')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Public Reply
      </button>
      <button
        className={`message-tab ${activeTab === 'private' ? 'message-tab--active' : ''}`}
        onClick={() => onTabChange('private')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Private Note
      </button>
    </div>
  );
};

export default MessageTabs;
