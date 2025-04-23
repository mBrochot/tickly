import { protectedProcedure, publicProcedure ,router } from '@/server/api/trpc/trpc'
import { db } from '@/lib/firebase'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore'
import { z } from 'zod';
 
export const ticklyRouter = router({
  getTypes: publicProcedure.query(async () => {
    const snapshot = await getDocs(collection(db, 'tickly_types'))
    return snapshot.docs.map((doc) => ({
      uuid: doc.id,
      ...doc.data(),
    }))
  }),
  createTickly: protectedProcedure
    .input(z.object({
      ticklyTypeUuid: z.string(),
      label: z.string().max(50),
    }))
    .mutation(async ({ ctx, input }) => {
      const { ticklyTypeUuid, label } = input;
      const userId = ctx.user?.uid;
      if (!userId) throw new Error('Utilisateur non connecté');

      // 1. Create tickly
      const ticklyRef = await addDoc(collection(db, 'tickly'), {
        user_id: userId,
        type_uuid: ticklyTypeUuid,
        label,
        description: '',
      });

      // 2. Add new enter in the history table
      await addDoc(collection(db, 'history'), {
        tickly_uuid: ticklyRef.id,
        start_at: serverTimestamp(),
        end_at: null,
        is_current: true,
      });

      return { ok: true };
    }),
  getCurrentTicklys: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.uid;
    if (!userId) throw new Error('unauthorized');

    const ticklySnap = await getDocs(
      query(collection(db, 'tickly'), where('user_id', '==', userId))
    );

    const result = await Promise.all(
      ticklySnap.docs.map(async (ticklyDoc) => {
        const historySnap = await getDocs(
          query(
            collection(db, 'history'),
            where('tickly_uuid', '==', ticklyDoc.id),
            where('is_current', '==', true)
          )
        );

        if (historySnap.empty) return null;

        const start_at = historySnap.docs[0].data().start_at;
        const { type_uuid } = ticklyDoc.data();

        const ticklyTypeDoc = await getDoc(doc(db, 'tickly_types', type_uuid));
        const icon = ticklyTypeDoc.exists() ? ticklyTypeDoc.data().icon : 'Circle';

        return {
          id: ticklyDoc.id,
          icon,
          start_at: start_at.toDate(),
        };
      })
    );

    return result.filter(Boolean);
  }),
})