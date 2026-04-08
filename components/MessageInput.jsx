import React, { useState, useRef } from 'react';

const MessageInput = ({ onSendMessage, isPrivate }) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = e => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setText('');
    setIsTyping(false);
    textareaRef.current?.focus();
  };

  const handleChange = e => {
    setText(e.target.value);
    setIsTyping(e.target.value.length > 0);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const insertFormatting = (before, after = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = text.slice(start, end);
    const newText = text.slice(0, start) + before + selected + after + text.slice(end);
    setText(newText);
    setIsTyping(newText.length > 0);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleDiscard = () => {
    setText('');
    setIsTyping(false);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  return (
    <div className={`message-input-wrapper ${isPrivate ? 'message-input-wrapper--private' : ''}`}>
      {isTyping && (
        <div className="typing-indicator">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-text">You are typing…</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="message-input-toolbar">
          <button type="button" className="toolbar-btn" title="Bold (⌘B)" onClick={() => insertFormatting('**', '**')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            </svg>
          </button>
          <button type="button" className="toolbar-btn" title="Italic (⌘I)" onClick={() => insertFormatting('_', '_')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/>
              <line x1="15" y1="4" x2="9" y2="20"/>
            </svg>
          </button>
          <button type="button" className="toolbar-btn" title="Link" onClick={() => insertFormatting('[', '](url)')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </button>
          <div className="toolbar-divider" />
          <button type="button" className="toolbar-btn" title="Bullet list" onClick={() => insertFormatting('\n- ')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
          <button type="button" className="toolbar-btn" title="@Mention" onClick={() => insertFormatting('@')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
            </svg>
          </button>
          <button type="button" className="toolbar-btn" title="Attach file (UI only)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
        </div>

        <textarea
          ref={textareaRef}
          className="message-input-field"
          placeholder={isPrivate ? 'Write a private note… (only visible to team)' : 'Type your reply…'}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={3}
        />

        <div className="message-input-footer">
          <span className="input-hint">⌘+Enter to send</span>
          <div className="message-input-actions">
            {text.trim() && (
              <button type="button" className="btn-secondary-sm" onClick={handleDiscard}>
                Discard
              </button>
            )}
            <button type="submit" className="btn-primary-sm" disabled={!text.trim()}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              {isPrivate ? 'Add Note' : 'Send Reply'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
