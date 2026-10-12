import test from 'node:test';
import assert from 'node:assert/strict';
import { sessionRemaining, recordActivity, IDLE_TIMEOUT_MS, MAX_SESSION_MS, SessionExpiredError } from '../lib/adminSession.ts';
const login = 1700000000000;
test('idle session expires at 15 minutes, including after sleep', () => {
  const session = { authenticatedAt: login, lastActivity: login };
  assert.equal(sessionRemaining(session, login + IDLE_TIMEOUT_MS - 1), 1);
  assert.equal(sessionRemaining(session, login + IDLE_TIMEOUT_MS), 0);
  assert.throws(() => recordActivity(session, login + IDLE_TIMEOUT_MS), SessionExpiredError);
  assert.throws(() => recordActivity(session, login + MAX_SESSION_MS), SessionExpiredError);
});
test('activity extends idle deadline but not the original authentication deadline', () => {
  let session = { authenticatedAt: login, lastActivity: login };
  for (let minutes = 10; minutes <= 50; minutes += 10) session = recordActivity(session, login + minutes * 60000);
  assert.equal(sessionRemaining(session, login + 59 * 60000), 60000);
  assert.equal(sessionRemaining(session, login + MAX_SESSION_MS), 0);
});
test('persisted activity survives reload without resetting the clock', () => {
  const session = JSON.parse(JSON.stringify({ authenticatedAt: login, lastActivity: login + 60000 }));
  assert.equal(sessionRemaining(session, login + 15 * 60000), 60000);
  assert.equal(sessionRemaining(session, login + 16 * 60000), 0);
});
test('invalid or future timestamps fail closed', () => {
  assert.equal(sessionRemaining({ authenticatedAt: NaN, lastActivity: login }, login), 0);
  assert.equal(sessionRemaining({ authenticatedAt: login, lastActivity: Infinity }, login), 0);
  assert.equal(sessionRemaining({ authenticatedAt: login, lastActivity: login + 1 }, login), 0);
});
