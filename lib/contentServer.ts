import 'server-only';
import { cache } from 'react';
import { createDefaultContent } from './defaultContent';
import { validateContent, type ContentState } from './content';

// Read the same public document as visitors, without Admin credentials or a rules bypass.
// Cache is shared by the Next server, not one Firestore request per visitor.
export const getPublicContent = cache(async (): Promise<ContentState> => {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId || projectId === 'your_project_id') return { content: createDefaultContent(), source: 'local' };
  try {
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/site/content`, {
      next: { revalidate: 60 }, signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Firestore returned ${response.status}`);
    const document = await response.json();
    const content: unknown = JSON.parse(document.fields.payload.stringValue);
    validateContent(content);
    return { content, source: 'database' };
  } catch (error) {
    console.error('Unable to load public site content:', error instanceof Error ? error.message : 'Unknown error');
    return { content: null, source: 'unavailable' };
  }
});
