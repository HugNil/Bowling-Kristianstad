import { assertAdminSession } from './adminSessionBrowser';
import { doc, getDocFromServer, runTransaction, serverTimestamp } from 'firebase/firestore';
import { getFirebase } from './firebase';
import { validateContent, type SiteContent } from './content';
import { createDefaultContent } from './defaultContent';
export async function readEditorContent(uid: string) {
  const { db, auth } = getFirebase();
  await assertAdminSession(auth.currentUser);
  const membership = await getDocFromServer(doc(db, 'admins', uid));
  if (!membership.exists()) throw new Error('Kontot saknar administratörsbehörighet. Be projektägaren lägga till ditt UID i admins.');
  const snapshot = await getDocFromServer(doc(db, 'site', 'content'));
  if (!snapshot.exists()) return { content: createDefaultContent(), revision: 0 };
  const data = snapshot.data();
  const content: unknown = JSON.parse(data.payload);
  validateContent(content);
  if (!Number.isInteger(data.revision)) throw new Error('Databasens versionsnummer saknas.');
  return { content, revision: data.revision as number };
}
export async function saveEditorContent(content: SiteContent, revision: number) {
  validateContent(content);
  const payload = JSON.stringify(content);
  if (new TextEncoder().encode(payload).length >= 200000) throw new Error('Innehållet är för stort. Korta beskrivningarna eller ta bort gamla undantag.');
  const { db, auth } = getFirebase();
  await assertAdminSession(auth.currentUser);
  const reference = doc(db, 'site', 'content');
  await runTransaction(db, async transaction => {
    await assertAdminSession(auth.currentUser);
    const current = await transaction.get(reference);
    const serverRevision = current.exists() ? current.data().revision : 0;
    if (serverRevision !== revision) throw new Error('Någon annan har sparat ändringar. Kopiera dina ändringar och ladda sedan om sidan innan du försöker igen.');
    transaction.set(reference, { payload, revision: revision + 1, updatedAt: serverTimestamp() });
  });
  return revision + 1;
}
