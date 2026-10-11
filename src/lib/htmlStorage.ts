import { collection, doc, writeBatch, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const CHUNK_SIZE = 200000; // 200 KB per chunk (Firestore limit is ~1048 KB)

/**
 * Saves HTML content, automatically chunking across subcollection if it exceeds safe document size.
 */
export async function saveProjectHtml(projectId: string, htmlContent: string): Promise<{ hasChunks: boolean; chunkCount: number; inlineHtml: string }> {
  if (!htmlContent) {
    return { hasChunks: false, chunkCount: 0, inlineHtml: '' };
  }

  // If under 200 KB, store directly inline in main document
  if (htmlContent.length <= 200000) {
    return { hasChunks: false, chunkCount: 0, inlineHtml: htmlContent };
  }

  // Split into chunks
  const chunks: string[] = [];
  for (let i = 0; i < htmlContent.length; i += CHUNK_SIZE) {
    chunks.push(htmlContent.substring(i, i + CHUNK_SIZE));
  }

  const batch = writeBatch(db);
  const chunksCollectionRef = collection(db, 'projects', projectId, 'contentChunks');

  chunks.forEach((chunkText, idx) => {
    const chunkDocRef = doc(chunksCollectionRef, `chunk_${idx}`);
    batch.set(chunkDocRef, {
      index: idx,
      text: chunkText
    });
  });

  await batch.commit();

  return {
    hasChunks: true,
    chunkCount: chunks.length,
    inlineHtml: '' // Keep main document small
  };
}

/**
 * Loads full HTML content, assembling chunks from subcollection if needed.
 */
export async function loadProjectHtml(projectId: string, projectData: any): Promise<string> {
  if (!projectData) return '';

  if (!projectData.hasChunks && projectData.htmlContent) {
    return projectData.htmlContent;
  }

  if (projectData.hasChunks) {
    try {
      const q = query(collection(db, 'projects', projectId, 'contentChunks'), orderBy('index', 'asc'));
      const snapshot = await getDocs(q);
      const parts = snapshot.docs.map(d => d.data().text || '');
      return parts.join('');
    } catch (err) {
      console.error('Failed to load project HTML chunks:', err);
      return projectData.htmlContent || '';
    }
  }

  return projectData.htmlContent || projectData.content || '';
}

/**
 * Cleans up any subcollection chunks when deleting a project.
 */
export async function deleteProjectHtmlChunks(projectId: string) {
  try {
    const q = query(collection(db, 'projects', projectId, 'contentChunks'));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);
  } catch (err) {
    console.warn('Could not delete chunks:', err);
  }
}
