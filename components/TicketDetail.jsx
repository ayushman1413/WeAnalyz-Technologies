import React, { useState } from 'react';
import MessageTabs from './MessageTabs';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const TICKET_TYPES = ['Task', 'Bug', 'Feature', 'Question', 'Incident'];
const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do', className: 'badge-todo' },
  { value: 'in-progress', label: 'In Progress', className: 'badge-in-progress' },
  { value: 'done', label: 'Done', className: 'badge-done' },
  { value: 'pending', label: 'Pending', className: 'badge-pending' },
];

const TicketDetail = ({ ticket, onAddMessage, onBack, onDeleteTicket, onUpdateTicket }) => {
  const [activeTab, setActiveTab] = useState('public');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(ticket.tags || []);
  const [ticketType, setTicketType] = useState(ticket.ticketType);
  const [ticketStatus, setTicketStatus] = useState(ticket.status);
  const [dueDate, setDueDate] = useState(ticket.dueDate || '');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [openSections, setOpenSections] = useState({
    tasks: false,
    collectedFields: false,
    linkedTickets: false,
    history: false,
  });

  const handleSendMessage = text => {
    const newMessage = {
      id: Date.now(),
      author: 'Priya Sharma',
      email: 'priya@capacity.com',
      avatar: 'PS',
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

  const handleAddTag = e => {
    if ((e.key === 'Enter' || e.type === 'click') && newTag.trim()) {
      const updated = [...tags, newTag.trim()];
      setTags(updated);
      onUpdateTicket(ticket.id, { tags: updated });
      setNewTag('');
    }
  };

  const handleRemoveTag = idx => {
    const updated = tags.filter((_, i) => i !== idx);
    setTags(updated);
    onUpdateTicket(ticket.id, { tags: updated });
  };

  const handleTypeChange = type => {
    setTicketType(type);
    onUpdateTicket(ticket.id, { ticketType: type });
    setShowTypeDropdown(false);
  };

  const handleStatusChange = status => {
    setTicketStatus(status);
    onUpdateTicket(ticket.id, { status });
    setShowStatusDropdown(false);
  };

  const handleDueDateChange = e => {
    setDueDate(e.target.value);
    onUpdateTicket(ticket.id, { dueDate: e.target.value });
  };

  const toggleSection = key => {
    setOpenSections(s => ({ ...s, [key]: !s[key] }));
  };

  const currentStatus = STATUS_OPTIONS.find(s => s.value === ticketStatus) || STATUS_OPTIONS[0];

  return (
    <div className="ticket-detail">
      <div className="ticket-detail-main">
        <div className="ticket-detail-titlebar">
          <div className="ticket-detail-title-left">
            <button className="ticket-back-btn" onClick={onBack} aria-label="Back to list">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <h2 className="ticket-detail-title">{ticket.title}</h2>
            <span className="ticket-detail-id">{ticket.ticketId}</span>
            <div className="td-status-wrapper">
              <button
                className={`badge ${currentStatus.className} td-status-btn`}
                onClick={() => setShowStatusDropdown(v => !v)}
              >
                {currentStatus.label}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {showStatusDropdown && (
                <div className="td-dropdown">
                  {STATUS_OPTIONS.map(s => (
                    <button
                      key={s.value}
                      className={`td-dropdown-item ${ticketStatus === s.value ? 'td-dropdown-item--active' : ''}`}
                      onClick={() => handleStatusChange(s.value)}
                    >
                      <span className={`badge ${s.className}`}>{s.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ticket-detail-title-actions">
            <button className="ticket-action-btn" title="Share">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            <button
              className="ticket-action-btn ticket-action-btn--danger"
              title="Delete ticket"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="ticket-detail-messages">
          <MessageList messages={ticket.messages} activeTab={activeTab} />
        </div>

        <div className="ticket-detail-reply">
          <MessageTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <MessageInput onSendMessage={handleSendMessage} isPrivate={activeTab === 'private'} />
        </div>
      </div>

      <aside className="ticket-detail-sidebar">
        <div className="props-section">
          <label className="props-label">Ticket Type</label>
          <div className="props-select-wrapper">
            <button
              className="props-select"
              onClick={() => setShowTypeDropdown(v => !v)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B8EF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              <span className="props-select-value">{ticketType}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {showTypeDropdown && (
              <div className="props-dropdown">
                {TICKET_TYPES.map(type => (
                  <button
                    key={type}
                    className={`props-dropdown-item ${ticketType === type ? 'props-dropdown-item--active' : ''}`}
                    onClick={() => handleTypeChange(type)}
                  >
                    {type}
                    {ticketType === type && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="props-section">
          <label className="props-label">Due Date</label>
          <div className="props-date-wrapper">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <input
              type="date"
              className="props-date-input"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
        </div>

        <div className="props-section">
          <label className="props-label">Reporter</label>
          <div className="props-reporter">
            <div className="props-reporter-avatar" style={{ backgroundColor: ticket.reporterColor }}>
              {ticket.reporterAvatar}
            </div>
            <span className="props-reporter-name">{ticket.reporter}</span>
          </div>
        </div>

        <div className="props-section">
          <label className="props-label">Tags</label>
          <div className="props-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="props-tag">
                {tag}
                <button className="props-tag-remove" onClick={() => handleRemoveTag(idx)} aria-label={`Remove ${tag}`}>×</button>
              </span>
            ))}
            <div className="props-tag-add-row">
              <input
                type="text"
                className="props-tag-input"
                placeholder="Add tag…"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
              />
              {newTag.trim() && (
                <button className="props-tag-add-btn" onClick={handleAddTag} aria-label="Add tag">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="props-divider" />

        {[
          { key: 'tasks', label: 'TASKS', count: null,
            content: <p className="props-accordion-empty">No tasks added yet.</p> },
          { key: 'collectedFields', label: 'COLLECTED FIELDS', count: null,
            content: <p className="props-accordion-empty">No fields collected.</p> },
          { key: 'linkedTickets', label: 'LINKED TICKETS', count: 2,
            content: (
              <div className="linked-tickets-list">
                <div className="linked-ticket-item">
                  <span className="linked-ticket-id">APPS-200</span>
                  <span className="linked-ticket-rel">blocks</span>
                  <span className="linked-ticket-title">Login issue regression</span>
                </div>
                <div className="linked-ticket-item">
                  <span className="linked-ticket-id">APPS-189</span>
                  <span className="linked-ticket-rel">relates to</span>
                  <span className="linked-ticket-title">Auth service timeout</span>
                </div>
              </div>
            )
          },
          { key: 'history', label: 'HISTORY', count: null,
            content: (
              <div className="history-list">
                <div className="history-item">
                  <div className="history-dot" />
                  <div>
                    <span className="history-action">Ticket created</span>
                    <span className="history-time"> · {ticket.createdAt}</span>
                  </div>
                </div>
                <div className="history-item">
                  <div className="history-dot" />
                  <div>
                    <span className="history-action">Status set to <strong>{currentStatus.label}</strong></span>
                  </div>
                </div>
              </div>
            )
          },
        ].map(({ key, label, count, content }) => (
          <div key={key} className="props-accordion">
            <button
              className="props-accordion-header"
              onClick={() => toggleSection(key)}
              aria-expanded={openSections[key]}
            >
              <div className="props-accordion-title">
                <span>{label}</span>
                {count !== null && <span className="props-accordion-count">{count}</span>}
              </div>
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`props-accordion-chevron ${openSections[key] ? 'props-accordion-chevron--open' : ''}`}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            {openSections[key] && (
              <div className="props-accordion-content">
                {content}
              </div>
            )}
          </div>
        ))}
      </aside>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-icon modal-icon--danger">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 className="modal-title">Delete Ticket?</h3>
            <p className="modal-body">This will permanently delete <strong>"{ticket.title}"</strong> and all its messages. This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary-sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button
                className="btn-danger-sm"
                onClick={() => { setShowDeleteConfirm(false); onDeleteTicket(ticket.id); }}
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
