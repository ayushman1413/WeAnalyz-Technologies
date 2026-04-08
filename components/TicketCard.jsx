import React from 'react';

const TicketCard = ({ ticket, isSelected, onClick }) => {
  const priorityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  const statusColors = {
    open: 'text-blue-600',
    'in-progress': 'text-purple-600',
    pending: 'text-yellow-600',
  };

  return (
    <div
      onClick={onClick}
      className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-50 border-blue-300 shadow-md'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <img
          src={ticket.avatar}
          alt={ticket.customer}
          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
              {ticket.title}
            </h3>
            <span className={`text-xs font-medium px-2 py-0.5 sm:py-1 rounded flex-shrink-0 ${priorityColors[ticket.priority] || priorityColors.low}`}>
              {ticket.priority}
            </span>
          </div>
          <p className="text-xs text-slate-600 truncate mb-2">{ticket.customer}</p>
          <div className="flex items-center justify-between text-xs">
            <span className={`text-xs font-medium ${statusColors[ticket.status] || statusColors.open}`}>
              {ticket.status.replace('-', ' ')}
            </span>
            <span className="text-xs text-slate-500 flex-shrink-0">{ticket.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
