import React, { useState, useRef, useEffect } from 'react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' },
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Tickets' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'pending', label: 'Pending' },
];

const Header = ({
  ticketCount,
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortOrder,
  onSortChange,
  onMenuToggle,
  onInviteClick,
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handler = e => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilterMenu(false);
      if (sortRef.current && !sortRef.current.contains(e.target)) setShowSortMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeFilter = FILTER_OPTIONS.find(f => f.value === filterStatus) || FILTER_OPTIONS[0];
  const activeSort = SORT_OPTIONS.find(s => s.value === sortOrder) || SORT_OPTIONS[0];

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuToggle} aria-label="Open menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div className="header-breadcrumb">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}>
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span className="header-breadcrumb-text">BOARDS</span>
        </div>

        <div className="header-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="header-search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="header-search-input"
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="header-search-input"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              className="header-search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        <div className="header-ticket-count">
          <span className="header-ticket-badge">{ticketCount}</span>
          <span className="header-ticket-label">tickets</span>
        </div>

        <div className="header-dropdown-wrapper" ref={filterRef}>
          <button
            id="header-filter-btn"
            className={`header-action-btn ${filterStatus !== 'all' ? 'header-action-btn--active' : ''}`}
            onClick={() => { setShowFilterMenu(v => !v); setShowSortMenu(false); }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            <span className="btn-text">
              {filterStatus !== 'all' ? activeFilter.label : 'Filter'}
            </span>
            {filterStatus !== 'all' && (
              <span
                role="button"
                className="header-btn-clear"
                onClick={e => { e.stopPropagation(); onFilterChange('all'); }}
                aria-label="Clear filter"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </span>
            )}
          </button>
          {showFilterMenu && (
            <div className="header-dropdown">
              <div className="header-dropdown-label">Filter by status</div>
              {FILTER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`header-dropdown-item ${filterStatus === opt.value ? 'header-dropdown-item--active' : ''}`}
                  onClick={() => { onFilterChange(opt.value); setShowFilterMenu(false); }}
                >
                  {opt.label}
                  {filterStatus === opt.value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="header-dropdown-wrapper" ref={sortRef}>
          <button
            id="header-sort-btn"
            className={`header-action-btn ${sortOrder !== 'newest' ? 'header-action-btn--active' : ''}`}
            onClick={() => { setShowSortMenu(v => !v); setShowFilterMenu(false); }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="15" y2="12"/>
              <line x1="3" y1="18" x2="9" y2="18"/>
            </svg>
            <span className="btn-text">Sort</span>
          </button>
          {showSortMenu && (
            <div className="header-dropdown">
              <div className="header-dropdown-label">Sort by</div>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`header-dropdown-item ${sortOrder === opt.value ? 'header-dropdown-item--active' : ''}`}
                  onClick={() => { onSortChange(opt.value); setShowSortMenu(false); }}
                >
                  {opt.label}
                  {sortOrder === opt.value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="header-avatar-group">
          {[
            { initials: 'NG', color: '#E8834A', name: 'Neha Gupta' },
            { initials: 'RM', color: '#6C5CE7', name: 'Riya Mehta' },
            { initials: 'AP', color: '#00B894', name: 'Arjun Patel' },
            { initials: 'PS', color: '#5B8EF0', name: 'Priya Sharma' },
          ].map((av, i) => (
            <div
              key={i}
              className="header-avatar"
              style={{ backgroundColor: av.color, zIndex: 4 - i }}
              title={av.name}
            >
              {av.initials}
            </div>
          ))}
        </div>

        <button id="header-invite-btn" className="header-invite-btn" onClick={onInviteClick}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span className="btn-text">Invite</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
