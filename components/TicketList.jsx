import React, { useState } from 'react';
import TicketCard from './TicketCard';

const TicketList = ({ tickets, selectedTicketId, onSelectTicket }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTickets = filterStatus === 'all'
    ? tickets
    : tickets.filter(t => t.status === filterStatus);

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <div className="ticket-list-filters">
          {[
            { key: 'all', label: 'All' },
            { key: 'todo', label: 'To Do' },
            { key: 'done', label: 'Done' },
          ].map(f => (
            <button
              key={f.key}
              className={`ticket-list-filter-btn ${filterStatus === f.key ? 'ticket-list-filter-btn--active' : ''}`}
              onClick={() => setFilterStatus(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="ticket-list-add-btn" title="New Ticket">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      <div className="ticket-list-items">
        {filteredTickets.map(ticket => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            isSelected={ticket.id === selectedTicketId}
            onSelect={onSelectTicket}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
