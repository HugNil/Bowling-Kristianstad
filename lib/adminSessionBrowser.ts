import type { User } from 'firebase/auth';
import { recordActivity, sessionRemaining, SessionExpiredError, type AdminSession } from './adminSession';

// Session storage preserves the idle deadline across reloads, but not across tabs.
// Firebase's signed auth_time anchors the absolute deadline; token refresh does not extend it.
export async function loadAdminSession(user: User) {
  const token = await user.getIdTokenResult();
  const authenticatedAt = Number(token.claims.auth_time) * 1000;
  const key = `bowling-admin-session:${user.uid}:${authenticatedAt}`;
  let session: AdminSession = { authenticatedAt, lastActivity: authenticatedAt };
  try {
    const stored = sessionStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.authenticatedAt === authenticatedAt) session = parsed;
    }
  } catch { /* If persistence is unavailable, use the original authentication time. */ }
  if (sessionRemaining(session) <= 0) throw new SessionExpiredError();
  return { key, session };
}
export function saveActivity(key: string, session: AdminSession) {
  const next = recordActivity(session);
  try { sessionStorage.setItem(key, JSON.stringify(next)); } catch { /* In-memory timeout still applies. */ }
  return next;
}
export async function assertAdminSession(user: User | null) {
  if (!user) throw new SessionExpiredError();
  await loadAdminSession(user);
}
