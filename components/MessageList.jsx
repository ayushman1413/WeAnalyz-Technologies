import React from 'react';

const MessageList = ({ messages, activeTab }) => {
  const filtered = activeTab === 'private'
    ? messages.filter(m => m.isPrivate)
    : messages.filter(m => !m.isPrivate);

  if (filtered.length === 0) {
    return (
      <div className="message-list-empty">
        <div className="message-list-empty-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <p>No {activeTab === 'private' ? 'private notes' : 'public messages'} yet</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {filtered.map((msg) => (
        <div key={msg.id} className={`message-card ${msg.isPrivate ? 'message-card--private' : ''}`}>
          <div className="message-card-header">
            <div className="message-card-author-info">
              <div className="message-avatar" style={{ backgroundColor: msg.avatarColor }}>
                {msg.avatar}
              </div>
              <div className="message-author-details">
                <div className="message-author-row">
                  <span className="message-author-name">{msg.author}</span>
                  {msg.isPrivate && (
                    <span className="message-private-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      Private
                    </span>
                  )}
                </div>
                <div className="message-to">
                  To {msg.to}
                </div>
              </div>
            </div>
            <div className="message-card-actions">
              <span className="message-timestamp">{msg.timestamp}</span>
              <button className="message-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="message-content">
            <p>{msg.content}</p>
          </div>

          {msg.attachments && msg.attachments.length > 0 && (
            <div className="message-attachments">
              {msg.attachments.map((att, idx) => (
                <div key={idx} className="attachment-card">
                  <div className="attachment-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">{att.name}</span>
                    <span className="attachment-date">{att.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
