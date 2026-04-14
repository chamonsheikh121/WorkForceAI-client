import { useState, useEffect } from 'react';
import { Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/PublicNavbar';

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Force light mode - never dark
  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    root.classList.add('light');
    
    // Always restore to light on unmount
    return () => {
      root.className = '';
      root.classList.add('light');
    };
  }, []);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How long does it take to set up WorkForceAI?',
          a: 'You can be up and running within minutes. Our setup wizard guides you through the process step-by-step, and you can start managing employees immediately.',
        },
        {
          q: 'Do you offer a free trial?',
          a: 'Yes! We offer a 14-day free trial for all plans with full access to all features. No credit card required.',
        },
        {
          q: 'Can I import my existing employee data?',
          a: 'Absolutely. We support bulk imports from Excel, CSV, and other HR systems. Our team can also help with data migration.',
        },
        {
          q: 'What training is provided?',
          a: 'We provide comprehensive onboarding, video tutorials, documentation, and dedicated support to ensure your team gets the most out of WorkForceAI.',
        },
      ],
    },
    {
      category: 'Features & Functionality',
      questions: [
        {
          q: 'Can I customize the system to match my company processes?',
          a: 'Yes, WorkForceAI is highly customizable. You can configure workflows, custom fields, reports, and more to match your unique business needs.',
        },
        {
          q: 'Does WorkForceAI support multiple locations/offices?',
          a: 'Yes, our platform supports unlimited locations. You can manage employees across multiple offices with centralized payroll and reporting.',
        },
        {
          q: 'Can I integrate with other tools we use?',
          a: 'WorkForceAI integrates with popular tools including Slack, Google Workspace, Stripe, and more. We also provide API access for custom integrations.',
        },
        {
          q: 'How often are payroll runs processed?',
          a: 'You can process payroll monthly, bi-weekly, weekly, or on custom schedules. Our automated system handles deductions, taxes, and compliance automatically.',
        },
      ],
    },
    {
      category: 'Security & Compliance',
      questions: [
        {
          q: 'Is my data secure?',
          a: 'Yes. We use bank-level encryption (256-bit SSL), regular security audits, and SOC 2 compliance to ensure your data is protected.',
        },
        {
          q: 'What compliance standards do you meet?',
          a: 'We comply with GDPR, CCPA, SOC 2, and support tax compliance across multiple countries and jurisdictions.',
        },
        {
          q: 'Where is my data stored?',
          a: 'Your data is securely stored in multiple geographic locations with automatic backups. We offer both US and EU data centers.',
        },
        {
          q: 'Can I export my data anytime?',
          a: 'Yes, you can export all your data in standard formats (CSV, Excel) at any time without any restrictions.',
        },
      ],
    },
    {
      category: 'Billing & Payments',
      questions: [
        {
          q: 'Can I change my plan anytime?',
          a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we handle prorated billing.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, bank transfers, and can arrange custom payment terms for Enterprise customers.',
        },
        {
          q: 'Is there a setup fee?',
          a: 'No setup fees for Starter and Professional plans. Enterprise customers may have custom arrangements - contact our sales team.',
        },
        {
          q: 'What is your refund policy?',
          a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with WorkForceAI for any reason.',
        },
      ],
    },
    {
      category: 'Support & Help',
      questions: [
        {
          q: 'What support options are available?',
          a: 'We offer email support for all plans, priority support for Professional, and 24/7 dedicated support for Enterprise customers.',
        },
        {
          q: 'What is your average response time?',
          a: 'We typically respond to support requests within 1 hour for priority support and 4 hours for standard support.',
        },
        {
          q: 'Do you have comprehensive documentation?',
          a: 'Yes, we have extensive documentation, video tutorials, webinars, and a community forum where users can share best practices.',
        },
        {
          q: 'Can I request new features?',
          a: 'Absolutely! We actively gather customer feedback and incorporate feature requests into our product roadmap.',
        },
      ],
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about WorkForceAI features, pricing, and support.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl font-bold mb-6 text-primary">{section.category}</h2>
              <div className="space-y-3">
                {section.questions.map((faq, faqIndex) => {
                  const globalIndex = faqs
                    .slice(0, sectionIndex)
                    .reduce((sum, s) => sum + s.questions.length, 0) + faqIndex;
                  const isExpanded = expandedFaq === globalIndex;

                  return (
                    <button
                      key={faqIndex}
                      onClick={() => toggleFaq(globalIndex)}
                      className="w-full text-left"
                    >
                      <div className="p-6 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/70 transition-all">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold text-lg">{faq.q}</h3>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>

                        {isExpanded && (
                          <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Still have questions?</h2>
          <p className="text-lg text-muted-foreground">
            Can't find the answer you're looking for? Please contact our supportive team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              Send us an email
            </Button>
            <Button size="lg" className="gap-2">
              <Zap className="w-5 h-5" />
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold">WorkForceAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 WorkForceAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
