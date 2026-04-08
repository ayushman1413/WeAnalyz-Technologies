import React, { useState } from 'react';
import TicketCard from './TicketCard';

const TicketList = ({ tickets, selectedTicketId, onSelectTicket }) => {
  const [filter, setFilter] = useState('all');

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  return (
    <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-16 top-16 md:relative md:top-0 md:h-auto">
      {/* Filter Tabs */}
      <div className="p-4 border-b border-slate-200 flex gap-2 overflow-x-auto">
        {['all', 'open', 'in-progress', 'pending'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
              filter === status
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {status === 'all' ? 'All' : status.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isSelected={selectedTicketId === ticket.id}
                onClick={() => onSelectTicket(ticket.id)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">No tickets found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketList;
