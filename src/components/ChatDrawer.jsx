import { useState, useRef, useEffect } from 'react';
import { SAMPLE_CHAT_MESSAGES } from '../data/mockData.js';

export default function ChatDrawer({ offer, onClose }) {
  const [messages, setMessages] = useState(SAMPLE_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: 'buyer', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulated reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'provider',
        text: "Thanks for your message! I'll get back to you shortly. Looking forward to working together.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1200);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <div className="chat-overlay" onClick={onClose} />
      <div className="chat-drawer" role="dialog" aria-label="Chat with provider">
        <div className="chat-header">
          <div className="chat-header-info">
            <div
              className="provider-avatar"
              style={{ width: 36, height: 36, background: offer.provider?.avatarColor || '#6c63ff', fontSize: '1rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {offer.provider?.avatar || '👤'}
            </div>
            <div>
              <div className="chat-title">{offer.provider?.name}</div>
              <div className="chat-sub" style={{ color: 'var(--clr-accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                Online
              </div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm btn-icon" onClick={onClose} aria-label="Close chat" id="chat-close-btn">✕</button>
        </div>
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.sender}`}>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-time">{msg.time}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-row">
          <textarea
            className="chat-input"
            placeholder="Type a message…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            id="chat-input-field"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={send}
            disabled={!input.trim()}
            id="chat-send-btn"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
