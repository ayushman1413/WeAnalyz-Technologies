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
  const [showDetail, setShowDetail] = useState(true);
  const { isMobile, isDesktop } = useResponsive();

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleSelectTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    if (isMobile) {
      setShowDetail(true);
    }
  };

  const handleBackFromDetail = () => {
    if (isMobile) {
      setShowDetail(false);
    }
  };

  const handleAddMessage = (ticketId, newMessage) => {
    setTickets(tickets.map(t =>
      t.id === ticketId
        ? { ...t, messages: [...t.messages, newMessage] }
        : t
    ));
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header ticketCount={tickets.length} />

        <div className="flex flex-1 min-h-0 pt-16">
          {!showDetail && (
            <div className={`${isMobile ? 'w-full' : isDesktop ? 'w-80' : 'w-72'} border-r border-slate-200 bg-white overflow-hidden flex flex-col`}>
              <TicketList
                tickets={tickets}
                selectedTicketId={selectedTicketId}
                onSelectTicket={handleSelectTicket}
              />
            </div>
          )}

          {selectedTicket && (showDetail || isDesktop) && (
            <div className={`${isMobile && !showDetail ? 'hidden' : 'flex'} flex-1 flex-col min-w-0 overflow-hidden`}>
              <TicketDetail
                ticket={selectedTicket}
                onAddMessage={handleAddMessage}
                onBack={handleBackFromDetail}
              />
            </div>
          )}

          {!selectedTicket && (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
              <p className="text-slate-500">Select a ticket to view details</p>
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
