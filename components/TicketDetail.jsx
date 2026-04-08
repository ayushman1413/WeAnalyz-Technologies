import React, { useState } from 'react';
import MessageTabs from './MessageTabs';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useResponsive } from '../contexts/ResponsiveContext';

const TicketDetail = ({ ticket, onAddMessage, onBack }) => {
  const [activeTab, setActiveTab] = useState('public');
  const [messages, setMessages] = useState(ticket.messages);
  const { isMobile } = useResponsive();

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      author: 'Sarah Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPrivate: activeTab === 'private',
      type: 'agent'
    };
    setMessages([...messages, newMessage]);
    onAddMessage(ticket.id, newMessage);
  };

  const publicCount = messages.filter(m => !m.isPrivate).length;
  const privateCount = messages.filter(m => m.isPrivate).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="flex flex-col bg-white h-full overflow-hidden">
      {/* Ticket Header */}
      <div className="border-b border-slate-200 p-4 sm:p-6 bg-white flex-shrink-0 max-h-52 overflow-y-auto">
        <div className="flex items-start justify-between gap-2 mb-4">
          {/* Back button on mobile */}
          {isMobile && onBack && (
            <button
              onClick={onBack}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition flex-shrink-0"
              title="Back to list"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 truncate">{ticket.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600">Ticket ID: #{ticket.id}</p>
          </div>

          <div className="flex gap-2 flex-wrap justify-end flex-shrink-0">
            <button className="px-3 sm:px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-medium text-xs sm:text-sm hover:bg-slate-200 transition whitespace-nowrap">
              Assign
            </button>
            <button className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-blue-600 transition whitespace-nowrap">
              Resolve
            </button>
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-3 py-2 sm:py-4 border-t border-b border-slate-200">
          <img
            src={ticket.avatar}
            alt={ticket.customer}
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 text-sm truncate">{ticket.customer}</p>
            <p className="text-xs text-slate-600 truncate">{ticket.email}</p>
          </div>
        </div>

        {/* Status Tags */}
        <div className="flex items-center gap-2 mt-2 sm:mt-4 flex-wrap">
          <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full ${getStatusBg(ticket.status)}`}>
            {ticket.status.replace('-', ' ')}
          </span>
          <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority} priority
          </span>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 sm:px-3 py-1 rounded-full">
            Created {ticket.createdAt}
          </span>
        </div>
      </div>

      {/* Messages Section */}
      <MessageTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        publicCount={publicCount}
        privateCount={privateCount}
      />

      <MessageList messages={messages} activeTab={activeTab} />

      <MessageInput onSendMessage={handleSendMessage} isPrivate={activeTab === 'private'} />
    </div>
  );
};

export default TicketDetail;
