
import React from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const ChatbotUI: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm NeonFit AI. How can I help you crush your fitness goals today?" }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await getGeminiResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full neon-glow transition-all flex items-center justify-center z-[100] ${
          isOpen ? 'bg-zinc-800 rotate-90' : 'bg-orange-500 hover:scale-110 active:scale-95'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[500px] glass-panel border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl z-[100] animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                <Bot className="text-orange-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-orange-500 text-sm">NEONFIT COACH</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Active Intelligence</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-zinc-700' : 'bg-orange-500/20'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-300" /> : <Bot className="w-4 h-4 text-orange-500" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-orange-500 text-white font-medium rounded-tr-none' 
                      : 'bg-zinc-800/80 text-zinc-200 rounded-tl-none border border-zinc-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="flex gap-2 items-center bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none border border-zinc-700">
                   <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                   <span className="text-sm text-zinc-400 font-medium">NeonFit is thinking...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about exercises, diets..."
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-orange-500 transition-all text-sm placeholder:text-zinc-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1.5 p-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
               <Sparkles className="w-3 h-3" /> Powered by Gemini AI
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotUI;
