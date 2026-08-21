import { useEffect, useRef, useState } from 'react';
import { X, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../data/mission';

type Intent = 'partnership' | 'media' | 'general';

const intentCopy: Record<Intent, { title: string; subject: string; body: string }> = {
  partnership: {
    title: 'Discuss the right partner role',
    subject: 'Six Continents World Record partnership enquiry',
    body: 'Hello Toufic,\n\nI would like to discuss a possible partner role for the Six Continents World Record mission.\n\nCompany:\nWhat we could help make possible:\nMain objective:\nBest time for a 15 minute conversation:\n\nBest,',
  },
  media: {
    title: 'Media enquiry',
    subject: 'Six Continents World Record media enquiry',
    body: 'Hello Toufic,\n\nI would like to discuss a media opportunity related to the Six Continents World Record mission.\n\nOutlet / organisation:\nRequest:\nDeadline:\n\nBest,',
  },
  general: {
    title: 'Contact Toufic',
    subject: 'Six Continents World Record enquiry',
    body: 'Hello Toufic,\n\nI am reaching out about the Six Continents World Record mission.\n\nMessage:\n\nBest,',
  },
};

export function ContactPanel() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>('partnership');
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ intent?: Intent }>).detail;
      setIntent(detail?.intent || 'partnership');
      setOpen(true);
    };
    window.addEventListener('open-contact-panel', handler);
    return () => window.removeEventListener('open-contact-panel', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButton.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [open]);

  const copy = intentCopy[intent];
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(copy.body)}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-panel-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          role="presentation"
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-panel-title"
            className="contact-panel"
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.22 }}
          >
            <button ref={closeButton} className="contact-panel-close" onClick={() => setOpen(false)} aria-label="Close contact panel">
              <X size={20} />
            </button>

            <div className="eyebrow mb-4">NEXT STEP</div>
            <h2 id="contact-panel-title" className="contact-panel-title">{copy.title}</h2>
            <p className="contact-panel-copy">
              Choose the fastest option. Share the company, what it could help make possible, and the best time for a focused 15 minute conversation.
            </p>

            <div className="contact-intents" aria-label="Enquiry type">
              {(['partnership', 'media', 'general'] as Intent[]).map((item) => (
                <button key={item} className={intent === item ? 'active' : ''} onClick={() => setIntent(item)}>
                  {item === 'partnership' ? 'Partnership' : item === 'media' ? 'Media' : 'General'}
                </button>
              ))}
            </div>

            <div className="contact-options">
              <a className="contact-option contact-option-primary" href={site.whatsapp} target="_blank" rel="noreferrer">
                <span className="contact-option-icon"><MessageCircle size={20} /></span>
                <span>
                  <strong>Message on WhatsApp</strong>
                  <small>Fastest route for a direct conversation</small>
                </span>
                <ArrowUpRight size={18} />
              </a>

              <a className="contact-option" href={mailto}>
                <span className="contact-option-icon"><Mail size={20} /></span>
                <span>
                  <strong>Email Toufic</strong>
                  <small>Best for a formal brief or internal introduction</small>
                </span>
                <ArrowUpRight size={18} />
              </a>
            </div>

            <p className="contact-panel-note">After the conversation, one custom proposal can be built around the company’s goals, exact role, contribution, deliverables, rights, dates, and reporting.</p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
