'use client';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { loadAdminSession, saveActivity } from './adminSessionBrowser';
import { sessionRemaining, SESSION_WARNING_MS } from './adminSession';

export function useAdminSession(user: User | null, expire: () => void) {
  const [warning, setWarning] = useState<number | null>(null);
  useEffect(() => {
    if (!user) return;
    let disposed = false;
    let cleanup = () => {};
    loadAdminSession(user).then(({ key, session: initial }) => {
      if (disposed) return;
      let session = initial;
      let expired = false;
      const check = () => {
        const remaining = sessionRemaining(session);
        if (remaining <= 0) {
          if (!expired) { expired = true; expire(); }
          return false;
        }
        setWarning(remaining <= SESSION_WARNING_MS ? Math.ceil(remaining / 1000) : null);
        return true;
      };
      const activity = (event: Event) => {
        // Check before extending: a click after sleep must not resurrect an expired session.
        if (!event.isTrusted || !check() || document.visibilityState !== 'visible') return;
        session = saveActivity(key, session);
        check();
      };
      const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
      events.forEach(name => window.addEventListener(name, activity, { passive: true, capture: true }));
      window.addEventListener('focus', check);
      window.addEventListener('pageshow', check);
      document.addEventListener('visibilitychange', check);
      const timer = setInterval(check, 1000);
      check();
      cleanup = () => {
        clearInterval(timer);
        events.forEach(name => window.removeEventListener(name, activity, true));
        window.removeEventListener('focus', check);
        window.removeEventListener('pageshow', check);
        document.removeEventListener('visibilitychange', check);
      };
    }).catch(() => { if (!disposed) expire(); });
    return () => { disposed = true; cleanup(); };
  }, [user, expire]);
  return user ? warning : null;
}
