import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import { ResponsiveProvider, useResponsive } from '../contexts/ResponsiveContext';
import { ticketsData } from '../data/tickets';

const AppContent = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(1);
  const [tickets, setTickets] = useState(ticketsData);
  const [showTicketList, setShowTicketList] = useState(true);
  const { isMobile, isTablet, sidebarOpen } = useResponsive();

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleAddMessage = (ticketId, newMessage) => {
    setTickets(tickets.map(t =>
      t.id === ticketId
        ? { ...t, messages: [...t.messages, newMessage] }
        : t
    ));
  };

  const handleSelectTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    if (isMobile) {
      setShowTicketList(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header ticketCount={tickets.length} onShowTicketList={() => setShowTicketList(!showTicketList)} />

        {/* Content Area */}
        <div className="flex flex-1 min-h-0 pt-16">
          {/* Ticket List */}
          {(showTicketList || !isMobile) && (
            <div className={`${isMobile ? 'absolute left-0 top-16 bottom-0 w-full z-30 bg-white' : isTablet ? 'w-72' : 'w-80'} flex flex-col border-r border-slate-200 overflow-hidden`}>
              <TicketList
                tickets={tickets}
                selectedTicketId={selectedTicketId}
                onSelectTicket={handleSelectTicket}
              />
            </div>
          )}

          {/* Ticket Detail */}
          {selectedTicket && !showTicketList && (isMobile || !isMobile) && (
            <div className={`${isMobile && showTicketList ? 'hidden' : 'flex'} flex-1 flex-col min-w-0 overflow-hidden`}>
              <TicketDetail
                ticket={selectedTicket}
                onAddMessage={handleAddMessage}
                onBack={() => isMobile && setShowTicketList(true)}
              />
            </div>
          )}

          {/* Desktop: Show detail on the right */}
          {selectedTicket && !isMobile && showTicketList && (
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <TicketDetail
                ticket={selectedTicket}
                onAddMessage={handleAddMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ResponsiveProvider>
      <AppContent />
    </ResponsiveProvider>
  );
};

export default App;
