import React, { useState, useEffect, useRef } from 'react';

const TEAM_MEMBERS = [
  { initials: 'AH', name: 'Allie Harmon', email: 'allie@capacity.com', color: '#E8834A', role: 'Admin' },
  { initials: 'SJ', name: 'Sarah Johnson', email: 'sarah@capacity.com', color: '#6C5CE7', role: 'Agent' },
  { initials: 'MC', name: 'Mike Chen', email: 'mike@capacity.com', color: '#00B894', role: 'Agent' },
  { initials: 'DA', name: 'Danny Amacher', email: 'danny@capacity.com', color: '#5B8EF0', role: 'Admin' },
];

const InviteModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Agent');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSend = e => {
    e.preventDefault();
    if (!email.trim()) { setError('Email is required'); return; }
    if (!validateEmail(email.trim())) { setError('Please enter a valid email address'); return; }
    setError('');
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(''); }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-box--invite" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Invite Team Members</h3>
            <p className="modal-subtitle">Send an invite link to collaborate on tickets</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Invite form */}
        <form onSubmit={handleSend} className="invite-form">
          <div className="invite-form-row">
            <div className="invite-input-wrapper">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'#94a3b8'}}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                ref={inputRef}
                type="email"
                className="invite-email-input"
                placeholder="colleague@company.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); setSent(false); }}
                autoComplete="email"
              />
            </div>
            <select
              className="invite-role-select"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Agent">Agent</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          {error && <p className="invite-error">{error}</p>}
          {sent && (
            <div className="invite-success">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Invite sent to {email}!
            </div>
          )}
          <button type="submit" className="invite-send-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send Invite
          </button>
        </form>

        {/* Current team */}
        <div className="invite-team-section">
          <p className="invite-team-label">Current Team ({TEAM_MEMBERS.length})</p>
          <div className="invite-team-list">
            {TEAM_MEMBERS.map(m => (
              <div key={m.email} className="invite-team-member">
                <div className="invite-member-avatar" style={{ backgroundColor: m.color }}>{m.initials}</div>
                <div className="invite-member-info">
                  <span className="invite-member-name">{m.name}</span>
                  <span className="invite-member-email">{m.email}</span>
                </div>
                <span className={`invite-member-role ${m.role === 'Admin' ? 'role-admin' : 'role-agent'}`}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
