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

  const priorityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  const publicCount = messages.filter(m => !m.isPrivate).length;
  const privateCount = messages.filter(m => m.isPrivate).length;

  return (\n    <div className=\"flex flex-col bg-white h-full overflow-hidden\">\n      <div className=\"border-b border-slate-200 p-4 sm:p-6 bg-white flex-shrink-0 max-h-52 overflow-y-auto\">\n        <div className=\"flex items-start justify-between gap-2 mb-4\">\n          {isMobile && onBack && (\n            <button\n              onClick={onBack}\n              className=\"p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition flex-shrink-0\"\n              title=\"Back\"\n            >\n              <svg className=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M15 19l-7-7 7-7\" />\n              </svg>\n            </button>\n          )}\n\n          <div className=\"flex-1 min-w-0\">\n            <h2 className=\"text-lg sm:text-2xl font-bold text-slate-900 mb-2 truncate\">{ticket.title}</h2>\n            <p className=\"text-xs sm:text-sm text-slate-600\">Ticket ID: #{ticket.id}</p>\n          </div>\n\n          <div className=\"flex gap-2 flex-wrap justify-end flex-shrink-0\">\n            <button className=\"px-3 sm:px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-medium text-xs sm:text-sm hover:bg-slate-200 transition whitespace-nowrap\">\n              Assign\n            </button>\n            <button className=\"px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-blue-600 transition whitespace-nowrap\">\n              Resolve\n            </button>\n          </div>\n        </div>\n\n        <div className=\"flex items-center gap-3 py-2 sm:py-4 border-t border-b border-slate-200\">\n          <img\n            src={ticket.avatar}\n            alt={ticket.customer}\n            className=\"w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0\"\n          />\n          <div className=\"flex-1 min-w-0\">\n            <p className=\"font-semibold text-slate-900 text-sm truncate\">{ticket.customer}</p>\n            <p className=\"text-xs text-slate-600 truncate\">{ticket.email}</p>\n          </div>\n        </div>\n\n        <div className=\"flex items-center gap-2 mt-2 sm:mt-4 flex-wrap\">\n          <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full ${statusColors[ticket.status] || statusColors.open}`}>\n            {ticket.status.replace('-', ' ')}\n          </span>\n          <span className={`text-xs font-medium px-2 sm:px-3 py-1 rounded-full ${priorityColors[ticket.priority] || priorityColors.low}`}>\n            {ticket.priority} priority\n          </span>\n          <span className=\"text-xs bg-slate-100 text-slate-700 px-2 sm:px-3 py-1 rounded-full\">\n            Created {ticket.createdAt}\n          </span>\n        </div>\n      </div>\n\n      <MessageTabs activeTab={activeTab} onTabChange={setActiveTab} publicCount={publicCount} privateCount={privateCount} />\n      <MessageList messages={messages} activeTab={activeTab} />\n      <MessageInput onSendMessage={handleSendMessage} isPrivate={activeTab === 'private'} />\n    </div>\n  );\n};\n\nexport default TicketDetail;"
