import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import InviteModal from './InviteModal';
import { ticketsData } from '../data/tickets';

const App = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(1);
  const [tickets, setTickets] = useState(ticketsData);

  const [mobileView, setMobileView] = useState('list');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const [showInvite, setShowInvite] = useState(false);

  const filteredTickets = useMemo(() => {
    let result = tickets;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.customer.toLowerCase().includes(q) ||
          t.ticketId.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q)
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter(t => t.status === filterStatus);
    }

    if (sortOrder === 'newest') {
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'oldest') {
      result = [...result].sort((a, b) => a.id - b.id);
    } else if (sortOrder === 'az') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'za') {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [tickets, searchQuery, filterStatus, sortOrder]);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleSelectTicket = ticketId => {
    setSelectedTicketId(ticketId);
    setMobileView('detail');
  };

  const handleBackToList = () => {
    setMobileView('list');
  };

  const handleAddMessage = (ticketId, newMessage) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId ? { ...t, messages: [...t.messages, newMessage] } : t
      )
    );
  };

  const handleDeleteTicket = ticketId => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    if (selectedTicketId === ticketId) {
      const remaining = tickets.filter(t => t.id !== ticketId);
      setSelectedTicketId(remaining.length > 0 ? remaining[0].id : null);
      setMobileView('list');
    }
  };

  const handleUpdateTicket = (ticketId, updates) => {
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, ...updates } : t))
    );
  };

  return (
    <div className="app-root">
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <Header
          ticketCount={filteredTickets.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onMenuToggle={() => setSidebarOpen(o => !o)}
          onInviteClick={() => setShowInvite(true)}
        />

        <div className="app-body">
          <div className={`app-ticket-list ${mobileView === 'detail' ? 'mobile-hidden' : ''}`}>
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={handleSelectTicket}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </div>

          <div className={`app-ticket-detail ${mobileView === 'list' ? 'mobile-hidden' : ''}`}>
            {selectedTicket ? (
              <TicketDetail
                ticket={selectedTicket}
                onAddMessage={handleAddMessage}
                onBack={handleBackToList}
                onDeleteTicket={handleDeleteTicket}
                onUpdateTicket={handleUpdateTicket}
              />
            ) : (
              <div className="app-empty-state">
                <div className="app-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3>No ticket selected</h3>
                <p>Choose a ticket from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </div>
  );
};

export default App;
