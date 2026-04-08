import React from 'react';

const TicketCard = ({ ticket, isSelected, onClick }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-blue-600';
      case 'in-progress':
        return 'text-purple-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-50 border-blue-300 shadow-md'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <img
          src={ticket.avatar}
          alt={ticket.customer}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm text-slate-900 truncate">
              {ticket.title}
            </h3>
            <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>
          <p className="text-xs text-slate-600 truncate mb-2">{ticket.customer}</p>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('-', ' ')}
            </span>
            <span className="text-xs text-slate-500">{ticket.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
