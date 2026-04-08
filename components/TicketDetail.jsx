import React, { useState } from 'react';
import MessageTabs from './MessageTabs';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const TICKET_TYPES = ['Task', 'Bug', 'Feature', 'Question'];

const TicketDetail = ({ ticket, onAddMessage }) => {
  const [activeTab, setActiveTab] = useState('public');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(ticket.tags || []);
  const [openSections, setOpenSections] = useState({
    tasks: false,
    collectedFields: false,
    linkedTickets: false,
    history: false,
  });

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      author: 'Danny Amacher',
      email: 'danny@capacity.com',
      avatar: 'DA',
      avatarColor: '#5B8EF0',
      to: `${ticket.customer} <${ticket.email}>`,
      content: text,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true,
      }),
      isPrivate: activeTab === 'private',
      type: 'agent',
      attachments: [],
    };
    onAddMessage(ticket.id, newMessage);
  };

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (idx) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  const toggleSection = (section) => {
    setOpenSections(s => ({ ...s, [section]: !s[section] }));
  };

  return (
    <div className="ticket-detail">
      {/* Main conversation area */}
      <div className="ticket-detail-main">
        {/* Ticket title bar */}
        <div className="ticket-detail-titlebar">
          <div className="ticket-detail-title-left">
            <h2 className="ticket-detail-title">{ticket.title}</h2>
            <span className="ticket-detail-id">{ticket.ticketId}</span>
          </div>
          <div className="ticket-detail-title-actions">
            <button className="ticket-action-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            <button className="ticket-action-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="ticket-detail-messages">
          <MessageList messages={ticket.messages} activeTab={activeTab} />
        </div>

        {/* Reply area */}
        <div className="ticket-detail-reply">
          <MessageTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <MessageInput
            onSendMessage={handleSendMessage}
            isPrivate={activeTab === 'private'}
          />
        </div>
      </div>

      {/* Right properties panel */}
      <div className="ticket-detail-sidebar">
        {/* Ticket Type */}
        <div className="props-section">
          <label className="props-label">Ticket Type</label>
          <div className="props-select">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B8EF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <span className="props-select-value">{ticket.ticketType}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="props-chevron">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Due Date */}
        <div className="props-section">
          <label className="props-label">Due Date</label>
          <div className="props-select">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="props-select-value props-select-placeholder">mm/dd/yyyy</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="props-chevron">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Reporter */}
        <div className="props-section">
          <label className="props-label">Reporter</label>
          <div className="props-select">
            <div className="props-reporter-avatar" style={{ backgroundColor: ticket.reporterColor }}>
              {ticket.reporterAvatar}
            </div>
            <span className="props-select-value">{ticket.reporter}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="props-chevron">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Tags */}
        <div className="props-section">
          <label className="props-label">Tags</label>
          <div className="props-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="props-tag">
                {tag}
                <button className="props-tag-remove" onClick={() => handleRemoveTag(idx)}>×</button>
              </span>
            ))}
            <div className="props-tag-add">
              <input
                type="text"
                className="props-tag-input"
                placeholder="Add Tag +"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
          </div>
        </div>

        <div className="props-divider" />

        {/* Accordion sections */}
        {[
          { key: 'tasks', label: 'TASKS', count: null },
          { key: 'collectedFields', label: 'COLLECTED FIELDS', count: null },
          { key: 'linkedTickets', label: 'LINKED TICKETS', count: 2 },
          { key: 'history', label: 'HISTORY', count: null },
        ].map(({ key, label, count }) => (
          <div key={key} className="props-accordion">
            <button
              className="props-accordion-header"
              onClick={() => toggleSection(key)}
            >
              <div className="props-accordion-title">
                <span>{label}</span>
                {count !== null && <span className="props-accordion-count">{count}</span>}
              </div>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`props-accordion-chevron ${openSections[key] ? 'props-accordion-chevron--open' : ''}`}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            {openSections[key] && (
              <div className="props-accordion-content">
                <p className="props-accordion-empty">No {label.toLowerCase()} found.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketDetail;
