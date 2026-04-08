import React from 'react';

const STATUS_CONFIG = {
  todo: { label: 'To Do', className: 'badge-todo' },
  'in-progress': { label: 'In Progress', className: 'badge-in-progress' },
  done: { label: 'Done', className: 'badge-done' },
  pending: { label: 'Pending', className: 'badge-pending' },
};

const TicketCard = ({ ticket, isSelected, onSelect }) => {
  const statusConfig = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.todo;

  return (
    <div
      className={`ticket-card ${isSelected ? 'ticket-card--selected' : ''}`}
      onClick={() => onSelect(ticket.id)}
    >
      <div className="ticket-card-top">
        <h3 className="ticket-card-title">{ticket.title}</h3>
        <span className="ticket-card-date">{ticket.createdAt}</span>
      </div>
      <div className="ticket-card-meta">
        <div className="ticket-card-left">
          <input
            type="checkbox"
            className="ticket-card-checkbox"
            onClick={(e) => e.stopPropagation()}
            readOnly
          />
          <span className="ticket-card-id">{ticket.ticketId}</span>
          <span className={`badge ${statusConfig.className}`}>{statusConfig.label}</span>
        </div>
        <div className="ticket-card-status-icons">
          {ticket.status === 'done' ? (
            <div className="status-icon status-icon--done">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          ) : (
            <div className="status-icon status-icon--pending">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="9"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}
          <div
            className="ticket-avatar"
            style={{ backgroundColor: ticket.reporterColor }}
          >
            {ticket.reporterAvatar}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
