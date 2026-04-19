import React from 'react';
import TicketCard from './TicketCard';

const TicketList = ({
  tickets,
  selectedTicketId,
  onSelectTicket,
  filterStatus,
  onFilterChange,
}) => {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'todo', label: 'To Do' },
    { key: 'done', label: 'Done' },
  ];
  

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <div className="ticket-list-filters">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`ticket-list-filter-btn ${filterStatus === tab.key ? 'ticket-list-filter-btn--active' : ''}`}
              onClick={() => onFilterChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          className="ticket-list-add-btn"
          title="New Ticket"
          onClick={() => alert('New ticket creation coming soon!')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      <div className="ticket-list-items">
        {tickets.length === 0 ? (
          <div className="ticket-list-empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>No tickets found</p>
          </div>
        ) : (
          tickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              isSelected={ticket.id === selectedTicketId}
              onSelect={onSelectTicket}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;
