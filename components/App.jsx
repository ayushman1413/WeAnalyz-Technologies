import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import { ticketsData } from '../data/tickets';

const App = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(1);
  const [tickets, setTickets] = useState(ticketsData);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleSelectTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
  };

  const handleAddMessage = (ticketId, newMessage) => {
    setTickets(tickets.map(t =>
      t.id === ticketId
        ? { ...t, messages: [...t.messages, newMessage] }
        : t
    ));
  };

  return (
    <div className="app-root">
      <Sidebar />
      <div className="app-main">
        <Header ticketCount={tickets.length} />
        <div className="app-body">
          <div className="app-ticket-list">
            <TicketList
              tickets={tickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={handleSelectTicket}
            />
          </div>
          <div className="app-ticket-detail">
            {selectedTicket ? (
              <TicketDetail
                ticket={selectedTicket}
                onAddMessage={handleAddMessage}
              />
            ) : (
              <div className="app-empty-state">
                <div className="app-empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3>Select a ticket</h3>
                <p>Choose a ticket from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
