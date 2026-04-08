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

  const handleAddMessage = (ticketId, newMessage) => {
    setTickets(tickets.map(t =>
      t.id === ticketId
        ? { ...t, messages: [...t.messages, newMessage] }
        : t
    ));
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar selectedTicketId={selectedTicketId} onSelectTicket={setSelectedTicketId} />

      <div className="flex-1 flex flex-col ml-16">
        <Header ticketCount={tickets.length} />

        <div className="flex flex-1 mt-16">
          <TicketList
            tickets={tickets}
            selectedTicketId={selectedTicketId}
            onSelectTicket={setSelectedTicketId}
          />

          {selectedTicket && (
            <TicketDetail
              ticket={selectedTicket}
              onAddMessage={handleAddMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
