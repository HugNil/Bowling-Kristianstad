export const IDLE_TIMEOUT_MS = 15 * 60 * 1000;
export const MAX_SESSION_MS = 60 * 60 * 1000;
export const SESSION_WARNING_MS = 60 * 1000;
export type AdminSession = { authenticatedAt: number; lastActivity: number };
export class SessionExpiredError extends Error {
  constructor() { super('Din session har gått ut. Logga in igen. Osparade ändringar har inte publicerats.'); }
}
export function sessionRemaining(session: AdminSession, now = Date.now()) {
  if (!Number.isFinite(session.authenticatedAt) || !Number.isFinite(session.lastActivity)
    || session.authenticatedAt > now || session.lastActivity > now) return 0;
  return Math.max(0, Math.min(session.authenticatedAt + MAX_SESSION_MS, session.lastActivity + IDLE_TIMEOUT_MS) - now);
}
export function recordActivity(session: AdminSession, now = Date.now()): AdminSession {
  if (sessionRemaining(session, now) <= 0) throw new SessionExpiredError();
  return { ...session, lastActivity: now };
}
