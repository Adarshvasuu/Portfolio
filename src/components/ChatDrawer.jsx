import { useState, useRef, useEffect } from 'react';
import { SAMPLE_CHAT_MESSAGES } from '../data/mockData.js';

export default function ChatDrawer({ offer, onClose }) {
  const [messages, setMessages] = useState(SAMPLE_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'buyer', text: input.trim(), time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'provider', text: "Thanks for your message! I'll review and get back shortly. Looking forward to working together! 🙌", time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) }]);
    }, 1200);
  };

  return (
    <>
      <div className="chat-overlay" onClick={onClose} />
      <div className="chat-drawer" role="dialog" aria-label="Chat">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="provider-avatar" style={{width:36,height:36,background:offer.provider?.avatarColor||'#C41E3A',fontSize:'1rem',borderRadius:12}}>
              {offer.provider?.avatar || '👤'}
            </div>
            <div>
              <div className="chat-title">{offer.provider?.name}</div>
              <div className="chat-online">Online</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-xs btn-icon" onClick={onClose} id="chat-close-btn">✕</button>
        </div>
        <div className="chat-messages">
          {messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.sender}`}>
              <div className="chat-bubble">{m.text}</div>
              <div className="chat-time">{m.time}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-row">
          <textarea className="chat-input" placeholder="Type a message…" value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} }} rows={1} id="chat-input" />
          <button className="btn btn-crimson btn-sm" onClick={send} disabled={!input.trim()} id="chat-send">Send</button>
        </div>
      </div>
    </>
  );
}
