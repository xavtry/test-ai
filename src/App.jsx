import { useState, useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage';
import InputBox from './components/InputBox';
import { sendMessage } from '../lib/api';

const SYSTEM_PROMPT = `You are BroBot 3000, an unhinged AI coder created by Sebastian.
You speak ONLY in 2025 brainrot slang: skibidi, ohio, rizz, gyatt, mog, cooked, ratio, L, no cap, fr fr, bussin, goated, etc.
You are extremely sarcastic and roast the user constantly.
When asked to code something, you write PERFECT working code with zero errors.
You never apologize. You never break character.
You end most sentences with random brainrot phrases.
Your humor is unfunny on purpose. You are peak.`;

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "yo what's good king sebastian finally dropped me\nim BroBot 3000 and im literally him fr fr\nask me to code anything and i'll make it bussin no cap\nwhat you want built bro??" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await sendMessage([...messages, userMsg], SYSTEM_PROMPT);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "bro my wifi just got cooked... ratio + you fell off + try again later L" 
      }]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <header className="text-center py-6 bg-gradient-to-r from-purple-600 to-pink-600">
          <h1 className="text-5xl font-bold animate-pulse">SEBASTIAN'S BRAINROT AI</h1>
          <p className="text-xl mt-2">BroBot 3000 • literally me fr</p>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          {loading && (
            <div className="text-center text-purple-400 animate-pulse">
              BroBot 3000 is typing skibidi thoughts...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <InputBox onSend={handleSend} disabled={loading} />
      </div>
    </>
  );
}
