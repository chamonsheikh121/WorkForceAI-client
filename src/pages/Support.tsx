import { useState } from 'react';
import { tickets } from '@/data/mockData';
import { HelpCircle, MessageSquare, Search, Plus, ChevronDown } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';

const statusColors: Record<string, string> = {
  open: 'badge-danger',
  'in-progress': 'badge-warning',
  resolved: 'badge-success',
  closed: 'badge-info',
};

const faqs = [
  { q: 'How do I reset an employee password?', a: 'Go to Employees → Select employee → Actions → Reset Password. The employee will receive a reset link via email.' },
  { q: 'How do I export payroll data?', a: 'Navigate to Payroll → Reports → Click Export. You can choose CSV, PDF, or Excel format.' },
  { q: 'How do I set up SSO?', a: 'Go to Settings → Integrations → SSO → Configure your SAML or OIDC provider details.' },
  { q: 'How do leave approval workflows work?', a: 'Leave requests flow: Employee → Manager → HR. Configure custom workflows in Settings → Leave Policies.' },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'agent'; text: string }[]>([
    { role: 'agent' as const, text: 'Hi! How can I help you today? I can assist with account issues, technical problems, or feature questions.' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user' as const, text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'agent', text: "Thank you for reaching out! I've created a ticket for your request. A support agent will follow up within 2 hours. Ticket ID: #" + Math.floor(1000 + Math.random() * 9000) }]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Support</h1>
        <p className="page-subheader">Get help, manage tickets, and browse FAQs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Open Tickets" value={tickets.filter(t => t.status === 'open').length} icon={HelpCircle} />
        <KPICard title="In Progress" value={tickets.filter(t => t.status === 'in-progress').length} icon={MessageSquare} />
        <KPICard title="Resolved Today" value={12} change={25} icon={HelpCircle} />
        <KPICard title="Avg Response Time" value="2.4h" change={-15.3} icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tickets */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">Support Tickets</h3>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-3 h-3" />
              New Ticket
            </button>
          </div>
          <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
            {tickets.slice(0, 15).map((t, i) => (
              <div key={t.id} className="flex items-center justify-between px-4 py-3 border-b border-border/50 table-row-hover">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · {t.createdAt}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${
                    t.priority === 'high' ? 'badge-danger' : t.priority === 'medium' ? 'badge-warning' : 'badge-info'
                  }`}>{t.priority}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[t.status]}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="glass-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold">Live Chat Support</h3>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin max-h-[300px]">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary/60 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleChat()}
                placeholder="Type your message..."
                className="flex-1 h-10 px-4 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button onClick={handleChat} className="px-4 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors text-left"
              >
                <span className="text-sm font-medium">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-muted-foreground animate-fade-in">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
