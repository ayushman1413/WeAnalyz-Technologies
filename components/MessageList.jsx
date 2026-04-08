import React from 'react';

const MessageList = ({ messages, activeTab }) => {
  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'public') return !msg.isPrivate;
    if (activeTab === 'private') return msg.isPrivate;
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
      {filteredMessages.length > 0 ? (
        filteredMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.type === 'agent' ? 'flex-row-reverse' : ''}`}
          >
            <img
              src={msg.avatar}
              alt={msg.author}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className={`flex-1 ${msg.type === 'agent' ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-900">
                  {msg.author}
                </span>
                <span className="text-xs text-slate-500">{msg.timestamp}</span>
                {msg.isPrivate && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Private
                  </span>
                )}
              </div>
              <div
                className={`inline-block p-3 rounded-lg ${
                  msg.type === 'agent'
                    ? 'bg-blue-100 text-slate-900'
                    : 'bg-white border border-slate-200 text-slate-900'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-slate-500">No messages in this view</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;
