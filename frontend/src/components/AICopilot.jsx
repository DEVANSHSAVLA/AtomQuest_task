import { useState } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m the AtomQuest AI Copilot. I can help you draft goals, analyze performance, or navigate the system. What would you like to do?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const aiResponses = {
    'suggest': 'Based on your department (Engineering) and current organizational thrust areas, here are some suggested Q4 goals:\n\n1. **Reduce deployment cycle time by 25%** — Thrust: Innovation\n2. **Achieve 95% unit test coverage on core modules** — Thrust: Quality\n3. **Migrate 3 legacy services to containerized infrastructure** — Thrust: Efficiency\n\nWould you like me to pre-fill any of these into your goal form?',
    'performance': 'Your team\'s Q3 performance summary:\n\n📊 **Completion Rate:** 87% (↑ 4% vs Q2)\n⏱ **Avg Goal Turnaround:** 1.8 days\n🔴 **At-Risk Goals:** 2 (Revenue Target, Cloud Migration)\n✅ **Top Performer:** Mike Chen (100% on-time)\n\nRecommendation: Schedule a check-in with Emma Wilson — her rework rate is 2x the team average.',
    'department': 'Department comparison for Q3 2025:\n\n🥇 **HR:** 95% completion\n🥈 **Sales:** 90% completion\n🥉 **Marketing:** 84% completion\n⚠️ **Engineering:** 76% completion\n🔴 **Logistics:** 65% completion\n\nLogistics has dropped 23% vs their Q1 benchmark. Historical patterns suggest correlation with supply chain disruptions.',
    'default': 'I can help with:\n• **"Suggest goals for Q4"** — AI-powered goal recommendations\n• **"Show my team performance"** — Performance analytics\n• **"Compare departments"** — Department benchmarking\n• **"What goals are at risk?"** — Risk forecasting\n\nJust type your question naturally!'
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const q = input.toLowerCase();
      let response = aiResponses.default;
      if (q.includes('suggest') || q.includes('goal') || q.includes('q4')) response = aiResponses.suggest;
      else if (q.includes('performance') || q.includes('team') || q.includes('summary')) response = aiResponses.performance;
      else if (q.includes('department') || q.includes('compare') || q.includes('lowest') || q.includes('q3')) response = aiResponses.department;

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsThinking(false);
    }, 1200);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-indigo-300/50 hover:scale-105 transition-all group"
      >
        <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[550px] bg-white dark:bg-[#0b1326] dark:bg-white dark:bg-[#0b1326] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#464554] dark:border-gray-200 dark:border-[#464554] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-white" />
          <div>
            <div className="text-white font-bold text-sm">AI Copilot</div>
            <div className="text-indigo-200 text-xs">Powered by AtomQuest Intelligence</div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
              m.role === 'user' 
                ? 'bg-indigo-600 dark:bg-[#c0c1ff] text-white rounded-br-md' 
                : 'bg-gray-50 dark:bg-[#171f33] dark:bg-gray-50 dark:bg-[#171f33] text-gray-900 dark:text-[#dae2fd] dark:text-gray-200 rounded-bl-md'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-50 dark:bg-[#171f33] dark:bg-gray-50 dark:bg-[#171f33] px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-[#464554] dark:border-gray-200 dark:border-[#464554] p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-50 dark:bg-[#171f33] dark:bg-gray-50 dark:bg-[#171f33] border border-gray-200 dark:border-[#464554] dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 text-gray-900 dark:text-[#dae2fd] dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-indigo-600 dark:bg-[#c0c1ff] text-white p-2.5 rounded-xl hover:brightness-110 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
