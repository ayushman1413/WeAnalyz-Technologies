import React, { useState } from 'react';

const Header = ({ ticketCount }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="header">
      <div className="header-left">
        <div className="header-breadcrumb">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#94a3b8'}}>
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span className="header-breadcrumb-text">BOARDS</span>
        </div>

        <div className="header-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="header-ticket-count">
          <span className="header-ticket-badge">{ticketCount}</span>
          <span className="header-ticket-label">tickets</span>
        </div>

        <button className="header-filter-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filter
        </button>

        <button className="header-sort-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="15" y2="12"/>
            <line x1="3" y1="18" x2="9" y2="18"/>
          </svg>
          Sort
        </button>

        <div className="header-avatar-group">
          {['#E8834A', '#6C5CE7', '#00B894', '#5B8EF0'].map((color, i) => (
            <div
              key={i}
              className="header-avatar"
              style={{ backgroundColor: color, marginLeft: i > 0 ? '-8px' : '0' }}
            >
              {['AH', 'SJ', 'MC', 'DA'][i]}
            </div>
          ))}
        </div>

        <button className="header-invite-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Invite
        </button>
      </div>
    </div>
  );
};

export default Header;
