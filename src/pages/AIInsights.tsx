import { useState } from 'react';
import { Brain, Send, Sparkles, TrendingUp, AlertTriangle, Users, Target } from 'lucide-react';

const insights = [
  {
    type: 'prediction',
    icon: TrendingUp,
    title: 'Revenue Growth Forecast',
    desc: 'Based on current trends, projected ARR will reach $18.2M by Q4 2025, a 34% increase from current levels.',
    confidence: 92,
    color: 'text-emerald-400',
  },
  {
    type: 'alert',
    icon: AlertTriangle,
    title: 'Attrition Risk Detected',
    desc: '12 employees in Engineering show signs of disengagement. Recommend retention interviews within 2 weeks.',
    confidence: 78,
    color: 'text-amber-400',
  },
  {
    type: 'recommendation',
    icon: Users,
    title: 'Hiring Optimization',
    desc: 'LinkedIn referrals yield 40% higher quality candidates. Consider increasing referral bonuses by 25%.',
    confidence: 85,
    color: 'text-sky-400',
  },
  {
    type: 'prediction',
    icon: Target,
    title: 'Project Delay Risk',
    desc: 'Cloud Migration project has a 68% probability of missing the June deadline. Resource allocation needs review.',
    confidence: 68,
    color: 'text-red-400',
  },
  {
    type: 'recommendation',
    icon: Sparkles,
    title: 'Performance Improvement',
    desc: 'Teams using the new sprint methodology show 23% higher velocity. Recommend company-wide rollout.',
    confidence: 88,
    color: 'text-primary',
  },
];

const suggestedQuestions = [
  'Which employees are underperforming?',
  'Which project is at risk of delay?',
  'What is the churn risk for next quarter?',
  'Show me salary benchmarks by department',
  'What are the top reasons for employee turnover?',
];

export default function AIInsights() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your AI workforce analyst. Ask me anything about your employees, projects, performance metrics, or organizational health. I can provide data-driven insights and recommendations." },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'underperforming': 'Based on performance data analysis, **14 employees** are scoring below the 60% threshold. The highest concentration is in the **Sales department** (5 employees) followed by **Support** (4 employees). Key factors include: low task completion rates, below-average attendance, and missed project deadlines. I recommend scheduling 1:1 reviews and offering targeted training programs.',
        'risk': 'The **Cloud Migration** project has the highest risk score (68% delay probability). Key risk factors:\n- 2 critical dependencies are blocked\n- Team velocity has decreased 15% in the last sprint\n- Resource utilization is at 120%\n\nThe **Security Audit** project is also flagged with moderate risk due to scope expansion.',
        'churn': 'Q3 churn risk analysis:\n- **3 companies** (Starter plan) show high churn signals: reduced login frequency, declining feature usage\n- Estimated revenue at risk: **$12,400 MRR**\n- Recommendation: Proactive outreach with feature adoption workshops',
        'salary': 'Salary benchmark analysis:\n- **Engineering**: $95K-$195K (avg $142K) — 8% above market\n- **Sales**: $65K-$160K (avg $108K) — at market\n- **Marketing**: $55K-$130K (avg $88K) — 5% below market\n- **Finance**: $70K-$170K (avg $115K) — at market\n\nRecommendation: Review Marketing compensation to reduce attrition risk.',
      };

      const key = Object.keys(responses).find(k => userMsg.toLowerCase().includes(k));
      const response = key ? responses[key] : `I've analyzed your query about "${userMsg}". Based on current data, here are the key findings:\n\n1. Overall workforce health is **strong** with 92.4% attendance rate\n2. Department performance averages range from 67-91 across all teams\n3. Current hiring pipeline has 150 active candidates\n\nWould you like me to dive deeper into any specific area?`;

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">AI Insights</h1>
        <p className="page-subheader">Predictive analytics, smart alerts, and AI-powered recommendations</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, i) => (
          <div key={i} className="glass-card-hover p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center ${insight.color}`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{insight.type}</span>
                  <span className="text-xs font-medium text-primary">{insight.confidence}% confidence</span>
                </div>
                <h3 className="text-sm font-semibold mb-1">{insight.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Chat */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold">AI Assistant</h3>
          <span className="text-xs text-muted-foreground ml-auto">Powered by WorkForceAI</span>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-secondary/60 rounded-bl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Questions */}
        <div className="px-4 py-2 border-t border-border flex gap-2 overflow-x-auto scrollbar-thin">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => { setInput(q); }}
              className="shrink-0 px-3 py-1.5 bg-secondary/40 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask the AI assistant..."
              className="flex-1 h-10 px-4 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <button onClick={handleSend} className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
