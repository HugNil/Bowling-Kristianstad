'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';

export default function QuestionChat() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const sv = lang === 'sv';
  const strings = getStrings(lang);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('bowling');
  const [selected, setSelected] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const answer = useRef<HTMLDivElement>(null);
  const firstQuestion = useRef<HTMLButtonElement>(null);
  const topics = [
    { id: 'bowling', title: 'Bowling', items: strings.home.faqItems, href: '/pricing' },
    { id: 'prices', title: sv ? 'Priser & betalning' : 'Prices & payment', items: strings.pricing.faqItems, href: '/pricing' },
    { id: 'party', title: sv ? 'Kalas & Party' : 'Birthday parties', items: strings.birthday.faqItems, href: '/birthday' },
  ];
  const current = topics.find(item => item.id === topic)!;
  const question = selected === null ? null : current.items[selected];

  useEffect(() => {
    if (open) closeButton.current?.focus();
  }, [open]);
  useEffect(() => {
    if (selected !== null) answer.current?.focus();
  }, [selected]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  if (pathname.startsWith('/admin')) return null;

  return <div className="question-chat">
    {open && <section
      id="question-chat-panel"
      className="question-chat-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="question-chat-title"
      onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}
    >
      <div className="question-chat-heading">
        <div><h2 id="question-chat-title">{sv ? 'Vad undrar du över?' : 'How can we help?'}</h2><p>{sv ? 'Välj en fråga och få svar direkt.' : 'Choose a question for an instant answer.'}</p></div>
        <button ref={closeButton} onClick={close} aria-label={sv ? 'Stäng frågechatten' : 'Close question chat'}>×</button>
      </div>
      <div className="question-chat-body">
        <div className="question-chat-topics" aria-label={sv ? 'Ämnen' : 'Topics'}>
          {topics.map(item => <button key={item.id} aria-pressed={topic === item.id} onClick={() => { setTopic(item.id); setSelected(null); }}>{item.title}</button>)}
        </div>
        {question ? <>
          <p className="question-chat-question">{question.question}</p>
          <div ref={answer} tabIndex={-1} className="question-chat-answer" aria-label={sv ? 'Svar' : 'Answer'}>
            <p>{question.answer}</p>
            <Link href={current.href} onClick={close}>{sv ? 'Läs mer' : 'Read more'} ↗</Link>
          </div>
          <button className="question-chat-back" onClick={() => { setSelected(null); requestAnimationFrame(() => firstQuestion.current?.focus()); }}>← {sv ? 'Välj en annan fråga' : 'Choose another question'}</button>
        </> : <div className="question-chat-options">
          {current.items.map((item, index) => <button ref={index === 0 ? firstQuestion : undefined} key={item.question} onClick={() => setSelected(index)}>{item.question}<span aria-hidden="true">↗</span></button>)}
        </div>}
        <div className="question-chat-links">
          <Link href="/openinghours" onClick={close}>{sv ? 'Öppettider' : 'Opening hours'}</Link>
          <Link href="/pricing" onClick={close}>{sv ? 'Aktuella priser' : 'Current prices'}</Link>
        </div>
      </div>
      <div className="question-chat-contact"><span>{sv ? 'Boka eller fråga oss direkt' : 'Book or ask us directly'}</span><a href="tel:+4644122215">044-12 22 15 ↗</a></div>
    </section>}
    <button ref={trigger} className="question-chat-trigger" aria-expanded={open} aria-controls="question-chat-panel" onClick={() => open ? close() : setOpen(true)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" /><path d="M8 8h8M8 12h5" /></svg>
      {open ? (sv ? 'Stäng' : 'Close') : (sv ? 'Frågor & svar' : 'Questions & answers')}
    </button>
  </div>;
}
